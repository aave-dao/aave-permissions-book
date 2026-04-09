import { onlyOwnerAbi } from '../abis/onlyOwnerAbi.js';
import { Pools } from '../helpers/configs.js';
import { generateRoles } from '../helpers/jsonParsers.js';
import { poolAddressProviderAbi } from '../abis/lendingPoolAddressProviderAbi.js';
import { getProxyAdmin } from '../helpers/proxyAdmin.js';
import { getSafeOwners, getSafeThreshold } from '../helpers/guardian.js';
import { ChainId } from '@bgd-labs/toolbox';
import {
  AddressBook,
  Contracts,
  EmissionAdminsByToken,
  PermissionsJson,
} from '../helpers/types.js';
import { capsPlusRiskStewardABI } from '../abis/capsPlusRiskSteward.js';
import { erc20Bridge } from '../abis/Erc20Bridge.js';
import { RISK_STEWARDS_ABI } from '../abis/riskStewards.js';
import { SVR_ORACLE_STEWARD_ABI } from '../abis/svrOracle.js';
import { EDGE_RISK_STEWARD_CAPS_ABI } from '../abis/edgeRiskStewardCaps.js';
import { POOL_EXPOSURE_STEWARD_ABI } from '../abis/poolExposureStewards.js';
import { Address, Client, getAddress, getContract, zeroAddress } from 'viem';
import { AAVE_STEWARD_INJECTOR_CAPS_ABI } from '../abis/aaveStewardInjectorCaps.js';
import { COLLECTOR_SWAP_STEWARD_ABI } from '../abis/collectorSwapSteward.js';
import { uniqueAddresses } from '../helpers/addressUtils.js';
import { createOwnerResolver } from '../helpers/ownerResolver.js';
import {
  resolveRiskCouncilContract,
  resolveAllRoleOwners,
  mapRoleAddresses,
  EDGE_STEWARD_CONFIGS,
} from '../helpers/contractResolvers.js';
import { getUniqueEmissionAdmins } from './emissionAdminPermissions.js';

export const resolveV3Modifiers = async (
  addressBook: any,
  provider: Client,
  permissionsObject: PermissionsJson,
  pool: Pools,
  chainId: typeof ChainId | number,
  adminRoles: Record<string, string[]>,
  emissionAdmins?: EmissionAdminsByToken,
): Promise<Contracts> => {
  const obj: Contracts = {};
  const roles = generateRoles(permissionsObject);

  // Create owner resolver with caching for this network
  const ownerResolver = createOwnerResolver(provider);

  // Resolve all role owners (with caching to avoid redundant RPC calls)
  const owners = await resolveAllRoleOwners(adminRoles, ownerResolver);

  const poolAddressesProvider = getContract({ address: getAddress(addressBook.POOL_ADDRESSES_PROVIDER), abi: poolAddressProviderAbi, client: provider });

  const poolAddressesProviderOwner = await poolAddressesProvider.read.owner() as Address;

  obj['PoolAddressesProvider'] = {
    address: addressBook.POOL_ADDRESSES_PROVIDER,
    modifiers: [
      {
        modifier: 'onlyOwner',
        addresses: [
          {
            address: poolAddressesProviderOwner,
            owners: await getSafeOwners(provider, poolAddressesProviderOwner),
            signersThreshold: await getSafeThreshold(
              provider,
              poolAddressesProviderOwner,
            ),
          },
        ],
        functions: roles['PoolAddressesProvider']['onlyOwner'],
      },
    ],
  };

  obj['Pool'] = {
    address: addressBook.POOL,
    proxyAdmin: addressBook.POOL_ADDRESSES_PROVIDER,
    modifiers: [
      {
        modifier: 'onlyPoolConfigurator',
        addresses: [{ address: addressBook.POOL_CONFIGURATOR, owners: [] }],
        functions: roles['Pool']['onlyPoolConfigurator'],
      },
      {
        modifier: 'onlyPoolAdmin',
        addresses: mapRoleAddresses('POOL_ADMIN', adminRoles, owners),
        functions: roles['Pool']['onlyPoolAdmin'],
      },
    ],
  };

  obj['PoolConfigurator'] = {
    address: addressBook.POOL_CONFIGURATOR,
    proxyAdmin: addressBook.POOL_ADDRESSES_PROVIDER,
    modifiers: [
      {
        modifier: 'onlyPoolAdmin',
        addresses: mapRoleAddresses('POOL_ADMIN', adminRoles, owners),
        functions: roles['PoolConfigurator']['onlyPoolAdmin'],
      },
      {
        modifier: 'onlyAssetListingOrPoolAdmins',
        addresses: uniqueAddresses([
          ...mapRoleAddresses('POOL_ADMIN', adminRoles, owners),
          ...mapRoleAddresses('ASSET_LISTING_ADMIN', adminRoles, owners),
        ]),
        functions: roles['PoolConfigurator']['onlyAssetListingOrPoolAdmins'],
      },
      {
        modifier: 'onlyRiskOrPoolAdmins',
        addresses: uniqueAddresses([
          ...mapRoleAddresses('POOL_ADMIN', adminRoles, owners),
          ...mapRoleAddresses('RISK_ADMIN', adminRoles, owners),
        ]),
        functions: roles['PoolConfigurator']['onlyRiskOrPoolAdmins'],
      },
      {
        modifier: 'onlyRiskOrPoolOrEmergencyAdmins',
        addresses: uniqueAddresses([
          ...mapRoleAddresses('POOL_ADMIN', adminRoles, owners),
          ...mapRoleAddresses('RISK_ADMIN', adminRoles, owners),
          ...mapRoleAddresses('EMERGENCY_ADMIN', adminRoles, owners),
        ]),
        functions: roles['PoolConfigurator']['onlyRiskOrPoolOrEmergencyAdmins'],
      },
      {
        modifier: 'onlyEmergencyOrPoolAdmin',
        addresses: uniqueAddresses([
          ...mapRoleAddresses('POOL_ADMIN', adminRoles, owners),
          ...mapRoleAddresses('EMERGENCY_ADMIN', adminRoles, owners),
        ]),
        functions: roles['PoolConfigurator']['onlyEmergencyOrPoolAdmin'],
      },
    ],
  };

  if (chainId === ChainId.avalanche) {
    const porExecutorContract = getContract({ address: getAddress(addressBook.PROOF_OF_RESERVE), abi: onlyOwnerAbi, client: provider });
    const porExecutorOwner = await porExecutorContract.read.owner() as Address;

    obj['ProofOfReserveExecutorV3'] = {
      address: addressBook.PROOF_OF_RESERVE,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: porExecutorOwner,
              owners: await getSafeOwners(provider, porExecutorOwner),
              signersThreshold: await getSafeThreshold(
                provider,
                porExecutorOwner,
              ),
            },
          ],
          functions: roles['ProofOfReserveExecutorV3']['onlyOwner'],
        },
      ],
    };

    const porAggregatorContract = getContract({ address: getAddress(addressBook.PROOF_OF_RESERVE_AGGREGATOR), abi: onlyOwnerAbi, client: provider });
    const porAggregatorOwner = await porAggregatorContract.read.owner() as Address;

    obj['ProofOfReserveAggregatorV3'] = {
      address: addressBook.PROOF_OF_RESERVE_AGGREGATOR,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: porAggregatorOwner,
              owners: await getSafeOwners(provider, porAggregatorOwner),
              signersThreshold: await getSafeThreshold(
                provider,
                porAggregatorOwner,
              ),
            },
          ],
          functions: roles['ProofOfReserveAggregatorV3']['onlyOwner'],
        },
      ],
    };
  }

  obj['AaveOracle'] = {
    address: addressBook.ORACLE,
    modifiers: [
      {
        modifier: 'onlyAssetListingOrPoolAdmins',
        addresses: uniqueAddresses([
          ...mapRoleAddresses('POOL_ADMIN', adminRoles, owners),
          ...mapRoleAddresses('ASSET_LISTING_ADMIN', adminRoles, owners),
        ]),
        functions: roles['AaveOracle']['onlyAssetListingOrPoolAdmins'],
      },
    ],
  };

  // for now, we use the same as practically there is only one rewards controller and emission manager
  // but could be that there is one of these for every token
  obj['RewardsController'] = {
    address: addressBook.DEFAULT_INCENTIVES_CONTROLLER,
    proxyAdmin: addressBook.POOL_ADDRESSES_PROVIDER,
    modifiers: [
      {
        modifier: 'onlyEmissionManager',
        addresses: [
          {
            address: addressBook.EMISSION_MANAGER,
            owners: await getSafeOwners(provider, addressBook.EMISSION_MANAGER),
            signersThreshold: await getSafeThreshold(
              provider,
              addressBook.EMISSION_MANAGER,
            ),
          },
        ],
        functions: roles['RewardsController']['onlyEmissionManager'],
      },
    ],
  };

  if (addressBook.WETH_GATEWAY) {
    const wethGatewayContract = getContract({ address: getAddress(addressBook.WETH_GATEWAY), abi: onlyOwnerAbi, client: provider });
    const wethGatewayOwner = await wethGatewayContract.read.owner() as Address;

    obj['WrappedTokenGatewayV3'] = {
      address: addressBook.WETH_GATEWAY,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: wethGatewayOwner,
              owners: await getSafeOwners(provider, wethGatewayOwner),
              signersThreshold: await getSafeThreshold(
                provider,
                wethGatewayOwner,
              ),
            },
          ],
          functions: roles['WrappedTokenGatewayV3']['onlyOwner'],
        },
      ],
    };
  }

  if (addressBook.SWAP_COLLATERAL_ADAPTER) {
    const paraswapLiquiditySwapContract = getContract({ address: getAddress(addressBook.SWAP_COLLATERAL_ADAPTER), abi: onlyOwnerAbi, client: provider });
    const liquiditySwapOwner = await paraswapLiquiditySwapContract.read.owner() as Address;

    obj['ParaSwapLiquiditySwapAdapter'] = {
      address: addressBook.SWAP_COLLATERAL_ADAPTER,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: liquiditySwapOwner,
              owners: await getSafeOwners(provider, liquiditySwapOwner),
              signersThreshold: await getSafeThreshold(
                provider,
                liquiditySwapOwner,
              ),
            },
          ],
          functions: roles['ParaSwapLiquiditySwapAdapter']['onlyOwner'],
        },
      ],
    };
  }

  if (addressBook.REPAY_WITH_COLLATERAL_ADAPTER) {
    const paraswapRepaySwapContract = getContract({ address: getAddress(addressBook.REPAY_WITH_COLLATERAL_ADAPTER), abi: onlyOwnerAbi, client: provider });
    const repaySwapOwner = await paraswapRepaySwapContract.read.owner() as Address;

    obj['ParaSwapRepayAdapter'] = {
      address: addressBook.REPAY_WITH_COLLATERAL_ADAPTER,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: repaySwapOwner,
              owners: await getSafeOwners(provider, repaySwapOwner),
              signersThreshold: await getSafeThreshold(
                provider,
                repaySwapOwner,
              ),
            },
          ],
          functions: roles['ParaSwapRepayAdapter']['onlyOwner'],
        },
      ],
    };
  }

  const emissionManagerContract = getContract({ address: getAddress(addressBook.EMISSION_MANAGER), abi: onlyOwnerAbi, client: provider });
  const emissionManagerOwner = await emissionManagerContract.read.owner() as Address;

  const emissionManagerModifiers = [
    {
      modifier: 'onlyOwner',
      addresses: [
        {
          address: emissionManagerOwner,
          owners: await getSafeOwners(provider, emissionManagerOwner),
          signersThreshold: await getSafeThreshold(
            provider,
            emissionManagerOwner,
          ),
        },
      ],
      functions: roles['EmissionManager']['onlyOwner'],
    },
  ];

  // Add onlyEmissionAdmin modifier with all unique emission admin addresses
  if (emissionAdmins && Object.keys(emissionAdmins).length > 0) {
    const uniqueAdmins = getUniqueEmissionAdmins(emissionAdmins);
    const adminAddresses = [];
    for (const admin of uniqueAdmins) {
      adminAddresses.push({
        address: admin,
        owners: await getSafeOwners(provider, admin),
        signersThreshold: await getSafeThreshold(provider, admin),
      });
    }
    emissionManagerModifiers.push({
      modifier: 'onlyEmissionAdmin',
      addresses: adminAddresses,
      functions: roles['EmissionManager']['onlyEmissionAdmin'],
    });
  }

  obj['EmissionManager'] = {
    address: addressBook.EMISSION_MANAGER,
    modifiers: emissionManagerModifiers,
  };

  const addressesRegistryContract = getContract({ address: getAddress(addressBook.POOL_ADDRESSES_PROVIDER_REGISTRY), abi: onlyOwnerAbi, client: provider });
  const addressRegistryOwner = await addressesRegistryContract.read.owner() as Address;

  obj['PoolAddressesProviderRegistry'] = {
    address: addressBook.POOL_ADDRESSES_PROVIDER_REGISTRY,
    modifiers: [
      {
        modifier: 'onlyOwner',
        addresses: [
          {
            address: addressRegistryOwner,
            owners: await getSafeOwners(provider, addressRegistryOwner),
            signersThreshold: await getSafeThreshold(
              provider,
              addressRegistryOwner,
            ),
          },
        ],
        functions: roles['PoolAddressesProviderRegistry']['onlyOwner'],
      },
    ],
  };

  if (addressBook.RATES_FACTORY) {
    obj['RatesFactory'] = {
      address: addressBook.RATES_FACTORY,
      modifiers: [],
    };
  }


  if (addressBook.PROXY_ADMIN) {
    const proxyAdminContract = getContract({ address: getAddress(addressBook.PROXY_ADMIN), abi: onlyOwnerAbi, client: provider });
    const proxyAdminOwner = await proxyAdminContract.read.owner() as Address;

    obj['ProxyAdmin'] = {
      address: addressBook.PROXY_ADMIN,
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

  if (addressBook.PROXY_ADMIN_LONG) {
    const proxyAdminLongContract = getContract({ address: getAddress(addressBook.PROXY_ADMIN_LONG), abi: onlyOwnerAbi, client: provider });
    const proxyAdminLongOwner = await proxyAdminLongContract.read.owner() as Address;

    obj['ProxyAdminLong'] = {
      address: addressBook.PROXY_ADMIN_LONG,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: proxyAdminLongOwner,
              owners: await getSafeOwners(provider, proxyAdminLongOwner),
              signersThreshold: await getSafeThreshold(
                provider,
                proxyAdminLongOwner,
              ),
            },
          ],
          functions: roles['ProxyAdmin']['onlyOwner'],
        },
      ],
    };
  }

  obj['ACLManager'] = {
    address: addressBook.ACL_MANAGER,
    modifiers: [
      {
        modifier: 'onlyRole',
        addresses: mapRoleAddresses('DEFAULT_ADMIN', adminRoles, owners),
        functions: roles['ACLManager']['onlyRole'],
      },
    ],
  };

  if (addressBook.CAPS_PLUS_RISK_STEWARD) {
    const riskStewardContract = getContract({ address: getAddress(addressBook.CAPS_PLUS_RISK_STEWARD), abi: capsPlusRiskStewardABI, client: provider });
    const riskCouncil = await riskStewardContract.read.RISK_COUNCIL() as Address;
    obj['CapPlusRiskSteward'] = {
      address: addressBook.CAPS_PLUS_RISK_STEWARD,
      modifiers: [
        {
          modifier: 'onlyRiskCouncil',
          addresses: [
            {
              address: riskCouncil,
              owners: await getSafeOwners(provider, riskCouncil),
              signersThreshold: await getSafeThreshold(provider, riskCouncil),
            },
          ],
          functions: roles['CapPlusRiskSteward']['onlyRiskCouncil'],
        },
      ],
    };
  }

  if (addressBook.FREEZING_STEWARD) {
    obj['FreezeSteward'] = {
      address: addressBook.FREEZING_STEWARD,
      modifiers: [
        {
          modifier: 'onlyEmergencyAdmin',
          addresses: mapRoleAddresses('EMERGENCY_ADMIN', adminRoles, owners),
          functions: roles['FreezeSteward']['onlyEmergencyAdmin'],
        },
      ],
    };
  }

  if (addressBook.AAVE_MERKLE_DISTRIBUTOR) {
    const merkleDistributorContract = getContract({ address: getAddress(addressBook.AAVE_MERKLE_DISTRIBUTOR), abi: onlyOwnerAbi, client: provider });
    const merkleDistributorOwner = await merkleDistributorContract.read.owner() as Address;

    obj['AaveMerkleDistributor'] = {
      address: addressBook.AAVE_MERKLE_DISTRIBUTOR,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: merkleDistributorOwner,
              owners: await getSafeOwners(provider, merkleDistributorOwner),
              signersThreshold: await getSafeThreshold(
                provider,
                merkleDistributorOwner,
              ),
            },
          ],
          functions: roles['AaveMerkleDistributor']['onlyOwner'],
        },
      ],
    };
  }

  if (addressBook.SVR_STEWARD) {
    const svrOracleStewardContract = getContract({ address: getAddress(addressBook.SVR_STEWARD), abi: SVR_ORACLE_STEWARD_ABI, client: provider });
    const svrOwner = await svrOracleStewardContract.read.owner() as Address;
    const svrGuardian = await svrOracleStewardContract.read.guardian() as Address;

    obj['SvrOracleSteward'] = {
      address: addressBook.SVR_STEWARD,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: svrOwner,
              owners: await getSafeOwners(provider, svrOwner),
              signersThreshold: await getSafeThreshold(
                provider,
                svrOwner,
              ),
            },
          ],
          functions: roles['SvrOracleSteward']['onlyOwner'],
        },
        {
          modifier: 'onlyGuardian',
          addresses: [
            {
              address: svrGuardian,
              owners: await getSafeOwners(provider, svrGuardian),
              signersThreshold: await getSafeThreshold(
                provider,
                svrGuardian,
              ),
            },
          ],
          functions: roles['SvrOracleSteward']['onlyGuardian'],
        },
      ],
    };
  }

  // Edge Risk Stewards - all use same pattern (owner + RISK_COUNCIL)
  for (const config of EDGE_STEWARD_CONFIGS) {
    const address = addressBook[config.addressKey];
    if (address) {
      const result = await resolveRiskCouncilContract(
        config.contractName,
        config.contractName,
        address,
        provider,
        ownerResolver,
        roles,
        EDGE_RISK_STEWARD_CAPS_ABI,
      );
      if (result) {
        obj[config.contractName] = result;
      }
    }
  }

  if (addressBook.EDGE_INJECTOR_PENDLE_EMODE) {
    const aaveEdgeInjectorPendleEModeContract = getContract({ address: getAddress(addressBook.EDGE_INJECTOR_PENDLE_EMODE), abi: AAVE_STEWARD_INJECTOR_CAPS_ABI, client: provider });
    const aaveEdgeInjectorPendleEModeOwner = await aaveEdgeInjectorPendleEModeContract.read.owner() as Address;
    const aaveEdgeInjectorPendleEModeGuardian = await aaveEdgeInjectorPendleEModeContract.read.guardian() as Address;
    obj['EdgeInjectorPendleEMode'] = {
      address: addressBook.EDGE_INJECTOR_PENDLE_EMODE,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: aaveEdgeInjectorPendleEModeOwner,
              owners: await getSafeOwners(provider, aaveEdgeInjectorPendleEModeOwner),
              signersThreshold: await getSafeThreshold(
                provider,
                aaveEdgeInjectorPendleEModeOwner,
              ),
            },
          ],
          functions: roles['EdgeInjectorPendleEMode']['onlyOwner'],
        },
        {
          modifier: 'onlyOwnerOrGuardian',
          addresses: [
            {
              address: aaveEdgeInjectorPendleEModeGuardian,
              owners: await getSafeOwners(provider, aaveEdgeInjectorPendleEModeGuardian),
              signersThreshold: await getSafeThreshold(provider, aaveEdgeInjectorPendleEModeGuardian),
            },
            {
              address: aaveEdgeInjectorPendleEModeOwner,
              owners: await getSafeOwners(provider, aaveEdgeInjectorPendleEModeOwner),
              signersThreshold: await getSafeThreshold(provider, aaveEdgeInjectorPendleEModeOwner),
            },
          ],
          functions: roles['EdgeInjectorPendleEMode']['onlyOwnerOrGuardian'],
        },
      ],
    };
  }
  if (addressBook.EDGE_INJECTOR_DISCOUNT_RATE) {
    const aaveEdgeInjectorDiscountRateContract = getContract({ address: getAddress(addressBook.EDGE_INJECTOR_DISCOUNT_RATE), abi: AAVE_STEWARD_INJECTOR_CAPS_ABI, client: provider });
    const aaveEdgeInjectorDiscountRateOwner = await aaveEdgeInjectorDiscountRateContract.read.owner() as Address;
    const aaveEdgeInjectorDiscountRateGuardian = await aaveEdgeInjectorDiscountRateContract.read.guardian() as Address;
    obj['EdgeInjectorDiscountRate'] = {
      address: addressBook.EDGE_INJECTOR_DISCOUNT_RATE,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: aaveEdgeInjectorDiscountRateOwner,
              owners: await getSafeOwners(provider, aaveEdgeInjectorDiscountRateOwner),
              signersThreshold: await getSafeThreshold(
                provider,
                aaveEdgeInjectorDiscountRateOwner,
              ),
            },
          ],
          functions: roles['EdgeInjectorDiscountRate']['onlyOwner'],
        },
        {
          modifier: 'onlyOwnerOrGuardian',
          addresses: [
            {
              address: aaveEdgeInjectorDiscountRateGuardian,
              owners: await getSafeOwners(provider, aaveEdgeInjectorDiscountRateGuardian),
              signersThreshold: await getSafeThreshold(provider, aaveEdgeInjectorDiscountRateGuardian),
            },
            {
              address: aaveEdgeInjectorDiscountRateOwner,
              owners: await getSafeOwners(provider, aaveEdgeInjectorDiscountRateOwner),
              signersThreshold: await getSafeThreshold(provider, aaveEdgeInjectorDiscountRateOwner),
            },
          ],
          functions: roles['EdgeInjectorDiscountRate']['onlyOwnerOrGuardian'],
        },
      ],
    };
  }
  if (addressBook.EDGE_INJECTOR_RATES) {
    const aaveEdgeInjectorRatesContract = getContract({ address: getAddress(addressBook.EDGE_INJECTOR_RATES), abi: AAVE_STEWARD_INJECTOR_CAPS_ABI, client: provider });
    const aaveEdgeInjectorRatesOwner = await aaveEdgeInjectorRatesContract.read.owner() as Address;
    let aaveEdgeInjectorRatesGuardian;
    try {

      aaveEdgeInjectorRatesGuardian = await aaveEdgeInjectorRatesContract.read.guardian() as Address;
    } catch (error) {
      aaveEdgeInjectorRatesGuardian = zeroAddress;
      console.log(`EdgeInjectorRates guardian not found for network: ${chainId} and address: ${addressBook.EDGE_INJECTOR_RATES}`);
    }
    if (aaveEdgeInjectorRatesGuardian) {
      obj['EdgeInjectorRates'] = {
        address: addressBook.EDGE_INJECTOR_RATES,
        modifiers: [
          {
            modifier: 'onlyOwner',
            addresses: [
              {
                address: aaveEdgeInjectorRatesOwner,
                owners: await getSafeOwners(provider, aaveEdgeInjectorRatesOwner),
                signersThreshold: await getSafeThreshold(
                  provider,
                  aaveEdgeInjectorRatesOwner,
                ),
              },
            ],
            functions: roles['EdgeInjectorRates']['onlyOwner'],
          },
          {
            modifier: 'onlyOwnerOrGuardian',
            addresses: [
              // Only add guardian if it's not zero address
              ...(aaveEdgeInjectorRatesGuardian !== zeroAddress ? [{
                address: aaveEdgeInjectorRatesGuardian,
                owners: await getSafeOwners(provider, aaveEdgeInjectorRatesGuardian),
                signersThreshold: await getSafeThreshold(provider, aaveEdgeInjectorRatesGuardian),
              }] : []),
              {
                address: aaveEdgeInjectorRatesOwner,
                owners: await getSafeOwners(provider, aaveEdgeInjectorRatesOwner),
                signersThreshold: await getSafeThreshold(provider, aaveEdgeInjectorRatesOwner),
              },
            ],
            functions: roles['EdgeInjectorRates']['onlyOwnerOrGuardian'],
          },
        ],
      };
    }
  }

  if (addressBook.EDGE_INJECTOR_CAPS) {
    const aaveStewardInjectorCapsContract = getContract({ address: getAddress(addressBook.EDGE_INJECTOR_CAPS), abi: AAVE_STEWARD_INJECTOR_CAPS_ABI, client: provider });
    const aaveStewardInjectorOwner = await aaveStewardInjectorCapsContract.read.owner() as Address;
    const aaveStewardInjectorGuardian = await aaveStewardInjectorCapsContract.read.guardian() as Address;

    obj['AaveStewardInjectorCaps'] = {
      address: addressBook.EDGE_INJECTOR_CAPS,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: aaveStewardInjectorOwner,
              owners: await getSafeOwners(provider, aaveStewardInjectorOwner),
              signersThreshold: await getSafeThreshold(
                provider,
                aaveStewardInjectorOwner,
              ),
            },
          ],
          functions: roles['AaveStewardInjectorCaps']['onlyOwner'],
        },
        {
          modifier: 'onlyOwnerOrGuardian',
          addresses: [
            {
              address: aaveStewardInjectorGuardian,
              owners: await getSafeOwners(provider, aaveStewardInjectorGuardian),
              signersThreshold: await getSafeThreshold(provider, aaveStewardInjectorGuardian),
            },
            {
              address: aaveStewardInjectorOwner,
              owners: await getSafeOwners(provider, aaveStewardInjectorOwner),
              signersThreshold: await getSafeThreshold(provider, aaveStewardInjectorOwner),
            },
          ],
          functions: roles['AaveStewardInjectorCaps']['onlyOwnerOrGuardian'],
        },
      ],
    };
  }

  if (addressBook.POOL_EXPOSURE_STEWARD) {
    const poolExposureStewardContract = getContract({ address: getAddress(addressBook.POOL_EXPOSURE_STEWARD), abi: POOL_EXPOSURE_STEWARD_ABI, client: provider });
    const poolExposureStewardOwner = await poolExposureStewardContract.read.owner() as Address;
    const poolExposureStewardGuardian = await poolExposureStewardContract.read.guardian() as Address;

    obj['PoolExposureSteward'] = {
      address: addressBook.POOL_EXPOSURE_STEWARD,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: poolExposureStewardOwner,
              owners: await getSafeOwners(provider, poolExposureStewardOwner),
              signersThreshold: await getSafeThreshold(
                provider,
                poolExposureStewardOwner,
              ),
            },
          ],
          functions: roles['PoolExposureSteward']['onlyOwner'],
        },
        {
          modifier: 'onlyOwnerOrGuardian',
          addresses: [
            {
              address: poolExposureStewardGuardian,
              owners: await getSafeOwners(provider, poolExposureStewardGuardian),
              signersThreshold: await getSafeThreshold(provider, poolExposureStewardGuardian),
            },
            {
              address: poolExposureStewardOwner,
              owners: await getSafeOwners(provider, poolExposureStewardOwner),
              signersThreshold: await getSafeThreshold(provider, poolExposureStewardOwner),
            },
          ],
          functions: roles['PoolExposureSteward']['onlyOwnerOrGuardian'],
        },
      ],
    };
  }

  if (addressBook.AAVE_POL_ETH_BRIDGE) {
    const polEthBridgeContract = getContract({ address: getAddress(addressBook.AAVE_POL_ETH_BRIDGE), abi: erc20Bridge, client: provider });
    const polEthBridgeOwner = await polEthBridgeContract.read.owner() as Address;
    const polEthBridgeRescuer = await polEthBridgeContract.read.whoCanRescue() as Address;

    obj['AavePolEthBridge'] = {
      address: addressBook.AAVE_POL_ETH_BRIDGE,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: polEthBridgeOwner,
              owners: await getSafeOwners(provider, polEthBridgeOwner),
              signersThreshold: await getSafeThreshold(
                provider,
                polEthBridgeOwner,
              ),
            },
          ],
          functions: roles['AavePolEthBridge']['onlyOwner'],
        },
        {
          modifier: 'onlyRescueGuardian',
          addresses: [
            {
              address: polEthBridgeRescuer,
              owners: await getSafeOwners(provider, polEthBridgeRescuer),
              signersThreshold: await getSafeThreshold(
                provider,
                polEthBridgeRescuer,
              ),
            },
          ],
          functions: roles['AavePolEthBridge']['onlyRescueGuardian'],
        },
      ],
    };
  }

  if (addressBook.RISK_STEWARD) {
    const riskStewardsContract = getContract({ address: getAddress(addressBook.RISK_STEWARD), abi: RISK_STEWARDS_ABI, client: provider });
    const riskOwner = await riskStewardsContract.read.owner() as Address;
    const riskCouncil = await riskStewardsContract.read.RISK_COUNCIL() as Address;

    obj['Manual AGRS'] = {
      address: addressBook.RISK_STEWARD,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: riskOwner,
              owners: await getSafeOwners(provider, riskOwner),
              signersThreshold: await getSafeThreshold(provider, riskOwner),
            },
          ],
          functions: roles['Manual_AGRS']['onlyOwner'],
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
          functions: roles['Manual_AGRS']['onlyRiskCouncil'],
        },
      ],
    };
  }

  if (addressBook.COLLECTOR_SWAP_STEWARD) {
    const collectorSwapStewardContract = getContract({ address: getAddress(addressBook.COLLECTOR_SWAP_STEWARD), abi: COLLECTOR_SWAP_STEWARD_ABI, client: provider });
    const collectorSwapStewardOwner = await collectorSwapStewardContract.read.owner() as Address;
    const collectorSwapStewardGuardian = await collectorSwapStewardContract.read.guardian() as Address;

    obj['CollectorSwapSteward'] = {
      address: addressBook.COLLECTOR_SWAP_STEWARD,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: collectorSwapStewardOwner,
              owners: await getSafeOwners(provider, collectorSwapStewardOwner),
              signersThreshold: await getSafeThreshold(provider, collectorSwapStewardOwner),
            },
          ],
          functions: roles['CollectorSwapSteward']['onlyOwner'],
        },
        {
          modifier: 'onlyOwnerOrGuardian',
          addresses: [
            {
              address: collectorSwapStewardGuardian,
              owners: await getSafeOwners(provider, collectorSwapStewardGuardian),
              signersThreshold: await getSafeThreshold(provider, collectorSwapStewardGuardian),
            },
            {
              address: collectorSwapStewardOwner,
              owners: await getSafeOwners(provider, collectorSwapStewardOwner),
              signersThreshold: await getSafeThreshold(provider, collectorSwapStewardOwner),
            },
          ],
          functions: roles['CollectorSwapSteward']['onlyOwnerOrGuardian'],
        },
      ],
    };
  }

  // add proxy admins
  const proxyAdminContracts: string[] = permissionsObject
    .filter((contract) => contract.proxyAdmin)
    .map((contract) => contract.contract);
  for (let i = 0; i < proxyAdminContracts.length; i++) {
    if (obj[proxyAdminContracts[i]]) {
      obj[proxyAdminContracts[i]]['proxyAdmin'] = await getProxyAdmin(
        obj[proxyAdminContracts[i]].address,
        provider,
      );
    }
  }

  return obj;
};
