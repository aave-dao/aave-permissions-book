import { keccak256, encodePacked, ParseEventLogsReturnType } from 'viem';
import { aclManagerAbi } from '../abis/aclManager.js';

// Properly typed log from the ACL Manager ABI
type RoleEventLog = ParseEventLogsReturnType<typeof aclManagerAbi>[number];

export const defaultRolesAdmin =
  '0x0000000000000000000000000000000000000000000000000000000000000000';

/**
 * Initializes a map from role hash (bytes32) to human-readable role name.
 *
 * Most roles use keccak256(roleName) as the hash (standard AccessControl pattern).
 * DEFAULT_ADMIN is always bytes32(0).
 *
 * The Collector contract is a special case: its FUNDS_ADMIN_ROLE uses a
 * left-padded ASCII encoding (bytes32("FUNDS_ADMIN")) instead of keccak256.
 * This is a legacy design from the original Aave V2 Collector implementation.
 */
const initializeRoleCodeMap = (
  roleNames: string[],
  collector?: boolean,
  roleCodes?: Record<string, string>,
): Map<string, string> => {
  const roleCodeMap = new Map<string, string>([
    [
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      'DEFAULT_ADMIN',
    ],
  ]);

  for (const roleName of roleNames) {
    const code = keccak256(encodePacked(['string'], [roleName]));
    roleCodeMap.set(code, roleName);
  }

  if (collector) {
    // bytes32("FUNDS_ADMIN") - not keccak256, but left-padded ASCII
    roleCodeMap.set(
      '0x46554e44535f41444d494e000000000000000000000000000000000000000000',
      'FUNDS_ADMIN_ROLE',
    );
  }

  // Roles whose hash is not keccak256(roleName), e.g. the per-aToken roles of Horizon's RwaATokenManager
  for (const [code, roleName] of Object.entries(roleCodes ?? {})) {
    roleCodeMap.set(code.toLowerCase(), roleName);
  }

  return roleCodeMap;
};

const ROLE_CODE_REGEX = /^0x[0-9a-f]{64}$/;

/**
 * Whether a role key is a raw role hash, i.e. a role that had no known name when its events were processed.
 */
export const isUnknownRoleKey = (roleKey: string): boolean => ROLE_CODE_REGEX.test(roleKey);

/**
 * Processes RoleGranted/RoleRevoked events to determine current role assignments.
 *
 * This is a pure function that takes event logs and returns the computed roles.
 * It does NOT make any RPC calls.
 *
 * Roles without a known name are kept under their raw hash instead of being dropped, since events are
 * indexed incrementally and a dropped event is never processed again. Once a name becomes known, the
 * hash entry is merged into it.
 *
 * @param oldRoles - Previously known role assignments (from saved JSON)
 * @param roleNames - List of role names to track
 * @param collector - Whether this is for the Collector contract (has special FUNDS_ADMIN_ROLE)
 * @param roleCodes - Extra role hash to role name entries, for roles not derived from their name
 * @param eventLogs - Array of RoleGranted/RoleRevoked event logs
 * @returns Updated role assignments
 */
export const getRoleAdmins = ({
  oldRoles,
  roleNames,
  collector,
  roleCodes,
  eventLogs,
}: {
  oldRoles: Record<string, string[]>;
  roleNames: string[];
  collector?: boolean;
  roleCodes?: Record<string, string>;
  eventLogs: RoleEventLog[];
}): Record<string, string[]> => {
  const roleHexToNameMap = initializeRoleCodeMap(roleNames, collector, roleCodes);
  const roles: Record<string, string[]> = {};

  // Previously unknown roles that now have a name are merged into it
  for (const [roleKey, accounts] of Object.entries(oldRoles)) {
    const key = isUnknownRoleKey(roleKey) ? (roleHexToNameMap.get(roleKey) ?? roleKey) : roleKey;
    roles[key] = [...new Set([...(roles[key] ?? []), ...accounts])];
  }

  for (const eventLog of eventLogs) {
    const { role, account } = eventLog.args;
    const roleCode = role.toLowerCase();
    const roleKey = roleHexToNameMap.get(roleCode) ?? roleCode;

    if (eventLog.eventName === 'RoleGranted') {
      if (!roles[roleKey]) {
        roles[roleKey] = [];
      }
      if (!roles[roleKey].includes(account)) {
        roles[roleKey].push(account);
      }
    } else if (eventLog.eventName === 'RoleRevoked') {
      if (roles[roleKey]) {
        roles[roleKey] = roles[roleKey].filter((addr) => addr !== account);
      }
    }
  }

  // Unknown roles with no holders left carry no information
  for (const roleKey of Object.keys(roles)) {
    if (isUnknownRoleKey(roleKey) && roles[roleKey].length === 0) {
      delete roles[roleKey];
    }
  }

  // Ensure all role names have at least an empty array
  for (const roleName of roleNames) {
    if (!roles[roleName]) {
      roles[roleName] = [];
    }
  }

  return roles;
};
