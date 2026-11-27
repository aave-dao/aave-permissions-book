import { Address, Client, getAddress, getContract } from "viem";
import { AddressBook, Contracts, PermissionsJson } from "../helpers/types.js";
import { generateRoles } from "../helpers/jsonParsers.js";
import { uniqueAddresses } from "../helpers/addressUtils.js";
import { createOwnerResolver } from "../helpers/ownerResolver.js";
import {
  CAPS_BORROW_FORWARDER_ABI,
  CAPS_PARAMETER_REGISTRY_ABI,
  CAPS_RANGE_VALIDATION_MODULE_ABI,
  LLAMAGUARD_RISK_ORACLE_ROUTER_ABI,
  PT_PARAMETER_REGISTRY_ABI,
  RISK_ORACLE_ABI,
} from "../abis/llamaRisk.js";

/**
 * Resolves the permissions of the LlamaRisk oracle stacks.
 *
 * PT stack: the RiskOracle the agents read from, the registry holding the per-market methodology
 * parameters, and the Router that publishes into the RiskOracle on behalf of the CRE workflows.
 *
 * Caps stack: its own RiskOracle and Router (same contracts and roles as the PT ones), the
 * CapsParameterRegistry holding the workflow parameters, the CapsRangeValidationModule that bounds
 * every cap change of the raise and cut agents, the adminless CapsReducerOracle the cut agents
 * read from, and the CapsBorrowForwarder that raises a borrow cap and borrows in one call.
 *
 * None of these is registered in the AgentHub, so unlike the agents they are not discovered by
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

  const resolveEntry = async (address: Address) => {
    const info = await ownerResolver.resolve(address);
    return {
      address,
      owners: info.owners,
      signersThreshold: info.threshold,
    };
  };

  // RiskOracle: single owner, plus the Router as its only authorized publisher.
  const resolveRiskOracle = async (
    contractName: string,
    oracleAddress: string,
    routerAddress: string | undefined,
  ) => {
    const riskOracle = getContract({
      address: getAddress(oracleAddress),
      abi: RISK_ORACLE_ABI,
      client: provider,
    });
    const owner = (await riskOracle.read.owner()) as Address;

    const modifiers = [
      {
        modifier: "onlyOwner",
        addresses: [await resolveEntry(owner)],
        functions: roles["LlamaRiskRiskOracle"]["onlyOwner"],
      },
    ];

    // `authorizedSenders` is a mapping with no enumeration, so the Router is checked directly
    // rather than listed: it is the only sender the stack authorizes.
    if (routerAddress) {
      const router = getAddress(routerAddress);
      const routerIsAuthorized = (await riskOracle.read.isAuthorized([router])) as boolean;
      if (routerIsAuthorized) {
        modifiers.push({
          modifier: "onlyAuthorized",
          addresses: [await resolveEntry(router)],
          functions: roles["LlamaRiskRiskOracle"]["onlyAuthorized"],
        });
      }
    }

    obj[contractName] = {
      address: oracleAddress,
      modifiers,
    };
  };

  // Router: owner, updater, and a guardian that may pause but not unpause.
  const resolveRouter = async (contractName: string, routerAddress: string) => {
    const router = getContract({
      address: getAddress(routerAddress),
      abi: LLAMAGUARD_RISK_ORACLE_ROUTER_ABI,
      client: provider,
    });
    const owner = (await router.read.owner()) as Address;
    const updater = (await router.read.updater()) as Address;
    const guardian = (await router.read.guardian()) as Address;

    const ownerEntry = await resolveEntry(owner);

    obj[contractName] = {
      address: routerAddress,
      modifiers: [
        {
          modifier: "onlyOwner",
          addresses: [ownerEntry],
          functions: roles["LlamaguardRiskOracleRouter"]["onlyOwner"],
        },
        {
          modifier: "onlyUpdater",
          addresses: [await resolveEntry(updater)],
          functions: roles["LlamaguardRiskOracleRouter"]["onlyUpdater"],
        },
        {
          modifier: "onlyOwnerOrGuardian",
          addresses: uniqueAddresses([await resolveEntry(guardian), ownerEntry]),
          functions: roles["LlamaguardRiskOracleRouter"]["onlyOwnerOrGuardian"],
        },
      ],
    };
  };

  // ---------------------------------------------------------------------------
  // PT stack
  // ---------------------------------------------------------------------------

  if (addressBook.LLAMARISK_RISK_ORACLE) {
    await resolveRiskOracle(
      "LlamaRiskRiskOracle",
      addressBook.LLAMARISK_RISK_ORACLE as string,
      addressBook.LLAMARISK_RISK_ORACLE_ROUTER as string | undefined,
    );
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

    obj["LlamaRiskPTParameterRegistry"] = {
      address: addressBook.LLAMARISK_PT_PARAMETER_REGISTRY as string,
      modifiers: [
        {
          modifier: "onlyOwner",
          addresses: [await resolveEntry(owner)],
          functions: roles["LlamaRiskPTParameterRegistry"]["onlyOwner"],
        },
        {
          modifier: "onlyUpdater",
          addresses: [await resolveEntry(updater)],
          functions: roles["LlamaRiskPTParameterRegistry"]["onlyUpdater"],
        },
      ],
    };
  }

  if (addressBook.LLAMARISK_RISK_ORACLE_ROUTER) {
    await resolveRouter(
      "LlamaguardRiskOracleRouter",
      addressBook.LLAMARISK_RISK_ORACLE_ROUTER as string,
    );
  }

  // ---------------------------------------------------------------------------
  // Caps stack
  // ---------------------------------------------------------------------------

  if (addressBook.LLAMARISK_CAPS_RISK_ORACLE) {
    await resolveRiskOracle(
      "LlamaRiskCapsRiskOracle",
      addressBook.LLAMARISK_CAPS_RISK_ORACLE as string,
      addressBook.LLAMARISK_CAPS_RISK_ORACLE_ROUTER as string | undefined,
    );
  }

  if (addressBook.LLAMARISK_CAPS_RISK_ORACLE_ROUTER) {
    await resolveRouter(
      "LlamaguardCapsRiskOracleRouter",
      addressBook.LLAMARISK_CAPS_RISK_ORACLE_ROUTER as string,
    );
  }

  // Registry: owned by the Aave executor, with an updater that writes every workflow parameter.
  if (addressBook.LLAMARISK_CAPS_PARAMETER_REGISTRY) {
    const registry = getContract({
      address: getAddress(addressBook.LLAMARISK_CAPS_PARAMETER_REGISTRY as string),
      abi: CAPS_PARAMETER_REGISTRY_ABI,
      client: provider,
    });
    const owner = (await registry.read.owner()) as Address;
    const updater = (await registry.read.updater()) as Address;

    obj["LlamaRiskCapsParameterRegistry"] = {
      address: addressBook.LLAMARISK_CAPS_PARAMETER_REGISTRY as string,
      modifiers: [
        {
          modifier: "onlyOwner",
          addresses: [await resolveEntry(owner)],
          functions: roles["LlamaRiskCapsParameterRegistry"]["onlyOwner"],
        },
        {
          modifier: "onlyUpdater",
          addresses: [await resolveEntry(updater)],
          functions: roles["LlamaRiskCapsParameterRegistry"]["onlyUpdater"],
        },
      ],
    };
  }

  // RVM: owned by the Aave executor. The Risk Council Safe may also write the rate limit configs
  // (within the owner's bounds and cooldown) and clear an onboarding, and alone sets the holds.
  if (addressBook.LLAMARISK_CAPS_RANGE_VALIDATION_MODULE) {
    const rvm = getContract({
      address: getAddress(addressBook.LLAMARISK_CAPS_RANGE_VALIDATION_MODULE as string),
      abi: CAPS_RANGE_VALIDATION_MODULE_ABI,
      client: provider,
    });
    const owner = (await rvm.read.owner()) as Address;
    const riskCouncil = (await rvm.read.riskCouncil()) as Address;

    const ownerEntry = await resolveEntry(owner);
    const riskCouncilEntry = await resolveEntry(riskCouncil);

    obj["LlamaRiskCapsRangeValidationModule"] = {
      address: addressBook.LLAMARISK_CAPS_RANGE_VALIDATION_MODULE as string,
      modifiers: [
        {
          modifier: "onlyOwner",
          addresses: [ownerEntry],
          functions: roles["LlamaRiskCapsRangeValidationModule"]["onlyOwner"],
        },
        {
          modifier: "onlyRiskCouncilOrOwner",
          addresses: uniqueAddresses([riskCouncilEntry, ownerEntry]),
          functions: roles["LlamaRiskCapsRangeValidationModule"]["onlyRiskCouncilOrOwner"],
        },
        {
          modifier: "onlyRiskCouncil",
          addresses: [riskCouncilEntry],
          functions: roles["LlamaRiskCapsRangeValidationModule"]["onlyRiskCouncil"],
        },
      ],
    };
  }

  // Forwarder: owned by the Aave executor. `isCaller` is a mapping with no enumeration, so the Risk
  // Council Safe of the forwarder's RVM is checked directly rather than listed: it is the only caller
  // the stack allowlists. It is read from the RVM because `RISK_COUNCIL` in the merged address book
  // can be another Safe (on Arbitrum the GHO address book overrides it).
  if (addressBook.LLAMARISK_CAPS_BORROW_FORWARDER) {
    const forwarder = getContract({
      address: getAddress(addressBook.LLAMARISK_CAPS_BORROW_FORWARDER as string),
      abi: CAPS_BORROW_FORWARDER_ABI,
      client: provider,
    });
    const owner = (await forwarder.read.owner()) as Address;

    const modifiers = [
      {
        modifier: "onlyOwner",
        addresses: [await resolveEntry(owner)],
        functions: roles["LlamaRiskCapsBorrowForwarder"]["onlyOwner"],
      },
    ];

    const rvmAddress = (await forwarder.read.RVM()) as Address;
    const rvm = getContract({
      address: getAddress(rvmAddress),
      abi: CAPS_RANGE_VALIDATION_MODULE_ABI,
      client: provider,
    });
    const riskCouncil = (await rvm.read.riskCouncil()) as Address;
    const riskCouncilIsCaller = (await forwarder.read.isCaller([riskCouncil])) as boolean;
    if (riskCouncilIsCaller) {
      modifiers.push({
        modifier: "onlyCaller",
        addresses: [await resolveEntry(riskCouncil)],
        functions: roles["LlamaRiskCapsBorrowForwarder"]["onlyCaller"],
      });
    }

    obj["LlamaRiskCapsBorrowForwarder"] = {
      address: addressBook.LLAMARISK_CAPS_BORROW_FORWARDER as string,
      modifiers,
    };
  }

  // Reducer oracle: stateless view contract with no admin, listed so it is named wherever it appears.
  if (addressBook.LLAMARISK_CAPS_REDUCER_ORACLE) {
    obj["LlamaRiskCapsReducerOracle"] = {
      address: addressBook.LLAMARISK_CAPS_REDUCER_ORACLE as string,
      modifiers: [],
    };
  }

  return { llamaRiskPermissions: obj };
};
