import { Address, Client, getAddress, getContract, toFunctionSelector } from 'viem';
import { getSourceCode } from '@bgd-labs/toolbox';
import { onlyOwnerAbi } from '../abis/onlyOwnerAbi.js';
import { accessManagerAbi } from '../abis/accessManagerAbi.js';
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
    if ((key.endsWith('_SPOKE') || key.endsWith('_ESPOKE')) && !key.startsWith('SPOKE_') && !key.startsWith('TREASURY_') && typeof addressBook[key] === 'string') {
      const prefix = key.replace(/_E?SPOKE$/, '');
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

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

/**
 * Fetches role labels from the AccessManagerEnumerable contract on-chain.
 * Calls `getLabelOfRole(uint64 roleId)` for each unique roleId.
 * Role 0 is hardcoded as ACCESS_MANAGER_DEFAULT_ADMIN.
 * Falls back to config labels, then `Role #N`.
 */
const fetchRoleLabels = async (
  accessManagerAddress: string,
  provider: Client,
  roleIds: string[],
  configLabels: Record<string, string>,
): Promise<Record<string, string>> => {
  const labels: Record<string, string> = {
    '0': 'ACCESS_MANAGER_DEFAULT_ADMIN',
  };
  const contract = getContract({
    address: getAddress(accessManagerAddress),
    abi: accessManagerAbi,
    client: provider,
  });

  for (const roleId of roleIds) {
    if (roleId === '0') continue;
    try {
      const label = await (contract.read as any).getLabelOfRole([BigInt(roleId)]) as string;
      if (label && label.length > 0) {
        labels[roleId] = label;
        continue;
      }
    } catch {
      // Fall through to config labels
    }

    // Fallback to config label
    if (configLabels[roleId]) {
      labels[roleId] = configLabels[roleId];
    }
  }

  return labels;
};

/**
 * Resolves the proxy admin for a contract and reads the ProxyAdmin's owner.
 * Returns null if the contract is not behind a proxy (zero address or read failure).
 */
const resolveProxyAdminWithOwner = async (
  contractAddress: string,
  provider: Client,
  ownerResolver: ReturnType<typeof createOwnerResolver>,
): Promise<{ proxyAdmin: string; owner: Address; ownerInfo: { owners: string[]; threshold: number | undefined } } | null> => {
  try {
    const proxyAdmin = await getProxyAdmin(contractAddress, provider);
    if (!proxyAdmin || proxyAdmin === ZERO_ADDRESS) return null;

    // Read the ProxyAdmin contract's owner()
    const proxyAdminContract = getContract({
      address: getAddress(proxyAdmin),
      abi: onlyOwnerAbi,
      client: provider,
    });
    const owner = (await proxyAdminContract.read.owner()) as Address;
    const ownerInfo = await ownerResolver.resolve(owner);

    return { proxyAdmin, owner, ownerInfo };
  } catch {
    return null;
  }
};

/**
 * Resolves V4 contract permissions using AccessManager role mappings.
 *
 * For each contract:
 * 1. Look up its address in the addressBook
 * 2. Resolve proxy admin and its owner (for all contract types)
 * 3. For `restricted` functions: find the roleId via functionRoles[address][selector]
 * 4. Group functions by roleId, create one Modifier per role
 * 5. Fetch role labels on-chain from AccessManagerEnumerable
 * 6. Map roleId → addresses from roleAddresses, resolve Safe ownership
 *
 * For TreasurySpoke (`onlyOwner`): read `owner()` via RPC, resolve Safe chain.
 *
 * @returns The resolved contracts and fetched role labels.
 */

/**
 * Fetches the verified ABI from Etherscan for a contract and builds a selector → name map.
 * Caches results per address to avoid redundant API calls.
 */
const selectorMapCache = new Map<string, Record<string, string>>();

const fetchSelectorMapFromEtherscan = async (
  contractAddress: string,
  chainId: number,
): Promise<Record<string, string>> => {
  const key = contractAddress.toLowerCase();
  if (selectorMapCache.has(key)) return selectorMapCache.get(key)!;

  const map: Record<string, string> = {};
  try {
    // Rate limit: Etherscan free tier allows 3 calls/sec
    await new Promise((r) => setTimeout(r, 350));
    const source = await getSourceCode({
      chainId,
      address: getAddress(contractAddress) as `0x${string}`,
      apiKey: process.env.ETHERSCAN_API_KEY,
    });
    let abi = JSON.parse(source.ABI as string);

    // If proxy, fetch the implementation's ABI instead
    const impl = (source as any).Implementation as string | undefined;
    if (impl && impl.length > 0) {
      await new Promise((r) => setTimeout(r, 350));
      const implSource = await getSourceCode({
        chainId,
        address: getAddress(impl) as `0x${string}`,
        apiKey: process.env.ETHERSCAN_API_KEY,
      });
      abi = JSON.parse(implSource.ABI as string);
    }
    for (const item of abi) {
      if (item.type === 'function') {
        try {
          const selector = toFunctionSelector(item);
          map[selector] = item.name;
        } catch {
          // Skip entries that can't be parsed
        }
      }
    }
  } catch (e) {
    console.log(`  Warning: could not fetch ABI for ${contractAddress}: ${e}`);
  }

  selectorMapCache.set(key, map);
  return map;
};

export const resolveV4Modifiers = async (
  addressBook: AddressBook,
  provider: Client,
  permissionsObject: PermissionsJson,
  roleAddresses: Record<string, string[]>,
  functionRoles: Record<string, Record<string, string>>,
  configRoleLabels: Record<string, string>,
  chainId: number,
): Promise<{ contracts: Contracts; roleLabels: Record<string, string> }> => {
  const obj: Contracts = {};
  const ownerResolver = createOwnerResolver(provider);
  const allRoleIds = new Set<string>();

  const instances = buildV4ContractInstances(addressBook);

  // Collect all roleIds from on-chain function mappings AND role membership
  for (const instance of instances) {
    const address = addressBook[instance.addressKey] as string | undefined;
    if (!address || instance.contractType === 'TreasurySpoke') continue;
    const targetFnRoles = functionRoles[address.toLowerCase()] || {};
    for (const roleId of Object.values(targetFnRoles)) {
      allRoleIds.add(roleId);
    }
  }
  for (const roleId of Object.keys(roleAddresses)) {
    allRoleIds.add(roleId);
  }

  // Fetch role labels on-chain, with config labels as fallback
  const accessManagerAddress = addressBook.ACCESS_MANAGER as string;
  const roleLabels = await fetchRoleLabels(
    accessManagerAddress,
    provider,
    [...allRoleIds],
    configRoleLabels,
  );

  // Resolve permissions per contract
  for (const instance of instances) {
    const address = addressBook[instance.addressKey] as string | undefined;
    if (!address) continue;

    if (instance.contractType === 'TreasurySpoke') {
      const contractDef = permissionsObject.find((c) => c.contract === 'TreasurySpoke');
      const ownerFunctions = contractDef?.functions
        .filter((f) => f.roles.includes('onlyOwner'))
        .map((f) => f.name) || [];

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
              functions: ownerFunctions,
            },
          ],
        };
      } catch {
        obj[instance.displayName] = {
          address,
          modifiers: [],
        };
      }
    } else {
      // Use ON-CHAIN selectors as source of truth
      const targetFnRoles = functionRoles[address.toLowerCase()] || {};
      const selectorToName = await fetchSelectorMapFromEtherscan(address, chainId);

      // Group on-chain selectors by their assigned roleId
      const fnsByRole: Record<string, string[]> = {};
      for (const [selector, roleId] of Object.entries(targetFnRoles)) {
        if (!fnsByRole[roleId]) {
          fnsByRole[roleId] = [];
        }
        const name = selectorToName[selector] || selector;
        fnsByRole[roleId].push(name);
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
    }

    // Resolve proxy admin for ALL contract types (including TreasurySpoke)
    const proxyResult = await resolveProxyAdminWithOwner(address, provider, ownerResolver);
    if (proxyResult) {
      obj[instance.displayName].proxyAdmin = proxyResult.proxyAdmin;

      // Synthetic entry for ownership resolution by getLevelOfDecentralization.
      // Prefixed with _ to mark as hidden from table output.
      const proxyAdminName = `_${instance.displayName} ProxyAdmin`;
      obj[proxyAdminName] = {
        address: proxyResult.proxyAdmin,
        modifiers: [
          {
            modifier: 'onlyOwner',
            addresses: [
              {
                address: proxyResult.owner,
                owners: proxyResult.ownerInfo.owners,
                signersThreshold: proxyResult.ownerInfo.threshold,
              },
            ],
            functions: [],
          },
        ],
      };
    }
  }

  return { contracts: obj, roleLabels };
};
