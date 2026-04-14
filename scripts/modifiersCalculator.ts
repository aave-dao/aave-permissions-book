/**
 * Main orchestrator for generating on-chain permission snapshots.
 *
 * This script processes each network's pools sequentially, and for each pool:
 * 1. Indexes on-chain events (RoleGranted/RoleRevoked/SenderUpdated) to build role assignments
 * 2. Resolves contract permissions via RPC calls (owner, proxyAdmin, modifiers)
 * 3. Saves the combined result as JSON for later table generation
 *
 * Pool types are processed via a dispatch chain (V2, GovV2, Safety, V2Misc, GHO, V3/ACL).
 * Additional components (Collector, ClinicSteward, Umbrella, etc.) run independently
 * after the main pool type processing - they attach to any pool that has the required config.
 *
 * Fork mode (--fork --payload <address>): Starts an Anvil fork, executes the payload,
 * and indexes the fork events to show what the payload would change.
 *
 * Usage: npm run modifiers:generate [--network <chainId>] [--pool <poolKey>] [--fork --payload <address>]
 */
import 'dotenv/config';
import {
  clinicStewardRoleNames,
  collectorRoleNames,
  ghoGSMRoleNames,
  ghoRoleNames,
  granularGuardianRoleNames,
  networkConfigs,
  Pools,
  protocolRoleNames,
  umbrellaIncentivesRoleNames,
  umbrellaRoleNames,
} from '../helpers/configs.js';
import {
  parseCliArgs,
  getNetworksToProcess,
  getPoolsToProcess,
  logExecutionConfig,
  CliArgs,
} from '../helpers/cli.js';
import {
  getPermissionsByNetwork,
  getPoolMetadata,
  getStaticPermissionsJson,
  saveJson,
  updatePoolMetadata,
  getEmissionAdminsByPool,
  saveEmissionAdminsByPool,
} from '../helpers/fileSystem.js';
import { getRoleAdmins } from '../helpers/adminRoles.js';
import { resolveV2Modifiers } from './v2Permissions.js';
import { resolveV3Modifiers } from './v3Permissions.js';
import { resolveGovV2Modifiers } from './governancePermissions.js';
import { AgentHub, ClinicSteward, Collector, Contracts, EmissionAdminsByToken, GovV3, Ppc, PositionManagers, Roles, TokenizationSpokes, Umbrella } from '../helpers/types.js';
import { resolveSafetyV2Modifiers } from './safetyPermissions.js';
import { resolveV2MiscModifiers } from './v2MiscPermissions.js';
import { getSenders } from '../helpers/crossChainControllerLogs.js';
import { resolveGovV3Modifiers } from './govV3Permissions.js';
import { resolveGHOModifiers } from './ghoPermissions.js';
import { resolveV4Modifiers, resolveTokenizationSpokeUpgradeability, resolveV4PositionManagerModifiers } from './v4Permissions.js';
import { getAccessManagerRoles, getFunctionRoleMappings } from '../helpers/accessManagerRoles.js';
import { AccessManager } from '../helpers/types.js';
import { resolveCollectorModifiers } from './collectorPermissions.js';
import { resolveClinicStewardModifiers } from './clinicStewardPermissions.js';
import { resolveUmbrellaModifiers } from './umbrellaPermissions.js';
import { getRPCClient, getForkRpcUrl, getEventsMultiContract } from '../helpers/rpc.js';
import { getLimit } from '../helpers/limits.js';
import { resolvePpcModifiers } from './ppcPermissions.js';
import { resolveAgentHubModifiers } from './agentHubPermissions.js';
import {
  getProviderForPool,
  getV3ProviderForPool,
  logTableGeneration,
} from '../helpers/poolHelpers.js';
import {
  indexPoolEvents,
  buildPoolContractConfigs,
  ForkPayloadConfig,
  ForkCalldataConfig,
} from '../helpers/eventIndexer.js';
import { logger } from '../helpers/logger.js';
import { checkAnvilInstalled, startAnvilFork, AnvilFork } from '../helpers/anvil.js';
import {
  getEmissionAdminsFromScratch,
  updateEmissionAdmins,
} from './emissionAdminPermissions.js';

const generateNetworkPermissions = async (
  network: number,
  poolsToProcess: string[],
  args: CliArgs,
  forkRpcUrl?: string,
) => {
  // get current permissions
  let fullJson = getPermissionsByNetwork(String(network));
  // generate permissions
  let provider = getRPCClient(network)

  const pools = networkConfigs[network].pools;

  // Build fork payload or calldata config if in fork mode
  let forkPayload: ForkPayloadConfig | undefined;
  let forkCalldata: ForkCalldataConfig | undefined;
  if (args.fork && args.payload) {
    // Find the PayloadsController address from the governance address book.
    // First check the requested pools, then fall back to all pools on the network
    // (e.g. Lido pool shares the PayloadsController with the V3 pool).
    const poolSearchOrder = [...poolsToProcess, ...Object.keys(pools).filter(k => !poolsToProcess.includes(k))];
    for (const poolKey of poolSearchOrder) {
      const pool = pools[poolKey];
      if (pool.governanceAddressBook?.PAYLOADS_CONTROLLER) {
        forkPayload = {
          payloadAddress: args.payload,
          payloadsControllerAddress: pool.governanceAddressBook.PAYLOADS_CONTROLLER as string,
        };
        break;
      }
    }
    if (!forkPayload) {
      throw new Error('Could not find PAYLOADS_CONTROLLER in any pool\'s governanceAddressBook');
    }
  } else if (args.fork && args.calldata && args.caller && args.target) {
    forkCalldata = {
      caller: args.caller,
      target: args.target,
      calldata: args.calldata,
    };
  }

  for (let i = 0; i < poolsToProcess.length; i++) {
    const poolKey = poolsToProcess[i];
    const pool = pools[poolKey];

    const permissionsJson = getStaticPermissionsJson(pool.permissionsJson);
    let poolPermissions: Contracts = {};
    let admins = {} as Roles;
    let gsmAdmins = {} as Record<string, Roles>;
    let collector = {} as Collector;
    let clinicSteward = {} as ClinicSteward;
    let umbrella = {} as Umbrella;
    let govV3 = {} as GovV3;
    let ppc = {} as Ppc;
    govV3.ggRoles = {} as Roles;
    let agentHub = {} as AgentHub;
    let tokenizationSpokes = {} as TokenizationSpokes;
    let positionManagers = {} as PositionManagers;
    let emissionAdmins = {} as EmissionAdminsByToken;

    // =========================================================================
    // UNIFIED EVENT INDEXING
    // For pools that need event-based role tracking, we fetch all events once.
    // In fork mode, the payload is executed on the Anvil fork and fork events
    // are fetched after mainnet events.
    // =========================================================================
    const needsEventIndexing =
      pool.aclBlock ||
      pool.ghoBlock ||
      pool.collectorBlock ||
      pool.clinicStewardBlock ||
      pool.umbrellaBlock ||
      pool.crossChainControllerBlock ||
      pool.granularGuardianBlock ||
      pool.accessManagerBlock;

    // Store indexed events for later processing
    let indexedEvents: Record<string, import('viem').Log[]> = {};
    let indexedLatestBlock = 0;

    if (needsEventIndexing) {
      // Build contract configs for unified indexing
      const contractConfigs = buildPoolContractConfigs({
        addressBook: pool.addressBook,
        umbrellaAddressBook: pool.umbrellaAddressBook,
        governanceAddressBook: pool.governanceAddressBook,
        aclBlock: pool.aclBlock,
        collectorBlock: pool.collectorBlock,
        clinicStewardBlock: pool.clinicStewardBlock,
        umbrellaBlock: pool.umbrellaBlock,
        umbrellaIncentivesBlock: pool.umbrellaIncentivesBlock,
        crossChainControllerBlock: pool.crossChainControllerBlock,
        granularGuardianBlock: pool.granularGuardianBlock,
        ghoBlock: pool.ghoBlock,
        gsmBlocks: pool.gsmBlocks,
        accessManagerBlock: pool.accessManagerBlock,
      });

      if (contractConfigs.length > 0) {
        const existingMetadata = getPoolMetadata(network, poolKey);

        // Index all events in one call
        // In fork mode, this also executes the payload and fetches fork events
        const indexResult = await indexPoolEvents({
          client: provider,
          chainId: network,
          poolKey,
          contracts: contractConfigs,
          poolMetadata: existingMetadata,
          forkRpcUrl,
          forkPayload,
          forkCalldata,
        });

        indexedEvents = indexResult.eventsByContract;
        indexedLatestBlock = indexResult.latestBlockNumber;

        // Save updated metadata (latestBlockNumber only reflects mainnet blocks)
        updatePoolMetadata(network, poolKey, indexResult.poolMetadata);

        logTableGeneration(network, poolKey, 'Events indexed', indexedLatestBlock);
      }
    }

    // =========================================================================
    // POOL TYPE PROCESSING
    // Each pool type has a distinct contract architecture and different
    // permission resolution logic.
    // =========================================================================

    // Resolve provider: in fork mode, state queries go to the fork
    const poolProvider = getProviderForPool(provider, forkRpcUrl);
    const v3PoolProvider = getV3ProviderForPool(provider, forkRpcUrl);

    // =========================================================================
    // EMISSION ADMINS (must run before V3 pool processing so resolveV3Modifiers
    // can include emission admin addresses in the EmissionManager modifier)
    //
    // Not part of unified event indexing because on first run we use direct
    // RPC calls (getEmissionAdmin per token) instead of scanning historical
    // events. Only subsequent runs use incremental event fetching.
    // =========================================================================

    if (pool.emissionManagerBlock && pool.addressBook.EMISSION_MANAGER) {
      const existingEmissionAdmins = getEmissionAdminsByPool(network, poolKey);
      const hasExistingData = Object.keys(existingEmissionAdmins).length > 0;

      if (!hasExistingData) {
        // First run: fetch all emission admins from scratch via direct RPC calls
        logTableGeneration(network, poolKey, 'Emission Admins (from scratch)');
        emissionAdmins = await getEmissionAdminsFromScratch(pool.addressBook, poolProvider);

        // Save metadata so next run uses incremental indexing from current block
        const currentBlock = indexedLatestBlock || Number(await provider.request({ method: 'eth_blockNumber' }));
        updatePoolMetadata(network, `${poolKey}_EMISSION`, {
          latestBlockNumber: currentBlock,
          indexedContracts: {
            EMISSION_MANAGER: {
              address: pool.addressBook.EMISSION_MANAGER as string,
              deploymentBlock: pool.emissionManagerBlock,
              firstIndexedAt: currentBlock,
            },
          },
        });
      } else if (forkRpcUrl) {
        // Fork mode with existing data: first bring mainnet state up to date
        // (incremental), then re-read from the fork to capture only payload changes.
        // Without this two-step approach, any mainnet emission admin changes between
        // the last index and the fork block would incorrectly appear as payload diffs.
        const emissionMetadata = getPoolMetadata(network, `${poolKey}_EMISSION`);
        const fromBlock = emissionMetadata?.latestBlockNumber ?? indexedLatestBlock;
        logTableGeneration(network, poolKey, 'Emission Admins (mainnet incremental)', fromBlock);

        const { logsByContract: mainnetEmissionLogs } = await getEventsMultiContract({
          client: provider,
          fromBlock,
          contracts: [pool.addressBook.EMISSION_MANAGER as string],
          eventTypes: ['EmissionAdminUpdated'],
          limit: getLimit(String(network)),
        });

        const mainnetEvents = mainnetEmissionLogs.get((pool.addressBook.EMISSION_MANAGER as string).toLowerCase()) || [];
        const mainnetUpdated = await updateEmissionAdmins(existingEmissionAdmins, mainnetEvents, provider);

        // Now re-read from fork to get post-payload state
        logTableGeneration(network, poolKey, 'Emission Admins (fork re-read)');
        const forkState = await getEmissionAdminsFromScratch(pool.addressBook, poolProvider);

        // Start from mainnet-updated state, overlay only tokens that the payload changed
        emissionAdmins = { ...mainnetUpdated };
        for (const [token, forkAdmin] of Object.entries(forkState)) {
          const mainnetAdmin = mainnetUpdated[token];
          // If the fork state differs from mainnet state, the payload changed it
          if (!mainnetAdmin || mainnetAdmin.admin !== forkAdmin.admin) {
            emissionAdmins[token] = forkAdmin;
          }
        }
      } else {
        // Incremental: fetch EmissionAdminUpdated events since last indexed block
        const emissionMetadata = getPoolMetadata(network, `${poolKey}_EMISSION`);
        const fromBlock = emissionMetadata?.latestBlockNumber ?? indexedLatestBlock;
        logTableGeneration(network, poolKey, 'Emission Admins (incremental)', fromBlock);

        const { logsByContract, currentBlock } = await getEventsMultiContract({
          client: provider,
          fromBlock,
          contracts: [pool.addressBook.EMISSION_MANAGER as string],
          eventTypes: ['EmissionAdminUpdated'],
          limit: getLimit(String(network)),
        });

        const emissionEvents = logsByContract.get((pool.addressBook.EMISSION_MANAGER as string).toLowerCase()) || [];
        emissionAdmins = await updateEmissionAdmins(existingEmissionAdmins, emissionEvents, poolProvider);

        // Save emission-specific metadata with the latest block
        updatePoolMetadata(network, `${poolKey}_EMISSION`, {
          latestBlockNumber: currentBlock,
          indexedContracts: {
            EMISSION_MANAGER: {
              address: pool.addressBook.EMISSION_MANAGER as string,
              deploymentBlock: pool.emissionManagerBlock,
              firstIndexedAt: fromBlock,
            },
          },
        });
      }

      // Save emission admins data
      saveEmissionAdminsByPool(network, poolKey, emissionAdmins);
    }

    if (poolKey === Pools.V4) {
      logTableGeneration(network, poolKey, undefined, indexedLatestBlock || pool.accessManagerBlock);

      if (Object.keys(pool.addressBook).length > 0 && pool.accessManagerBlock) {
        // Process ACCESS_MANAGER events
        const amEvents = indexedEvents['ACCESS_MANAGER'] || [];
        const v4Roles = getAccessManagerRoles({
          oldRoles: (fullJson[poolKey]?.accessManager?.roles) || {},
          eventLogs: amEvents,
        });
        const v4FunctionRoles = getFunctionRoleMappings({
          oldMappings: (fullJson[poolKey]?.accessManager?.functionRoles) || {},
          eventLogs: amEvents,
        });

        const v4Result = await resolveV4Modifiers(
          pool.addressBook,
          poolProvider,
          permissionsJson,
          v4Roles,
          v4FunctionRoles,
          pool.roleLabels || {},
        );
        poolPermissions = v4Result.contracts;

        // Resolve TokenizationSpokes upgradeability
        if (pool.tokenizationSpokesAddressBook) {
          logTableGeneration(network, poolKey, 'TokenizationSpokes');
          tokenizationSpokes.contracts = await resolveTokenizationSpokeUpgradeability(
            pool.tokenizationSpokesAddressBook,
            poolProvider,
          );
        }

        // Resolve PositionManagers permissions (Ownable2Step + Rescuable, not AccessManager)
        logTableGeneration(network, poolKey, 'PositionManagers');
        positionManagers.contracts = await resolveV4PositionManagerModifiers(
          pool.addressBook,
          poolProvider,
          permissionsJson,
        );

        // Store V4 access manager data for later use
        (fullJson as any).__accessManager = {
          roles: v4Roles,
          functionRoles: v4FunctionRoles,
          roleLabels: v4Result.roleLabels,
        } as AccessManager;
      }
    } else if (
      poolKey !== Pools.GOV_V2 &&
      poolKey !== Pools.SAFETY_MODULE &&
      poolKey !== Pools.V2_MISC &&
      poolKey !== Pools.GHO &&
      !pool.aclBlock &&
      !pool.crossChainControllerBlock
    ) {
      logTableGeneration(network, poolKey);
      if (Object.keys(pool.addressBook).length > 0) {
        poolPermissions = await resolveV2Modifiers(
          pool.addressBook,
          poolProvider,
          permissionsJson,
          Pools[poolKey as keyof typeof Pools],
          network,
        );
      }
    } else if (poolKey === Pools.GOV_V2) {
      logTableGeneration(network, poolKey);

      poolPermissions = await resolveGovV2Modifiers(
        pool.addressBook,
        poolProvider,
        permissionsJson,
      );
    } else if (poolKey === Pools.SAFETY_MODULE) {
      logTableGeneration(network, poolKey);
      poolPermissions = await resolveSafetyV2Modifiers(
        pool.addressBook,
        poolProvider,
        permissionsJson,
      );
    } else if (poolKey === Pools.V2_MISC) {
      logTableGeneration(network, poolKey);
      poolPermissions = await resolveV2MiscModifiers(
        pool.addressBook,
        pool.addresses || {},
        poolProvider,
        permissionsJson,
      );
    } else if (poolKey === Pools.GHO) {
      if (pool.ghoBlock) {
        logTableGeneration(network, poolKey, undefined, indexedLatestBlock || pool.ghoBlock);
        if (Object.keys(pool.addressBook).length > 0) {
          // Process GHO_TOKEN roles from indexed events
          const ghoEvents = indexedEvents['GHO_TOKEN'] || [];
          const ghoRoles = getRoleAdmins({
            oldRoles: (fullJson[poolKey]?.roles?.role) || {},
            roleNames: ghoRoleNames,
            eventLogs: ghoEvents,
          });
          admins = {
            role: ghoRoles,
          };

          // Process GSM roles from indexed events
          if (pool.gsmBlocks) {
            for (const key of Object.keys(pool.gsmBlocks)) {
              const gsmEvents = indexedEvents[key] || [];
              const gsmRoles = getRoleAdmins({
                oldRoles: (fullJson[poolKey]?.gsmRoles?.[key]?.role) || {},
                roleNames: ghoGSMRoleNames,
                eventLogs: gsmEvents,
              });
              gsmAdmins[key] = {
                role: gsmRoles,
              };
            }

            // GHO permission resolution needs the V3 pool's ACL roles to check
            // if GHO facilitators/bucket managers are also V3 pool admins
            const poolRoles = getPermissionsByNetwork(network)['V3']?.roles?.role || {} as Record<string, string[]>;
            poolPermissions = await resolveGHOModifiers(
              pool.addressBook,
              poolProvider,
              permissionsJson,
              admins.role,
              gsmAdmins,
              pool.addresses || {},
              poolRoles,
              network,
            );
          }
        }
      }
    } else if (pool.aclBlock) {
      logTableGeneration(network, poolKey, undefined, indexedLatestBlock || pool.aclBlock);

      if (Object.keys(pool.addressBook).length > 0) {
        // Process ACL_MANAGER roles from indexed events
        const aclEvents = indexedEvents['ACL_MANAGER'] || [];
        const aclRoles = getRoleAdmins({
          oldRoles: (fullJson[poolKey]?.roles?.role) || {},
          roleNames: protocolRoleNames,
          eventLogs: aclEvents,
        });
        admins = {
          role: aclRoles,
        };

        poolPermissions = await resolveV3Modifiers(
          pool.addressBook,
          v3PoolProvider,
          permissionsJson,
          Pools[poolKey as keyof typeof Pools],
          Number(network),
          admins.role,
          emissionAdmins,
        );
      }
    } else {
      logger.warn(`pool not supported: ${poolKey}`, { network });
    }

    // =========================================================================
    // ADDITIONAL COMPONENTS (Collector, ClinicSteward, Umbrella, etc.)
    // =========================================================================

    if (pool.collectorBlock && pool.addressBook.COLLECTOR) {
      logTableGeneration(network, poolKey, 'Collector', indexedLatestBlock || pool.collectorBlock);

      // Process COLLECTOR roles from indexed events
      const collectorEvents = indexedEvents['COLLECTOR'] || [];
      const collectorRoles = getRoleAdmins({
        oldRoles: (fullJson[poolKey]?.collector?.cRoles?.role) || {},
        roleNames: collectorRoleNames,
        collector: true,
        eventLogs: collectorEvents,
      });
      const cAdmins: Roles = {
        role: collectorRoles,
      };

      const collectorPermissions = await resolveCollectorModifiers(
        pool.addressBook,
        v3PoolProvider,
        permissionsJson,
        Number(network),
        cAdmins.role,
      );
      collector.contracts = collectorPermissions;
      collector.cRoles = cAdmins;
    }

    if (pool.clinicStewardBlock && pool.addressBook.CLINIC_STEWARD) {
      logTableGeneration(network, poolKey, 'Clinic Steward', indexedLatestBlock || pool.clinicStewardBlock);

      // Process CLINIC_STEWARD roles from indexed events
      const clinicEvents = indexedEvents['CLINIC_STEWARD'] || [];
      const clinicRoles = getRoleAdmins({
        oldRoles: (fullJson[poolKey]?.clinicSteward?.clinicStewardRoles?.role) || {},
        roleNames: clinicStewardRoleNames,
        collector: true,
        eventLogs: clinicEvents,
      });
      const clinicStewardRolesResult: Roles = {
        role: clinicRoles,
      };

      const clinicStewardPermissions = await resolveClinicStewardModifiers(
        pool.addressBook,
        poolProvider,
        permissionsJson,
        clinicStewardRolesResult.role,
      );
      clinicSteward.contracts = clinicStewardPermissions;
      clinicSteward.clinicStewardRoles = clinicStewardRolesResult;
    }

    if (pool.ppcPermissionsJson && pool.ppcAddressBook) {
      logTableGeneration(network, poolKey, 'Permissioned Payloads Controller');

      const ppcPermissions = await resolvePpcModifiers(
        pool.ppcAddressBook,
        poolProvider,
        getStaticPermissionsJson(pool.ppcPermissionsJson),
        Number(network),
      );
      ppc.contracts = ppcPermissions;
    }


    if (pool.umbrellaBlock && pool.umbrellaAddressBook && pool.umbrellaIncentivesBlock) {
      logTableGeneration(network, poolKey, `Umbrella`, indexedLatestBlock || pool.umbrellaBlock);

      // Process UMBRELLA roles from indexed events
      const umbrellaEvents = indexedEvents['UMBRELLA'] || [];
      const umbrellaRolesResult = getRoleAdmins({
        oldRoles: (fullJson[poolKey]?.umbrella?.umbrellaRoles?.role) || {},
        roleNames: umbrellaRoleNames,
        eventLogs: umbrellaEvents,
      });
      const umbrellaRoles: Roles = {
        role: umbrellaRolesResult,
      };

      // Process UMBRELLA_REWARDS_CONTROLLER roles from indexed events
      const umbrellaIncentivesEvents = indexedEvents['UMBRELLA_REWARDS_CONTROLLER'] || [];
      const umbrellaIncentivesRolesResult = getRoleAdmins({
        oldRoles: (fullJson[poolKey]?.umbrella?.umbrellaIncentivesRoles?.role) || {},
        roleNames: umbrellaIncentivesRoleNames,
        eventLogs: umbrellaIncentivesEvents,
      });
      const umbrellaIncentivesRoles: Roles = {
        role: umbrellaIncentivesRolesResult,
      };

      const umbrellaPermissions = await resolveUmbrellaModifiers(
        pool.umbrellaAddressBook,
        poolProvider,
        permissionsJson,
        umbrellaRoles.role,
        umbrellaIncentivesRoles.role,
      );

      umbrella.contracts = umbrellaPermissions;
      umbrella.umbrellaRoles = umbrellaRoles;
      umbrella.umbrellaIncentivesRoles = umbrellaIncentivesRoles;
    }

    if (pool.functionsPermissionsAgentHubJson) {
      logTableGeneration(network, poolKey, 'Agent Hub');

      const { agentHubPermissions } = await resolveAgentHubModifiers(
        pool.addressBook,
        poolProvider,
        getStaticPermissionsJson(pool.functionsPermissionsAgentHubJson),
        poolKey,
      );
      agentHub.contracts = agentHubPermissions;
    }

    // =========================================================================
    // GOVERNANCE (CrossChainController + GranularGuardian)
    // =========================================================================

    if (
      pool.crossChainControllerBlock &&
      pool.crossChainPermissionsJson &&
      pool.governanceAddressBook
    ) {
      logTableGeneration(network, poolKey, 'Governance', indexedLatestBlock || pool.crossChainControllerBlock);

      // Process CROSS_CHAIN_CONTROLLER senders from indexed events
      const cccEvents = indexedEvents['CROSS_CHAIN_CONTROLLER'] || [];
      const senders = getSenders({
        oldSenders: (fullJson[poolKey]?.govV3?.senders) || [],
        eventLogs: cccEvents,
      });

      if (pool.granularGuardianBlock && pool.governanceAddressBook.GRANULAR_GUARDIAN) {
        // Process GRANULAR_GUARDIAN roles from indexed events
        const ggEvents = indexedEvents['GRANULAR_GUARDIAN'] || [];
        const ggRolesResult = getRoleAdmins({
          oldRoles: (fullJson[poolKey]?.govV3?.ggRoles?.role) || {},
          roleNames: granularGuardianRoleNames,
          eventLogs: ggEvents,
        });

        govV3.ggRoles.role = ggRolesResult;
      }

      const permissionsGovV3Json = getStaticPermissionsJson(
        pool.crossChainPermissionsJson,
      );

      govV3.contracts = await resolveGovV3Modifiers(
        pool.governanceAddressBook,
        v3PoolProvider,
        permissionsGovV3Json,
        Number(network),
        senders,
        govV3.ggRoles.role || {},
        pool.addresses,
      );

      govV3.senders = senders;
    }

    // Extract V4 access manager data if present
    const accessManager = (fullJson as any).__accessManager as AccessManager | undefined;
    delete (fullJson as any).__accessManager;

    // Merge this pool's results into the network-wide JSON.
    const poolResult = {
      contracts: poolPermissions,
      roles: admins,
      gsmRoles: gsmAdmins,
      govV3: govV3,
      collector: collector,
      clinicSteward: clinicSteward,
      umbrella: umbrella,
      ppc: ppc,
      agentHub: agentHub,
      ...(accessManager ? { accessManager } : {}),
      ...(tokenizationSpokes.contracts ? { tokenizationSpokes } : {}),
      ...(positionManagers.contracts ? { positionManagers } : {}),
    };

    if (Object.keys(fullJson).length === 0) {
      fullJson = {
        [poolKey]: poolResult,
      };
    } else {
      fullJson[poolKey] = poolResult;
    }
    logger.poolFinished(String(network), poolKey);
  }

  // save permissions in json object
  logger.info(`Saving JSON for network ${network}`);
  saveJson(
    `out/permissions/${network}-permissions.json`,
    JSON.stringify(fullJson, null, 2),
  );
};

async function main() {
  const args = parseCliArgs();
  logExecutionConfig(args);

  const networks = getNetworksToProcess(args);

  // Start Anvil fork if in fork mode
  let anvilFork: AnvilFork | undefined;
  if (args.fork) {
    await checkAnvilInstalled();

    const network = networks[0]; // Fork mode requires exactly one network
    const rpcUrl = getForkRpcUrl(network) ?? networkConfigs[network].rpcUrl;
    if (!rpcUrl) {
      throw new Error(`No RPC URL configured for network ${network}. Set ALCHEMY_KEY, QUICKNODE_ENDPOINT_NAME/QUICKNODE_TOKEN, or RPC_<NETWORK> in .env`);
    }

    // Get the latest block number from the chain to fork at
    const provider = getRPCClient(network);
    const latestBlock = await provider.request({ method: 'eth_blockNumber' }) as string;
    const forkBlockNumber = parseInt(latestBlock, 16);

    console.log(`Starting Anvil fork at block ${forkBlockNumber}...`);
    anvilFork = await startAnvilFork(rpcUrl, forkBlockNumber);
    console.log(`Anvil fork running at ${anvilFork.rpcUrl}`);
  }

  try {
    const permissions = networks.map((network) => {
      const pools = getPoolsToProcess(network, args);
      if (pools.length === 0) {
        logger.info(`Skipping network ${network}: no matching pools`);
        return Promise.resolve();
      }
      return generateNetworkPermissions(network, pools, args, anvilFork?.rpcUrl);
    });

    // allSettled ensures all networks complete even if some fail (e.g., RPC errors).
    const results = await Promise.allSettled(permissions);
    for (const result of results) {
      if (result.status === 'rejected') {
        console.error('Network failed:', result.reason);
      }
    }
  } finally {
    // Always stop Anvil when done
    if (anvilFork) {
      console.log('Stopping Anvil fork...');
      await anvilFork.stop();
    }
  }

  logger.finished();
}

main();
