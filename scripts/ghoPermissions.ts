import {
  AddressBook,
  Contracts,
  PermissionsJson,
  Roles,
} from '../helpers/types.js';
import { generateRoles } from '../helpers/jsonParsers.js';
import { ghoABI } from '../abis/ghoABI.js';
import { IWithGuardian_ABI } from '@aave-dao/aave-address-book/abis';
import { onlyOwnerAbi } from '../abis/onlyOwnerAbi.js';
import { ghoStewardV2 } from '../abis/ghoStewardV2.js';
import { Address, Client, getAddress, getContract } from 'viem';
import { getProxyAdmin } from '../helpers/proxyAdmin.js';
import { EDGE_RISK_STEWARD_CAPS_ABI } from '../abis/edgeRiskStewardCaps.js';
import { uniqueAddresses } from '../helpers/addressUtils.js';
import { createOwnerResolver } from '../helpers/ownerResolver.js';
import {
  resolveAllRoleOwners,
  mapRoleAddresses,
  resolveOwnableContract,
  resolveRiskCouncilContract,
} from '../helpers/contractResolvers.js';
import { ChainId } from '@bgd-labs/toolbox';

export const resolveGHOModifiers = async (
  addressBook: AddressBook,
  provider: Client,
  permissionsObject: PermissionsJson,
  adminRoles: Record<string, string[]>,
  gsmAdminRoles: Record<string, Roles>,
  addresses: Record<string, string>,
  poolRoles: Record<string, string[]>,
  chainId: number,
): Promise<Contracts> => {
  const obj: Contracts = {};
  const roles = generateRoles(permissionsObject);

  // Create owner resolver with caching for this network
  const ownerResolver = createOwnerResolver(provider);
  
  // Resolve all role owners (with caching to avoid redundant RPC calls)
  const owners = await resolveAllRoleOwners(adminRoles, ownerResolver);
  const poolOwners = await resolveAllRoleOwners(poolRoles, ownerResolver);

  // GHO Token
  const ghoContract = getContract({ address: getAddress(addressBook.GHO_TOKEN), abi: ghoABI, client: provider });
  const facilitators = await ghoContract.read.getFacilitatorsList() as Address[];

  // Resolve facilitator owners (using cache)
  const facilitatorOwners: Record<string, string[]> = {};
  for (const facilitator of facilitators) {
    const info = await ownerResolver.resolve(facilitator);
    facilitatorOwners[facilitator] = info.owners;
  }

  obj['GHO'] = {
    address: addressBook.GHO_TOKEN,
    modifiers: [
      {
        modifier: 'onlyFacilitator',
        addresses: facilitators.map((facilitator: string) => ({
          address: facilitator,
          owners: facilitatorOwners[facilitator],
        })),
        functions: roles['GHO']['onlyFacilitator'],
      },
      {
        modifier: 'onlyFacilitatorManager',
        addresses: uniqueAddresses(mapRoleAddresses('FACILITATOR_MANAGER_ROLE', adminRoles, owners)),
        functions: roles['GHO']['onlyFacilitatorManager'],
      },
      {
        modifier: 'onlyBucketManager',
        addresses: uniqueAddresses(mapRoleAddresses('BUCKET_MANAGER_ROLE', adminRoles, owners)),
        functions: roles['GHO']['onlyBucketManager'],
      },
    ],
  };

  if (chainId !== ChainId.mainnet) {
    const ghoProxyAdmin = await getProxyAdmin(addressBook.GHO_TOKEN as string, provider);
    
    obj['GHO'].proxyAdmin = ghoProxyAdmin;

    const ghoProxyAdminContract = getContract({ address: getAddress(ghoProxyAdmin), abi: onlyOwnerAbi, client: provider });
    const ghoProxyAdminOwner = await ghoProxyAdminContract.read.owner() as Address;
    const ghoProxyAdminOwnerInfo = await ownerResolver.resolve(ghoProxyAdminOwner);

    obj['GHO ProxyAdmin'] = {
      address: ghoProxyAdmin,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: ghoProxyAdminOwner,
              owners: ghoProxyAdminOwnerInfo.owners,
              signersThreshold: ghoProxyAdminOwnerInfo.threshold,
            },
          ],
          functions: roles['ProxyAdmin']['onlyOwner'],
        },
      ],
    };
  }

  // GSM contracts
  for (const key of Object.keys(gsmAdminRoles)) {
    const gsmRoles = gsmAdminRoles[key].role;
    const gsmOwners = await resolveAllRoleOwners(gsmRoles, ownerResolver);

    const gsmProxyAdmin = await getProxyAdmin(addressBook[key], provider);

    obj[key] = {
      address: addressBook[key],
      proxyAdmin: gsmProxyAdmin,
      modifiers: [
        {
          modifier: 'onlyRescuer',
          addresses: uniqueAddresses(mapRoleAddresses('TOKEN_RESCUER_ROLE', gsmRoles, gsmOwners)),
          functions: roles['GSM']['onlyRescuer'],
        },
        {
          modifier: 'onlySwapFreezer',
          addresses: uniqueAddresses(mapRoleAddresses('SWAP_FREEZER_ROLE', gsmRoles, gsmOwners)),
          functions: roles['GSM']['onlySwapFreezer'],
        },
        {
          modifier: 'onlyLiquidator',
          addresses: uniqueAddresses(mapRoleAddresses('LIQUIDATOR_ROLE', gsmRoles, gsmOwners)),
          functions: roles['GSM']['onlyLiquidator'],
        },
        {
          modifier: 'onlyConfigurator',
          addresses: uniqueAddresses(mapRoleAddresses('CONFIGURATOR_ROLE', gsmRoles, gsmOwners)),
          functions: roles['GSM']['onlyConfigurator'],
        },
      ],
    };

    // GSM proxy admin
    const gsmProxyAdminContract = getContract({ address: getAddress(gsmProxyAdmin), abi: onlyOwnerAbi, client: provider });
    const gsmProxyAdminOwner = await gsmProxyAdminContract.read.owner() as Address;
    const gsmProxyAdminOwnerInfo = await ownerResolver.resolve(gsmProxyAdminOwner);

    obj[`${key}-proxyAdmin`] = {
      address: gsmProxyAdmin,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: gsmProxyAdminOwner,
              owners: gsmProxyAdminOwnerInfo.owners,
              signersThreshold: gsmProxyAdminOwnerInfo.threshold,
            },
          ],
          functions: roles['ProxyAdmin']['onlyOwner'],
        },
      ],
    };
  }

  // GSM Registry
  const gsmRegistryResult = await resolveOwnableContract('GSMRegistry', addressBook.GSM_REGISTRY, provider, ownerResolver, roles);
  if (gsmRegistryResult) {
    obj['GSMRegistry'] = gsmRegistryResult;
  }

  // GhoStewardV2 (mainnet only - hardcoded address)
  if (addressBook.GHO_GSM_STEWARD) {
    const ghoStewardResult = await resolveRiskCouncilContract(
      'GhoStewardV2',
      'GhoStewardV2',
      '0x8F2411a538381aae2b464499005F0211e867d84f',
      provider,
      ownerResolver,
      roles,
      ghoStewardV2,
    );
    if (ghoStewardResult) {
      obj['GhoStewardV2'] = ghoStewardResult;
    }
  }

  // Facilitator contracts (owner + guardian pattern)
  for (const [index, facilitator] of facilitators.entries()) {
    const facilitatorOwnableContract = getContract({ address: getAddress(facilitator), abi: onlyOwnerAbi, client: provider });
    const facilitatorGuardianContract = getContract({ address: getAddress(facilitator), abi: IWithGuardian_ABI, client: provider });
    try {
      const facilitatorOwner = await facilitatorOwnableContract.read.owner() as Address;
      const facilitatorGuardian = await facilitatorGuardianContract.read.guardian() as Address;

      const proxyAdmin = await getProxyAdmin(facilitator, provider);

      let facilitatorName = addresses[getAddress(facilitator)];
      if (!facilitatorName) {
        facilitatorName = `facilitator-${index}`;
      }

      const ownerInfo = await ownerResolver.resolve(facilitatorOwner);
      const guardianInfo = await ownerResolver.resolve(facilitatorGuardian);

      obj[`${facilitatorName}`] = {
        address: facilitator,
        proxyAdmin,
        modifiers: [
          {
            modifier: 'onlyOwnerOrGuardian',
            addresses: [
              {
                address: facilitatorOwner,
                owners: ownerInfo.owners,
                signersThreshold: ownerInfo.threshold,
              },
              {
                address: facilitatorGuardian,
                owners: guardianInfo.owners,
                signersThreshold: guardianInfo.threshold,
              },
            ],
            functions: roles['Facilitator']['onlyOwnerOrGuardian'],
          },
          {
            modifier: 'onlyOwner',
            addresses: [
              {
                address: facilitatorOwner,
                owners: ownerInfo.owners,
                signersThreshold: ownerInfo.threshold,
              },
            ],
            functions: roles['Facilitator']['onlyOwner'],
          },
        ],
      };

      // Skip aave proxy admin (already handled elsewhere)
      if (addressBook.PROXY_ADMIN && getAddress(proxyAdmin) !== getAddress(addressBook.PROXY_ADMIN as string)) {
        const proxyAdminContract = getContract({ address: getAddress(proxyAdmin), abi: onlyOwnerAbi, client: provider });
        const proxyAdminOwner = await proxyAdminContract.read.owner() as Address;
        const proxyAdminOwnerInfo = await ownerResolver.resolve(proxyAdminOwner);

        obj[`${facilitatorName}-proxyAdmin`] = {
          address: proxyAdmin,
          modifiers: [
            {
              modifier: 'onlyOwner',
              addresses: [
                {
                  address: proxyAdminOwner,
                  owners: proxyAdminOwnerInfo.owners,
                  signersThreshold: proxyAdminOwnerInfo.threshold,
                },
              ],
              functions: roles['ProxyAdmin']['onlyOwner'],
            },
          ],
        };
      }
    } catch (error) {
      // do nothing
    }
  }

  // GhoFlashMinter
  if (addressBook.GHO_FLASHMINTER_FACILITATOR) {
    obj['GhoFlashMinter'] = {
      address: addressBook.GHO_FLASHMINTER_FACILITATOR,
      modifiers: [
        {
          modifier: 'onlyPoolAdmin',
          addresses: uniqueAddresses(mapRoleAddresses('POOL_ADMIN', poolRoles, poolOwners)),
          functions: roles['GhoFlashMinter']['onlyPoolAdmin']
        },
      ],
    };
  }

  // GhoAaveSteward
  if (addressBook.GHO_AAVE_CORE_STEWARD) {
    const ghoAaveStewardResult = await resolveRiskCouncilContract(
      'GhoAaveSteward',
      'GhoAaveSteward',
      addressBook.GHO_AAVE_CORE_STEWARD,
      provider,
      ownerResolver,
      roles,
      EDGE_RISK_STEWARD_CAPS_ABI,
    );
    if (ghoAaveStewardResult) {
      obj['GhoAaveSteward'] = ghoAaveStewardResult;
    }
  }

  return obj;
};
