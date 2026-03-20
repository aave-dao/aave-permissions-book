import { Address, Client, getAddress, getContract } from 'viem';
import { onlyOwnerAbi } from '../abis/onlyOwnerAbi.js';
import { generateRoles } from '../helpers/jsonParsers.js';
import { getProxyAdmin } from '../helpers/proxyAdmin.js';
import { createOwnerResolver } from '../helpers/ownerResolver.js';
import {
  AddressBook,
  Contracts,
  PermissionsJson,
} from '../helpers/types.js';

/**
 * Contract instance types in the V4 address book that can have multiple
 * deployed instances (one per Hub/Spoke). Each entry maps:
 *   - contractType: the key in the static permissions JSON
 *   - addressPrefix: prefix used in the address book (e.g., 'CORE_HUB', 'PLUS_HUB')
 */
interface V4ContractInstance {
  displayName: string;
  addressKey: string;
  contractType: string;
}

/**
 * Builds the list of V4 contract instances from the address book.
 * Detects Hub and Spoke instances by scanning address book keys.
 */
const buildV4ContractInstances = (addressBook: AddressBook): V4ContractInstance[] => {
  const instances: V4ContractInstance[] = [];

  // Hub instances (e.g., CORE_HUB, PLUS_HUB, PRIME_HUB)
  for (const key of Object.keys(addressBook)) {
    if (key.endsWith('_HUB') && typeof addressBook[key] === 'string') {
      const prefix = key.replace('_HUB', '');
      instances.push({
        displayName: `${prefix} Hub`,
        addressKey: key,
        contractType: 'Hub',
      });
    }
  }

  // HubConfigurator (single instance)
  if (addressBook.HUB_CONFIGURATOR) {
    instances.push({
      displayName: 'HubConfigurator',
      addressKey: 'HUB_CONFIGURATOR',
      contractType: 'HubConfigurator',
    });
  }

  // Spoke instances (e.g., BLUECHIP_SPOKE, ETHENA_SPOKE)
  for (const key of Object.keys(addressBook)) {
    if (key.endsWith('_SPOKE') && !key.startsWith('SPOKE_') && !key.startsWith('TREASURY_') && typeof addressBook[key] === 'string') {
      const prefix = key.replace('_SPOKE', '');
      instances.push({
        displayName: `${prefix} Spoke`,
        addressKey: key,
        contractType: 'Spoke',
      });
    }
  }

  // SpokeConfigurator (single instance)
  if (addressBook.SPOKE_CONFIGURATOR) {
    instances.push({
      displayName: 'SpokeConfigurator',
      addressKey: 'SPOKE_CONFIGURATOR',
      contractType: 'SpokeConfigurator',
    });
  }

  // TreasurySpoke instances
  for (const key of Object.keys(addressBook)) {
    if (key.startsWith('TREASURY_SPOKE') && typeof addressBook[key] === 'string') {
      const suffix = key.replace('TREASURY_SPOKE_', '').replace('TREASURY_SPOKE', '');
      const name = suffix ? `TreasurySpoke (${suffix})` : 'TreasurySpoke';
      instances.push({
        displayName: name,
        addressKey: key,
        contractType: 'TreasurySpoke',
      });
    }
  }

  return instances;
};

/**
 * Resolves V4 contract permissions using AccessManager role mappings.
 *
 * For each contract in the static JSON:
 * 1. Look up its address in the addressBook
 * 2. For `restricted` functions: find the roleId via functionRoles[address][selector]
 * 3. Group functions by roleId, create one Modifier per role
 * 4. Map roleId → addresses from roleAddresses
 * 5. Resolve Safe ownership
 *
 * For TreasurySpoke (`onlyOwner`): read `owner()` via RPC, resolve Safe chain.
 */
export const resolveV4Modifiers = async (
  addressBook: AddressBook,
  provider: Client,
  permissionsObject: PermissionsJson,
  roleAddresses: Record<string, string[]>,
  functionRoles: Record<string, Record<string, string>>,
  roleLabels: Record<string, string>,
): Promise<Contracts> => {
  const obj: Contracts = {};
  const roles = generateRoles(permissionsObject);
  const ownerResolver = createOwnerResolver(provider);

  const instances = buildV4ContractInstances(addressBook);

  for (const instance of instances) {
    const address = addressBook[instance.addressKey] as string | undefined;
    if (!address) continue;

    const contractRoles = roles[instance.contractType];
    if (!contractRoles) continue;

    if (instance.contractType === 'TreasurySpoke') {
      // TreasurySpoke uses onlyOwner, not AccessManager restricted
      try {
        const contract = getContract({
          address: getAddress(address),
          abi: onlyOwnerAbi,
          client: provider,
        });
        const owner = (await contract.read.owner()) as Address;
        const ownerInfo = await ownerResolver.resolve(owner);

        obj[instance.displayName] = {
          address,
          modifiers: [
            {
              modifier: 'onlyOwner',
              addresses: [
                {
                  address: owner,
                  owners: ownerInfo.owners,
                  signersThreshold: ownerInfo.threshold,
                },
              ],
              functions: contractRoles['onlyOwner'] || [],
            },
          ],
        };
      } catch {
        // Contract may not be deployed yet or not support owner()
        obj[instance.displayName] = {
          address,
          modifiers: [],
        };
      }
      continue;
    }

    // AccessManager-controlled contract: group functions by roleId from on-chain mapping
    const targetFnRoles = functionRoles[address.toLowerCase()] || {};

    // Find all restricted functions from the static JSON for this contract type
    const restrictedFunctions = permissionsObject
      .find((c) => c.contract === instance.contractType)
      ?.functions.filter((f) => f.roles.includes('restricted')) || [];

    // Group functions by their assigned roleId
    const fnsByRole: Record<string, string[]> = {};
    for (const fn of restrictedFunctions) {
      if (!fn.selector) continue;
      const roleId = targetFnRoles[fn.selector] || '0';
      if (!fnsByRole[roleId]) {
        fnsByRole[roleId] = [];
      }
      fnsByRole[roleId].push(fn.name);
    }

    // Build modifiers from grouped functions
    const modifiers = [];
    for (const [roleId, functions] of Object.entries(fnsByRole)) {
      const label = roleLabels[roleId] || `Role #${roleId}`;
      const addresses = roleAddresses[roleId] || [];

      const addressInfos = [];
      for (const addr of addresses) {
        const info = await ownerResolver.resolve(addr);
        addressInfos.push({
          address: addr,
          owners: info.owners,
          signersThreshold: info.threshold,
        });
      }

      modifiers.push({
        modifier: label,
        addresses: addressInfos,
        functions,
      });
    }

    obj[instance.displayName] = {
      address,
      modifiers,
    };

    // Resolve proxy admin
    const proxyAdmin = await getProxyAdmin(address, provider);
    if (proxyAdmin) {
      obj[instance.displayName].proxyAdmin = proxyAdmin;
    }
  }

  return obj;
};
