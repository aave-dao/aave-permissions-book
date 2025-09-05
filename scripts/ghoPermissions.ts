import {
  AddressInfo,
  Contracts,
  Guardian,
  PermissionsJson,
  Roles,
} from '../helpers/types.js';
import { Pools } from '../helpers/configs.js';
import { ChainId } from '@bgd-labs/toolbox';
import { generateRoles } from '../helpers/jsonParsers.js';
import { getSafeOwners, getSafeThreshold } from '../helpers/guardian.js';
import { ghoABI } from '../abis/ghoABI.js';
import { IOwnable_ABI, IWithGuardian_ABI } from '@bgd-labs/aave-address-book/abis';
import { ghoStewardV2 } from '../abis/ghoStewardV2.js';
import { Address, Client, getAddress, getContract } from 'viem';
import { getProxyAdmin } from '../helpers/proxyAdmin.js';
import { EDGE_RISK_STEWARD_CAPS_ABI } from '../abis/edgeRiskStewardCaps.js';

const uniqueAddresses = (addressesInfo: AddressInfo[]): AddressInfo[] => {
  const cleanAddresses: AddressInfo[] = [];

  addressesInfo.forEach((addressInfo) => {
    const found = cleanAddresses.find(
      (cleanAddressInfo) => cleanAddressInfo.address === addressInfo.address,
    );
    if (!found) {
      cleanAddresses.push(addressInfo);
    }
  });

  return cleanAddresses;
};
export const resolveGHOModifiers = async (
  addressBook: any,
  provider: Client,
  permissionsObject: PermissionsJson,
  adminRoles: Record<string, string[]>,
  gsmAdminRoles: Record<string, Roles>,
  addresses: Record<string, string>,
  poolRoles: Record<string, string[]>,
): Promise<Contracts> => {
  let obj: Contracts = {};
  const roles = generateRoles(permissionsObject);
  const owners: Record<string, Record<string, Guardian>> = {};
  // owners
  for (const roleName of Object.keys(adminRoles)) {
    for (const roleAddress of adminRoles[roleName]) {
      if (!owners[roleName]) {
        owners[roleName] = {
          [roleAddress]: {
            owners: await getSafeOwners(provider, roleAddress),
            threshold: await getSafeThreshold(provider, roleAddress),
          },
        };
      } else if (owners[roleName] && !owners[roleName][roleAddress]) {
        owners[roleName][roleAddress] = {
          owners: await getSafeOwners(provider, roleAddress),
          threshold: await getSafeThreshold(provider, roleAddress),
        };
      }
    }
  }

  // pool roles
  const poolOwners: Record<string, Record<string, Guardian>> = {};
  // owners
  for (const roleName of Object.keys(poolRoles)) {
    for (const roleAddress of poolRoles[roleName]) {
      if (!poolOwners[roleName]) {
        poolOwners[roleName] = {
          [roleAddress]: {
            owners: await getSafeOwners(provider, roleAddress),
            threshold: await getSafeThreshold(provider, roleAddress),
          },
        };
      } else if (poolOwners[roleName] && !poolOwners[roleName][roleAddress]) {
        poolOwners[roleName][roleAddress] = {
          owners: await getSafeOwners(provider, roleAddress),
          threshold: await getSafeThreshold(provider, roleAddress),
        };
      }
    }
  }

  const ghoContract = getContract({ address: getAddress(addressBook.GHO_TOKEN), abi: ghoABI, client: provider });

  const facilitators = await ghoContract.read.getFacilitatorsList() as Address[];

  const facilitatorOwners: Record<string, string[]> = {};
  for (const facilitator of facilitators) {
    facilitatorOwners[facilitator] = await getSafeOwners(provider, facilitator);
  }



  obj['GHO'] = {
    address: addressBook.GHO_TOKEN,
    modifiers: [
      {
        modifier: 'onlyFacilitator',
        addresses: facilitators.map((facilitator: string) => {
          return {
            address: facilitator,
            owners: facilitatorOwners[facilitator],
          };
        }),

        functions: roles['GHO']['onlyFacilitator'],
      },
      {
        modifier: 'onlyFacilitatorManager',
        addresses: uniqueAddresses([
          ...adminRoles['FACILITATOR_MANAGER_ROLE'].map((roleAddress) => {
            return {
              address: roleAddress,
              owners:
                owners['FACILITATOR_MANAGER_ROLE'][roleAddress].owners || [],
              signersThreshold:
                owners['FACILITATOR_MANAGER_ROLE'][roleAddress].threshold || 0,
            };
          }),
        ]),
        functions: roles['GHO']['onlyFacilitatorManager'],
      },
      {
        modifier: 'onlyBucketManager',
        addresses: uniqueAddresses([
          ...adminRoles['BUCKET_MANAGER_ROLE'].map((roleAddress) => {
            return {
              address: roleAddress,
              owners: owners['BUCKET_MANAGER_ROLE'][roleAddress].owners || [],
              signersThreshold:
                owners['BUCKET_MANAGER_ROLE'][roleAddress].threshold || 0,
            };
          }),
        ]),
        functions: roles['GHO']['onlyBucketManager'],
      },
    ],
  };

  for (let i = 0; i < Object.keys(gsmAdminRoles).length; i++) {
    const key = Object.keys(gsmAdminRoles)[i];
    const gsmRoles = gsmAdminRoles[key].role;
    const gsmOwners: Record<string, Record<string, Guardian>> = {};
    // owners
    for (const roleName of Object.keys(gsmRoles)) {
      for (const roleAddress of gsmRoles[roleName]) {
        if (!gsmOwners[roleName]) {
          gsmOwners[roleName] = {
            [roleAddress]: {
              owners: await getSafeOwners(provider, roleAddress),
              threshold: await getSafeThreshold(provider, roleAddress),
            },
          };
        } else if (gsmOwners[roleName] && !gsmOwners[roleName][roleAddress]) {
          gsmOwners[roleName][roleAddress] = {
            owners: await getSafeOwners(provider, roleAddress),
            threshold: await getSafeThreshold(provider, roleAddress),
          };
        }
      }
    }
    const gsmProxyAdmin = await getProxyAdmin(
      addressBook[key],
      provider,
    );
    obj[key] = {
      address: addressBook[key],
      proxyAdmin: gsmProxyAdmin,
      modifiers: [
        {
          modifier: 'onlyRescuer',
          addresses: uniqueAddresses([
            ...gsmRoles['TOKEN_RESCUER_ROLE'].map((roleAddress) => {
              return {
                address: roleAddress,
                owners:
                  gsmOwners['TOKEN_RESCUER_ROLE'][roleAddress].owners || [],
                signersThreshold:
                  gsmOwners['TOKEN_RESCUER_ROLE'][roleAddress].threshold || 0,
              };
            }),
          ]),
          functions: roles['GSM']['onlyRescuer'],
        },
        {
          modifier: 'onlySwapFreezer',
          addresses: uniqueAddresses([
            ...gsmRoles['SWAP_FREEZER_ROLE'].map((roleAddress) => {
              return {
                address: roleAddress,
                owners:
                  gsmOwners['SWAP_FREEZER_ROLE'][roleAddress].owners || [],
                signersThreshold:
                  gsmOwners['SWAP_FREEZER_ROLE'][roleAddress].threshold || 0,
              };
            }),
          ]),
          functions: roles['GSM']['onlySwapFreezer'],
        },
        {
          modifier: 'onlyLiquidator',
          addresses: uniqueAddresses([
            ...gsmRoles['LIQUIDATOR_ROLE'].map((roleAddress) => {
              return {
                address: roleAddress,
                owners: gsmOwners['LIQUIDATOR_ROLE'][roleAddress].owners || [],
                signersThreshold:
                  gsmOwners['LIQUIDATOR_ROLE'][roleAddress].threshold || 0,
              };
            }),
          ]),
          functions: roles['GSM']['onlyLiquidator'],
        },
        {
          modifier: 'onlyConfigurator',
          addresses: uniqueAddresses([
            ...gsmRoles['CONFIGURATOR_ROLE'].map((roleAddress) => {
              return {
                address: roleAddress,
                owners:
                  gsmOwners['CONFIGURATOR_ROLE'][roleAddress].owners || [],
                signersThreshold:
                  gsmOwners['CONFIGURATOR_ROLE'][roleAddress].threshold || 0,
              };
            }),
          ]),
          functions: roles['GSM']['onlyConfigurator'],
        },
      ],
    };

    // add gsm proxy admins
    const gsmProxyAdminContract = getContract({ address: getAddress(gsmProxyAdmin), abi: IOwnable_ABI, client: provider });
    const gsmProxyAdminOwner = await gsmProxyAdminContract.read.owner() as Address;

    obj[`${key}-proxyAdmin`] = {
      address: gsmProxyAdmin,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: gsmProxyAdminOwner,
              owners: await getSafeOwners(provider, gsmProxyAdminOwner),
              signersThreshold: await getSafeThreshold(provider, gsmProxyAdminOwner),
            },
          ],
          functions: roles['ProxyAdmin']['onlyOwner'],
        },
      ],
    };
  }

  const gsmRegistryContract = getContract({ address: getAddress(addressBook.GSM_REGISTRY), abi: IOwnable_ABI, client: provider });
  const gsmRegistryOwner = await gsmRegistryContract.read.owner() as Address;

  obj['GSMRegistry'] = {
    address: addressBook.GSM_REGISTRY,
    modifiers: [
      {
        modifier: 'onlyOwner',
        addresses: [
          {
            address: gsmRegistryOwner,
            owners: await getSafeOwners(provider, gsmRegistryOwner),
            signersThreshold: await getSafeThreshold(
              provider,
              gsmRegistryOwner,
            ),
          },
        ],
        functions: roles['GSMRegistry']['onlyOwner'],
      },
    ],
  };

  const ghoStewardContract = getContract({ address: getAddress('0x8F2411a538381aae2b464499005F0211e867d84f'), abi: ghoStewardV2, client: provider });
  const ghoStewardOwner = await ghoStewardContract.read.owner() as Address;
  const riskCouncil = await ghoStewardContract.read.RISK_COUNCIL() as Address;

  obj['GhoStewardV2'] = {
    address: '0x8F2411a538381aae2b464499005F0211e867d84f',
    modifiers: [
      {
        modifier: 'onlyOwner',
        addresses: [
          {
            address: ghoStewardOwner,
            owners: await getSafeOwners(provider, ghoStewardOwner),
            signersThreshold: await getSafeThreshold(provider, ghoStewardOwner),
          },
        ],
        functions: roles['GhoStewardV2']['onlyOwner'],
      },
      {
        modifier: 'onlyRiskCouncil',
        addresses: [
          {
            address: riskCouncil,
            owners: await getSafeOwners(provider, riskCouncil),
            signersThreshold: await getSafeThreshold(provider, riskCouncil),
          },
        ],
        functions: roles['GhoStewardV2']['onlyRiskCouncil'],
      },
    ],
  };

  for (const [index, facilitator] of facilitators.entries()) {
    const facilitatorOwnableContract = getContract({ address: getAddress(facilitator), abi: IOwnable_ABI, client: provider });
    const facilitatorGuardianContract = getContract({ address: getAddress(facilitator), abi: IWithGuardian_ABI, client: provider });
    try {
      const facilitatorOwner = await facilitatorOwnableContract.read.owner() as Address;
      const facilitatorGuardian = await facilitatorGuardianContract.read.guardian() as Address;

      const proxyAdmin = await getProxyAdmin(
        facilitator,
        provider,
      );

      let facilitatorName = addresses[facilitator];
      if (!facilitatorName) {
        facilitatorName = `facilitator-${index}`;
      }

      obj[`${facilitatorName}`] = {
        address: facilitator,
        proxyAdmin,
        modifiers: [
          {
            modifier: 'onlyOwnerOrGuardian',
            addresses: [
              {
                address: facilitatorOwner,
                owners: await getSafeOwners(provider, facilitatorOwner),
                signersThreshold: await getSafeThreshold(provider, facilitatorOwner),
              },
              {
                address: facilitatorGuardian,
                owners: await getSafeOwners(provider, facilitatorGuardian),
                signersThreshold: await getSafeThreshold(provider, facilitatorGuardian),
              },
            ],
            functions: roles['Facilitator']['onlyOwnerOrGuardian'],
          },
          {
            modifier: 'onlyOwner',
            addresses: [
              {
                address: facilitatorOwner,
                owners: await getSafeOwners(provider, facilitatorOwner),
                signersThreshold: await getSafeThreshold(provider, facilitatorOwner),
              },
            ],
            functions: roles['Facilitator']['onlyOwner'],
          },
        ],
      };

      const proxyAdminContract = getContract({ address: getAddress(proxyAdmin), abi: IOwnable_ABI, client: provider });
      const proxyAdminOwner = await proxyAdminContract.read.owner() as Address;

      if (getAddress(proxyAdmin) !== getAddress('0xd3cf979e676265e4f6379749dece4708b9a22476')) { // this is aave proxy admin so no need to re-add
        obj[`${facilitatorName}-proxyAdmin`] = {
          address: proxyAdmin,
          modifiers: [
            {
              modifier: 'onlyOwner',
              addresses: [
                {
                  address: proxyAdminOwner,
                  owners: await getSafeOwners(provider, proxyAdminOwner),
                  signersThreshold: await getSafeThreshold(provider, proxyAdminOwner),
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

  if (addressBook.GHO_FLASHMINTER_FACILITATOR) {
    obj['GhoFlashMinter'] = {
      address: addressBook.GHO_FLASHMINTER_FACILITATOR,
      modifiers: [
        {
          modifier: 'onlyPoolAdmin',
          addresses: uniqueAddresses([
            ...poolRoles['POOL_ADMIN'].map((roleAddress) => {
              return {
                address: roleAddress,
                owners: poolOwners['POOL_ADMIN'][roleAddress].owners || [],
                signersThreshold:
                  poolOwners['POOL_ADMIN'][roleAddress].threshold || 0,
              };
            }),
          ]),
          functions: roles['GhoFlashMinter']['onlyPoolAdmin']
        },
      ],
    };
  }

  if (addressBook.GHO_AAVE_CORE_STEWARD) {
    const ghoAaveCoreStewardContract = getContract({ address: getAddress(addressBook.GHO_AAVE_CORE_STEWARD), abi: EDGE_RISK_STEWARD_CAPS_ABI, client: provider });
    const ghoAaveCoreStewardOwner = await ghoAaveCoreStewardContract.read.owner() as Address;
    const ghoAaveCoreStewardGuardian = await ghoAaveCoreStewardContract.read.RISK_COUNCIL() as Address;

    obj['GhoAaveSteward'] = {
      address: addressBook.GHO_AAVE_CORE_STEWARD,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: ghoAaveCoreStewardOwner,
              owners: await getSafeOwners(provider, ghoAaveCoreStewardOwner),
              signersThreshold: await getSafeThreshold(
                provider,
                ghoAaveCoreStewardOwner,
              ),
            },
          ],
          functions: roles['GhoAaveSteward']['onlyOwner'],
        },
        {
          modifier: 'onlyRiskCouncil',
          addresses: [
            {
              address: ghoAaveCoreStewardGuardian,
              owners: await getSafeOwners(provider, ghoAaveCoreStewardGuardian),
              signersThreshold: await getSafeThreshold(provider, ghoAaveCoreStewardGuardian),
            },
          ],
          functions: roles['GhoAaveSteward']['onlyRiskCouncil'],
        },
      ],
    };
  }


  return obj;
};
