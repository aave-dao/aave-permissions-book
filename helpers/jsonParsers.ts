import { Contracts, ContractInfo, PermissionsJson, PoolInfo } from './types.js';
import {
  getPermissionsByNetwork,
} from './fileSystem.js';

/**
 * Inverted index: contract -> modifier -> functions[].
 * Example: { "Pool": { "onlyPoolAdmin": ["setReserveActive", "setReservePaused"] } }
 */
export type MethodsByModifier = Record<string, Record<string, string[]>>;

/**
 * Transforms the static permissions JSON (function -> roles mapping) into an
 * inverted index (contract -> modifier -> functions[]).
 *
 * Input shape:  [{ contract: "Pool", functions: [{ name: "setReserveActive", roles: ["onlyPoolAdmin"] }] }]
 * Output shape: { "Pool": { "onlyPoolAdmin": ["setReserveActive"] } }
 *
 * This inverted form is used by permission resolvers to attach function lists
 * to each modifier when building the ContractInfo output.
 */
export const generateRoles = (
  functionPermissions: PermissionsJson,
): MethodsByModifier => {
  const permissionsObj: MethodsByModifier = {};

  functionPermissions.forEach(({ contract, functions }, index) => {
    permissionsObj[contract] = {};
    functionPermissions[index].functions.forEach(({ name, roles }) => {
      roles.forEach((role) => {
        if (!permissionsObj[contract][role]) {
          permissionsObj[contract][role] = [];
        }
        permissionsObj[contract][role].push(name);
      });
    });
  });

  return permissionsObj;
};

/**
 * Creates a reverse lookup: address -> contract name.
 * Used by table generation to display friendly names instead of raw addresses.
 */
export const generateContractsByAddress = (
  contracts: Contracts,
): Record<string, string> => {
  const contractsByAddress: Record<string, string> = {};
  Object.keys(contracts).forEach((contract) => {
    contractsByAddress[contracts[contract].address] = contract;
  });

  return contractsByAddress;
};

/**
 * Extracts all contracts from a pool's various sections.
 * Used to build address-to-name lookup tables and contract aggregation.
 */
export const extractPoolContracts = (poolData: PoolInfo | undefined): Contracts => {
  if (!poolData) return {};

  const sections = ['contracts', 'govV3', 'collector', 'clinicSteward', 'umbrella', 'ppc', 'agentHub', 'tokenizationSpokes', 'positionManagers'] as const;
  const allContracts: Contracts = {};

  for (const section of sections) {
    const sectionData = poolData[section as keyof PoolInfo];
    if (!sectionData) continue;

    // Some sections have contracts nested, others are the contracts directly
    const contracts = (sectionData as { contracts?: Contracts }).contracts || sectionData;
    if (typeof contracts === 'object' && contracts !== null) {
      // Only add if it looks like a contracts object (has address property in values)
      for (const [key, value] of Object.entries(contracts)) {
        if (value && typeof value === 'object' && 'address' in value) {
          allContracts[key] = value as ContractInfo;
        }
      }
    }
  }

  return allContracts;
};

/**
 * Lazy lookup for contract name by address.
 * Searches across pools with priority:
 * 1. Current pool's sections (highest priority)
 * 2. V3 pool (if current pool is not V3)
 * 3. GHO contracts (for mainnet, lowest priority)
 *
 * @param address - The address to look up (will be normalized to lowercase)
 * @param network - The network chain ID
 * @param pool - The current pool being processed
 * @returns The contract name if found, undefined otherwise
 */
export const findContractNameByAddress = (
  address: string,
  network: string,
  pool: string,
): string | undefined => {
  const networkPermits = getPermissionsByNetwork(network);
  const normalizedAddress = address.toLowerCase();
  const isV3Pool = pool === 'V3';
  const isWhiteLabelPool = pool === 'V3_WHITE_LABEL';

  // Helper to search in a pool's contracts
  const findInPool = (poolData: PoolInfo | undefined): string | undefined => {
    const contracts = extractPoolContracts(poolData);
    for (const [contractName, contractInfo] of Object.entries(contracts)) {
      if (contractInfo.address?.toLowerCase() === normalizedAddress) {
        // Strip _ prefix used by synthetic entries (e.g. V4 proxy admins)
        return contractName.startsWith('_') ? contractName.slice(1) : contractName;
      }
    }
    return undefined;
  };

  // 1. Search current pool first (highest priority)
  let found = findInPool(networkPermits[pool]);
  if (found) return found;

  // 2. Search V3 pool (if current pool is not V3 or V3_WHITE_LABEL)
  if (!isV3Pool && !isWhiteLabelPool) {
    found = findInPool(networkPermits['V3']);
    if (found) return found;
  }

  // 3. Search V4 contracts (if current pool is not V4)
  if (pool !== 'V4' && networkPermits['V4']) {
    found = findInPool(networkPermits['V4']);
    if (found) return found;
  }

  // 4. Search GHO contracts (only for mainnet)
  if (network === '1') {
    found = findInPool(networkPermits['GHO']);
    if (found) return found;
  }

  return undefined;
};

