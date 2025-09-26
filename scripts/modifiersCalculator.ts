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
  getPermissionsByNetwork,
  getStaticPermissionsJson,
  saveJson,
} from '../helpers/fileSystem.js';
import { getCurrentRoleAdmins } from '../helpers/adminRoles.js';
import { resolveV2Modifiers } from './v2Permissions.js';
import { resolveV3Modifiers } from './v3Permissions.js';
import { resolveGovV2Modifiers } from './governancePermissions.js';
import { AgentHub, AgentHubRiskOracleInfo, ClinicSteward, Collector, Contracts, GovV3, Ppc, Roles, Umbrella } from '../helpers/types.js';
import { resolveSafetyV2Modifiers } from './safetyPermissions.js';
import { resolveV2MiscModifiers } from './v2MiscPermissions.js';
import { getCCCSendersAndAdapters } from '../helpers/crossChainControllerLogs.js';
import { resolveGovV3Modifiers } from './govV3Permissions.js';
import { resolveGHOModifiers } from './ghoPermissions.js';
import { overwriteBaseTenderlyPool } from '../helpers/jsonParsers.js';
import { resolveCollectorModifiers } from './collectorPermissions.js';
import { resolveClinicStewardModifiers } from './clinicStewardPermissions.js';
import { resolveUmbrellaModifiers } from './umbrellaPermissions.js';
import { getRPCClient, getRpcClientFromUrl } from '../helpers/rpc.js';
import { resolvePpcModifiers } from './ppcPermissions.js';
import { resolveAgentHubModifiers } from './agentHubPermissions.js';

const generateNetworkPermissions = async (network: string) => {
  // get current permissions
  let fullJson = getPermissionsByNetwork(network);
  // generate permissions
  let provider = getRPCClient(Number(network))

  const pools = networkConfigs[network].pools;
  const poolsKeys = Object.keys(pools).map((pool) => pool);
  for (let i = 0; i < poolsKeys.length; i++) {
    const poolKey = poolsKeys[i];
    if (
      (!process.env.TENDERLY || process.env.TENDERLY === 'false') &&
      poolKey.toLowerCase().indexOf('tenderly') > -1
    ) {
      continue;
    }
    const pool = pools[poolKey];

    const permissionsJson = getStaticPermissionsJson(pool.permissionsJson);
    let poolPermissions: Contracts = {};
    let admins = {} as Roles;
    let gsmAdmins = {} as Record<string, Roles>;
    let collector = {} as Collector;
    let clinicSteward = {} as ClinicSteward;
    let umbrella = {} as Umbrella;
    let cAdmins = {} as Roles;
    let govV3 = {} as GovV3;
    let ppc = {} as Ppc;
    govV3.ggRoles = {} as Roles;
    let agentHub = {} as AgentHub;

    if (
      poolKey !== Pools.GOV_V2 &&
      poolKey !== Pools.GOV_V2_TENDERLY &&
      poolKey !== Pools.SAFETY_MODULE &&
      poolKey !== Pools.SAFETY_MODULE_TENDERLY &&
      poolKey !== Pools.V2_MISC_TENDERLY &&
      poolKey !== Pools.V2_MISC &&
      poolKey !== Pools.TENDERLY &&
      poolKey !== Pools.GHO_TENDERLY &&
      poolKey !== Pools.GHO &&
      !pool.aclBlock &&
      !pool.crossChainControllerBlock
    ) {
      console.log(`
          ------------------------------------
            network: ${network}
            pool: ${poolKey}
          ------------------------------------
          `);
      if (pool.tenderlyBasePool) {
        await overwriteBaseTenderlyPool(
          poolKey,
          network,
          pool.tenderlyBasePool,
        );
      }
      if (Object.keys(pool.addressBook).length > 0) {
        poolPermissions = await resolveV2Modifiers(
          pool.addressBook,
          poolKey === Pools.V2_TENDERLY ||
            poolKey === Pools.V2_AMM_TENDERLY ||
            poolKey === Pools.V2_ARC_TENDERLY
            ? getRpcClientFromUrl(pool.tenderlyRpcUrl!)
            : provider,
          permissionsJson,
          Pools[poolKey as keyof typeof Pools],
          network,
        );
      }
    } else if (poolKey === Pools.GOV_V2 || poolKey === Pools.GOV_V2_TENDERLY) {
      console.log(`
          ------------------------------------
            network: ${network}
            pool: ${poolKey}
          ------------------------------------
          `);

      poolPermissions = await resolveGovV2Modifiers(
        pool.addressBook,
        poolKey === Pools.GOV_V2_TENDERLY
          ? getRpcClientFromUrl(pool.tenderlyRpcUrl!)
          : provider,
        permissionsJson,
      );
    } else if (
      poolKey === Pools.SAFETY_MODULE ||
      poolKey === Pools.SAFETY_MODULE_TENDERLY
    ) {
      console.log(`
          ------------------------------------
            network: ${network}
            pool: ${poolKey}
          ------------------------------------
          `);
      poolPermissions = await resolveSafetyV2Modifiers(
        pool.addressBook,
        poolKey === Pools.SAFETY_MODULE_TENDERLY
          ? getRpcClientFromUrl(pool.tenderlyRpcUrl!)
          : provider,
        permissionsJson,
      );
    } else if (
      poolKey === Pools.V2_MISC ||
      poolKey === Pools.V2_MISC_TENDERLY
    ) {
      console.log(`
          ------------------------------------
            network: ${network}
            pool: ${poolKey}
          ------------------------------------
          `);
      poolPermissions = await resolveV2MiscModifiers(
        pool.addressBook,
        pool.addresses || {},
        poolKey === Pools.V2_MISC_TENDERLY
          ? getRpcClientFromUrl(pool.tenderlyRpcUrl!)
          : provider,
        permissionsJson,
      );
    } else if (poolKey === Pools.GHO || poolKey === Pools.GHO_TENDERLY) {
      let fromBlock;
      let gsmBlock;
      if (pool.tenderlyBasePool) {
        await overwriteBaseTenderlyPool(
          poolKey,
          network,
          pool.tenderlyBasePool,
        );
        // get current permissions
        fullJson = getPermissionsByNetwork(network);
        fromBlock = pool.tenderlyBlock;
        gsmBlock = pool.tenderlyBlock;
      } else {
        fromBlock =
          fullJson[poolKey]?.roles?.latestBlockNumber || pool.ghoBlock;
      }

      if (fromBlock) {
        console.log(`
          ------------------------------------
            network: ${network}
            pool: ${poolKey}
            fromBlock: ${fromBlock}
          ------------------------------------
          `);
        if (Object.keys(pool.addressBook).length > 0) {
          admins = await getCurrentRoleAdmins(
            provider,
            (fullJson[poolKey] && fullJson[poolKey]?.roles?.role) ||
            ({} as Record<string, string[]>),
            fromBlock,
            network,
            Pools[poolKey as keyof typeof Pools],
            ghoRoleNames,
            pool.addressBook.GHO_TOKEN,
          );

          // get gsms admin roles
          if (pool.gsmBlocks) {
            for (let i = 0; i < Object.keys(pool.gsmBlocks).length; i++) {
              const key = Object.keys(pool.gsmBlocks)[i];
              let gsmBlock = pool.gsmBlocks[key];
              if (
                fullJson[poolKey] &&
                // @ts-ignore
                Object.keys(fullJson[poolKey].gsmRoles).length > 0 &&
                !pool.tenderlyBasePool
              ) {
                gsmBlock =
                  fullJson[poolKey].gsmRoles?.[key].latestBlockNumber || 0;
              }
              gsmAdmins[key] = await getCurrentRoleAdmins(
                provider,
                (fullJson[poolKey] &&
                  // @ts-ignore
                  Object.keys(fullJson[poolKey].gsmRoles).length > 0 &&
                  fullJson[poolKey]?.gsmRoles?.[key].role) ||
                ({} as Record<string, string[]>),
                gsmBlock,
                network,
                Pools[poolKey as keyof typeof Pools],
                ghoGSMRoleNames,
                pool.addressBook[key],
              );
            }

            const poolRoles = getPermissionsByNetwork(network)['V3']?.roles?.role || {} as Record<string, string[]>;
            poolPermissions = await resolveGHOModifiers(
              pool.addressBook,
              poolKey === Pools.GHO_TENDERLY
                ? getRpcClientFromUrl(pool.tenderlyRpcUrl!)
                : provider,
              permissionsJson,
              admins.role,
              gsmAdmins,
              pool.addresses || {},
              poolRoles,
            );

          }

        }
      }
    } else if (pool.aclBlock) {
      let fromBlock;
      if (pool.tenderlyBasePool) {
        await overwriteBaseTenderlyPool(
          poolKey,
          network,
          pool.tenderlyBasePool,
        );
        // get current permissions
        fullJson = getPermissionsByNetwork(network);
        fromBlock = pool.tenderlyBlock;
      } else {
        fromBlock =
          fullJson[poolKey]?.roles?.latestBlockNumber || pool.aclBlock;
      }

      if (fromBlock) {
        console.log(`
          ------------------------------------
            network: ${network}
            pool: ${poolKey}
            fromBlock: ${fromBlock}
          ------------------------------------
          `);

        if (Object.keys(pool.addressBook).length > 0) {
          admins = await getCurrentRoleAdmins(
            poolKey === Pools.TENDERLY ||
              poolKey === Pools.LIDO_TENDERLY ||
              poolKey === Pools.ETHERFI_TENDERLY
              ? getRpcClientFromUrl(pool.tenderlyRpcUrl!)
              : provider,
            (fullJson[poolKey] && fullJson[poolKey]?.roles?.role) ||
            ({} as Record<string, string[]>),
            fromBlock,
            network,
            Pools[poolKey as keyof typeof Pools],
            protocolRoleNames,
            pool.addressBook.ACL_MANAGER,
          );

          poolPermissions = await resolveV3Modifiers(
            pool.addressBook,
            poolKey === Pools.TENDERLY ||
              poolKey === Pools.LIDO_TENDERLY ||
              poolKey === Pools.ETHERFI_TENDERLY
              ? getRpcClientFromUrl(pool.tenderlyRpcUrl!)
              : provider,
            permissionsJson,
            Pools[poolKey as keyof typeof Pools],
            Number(network),
            admins.role,
          );
        }
      }
    } else {
      console.log(`pool not supported: ${poolKey}`);
    }

    if (pool.collectorBlock && pool.addressBook.COLLECTOR) {
      let fromBlock;
      if (pool.tenderlyBasePool) {
        await overwriteBaseTenderlyPool(
          poolKey,
          network,
          pool.tenderlyBasePool,
        );
        // get current permissions
        fullJson = getPermissionsByNetwork(network);
        fromBlock = pool.tenderlyBlock;
      } else {
        fromBlock =
          fullJson[poolKey]?.collector?.cRoles?.latestBlockNumber || pool.collectorBlock;
      }
      console.log(`
        ------------------------------------
          network: ${network}
          pool: ${poolKey}
          fromBlock: ${fromBlock}
          Collector Table
        ------------------------------------
        `);
      if (fromBlock) {
        cAdmins = await getCurrentRoleAdmins(
          poolKey === Pools.TENDERLY ||
            poolKey === Pools.LIDO_TENDERLY ||
            poolKey === Pools.ETHERFI_TENDERLY
            ? getRpcClientFromUrl(pool.tenderlyRpcUrl!)
            : provider,
          (fullJson[poolKey] && fullJson[poolKey]?.collector?.cRoles?.role) ||
          ({} as Record<string, string[]>),
          fromBlock,
          network,
          Pools[poolKey as keyof typeof Pools],
          collectorRoleNames,
          pool.addressBook.COLLECTOR,
          true
        );

        const collectorPermissions = await resolveCollectorModifiers(
          pool.addressBook,
          poolKey === Pools.TENDERLY ||
            poolKey === Pools.LIDO_TENDERLY ||
            poolKey === Pools.ETHERFI_TENDERLY
            ? getRpcClientFromUrl(pool.tenderlyRpcUrl!)
            : provider,
          permissionsJson,
          Number(network),
          cAdmins.role,
        );
        collector.contracts = collectorPermissions;
        collector.cRoles = cAdmins;
      }
    }

    if (pool.clinicStewardBlock && pool.addressBook.CLINIC_STEWARD) {
      let fromBlock;
      if (pool.tenderlyBasePool) {
        await overwriteBaseTenderlyPool(
          poolKey,
          network,
          pool.tenderlyBasePool,
        );
        // get current permissions
        fullJson = getPermissionsByNetwork(network);
        fromBlock = pool.tenderlyBlock;
      } else {
        fromBlock =
          fullJson[poolKey]?.clinicSteward?.clinicStewardRoles?.latestBlockNumber || pool.clinicStewardBlock;
      }
      console.log(`
        ------------------------------------
          network: ${network}
          pool: ${poolKey}
          fromBlock: ${fromBlock}
          Clinic Steward Table
        ------------------------------------
        `);
      if (fromBlock) {
        cAdmins = await getCurrentRoleAdmins(
          poolKey === Pools.TENDERLY
            ? getRpcClientFromUrl(pool.tenderlyRpcUrl!)
            : provider,
          (fullJson[poolKey] && fullJson[poolKey]?.clinicSteward?.clinicStewardRoles?.role) ||
          ({} as Record<string, string[]>),
          fromBlock,
          network,
          Pools[poolKey as keyof typeof Pools],
          clinicStewardRoleNames,
          pool.addressBook.CLINIC_STEWARD,
          true
        );

        const clinicStewardPermissions = await resolveClinicStewardModifiers(
          pool.addressBook,
          poolKey === Pools.TENDERLY
            ? getRpcClientFromUrl(pool.tenderlyRpcUrl!)
            : provider,
          permissionsJson,
          cAdmins.role,
        );
        clinicSteward.contracts = clinicStewardPermissions;
        clinicSteward.clinicStewardRoles = cAdmins;
      }
    }

    if (pool.ppcPermissionsJson && pool.ppcAddressBook) {
      console.log(`
        ------------------------------------
          network: ${network}
          pool: ${poolKey}
          Permissioned Payloads Controller Table
        ------------------------------------
        `);
      const ppcPermissions = await resolvePpcModifiers(
        pool.ppcAddressBook,
        poolKey === Pools.TENDERLY
          ? getRpcClientFromUrl(pool.tenderlyRpcUrl!)
          : provider,
        getStaticPermissionsJson(pool.ppcPermissionsJson),
        Number(network),
      );
      ppc.contracts = ppcPermissions;
    }


    if (pool.umbrellaBlock && pool.umbrellaAddressBook && pool.umbrellaIncentivesBlock) {
      let umbrellaFromBlock;
      if (pool.tenderlyBasePool) {
        umbrellaFromBlock = pool.tenderlyBlock;
      } else {
        umbrellaFromBlock =
          fullJson[poolKey]?.umbrella?.umbrellaRoles?.latestBlockNumber || pool.umbrellaBlock;
      }
      let umbrellaIncentivesFromBlock;
      if (pool.tenderlyBasePool) {
        umbrellaIncentivesFromBlock = pool.tenderlyBlock;
      } else {
        umbrellaIncentivesFromBlock =
          fullJson[poolKey]?.umbrella?.umbrellaIncentivesRoles?.latestBlockNumber || pool.umbrellaIncentivesBlock;
      }

      if (umbrellaFromBlock && umbrellaIncentivesFromBlock) {
        console.log(`
          ------------------------------------
            network: ${network}
            pool: ${poolKey}
            fromBlock: ${umbrellaFromBlock} | ${umbrellaIncentivesFromBlock}
            Umbrella Table
          ------------------------------------
          `);

        const umbrellaRoles = await getCurrentRoleAdmins(
          poolKey === Pools.TENDERLY
            ? getRpcClientFromUrl(pool.tenderlyRpcUrl!)
            : provider,
          (fullJson[poolKey] && fullJson[poolKey]?.umbrella?.umbrellaRoles?.role) ||
          ({} as Record<string, string[]>),
          umbrellaFromBlock,
          network,
          Pools[poolKey as keyof typeof Pools],
          umbrellaRoleNames,
          pool.umbrellaAddressBook.UMBRELLA,
        );

        const umbrellaIncentivesRoles = await getCurrentRoleAdmins(
          poolKey === Pools.TENDERLY
            ? getRpcClientFromUrl(pool.tenderlyRpcUrl!)
            : provider,
          (fullJson[poolKey] && fullJson[poolKey]?.umbrella?.umbrellaIncentivesRoles?.role) ||
          ({} as Record<string, string[]>),
          umbrellaIncentivesFromBlock,
          network,
          Pools[poolKey as keyof typeof Pools],
          umbrellaIncentivesRoleNames,
          pool.umbrellaAddressBook.UMBRELLA_REWARDS_CONTROLLER,
        );

        const umbrellaPermissions = await resolveUmbrellaModifiers(
          pool.umbrellaAddressBook,
          poolKey === Pools.TENDERLY
            ? getRpcClientFromUrl(pool.tenderlyRpcUrl!)
            : provider,
          permissionsJson,
          umbrellaRoles.role,
          umbrellaIncentivesRoles.role,
        );

        umbrella.contracts = umbrellaPermissions;
        umbrella.umbrellaRoles = umbrellaRoles;
        umbrella.umbrellaIncentivesRoles = umbrellaIncentivesRoles;
      }
    }

    if (pool.agentHubAddressBook && pool.agentHubBlock) {
      if (pool.tenderlyBasePool) {
        await overwriteBaseTenderlyPool(
          poolKey,
          network,
          pool.tenderlyBasePool,
        );
        // get current permissions
        fullJson = getPermissionsByNetwork(network);
      }

      console.log(`
        ------------------------------------
          network: ${network}
          pool: ${poolKey}
          Agent Hub Table
        ------------------------------------
        `);
      fullJson[poolKey]?.agentHub?.agentHubRiskOracleInfo || {} as Record<string, AgentHubRiskOracleInfo>;

      const { agentHubPermissions, agentHubRiskOracleInfo } = await resolveAgentHubModifiers(
        pool.agentHubAddressBook,
        poolKey === Pools.TENDERLY
          ? getRpcClientFromUrl(pool.tenderlyRpcUrl!)
          : provider,
        permissionsJson,
        Number(network),
        fullJson[poolKey]?.agentHub?.agentHubRiskOracleInfo || {} as Record<string, AgentHubRiskOracleInfo>,
        pool.agentHubBlock,
        pool.tenderlyBlock
      );
      agentHub.contracts = agentHubPermissions;
      agentHub.agentHubRiskOracleInfo = agentHubRiskOracleInfo;
    }



    if (
      pool.crossChainControllerBlock &&
      pool.crossChainPermissionsJson &&
      pool.governanceAddressBook
    ) {

      let cccFromBlock;
      if (pool.tenderlyBasePool) {
        cccFromBlock = pool.tenderlyBlock;
      } else {
        cccFromBlock =
          fullJson[poolKey]?.govV3?.latestCCCBlockNumber ||
          pool.crossChainControllerBlock;
      }
      console.log(`
        ------------------------------------
          network: ${network}
          pool: ${poolKey}
          fromBlock: ${cccFromBlock}
          Governance Table
        ------------------------------------
        `);
      if (cccFromBlock) {
        const { senders, latestCCCBlockNumber } =
          await getCCCSendersAndAdapters(
            provider,
            (fullJson[poolKey] && fullJson[poolKey]?.govV3?.senders) || [],
            cccFromBlock,
            pool.governanceAddressBook,
            network,
            Pools[poolKey as keyof typeof Pools],
          );

        if (pool.granularGuardianBlock) {
          let ggFromBlock;
          if (pool.tenderlyBasePool) {
            ggFromBlock = pool.tenderlyBlock;
          } else {
            ggFromBlock =
              fullJson[poolKey]?.govV3?.ggRoles?.latestBlockNumber ||
              pool.granularGuardianBlock;
          }

          if (ggFromBlock && pool.governanceAddressBook.GRANULAR_GUARDIAN) {
            const ggRoles = await getCurrentRoleAdmins(
              poolKey === Pools.TENDERLY ||
                poolKey === Pools.LIDO_TENDERLY ||
                poolKey === Pools.ETHERFI_TENDERLY
                ? getRpcClientFromUrl(pool.tenderlyRpcUrl!)
                : provider,
              (fullJson[poolKey] &&
                fullJson[poolKey]?.govV3?.ggRoles?.role) ||
              ({} as Record<string, string[]>),
              ggFromBlock,
              network,
              Pools[poolKey as keyof typeof Pools],
              granularGuardianRoleNames,
              pool.governanceAddressBook.GRANULAR_GUARDIAN,
            );

            govV3.ggRoles.role = ggRoles.role;
            govV3.ggRoles.latestBlockNumber = ggRoles.latestBlockNumber;
          }
        }

        const permissionsGovV3Json = getStaticPermissionsJson(
          pool.crossChainPermissionsJson,
        );

        govV3.contracts = await resolveGovV3Modifiers(
          pool.governanceAddressBook,
          poolKey === Pools.TENDERLY ||
            poolKey === Pools.LIDO_TENDERLY ||
            poolKey === Pools.ETHERFI_TENDERLY
            ? getRpcClientFromUrl(pool.tenderlyRpcUrl!)
            : provider,
          permissionsGovV3Json,
          Number(network),
          senders,
          poolKey === Pools.TENDERLY ||
          poolKey === Pools.LIDO_TENDERLY ||
          poolKey === Pools.ETHERFI_TENDERLY,
          govV3.ggRoles.role || {},
          pool.addresses,
        );

        govV3.senders = senders;
        govV3.latestCCCBlockNumber = latestCCCBlockNumber;
      }
    }

    if (Object.keys(fullJson).length === 0) {
      fullJson = {
        [poolKey]: {
          contracts: poolPermissions,
          roles: admins,
          gsmRoles: gsmAdmins,
          govV3: govV3,
          collector: collector,
          clinicSteward: clinicSteward,
          umbrella: umbrella,
          ppc: ppc,
          agentHub: agentHub,
        },
      };
    } else {
      // if (!fullJson[network][poolKey]) {
      fullJson[poolKey] = {
        contracts: poolPermissions,
        roles: admins,
        gsmRoles: gsmAdmins,
        govV3: govV3,
        collector: collector,
        clinicSteward: clinicSteward,
        umbrella: umbrella,
        ppc: ppc,
        agentHub: agentHub,
      };
    }
    console.log(`----${network} : ${poolKey} finished`);
  }

  // save permissions in json object
  console.log(
    `-----------${network} : ------------------SAVE JSON-----------------------------------`,
  );
  saveJson(
    `out/permissions/${network}-permissions.json`,
    JSON.stringify(fullJson, null, 2),
  );
};

async function main() {
  const networks = Object.keys(networkConfigs).map((network) => network);
  const permissions = networks.map((network) =>
    generateNetworkPermissions(network),
  );

  const results = await Promise.allSettled(permissions);
  console.log('--------------FINISHED--------------')
}

main();
