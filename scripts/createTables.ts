/**
 * Generates markdown documentation from permission snapshots.
 *
 * Reads the JSON files produced by modifiersCalculator.ts and generates:
 * - Per-pool markdown files with contract tables, role tables, and decentralization info
 * - A root README.md with a directory of all pools
 *
 * Contract aggregation is pool-type-aware:
 * - V3_WHITE_LABEL: isolated, uses only its own contracts and PPC governance
 * - LIDO/ETHERFI: inherit V3's additional components (collector, governance, etc.)
 *   but NOT V3's core pool contracts (they have their own)
 * - Other pools: merge with all V3 data for comprehensive ownership checks
 *
 * Usage: npm run tables:generate [--network <chainId>] [--pool <poolKey>]
 */
import {
  getPermissionsByNetwork,
  saveJson,
} from '../helpers/fileSystem.js';
import { getNetowkName, networkConfigs, Pools } from '../helpers/configs.js';
import {
  parseCliArgs,
  getNetworksToProcess,
  getPoolsToProcess,
  logExecutionConfig,
  CliArgs,
} from '../helpers/cli.js';
import { explorerAddressUrlComposer } from '../helpers/explorer.js';
import { ChainId } from '@bgd-labs/toolbox';
import { generateContractsByAddress, findContractNameByAddress, extractPoolContracts } from '../helpers/jsonParsers.js';
import {
  getLineSeparator,
  getTableBody,
  getTableHeader,
} from '../helpers/tables.js';
import { getPrincipalReadme } from './readme.js';
import {
  ContractsByAddress,
  PoolGuardians,
} from '../helpers/types.js';
import {
  Decentralization,
  getActionExecutors,
  getLevelOfDecentralization,
} from '../helpers/decentralization.js';
import { getAddress } from 'viem';
import {
  generateContractTable,
  generateRoleTable,
  generateGsmRolesTables,
  TableContext,
} from '../helpers/tableGenerator.js';
import { Contracts } from '../helpers/types.js';

// ============================================================================
// Pool Contract Aggregation Helpers
// ============================================================================

/**
 * Builds the poolInfo contracts object for decentralization checks.
 * Uses lazy extraction from pool sections based on pool type.
 */
const buildPoolInfoContracts = (
  network: string,
  pool: string,
  currentPoolContracts: Contracts,
): Contracts => {
  const networkPermits = getPermissionsByNetwork(network);
  const isWhiteLabel = pool === Pools.V3_WHITE_LABEL;
  const isLidoOrEtherfi = pool === Pools.LIDO || pool === Pools.ETHERFI;
  const isV4 = pool === Pools.V4;

  if (isV4) {
    // V4 uses only its own contracts + its own governance
    return extractPoolContracts(networkPermits[Pools.V4]) as Contracts;
  }

  if (isWhiteLabel) {
    // V3_WHITE_LABEL uses only its own pool data
    return extractPoolContracts(networkPermits['V3_WHITE_LABEL']) as Contracts;
  }

  if (isLidoOrEtherfi) {
    // LIDO/ETHERFI pools: current pool + V3's sections (excluding V3's main contracts)
    return {
      ...currentPoolContracts,
      ...networkPermits['V3'].collector?.contracts,
      ...networkPermits['V3'].govV3?.contracts,
      ...networkPermits['V3'].clinicSteward?.contracts,
      ...networkPermits['V3'].umbrella?.contracts,
      ...networkPermits['V3'].ppc?.contracts,
      ...networkPermits['V3'].agentHub?.contracts,
    } as Contracts;
  }

  // Default: current pool contracts + all V3 sections (including V3's main contracts)
  return {
    ...currentPoolContracts,
    ...extractPoolContracts(networkPermits['V3']),
  } as Contracts;
};

/**
 * Builds the govPermissions contracts object for ownership checks.
 */
const buildGovPermissions = (
  network: string,
  pool: string,
): Contracts => {
  const networkPermits = getPermissionsByNetwork(network);

  if (pool === Pools.V4) {
    // V4 reuses V3's governance contracts
    return {
      ...networkPermits['V3']?.govV3?.contracts,
      ...networkPermits[Pools.V4]?.govV3?.contracts,
    } as Contracts;
  }

  if (pool === Pools.V3_WHITE_LABEL) {
    return {
      ...networkPermits['V3_WHITE_LABEL']?.govV3?.contracts,
      ...networkPermits['V3_WHITE_LABEL']?.ppc?.contracts,
    } as Contracts;
  }

  // V2_ARC has its own governance contracts on mainnet (separate from V3 governance)
  if (pool === Pools.V2_ARC) {
    return {
      ...networkPermits['V3'].govV3?.contracts,
      ...getPermissionsByNetwork(ChainId.mainnet)['V2_ARC'].contracts,
    } as Contracts;
  }

  return {
    ...networkPermits['V3'].govV3?.contracts,
  } as Contracts;
};

/**
 * Builds the poolInfo contracts object for action executors.
 * Note: This uses specific sections, not extractPoolContracts, to match original behavior.
 */
const buildActionPoolInfo = (
  network: string,
  pool: string,
  currentPoolContracts: Contracts,
): Contracts => {
  const networkPermits = getPermissionsByNetwork(network);
  const isWhiteLabel = pool === Pools.V3_WHITE_LABEL;
  const isV4 = pool === Pools.V4;

  if (isV4) {
    return {
      ...currentPoolContracts,
      ...networkPermits[Pools.V4]?.govV3?.contracts,
    } as Contracts;
  }

  if (isWhiteLabel) {
    return {
      ...currentPoolContracts,
      ...networkPermits['V3_WHITE_LABEL']?.govV3?.contracts,
      ...networkPermits['V3_WHITE_LABEL']?.contracts,
      ...networkPermits['V3_WHITE_LABEL']?.collector?.contracts,
      ...networkPermits['V3_WHITE_LABEL']?.clinicSteward?.contracts,
      ...networkPermits['V3_WHITE_LABEL']?.umbrella?.contracts,
      ...networkPermits['V3_WHITE_LABEL']?.ppc?.contracts,
      ...networkPermits['V3_WHITE_LABEL']?.agentHub?.contracts,
    } as Contracts;
  }

  // Non-white-label: specific sections (excludes V3.contracts, V3.umbrella, V3.ppc)
  return {
    ...currentPoolContracts,
    ...networkPermits['V3'].govV3?.contracts,
    ...networkPermits['V3'].collector?.contracts,
    ...networkPermits['V3'].clinicSteward?.contracts,
    ...getPermissionsByNetwork(ChainId.mainnet)['GHO']?.contracts,
    ...networkPermits['V3'].agentHub?.contracts,
  } as Contracts;
};

/**
 * Builds the govInfo contracts object for action executors.
 */
const buildActionGovInfo = (
  network: string,
  pool: string,
): Contracts => {
  const networkPermits = getPermissionsByNetwork(network);

  if (pool === Pools.V4) {
    return {
      ...networkPermits['V3']?.govV3?.contracts,
      ...networkPermits[Pools.V4]?.govV3?.contracts,
    } as Contracts;
  }

  if (pool === Pools.V3_WHITE_LABEL) {
    return {
      ...networkPermits['V3_WHITE_LABEL']?.govV3?.contracts,
      ...networkPermits['V3_WHITE_LABEL']?.ppc?.contracts,
    } as Contracts;
  }

  return {
    ...networkPermits['V3'].govV3?.contracts,
    ...networkPermits['V3'].ppc?.contracts,
    ...networkPermits['V3'].clinicSteward?.contracts,
    ...getPermissionsByNetwork(ChainId.mainnet)['GHO']?.contracts,
    ...networkPermits['V3'].agentHub?.contracts,
  } as Contracts;
};

// ============================================================================
// Table Address Generation
// ============================================================================

export const generateTableAddress = (
  address: string | undefined,
  addressesNames: Record<string, string>,
  contractsByAddress: ContractsByAddress,
  poolGuardians: PoolGuardians,
  network: string,
  pool: string,
  _unused?: string,
  chainId?: string,
): string => {
  if (!address) {
    return '-';
  }

  const checkSummedAddress = getAddress(address);

  // Cross-chain addresses (e.g., a governance executor on mainnet referenced
  // from a sidechain pool) need to be resolved against the remote chain's contracts.
  // Display name is suffixed with the network name: "PayloadsController(Ethereum)"
  if (chainId) {
    const newContractsByAddress = generateContractsByAddress({
      ...getPermissionsByNetwork(chainId)['V3'].govV3?.contracts,
      ...getPermissionsByNetwork(chainId)['V3'].ppc?.contracts,
      ...getPermissionsByNetwork(chainId)['V3_WHITE_LABEL']?.govV3?.contracts,
      ...getPermissionsByNetwork(chainId)['V3_WHITE_LABEL']?.ppc?.contracts,
    });
    const networkContractsByAddress: Record<string, string> = {};
    Object.keys(newContractsByAddress).forEach((key) => {
      networkContractsByAddress[key] = `${newContractsByAddress[key]}(${getNetowkName[chainId]})`;
    });
    contractsByAddress = {
      ...contractsByAddress,
      ...networkContractsByAddress,
    };
  }

  // Resolve display name (priority order)
  const resolveDisplayName = (): string => {
    // 1. Check addressesNames with original address
    if (addressesNames[address]) {
      return addressesNames[address];
    }
    // 2. Check addressesNames with checksummed address
    if (addressesNames[checkSummedAddress]) {
      return addressesNames[checkSummedAddress];
    }
    // 3. Check contractsByAddress with original address
    if (contractsByAddress[address]) {
      return contractsByAddress[address];
    }
    // 4. Check contractsByAddress with checksummed address
    if (contractsByAddress[checkSummedAddress]) {
      return contractsByAddress[checkSummedAddress];
    }
    // 5. Check if it's a Safe (has owners)
    const guardian = poolGuardians[checkSummedAddress];
    if (guardian && guardian.owners.length > 0) {
      return addressesNames[checkSummedAddress] || `${checkSummedAddress} (Safe)`;
    }
    // 6. Lazy lookup: search across pools for contract name
    const foundContractName = findContractNameByAddress(
      checkSummedAddress,
      network,
      pool,
    );
    if (foundContractName) {
      return foundContractName;
    }
    // 7. Fall back to checksummed address
    return checkSummedAddress;
  };

  // Resolve explorer URL (ShortExecutor/LongExecutor go to mainnet)
  const resolveExplorerUrl = (): string | null => {
    const contractName = contractsByAddress[checkSummedAddress];
    if (contractName === 'ShortExecutor' || contractName === 'LongExecutor') {
      return explorerAddressUrlComposer(checkSummedAddress, ChainId.mainnet.toString());
    }
    return explorerAddressUrlComposer(checkSummedAddress, network);
  };

  return `[${resolveDisplayName()}](${resolveExplorerUrl() || ''})`;
};

export const generateTable = (network: string, pool: string): string => {
  let readmeDirectoryTable: string = '';

  const networkPermits = getPermissionsByNetwork(network);
  const mainnetPermissions = getPermissionsByNetwork(ChainId.mainnet);

  const networkName = networkConfigs[Number(network)].name.toUpperCase();
  const addressesNames = networkConfigs[network].addressesNames || {};

  // create network Readme with pool tables
  let readmeByNetwork = `# ${networkName} \n`;

  const poolGuardians: PoolGuardians = {};
  let poolPermitsByContract = networkPermits[pool];
  // Merge collector and clinicSteward contracts into the main contracts object
  // so they appear in the primary permissions table. Other components (umbrella,
  // ppc, agentHub) are rendered as separate dedicated tables below.
  poolPermitsByContract.contracts = {
    ...networkPermits[pool].contracts,
    ...getPermissionsByNetwork(network)[pool].collector?.contracts,
    ...getPermissionsByNetwork(network)[pool].clinicSteward?.contracts,
  }

  if (!poolPermitsByContract?.contracts) {
    return readmeDirectoryTable;
  }

  // LIDO/ETHERFI pools share V3's PoolExposureSteward since it manages
  // cross-pool exposure limits. Include it in their permissions table.
  if (pool === Pools.LIDO || pool === Pools.ETHERFI) {
    poolPermitsByContract.contracts = {
      ...poolPermitsByContract.contracts,
      PoolExposureSteward: getPermissionsByNetwork(network)['V3'].contracts['PoolExposureSteward'],
    };
  }

  // create pool table
  readmeByNetwork += `## ${pool} \n`;

  let contractsByAddress: Record<string, string> = {};

  // add gov contracts to contractsByAddresses
  if (pool !== Pools.GOV_V2) {
    contractsByAddress = generateContractsByAddress({
      ...mainnetPermissions[Pools.GOV_V2].contracts,
    });
  }

  // Add current pool's contracts to contractsByAddress (filter _-prefixed synthetic entries)
  // Additional lookups across pools are done lazily via findContractNameByAddress
  const visibleContracts = poolPermitsByContract?.contracts
    ? Object.fromEntries(
        Object.entries(poolPermitsByContract.contracts).filter(([name]) => !name.startsWith('_')),
      )
    : {};
  contractsByAddress = {
    ...contractsByAddress,
    ...generateContractsByAddress(visibleContracts),
  };

  let decentralizationTable = `### Contracts upgradeability\n`;
  const decentralizationHeaderTitles = ['contract', 'upgradeable by'];
  const decentralizationHeader = getTableHeader(decentralizationHeaderTitles);
  decentralizationTable += decentralizationHeader;

  // Build contracts objects once for all decentralization checks
  const poolInfoContracts = buildPoolInfoContracts(network, pool, poolPermitsByContract.contracts);
  const govPermissions = buildGovPermissions(network, pool);
  const isWhiteLabel = pool === Pools.V3_WHITE_LABEL;

  // fill pool table (skip _-prefixed synthetic entries like _X ProxyAdmin)
  let decentralizationTableBody = '';
  for (let contractName of Object.keys(poolPermitsByContract.contracts)) {
    if (contractName.startsWith('_')) continue;
    const contract = poolPermitsByContract.contracts[contractName];
    const { upgradeable, ownedBy }: Decentralization =
      getLevelOfDecentralization(contract, poolInfoContracts, govPermissions, isWhiteLabel);

    // For upgradeable contracts, try to resolve the proxy admin owner to a known label
    let upgradeLabel = upgradeable ? ownedBy : 'not upgradeable';
    if (upgradeable && contract.proxyAdmin) {
      const syntheticKey = `_${contractName} ProxyAdmin`;
      const proxyAdminEntry = poolPermitsByContract.contracts[syntheticKey];
      if (proxyAdminEntry?.modifiers?.[0]?.addresses?.[0]) {
        const ownerAddr = proxyAdminEntry.modifiers[0].addresses[0].address;
        const knownName = addressesNames[ownerAddr] || addressesNames[getAddress(ownerAddr)];
        if (knownName) {
          upgradeLabel = knownName;
        }
      }
    }

    decentralizationTableBody += getTableBody([
      `[${contractName}](${explorerAddressUrlComposer(
        contract.address,
        network,
      )})`,
      upgradeLabel,
    ]);
    decentralizationTableBody += getLineSeparator(
      decentralizationHeaderTitles.length,
    );
  }
  // a/v/s tokens (aTokens, variableDebtTokens, stableDebtTokens) are upgradeable
  // via the PoolConfigurator but are not tracked as individual contracts.
  // Their upgradeability is controlled by governance (or PPC for white-label pools).
  if (pool.includes('V3') || pool.includes('V2') || pool.includes('LIDO') || pool.includes('ETHERFI')) {
    decentralizationTableBody += getTableBody([
      `Aave a/v/s tokens`,
      `${pool === Pools.V3_WHITE_LABEL ? 'PPC Multi-sig' : 'Governance'}`,
    ]);
    decentralizationTableBody += getLineSeparator(
      decentralizationHeaderTitles.length,
    );
  }

  if (
    poolPermitsByContract.govV3 &&
    Object.keys(poolPermitsByContract.govV3).length > 0 &&
    poolPermitsByContract.govV3.contracts
  ) {
    // For govV3 contracts, use combined pool + govV3 contracts for lookup
    const govV3PoolInfo = {
      ...poolPermitsByContract.contracts,
      ...networkPermits['V3'].govV3?.contracts,
    } as Contracts;
    const govV3GovPermissions = networkPermits['V3'].govV3?.contracts || {};

    for (let contractName of Object.keys(
      poolPermitsByContract.govV3.contracts,
    )) {
      const contract = poolPermitsByContract.govV3.contracts[contractName];
      const { upgradeable, ownedBy }: Decentralization =
        getLevelOfDecentralization(contract, govV3PoolInfo, govV3GovPermissions, isWhiteLabel);
      decentralizationTableBody += getTableBody([
        `[${contractName}](${explorerAddressUrlComposer(
          contract.address,
          network,
        )})`,
        `${upgradeable ? ownedBy : 'not upgradeable'}`,
      ]);
      decentralizationTableBody += getLineSeparator(
        decentralizationHeaderTitles.length,
      );
    }
  }

  decentralizationTable += decentralizationTableBody;
  readmeByNetwork += decentralizationTable + '\n';

  let actionsTable = `### Actions type\n`;
  const actionsHeaderTitles = ['type', 'can be executed by'];
  const actionsHeader = getTableHeader(actionsHeaderTitles);
  actionsTable += actionsHeader;

  // fill pool table
  let actionsTableBody = '';
  const actionPoolInfo = buildActionPoolInfo(network, pool, poolPermitsByContract.contracts);
  const actionGovInfo = buildActionGovInfo(network, pool);
  const actionExecutors = getActionExecutors(
    actionPoolInfo,
    actionGovInfo,
    isWhiteLabel,
    networkConfigs[Number(network)].addressesNames || {} as Record<string, string>
  );
  for (let actionName of Object.keys(actionExecutors)) {
    if (Array.from(actionExecutors[actionName]).length > 0) {
      actionsTableBody += getTableBody([
        actionName,
        `${Array.from(actionExecutors[actionName])}`,
      ]);
      actionsTableBody += getLineSeparator(actionsHeaderTitles.length);
    }
  }
  if (actionsTableBody !== '') {
    actionsTable += actionsTableBody;
    readmeByNetwork += actionsTable + '\n';
  }

  // Create table context for use with generic table generators
  const tableCtx: TableContext = {
    network,
    pool,
    addressesNames,
    contractsByAddress,
    poolGuardians,
    generateTableAddress,
  };

  // Contracts table (filter out _-prefixed synthetic entries)
  const displayContracts = poolPermitsByContract.contracts
    ? Object.fromEntries(
        Object.entries(poolPermitsByContract.contracts).filter(([name]) => !name.startsWith('_')),
      )
    : {};
  if (Object.keys(displayContracts).length > 0) {
    readmeByNetwork += generateContractTable(
      { title: 'Contracts', contracts: displayContracts },
      tableCtx,
    );

    readmeDirectoryTable += getTableBody([
      networkName,
      pool,
      `[Permissions](./out/${networkName}-${pool}.md#contracts)`,
    ]);
    readmeDirectoryTable += getLineSeparator(3);
  }

  // Governance V3 Contracts table
  readmeByNetwork += generateContractTable(
    { title: 'Governance V3 Contracts', contracts: poolPermitsByContract.govV3?.contracts },
    tableCtx,
  );

  // Umbrella Contracts table
  readmeByNetwork += generateContractTable(
    { title: 'Umbrella Contracts', contracts: poolPermitsByContract.umbrella?.contracts },
    tableCtx,
  );

  // Risk Agent Contracts table (agentHub)
  readmeByNetwork += generateContractTable(
    { title: 'Risk Agent Contracts', contracts: poolPermitsByContract.agentHub?.contracts },
    tableCtx,
  );

  // Permissioned Payloads Controller Contracts table (ppc)
  readmeByNetwork += generateContractTable(
    { title: 'Permissioned Payloads Controller Contracts', contracts: poolPermitsByContract.ppc?.contracts },
    tableCtx,
  );

  if (Object.keys(poolGuardians).length > 0) {
    let guardianTable = `### Guardians \n`;
    const guardianHeaderTitles = ['Guardian', 'Threshold', 'Address', 'Owners'];
    const guardianHeader = getTableHeader(guardianHeaderTitles);
    guardianTable += guardianHeader;

    Object.keys(poolGuardians).forEach((guardian) => {
      guardianTable += getTableBody([
        `[${addressesNames[getAddress(guardian)]
          ? addressesNames[getAddress(guardian)]
          : `${getAddress(guardian)} (Safe)`
        }](${explorerAddressUrlComposer(guardian, network)})`,
        `${poolGuardians[guardian].threshold}/${poolGuardians[guardian].owners.length}`,
        guardian,
        `${poolGuardians[guardian].owners
          .map(
            (owner) =>
              `[${owner}](${explorerAddressUrlComposer(owner, network)})`,
          )
          .join(', ')}`,
      ]);
      guardianTable += getLineSeparator(guardianHeaderTitles.length);
    });

    readmeByNetwork += guardianTable + '\n';
  }
  // Admins table
  readmeByNetwork += generateRoleTable(
    { title: 'Admins', roles: poolPermitsByContract.roles?.role },
    tableCtx,
  );

  // V4 AccessManager Roles table
  if (poolPermitsByContract.v4AccessManager) {
    const am = poolPermitsByContract.v4AccessManager;
    const labeledRoles: Record<string, string[]> = {};
    for (const [roleId, addresses] of Object.entries(am.roles)) {
      const label = am.roleLabels[roleId] || `Role #${roleId}`;
      labeledRoles[label] = addresses;
    }
    readmeByNetwork += generateRoleTable(
      { title: 'AccessManager Roles', roles: labeledRoles },
      tableCtx,
    );
  }

  // Granular Guardian Admins table
  readmeByNetwork += generateRoleTable(
    { title: 'Granular Guardian Admins', roles: poolPermitsByContract.govV3?.ggRoles?.role },
    tableCtx,
  );

  // Umbrella Admins table (merged from umbrellaRoles and umbrellaIncentivesRoles)
  const umbrellaRoles = poolPermitsByContract.umbrella?.umbrellaRoles?.role && poolPermitsByContract.umbrella?.umbrellaIncentivesRoles?.role
    ? { ...poolPermitsByContract.umbrella.umbrellaRoles.role, ...poolPermitsByContract.umbrella.umbrellaIncentivesRoles.role }
    : undefined;
  readmeByNetwork += generateRoleTable(
    { title: 'Umbrella Admins', roles: umbrellaRoles },
    tableCtx,
  );

  // Collector Admins table
  readmeByNetwork += generateRoleTable(
    { title: 'Collector Admins', roles: poolPermitsByContract.collector?.cRoles?.role },
    tableCtx,
  );

  // Clinic Steward Admins table
  readmeByNetwork += generateRoleTable(
    { title: 'Clinic Steward Admins', roles: poolPermitsByContract.clinicSteward?.clinicStewardRoles?.role },
    tableCtx,
  );

  // GSM Admins tables
  readmeByNetwork += generateGsmRolesTables(poolPermitsByContract.gsmRoles, tableCtx);

  saveJson(`./out/${networkName}-${pool}.md`, readmeByNetwork);

  return readmeDirectoryTable;
};

export const generateAllTables = (args: CliArgs) => {
  const networks = getNetworksToProcess(args);

  // create readme string
  let readmeDirectoryTable = '';
  const readmeDirectoryTableHeaderTitles = ['Network', 'System type', 'Tables'];
  const readmeDirectoryHeader = getTableHeader(
    readmeDirectoryTableHeaderTitles,
  );
  readmeDirectoryTable += readmeDirectoryHeader;

  for (let network of networks) {
    const pools = getPoolsToProcess(network, args);
    for (let pool of pools) {
      readmeDirectoryTable += generateTable(String(network), pool);
    }
  }

  // Only update README when running all networks
  if (args.networks.length === 0) {
    saveJson('./README.md', getPrincipalReadme(readmeDirectoryTable));
  }
};

const args = parseCliArgs();
logExecutionConfig(args);
generateAllTables(args);
