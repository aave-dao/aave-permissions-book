import { explorerAddressUrlComposer } from './explorer.js';
import { getLineSeparator, getTableBody, getTableHeader } from './tables.js';
import { AddressInfo, Contracts, ContractsByAddress, EmissionAdminsByToken, PoolGuardians } from './types.js';

// ============================================================================
// Types
// ============================================================================

/**
 * Context needed for generating table addresses.
 */
export interface TableContext {
  network: string;
  pool: string;
  addressesNames: Record<string, string>;
  contractsByAddress: ContractsByAddress;
  poolGuardians: PoolGuardians;
  generateTableAddress: (
    address: string | undefined,
    addressesNames: Record<string, string>,
    contractsByAddress: ContractsByAddress,
    poolGuardians: PoolGuardians,
    network: string,
    pool: string,
    unused?: string,
    chainId?: string,
  ) => string;
}

/**
 * Configuration for generating a contract table.
 */
export interface ContractTableConfig {
  title: string;
  contracts: Contracts | undefined;
}

/**
 * Configuration for generating a role/admin table.
 */
export interface RoleTableConfig {
  title: string;
  roles: Record<string, string[]> | undefined;
}

// ============================================================================
// Contract Table Generator
// ============================================================================

const CONTRACT_TABLE_HEADERS = [
  'contract',
  'proxyAdmin',
  'modifier',
  'permission owner',
  'functions',
];

/**
 * Generates a markdown table for a set of contracts.
 * This single function replaces 5 nearly identical code blocks in createTables.ts.
 *
 * @param config - The table configuration (title and contracts)
 * @param ctx - The table context (network, address names, etc.)
 * @returns The markdown table string, or empty string if no contracts
 */
export const generateContractTable = (
  config: ContractTableConfig,
  ctx: TableContext,
): string => {
  const { title, contracts } = config;

  if (!contracts || Object.keys(contracts).length === 0) {
    return '';
  }

  let table = `### ${title}\n`;
  table += getTableHeader(CONTRACT_TABLE_HEADERS);

  let tableBody = '';

  for (const contractName of Object.keys(contracts)) {
    const contract = contracts[contractName];

    // Track guardians from modifier addresses
    for (const modifier of contract.modifiers) {
      for (const modifierAddress of modifier.addresses) {
        if (!ctx.poolGuardians[modifierAddress.address]) {
          if (modifierAddress.owners.length > 0) {
            ctx.poolGuardians[modifierAddress.address] = {
              owners: modifierAddress.owners,
              threshold: modifierAddress.signersThreshold,
            };
          }
        }
      }
    }

    // Contract with no modifiers
    if (contract.modifiers.length === 0) {
      tableBody += getTableBody([
        `[${contractName}](${explorerAddressUrlComposer(contract.address, ctx.network)})`,
        ctx.generateTableAddress(
          contract.proxyAdmin,
          ctx.addressesNames,
          ctx.contractsByAddress,
          ctx.poolGuardians,
          ctx.network,
          ctx.pool,
        ),
        '-',
        '-',
        '-',
      ]);
      tableBody += getLineSeparator(CONTRACT_TABLE_HEADERS.length);
      continue;
    }

    // Contract with modifiers
    for (const modifier of contract.modifiers) {
      tableBody += getTableBody([
        `[${contractName}](${explorerAddressUrlComposer(contract.address, ctx.network)})`,
        ctx.generateTableAddress(
          contract.proxyAdmin,
          ctx.addressesNames,
          ctx.contractsByAddress,
          ctx.poolGuardians,
          ctx.network,
          ctx.pool,
        ),
        modifier.modifier,
        modifier.addresses
          .map((modifierAddress: AddressInfo) =>
            ctx.generateTableAddress(
              modifierAddress.address,
              ctx.addressesNames,
              ctx.contractsByAddress,
              ctx.poolGuardians,
              ctx.network,
              ctx.pool,
              undefined,
              modifierAddress.chain,
            ),
          )
          .join(', '),
        modifier?.functions ? modifier.functions.join(', ') : '',
      ]);
      tableBody += getLineSeparator(CONTRACT_TABLE_HEADERS.length);
    }
  }

  table += tableBody;
  return table + '\n';
};

// ============================================================================
// Role/Admin Table Generator
// ============================================================================

const ROLE_TABLE_HEADERS = ['Role', 'Contract'];

/**
 * Generates a markdown table for roles/admins.
 * This single function replaces 6 nearly identical code blocks in createTables.ts.
 *
 * @param config - The table configuration (title and roles)
 * @param ctx - The table context (network, address names, etc.)
 * @returns The markdown table string, or empty string if no roles
 */
export const generateRoleTable = (
  config: RoleTableConfig,
  ctx: TableContext,
): string => {
  const { title, roles } = config;

  if (!roles || Object.keys(roles).length === 0) {
    return '';
  }

  let table = `### ${title}\n`;
  table += getTableHeader(ROLE_TABLE_HEADERS);

  for (const role of Object.keys(roles)) {
    const roleAddresses = roles[role] || [];
    table += getTableBody([
      role,
      roleAddresses
        .map((roleAddress: string) =>
          ctx.generateTableAddress(
            roleAddress,
            ctx.addressesNames,
            ctx.contractsByAddress,
            ctx.poolGuardians,
            ctx.network,
            ctx.pool,
          ),
        )
        .join(', '),
    ]);
    table += getLineSeparator(ROLE_TABLE_HEADERS.length);
  }

  return table + '\n';
};

// ============================================================================
// GSM Roles Table Generator
// ============================================================================

/**
 * Generates markdown tables for GSM roles.
 * Handles the loop over multiple GSM contracts.
 *
 * @param gsmRoles - The GSM roles object (key -> roles mapping)
 * @param ctx - The table context
 * @returns The concatenated markdown tables string
 */
export const generateGsmRolesTables = (
  gsmRoles: Record<string, { role: Record<string, string[]> }> | undefined,
  ctx: TableContext,
): string => {
  if (!gsmRoles) {
    return '';
  }

  let result = '';

  for (const key of Object.keys(gsmRoles)) {
    const roles = gsmRoles[key]?.role;
    result += generateRoleTable(
      { title: `Admins ${key}`, roles },
      ctx,
    );
  }

  return result;
};

// ============================================================================
// Emission Admins Table Generator
// ============================================================================

const EMISSION_ADMIN_TABLE_HEADERS = ['admin', 'tokens count', 'tokens'];

/**
 * Generates a markdown table for emission admins, grouped by admin address.
 */
export const generateEmissionAdminsTable = (
  emissionAdmins: EmissionAdminsByToken | undefined,
  ctx: TableContext,
): string => {
  if (!emissionAdmins || Object.keys(emissionAdmins).length === 0) {
    return '';
  }

  // Group tokens by admin address
  const adminToTokens: Record<string, Array<{ address: string; symbol: string }>> = {};
  for (const [tokenAddress, entry] of Object.entries(emissionAdmins)) {
    const admin = entry.emissionAdmin;
    if (!admin || admin === '0x0000000000000000000000000000000000000000') {
      continue;
    }
    if (!adminToTokens[admin]) {
      adminToTokens[admin] = [];
    }
    adminToTokens[admin].push({ address: tokenAddress, symbol: entry.symbol });
  }

  if (Object.keys(adminToTokens).length === 0) {
    return '';
  }

  let table = `### Emission Admins\n`;
  table += getTableHeader(EMISSION_ADMIN_TABLE_HEADERS);

  for (const [admin, tokens] of Object.entries(adminToTokens)) {
    tokens.sort((a, b) => a.symbol.localeCompare(b.symbol));

    const adminLink = ctx.generateTableAddress(
      admin,
      ctx.addressesNames,
      ctx.contractsByAddress,
      ctx.poolGuardians,
      ctx.network,
      ctx.pool,
    );

    const tokenLinks = tokens
      .map((t) => `[${t.symbol}](${explorerAddressUrlComposer(t.address, ctx.network)})`)
      .join(', ');

    table += getTableBody([
      adminLink,
      String(tokens.length),
      tokenLinks,
    ]);
    table += getLineSeparator(EMISSION_ADMIN_TABLE_HEADERS.length);
  }

  return table + '\n';
};
