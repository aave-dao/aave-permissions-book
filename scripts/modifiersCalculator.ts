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
} from '../helpers/fileSystem.js';
import { getRoleAdmins } from '../helpers/adminRoles.js';
import { resolveV2Modifiers } from './v2Permissions.js';
import { resolveV3Modifiers } from './v3Permissions.js';
import { resolveGovV2Modifiers } from './governancePermissions.js';
import { AgentHub, ClinicSteward, Collector, Contracts, GovV3, Ppc, Roles, Umbrella } from '../helpers/types.js';
import { resolveSafetyV2Modifiers } from './safetyPermissions.js';
import { resolveV2MiscModifiers } from './v2MiscPermissions.js';
import { getSenders } from '../helpers/crossChainControllerLogs.js';
import { resolveGovV3Modifiers } from './govV3Permissions.js';
import { resolveGHOModifiers } from './ghoPermissions.js';
import { resolveV4Modifiers } from './v4Permissions.js';
import { getAccessManagerRoles, getFunctionRoleMappings } from '../helpers/accessManagerRoles.js';
import { V4AccessManager } from '../helpers/types.js';
import { resolveCollectorModifiers } from './collectorPermissions.js';
import { resolveClinicStewardModifiers } from './clinicStewardPermissions.js';
import { resolveUmbrellaModifiers } from './umbrellaPermissions.js';
import { getRPCClient, getForkRpcUrl } from '../helpers/rpc.js';
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
    // Find the PayloadsController address from the governance address book
    // The first pool with a governanceAddressBook has the PAYLOADS_CONTROLLER
    for (const poolKey of poolsToProcess) {
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

    if (poolKey === Pools.V4) {
      logTableGeneration(network, poolKey, undefined, indexedLatestBlock || pool.accessManagerBlock);

      if (Object.keys(pool.addressBook).length > 0 && pool.accessManagerBlock) {
        // Process ACCESS_MANAGER events
        const amEvents = indexedEvents['ACCESS_MANAGER'] || [];
        const v4Roles = getAccessManagerRoles({
          oldRoles: (fullJson[poolKey]?.v4AccessManager?.roles) || {},
          eventLogs: amEvents,
        });
        const v4FunctionRoles = getFunctionRoleMappings({
          oldMappings: (fullJson[poolKey]?.v4AccessManager?.functionRoles) || {},
          eventLogs: amEvents,
        });

        const roleLabels = pool.roleLabels || {};

        poolPermissions = await resolveV4Modifiers(
          pool.addressBook,
          poolProvider,
          permissionsJson,
          v4Roles,
          v4FunctionRoles,
          roleLabels,
        );

        // Store V4 access manager data for later use
        (fullJson as any).__v4AccessManager = {
          roles: v4Roles,
          functionRoles: v4FunctionRoles,
          roleLabels,
        } as V4AccessManager;
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
    const v4AccessManager = (fullJson as any).__v4AccessManager as V4AccessManager | undefined;
    delete (fullJson as any).__v4AccessManager;

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
      ...(v4AccessManager ? { v4AccessManager } : {}),
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
