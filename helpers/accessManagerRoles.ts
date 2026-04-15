import { Log } from 'viem';

/**
 * Processes RoleGranted/RoleRevoked events from an OZ AccessManager contract.
 *
 * AccessManager uses uint64 role IDs (not bytes32 hashes like ACLManager).
 * RoleGranted has a `newMember` flag — we only add an address when newMember is true
 * (delay-only updates emit RoleGranted with newMember=false).
 *
 * @param oldRoles - Previously known role assignments (roleId string → addresses)
 * @param eventLogs - Array of RoleGranted/RoleRevoked event logs
 * @returns Updated role assignments (roleId as string → addresses)
 */
export const getAccessManagerRoles = ({
  oldRoles,
  eventLogs,
}: {
  oldRoles: Record<string, string[]>;
  eventLogs: Log[];
}): Record<string, string[]> => {
  const roles: Record<string, string[]> = { ...oldRoles };

  // Deep copy arrays to avoid mutating oldRoles
  for (const key of Object.keys(roles)) {
    roles[key] = [...roles[key]];
  }

  for (const log of eventLogs) {
    const args = (log as any).args;
    if (!args) continue;

    const eventName = (log as any).eventName;
    const roleId = String(args.roleId);
    const account = args.account as string;

    if (eventName === 'RoleGranted') {
      // Only process new member grants, skip delay-only updates
      if (!args.newMember) continue;

      if (!roles[roleId]) {
        roles[roleId] = [];
      }
      if (!roles[roleId].includes(account)) {
        roles[roleId].push(account);
      }
    } else if (eventName === 'RoleRevoked') {
      if (roles[roleId]) {
        roles[roleId] = roles[roleId].filter((addr) => addr !== account);
      }
    }
  }

  return roles;
};

/**
 * Processes TargetFunctionRoleUpdated events from an OZ AccessManager contract.
 *
 * Builds a mapping: target address (lowercase) → selector (bytes4) → roleId (string).
 * This tells us which role is required to call a given function on a given target.
 *
 * @param oldMappings - Previously known function-role mappings
 * @param eventLogs - Array of TargetFunctionRoleUpdated event logs
 * @returns Updated function-role mappings
 */
export const getFunctionRoleMappings = ({
  oldMappings,
  eventLogs,
}: {
  oldMappings: Record<string, Record<string, string>>;
  eventLogs: Log[];
}): Record<string, Record<string, string>> => {
  const mappings: Record<string, Record<string, string>> = {};

  // Deep copy old mappings
  for (const [target, selectors] of Object.entries(oldMappings)) {
    mappings[target] = { ...selectors };
  }

  for (const log of eventLogs) {
    const args = (log as any).args;
    if (!args) continue;

    const eventName = (log as any).eventName;
    if (eventName !== 'TargetFunctionRoleUpdated') continue;

    const target = (args.target as string).toLowerCase();
    const selector = args.selector as string;
    const roleId = String(args.roleId);

    if (!mappings[target]) {
      mappings[target] = {};
    }
    mappings[target][selector] = roleId;
  }

  return mappings;
};
