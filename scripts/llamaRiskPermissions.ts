import { Address, Client, getAddress, getContract } from "viem";
import { AddressBook, Contracts, PermissionsJson } from "../helpers/types.js";
import { generateRoles } from "../helpers/jsonParsers.js";
import { uniqueAddresses } from "../helpers/addressUtils.js";
import { createOwnerResolver } from "../helpers/ownerResolver.js";
import {
  LLAMAGUARD_RISK_ORACLE_ROUTER_ABI,
  PT_PARAMETER_REGISTRY_ABI,
  RISK_ORACLE_ABI,
} from "../abis/llamaRisk.js";

/**
 * Resolves the permissions of the LlamaRisk PT oracle stack: the RiskOracle the agents read from,
 * the registry holding the per-market methodology parameters, and the Router that publishes into
 * the RiskOracle on behalf of the CRE workflows.
 *
 * None of the three is registered in the AgentHub, so unlike the agents they are not discovered by
 * enumeration and are resolved from their address book entries instead.
 */
export const resolveLlamaRiskModifiers = async (
  addressBook: AddressBook,
  provider: Client,
  permissionsObject: PermissionsJson,
): Promise<{ llamaRiskPermissions: Contracts }> => {
  const obj: Contracts = {};
  const roles = generateRoles(permissionsObject);
  const ownerResolver = createOwnerResolver(provider);

  // RiskOracle: single owner, plus the Router as its only authorized publisher.
  if (addressBook.LLAMARISK_RISK_ORACLE) {
    const riskOracle = getContract({
      address: getAddress(addressBook.LLAMARISK_RISK_ORACLE as string),
      abi: RISK_ORACLE_ABI,
      client: provider,
    });
    const owner = (await riskOracle.read.owner()) as Address;
    const ownerInfo = await ownerResolver.resolve(owner);

    const modifiers = [
      {
        modifier: "onlyOwner",
        addresses: [
          {
            address: owner,
            owners: ownerInfo.owners,
            signersThreshold: ownerInfo.threshold,
          },
        ],
        functions: roles["LlamaRiskRiskOracle"]["onlyOwner"],
      },
    ];

    // `authorizedSenders` is a mapping with no enumeration, so the Router is checked directly
    // rather than listed: it is the only sender phase 1 authorizes.
    if (addressBook.LLAMARISK_RISK_ORACLE_ROUTER) {
      const router = getAddress(addressBook.LLAMARISK_RISK_ORACLE_ROUTER as string);
      const routerIsAuthorized = (await riskOracle.read.isAuthorized([router])) as boolean;
      if (routerIsAuthorized) {
        const routerInfo = await ownerResolver.resolve(router);
        modifiers.push({
          modifier: "onlyAuthorized",
          addresses: [
            {
              address: router,
              owners: routerInfo.owners,
              signersThreshold: routerInfo.threshold,
            },
          ],
          functions: roles["LlamaRiskRiskOracle"]["onlyAuthorized"],
        });
      }
    }

    obj["LlamaRiskRiskOracle"] = {
      address: addressBook.LLAMARISK_RISK_ORACLE as string,
      modifiers,
    };
  }

  // Registry: owned by the Aave executor, with a separate updater for the day to day setters.
  if (addressBook.LLAMARISK_PT_PARAMETER_REGISTRY) {
    const registry = getContract({
      address: getAddress(addressBook.LLAMARISK_PT_PARAMETER_REGISTRY as string),
      abi: PT_PARAMETER_REGISTRY_ABI,
      client: provider,
    });
    const owner = (await registry.read.owner()) as Address;
    const updater = (await registry.read.updater()) as Address;
    const ownerInfo = await ownerResolver.resolve(owner);
    const updaterInfo = await ownerResolver.resolve(updater);

    obj["LlamaRiskPTParameterRegistry"] = {
      address: addressBook.LLAMARISK_PT_PARAMETER_REGISTRY as string,
      modifiers: [
        {
          modifier: "onlyOwner",
          addresses: [
            {
              address: owner,
              owners: ownerInfo.owners,
              signersThreshold: ownerInfo.threshold,
            },
          ],
          functions: roles["LlamaRiskPTParameterRegistry"]["onlyOwner"],
        },
        {
          modifier: "onlyUpdater",
          addresses: [
            {
              address: updater,
              owners: updaterInfo.owners,
              signersThreshold: updaterInfo.threshold,
            },
          ],
          functions: roles["LlamaRiskPTParameterRegistry"]["onlyUpdater"],
        },
      ],
    };
  }

  // Router: owner, updater, and a guardian that may pause but not unpause.
  if (addressBook.LLAMARISK_RISK_ORACLE_ROUTER) {
    const router = getContract({
      address: getAddress(addressBook.LLAMARISK_RISK_ORACLE_ROUTER as string),
      abi: LLAMAGUARD_RISK_ORACLE_ROUTER_ABI,
      client: provider,
    });
    const owner = (await router.read.owner()) as Address;
    const updater = (await router.read.updater()) as Address;
    const guardian = (await router.read.guardian()) as Address;

    const ownerInfo = await ownerResolver.resolve(owner);
    const updaterInfo = await ownerResolver.resolve(updater);
    const guardianInfo = await ownerResolver.resolve(guardian);

    const ownerEntry = {
      address: owner,
      owners: ownerInfo.owners,
      signersThreshold: ownerInfo.threshold,
    };

    obj["LlamaguardRiskOracleRouter"] = {
      address: addressBook.LLAMARISK_RISK_ORACLE_ROUTER as string,
      modifiers: [
        {
          modifier: "onlyOwner",
          addresses: [ownerEntry],
          functions: roles["LlamaguardRiskOracleRouter"]["onlyOwner"],
        },
        {
          modifier: "onlyUpdater",
          addresses: [
            {
              address: updater,
              owners: updaterInfo.owners,
              signersThreshold: updaterInfo.threshold,
            },
          ],
          functions: roles["LlamaguardRiskOracleRouter"]["onlyUpdater"],
        },
        {
          modifier: "onlyOwnerOrGuardian",
          addresses: uniqueAddresses([
            {
              address: guardian,
              owners: guardianInfo.owners,
              signersThreshold: guardianInfo.threshold,
            },
            ownerEntry,
          ]),
          functions: roles["LlamaguardRiskOracleRouter"]["onlyOwnerOrGuardian"],
        },
      ],
    };
  }

  return { llamaRiskPermissions: obj };
};
