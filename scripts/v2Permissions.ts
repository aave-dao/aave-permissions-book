import { Pools } from '../helpers/configs.js';
import { generateRoles } from '../helpers/jsonParsers.js';
import { poolAddressProviderAbi } from '../abis/lendingPoolAddressProviderAbi.js';
import { lendingPoolConfigurator } from '../abis/lendingPoolConfigurator.js';
import { onlyOwnerAbi } from '../abis/onlyOwnerAbi.js';
import { arcTimelockAbi } from '../abis/arcTimelockAbi.js';
import { AaveV2EthereumArc } from '@aave-dao/aave-address-book';
import { getProxyAdmin } from '../helpers/proxyAdmin.js';
import { ChainId } from '@bgd-labs/toolbox';
import { AddressBook, Contracts, PermissionsJson } from '../helpers/types.js';
import { Address, Client, getAddress, getContract, zeroAddress } from 'viem';
import { createOwnerResolver } from '../helpers/ownerResolver.js';

export const resolveV2Modifiers = async (
  addressBook: AddressBook,
  provider: Client,
  permissionsObject: PermissionsJson,
  pool: Pools,
  chainId: string,
): Promise<Contracts> => {
  const obj: Contracts = {};
  const roles = generateRoles(permissionsObject);

  // Create owner resolver with caching for this network
  const ownerResolver = createOwnerResolver(provider);

  const lendingPoolAddressesProvider = getContract({ address: getAddress(addressBook.POOL_ADDRESSES_PROVIDER), abi: poolAddressProviderAbi, client: provider });
  const lendingPoolAddressesProviderOwner: Address =
    await lendingPoolAddressesProvider.read.owner() as Address;
  const lendingRateOracleAddress: Address =
    await lendingPoolAddressesProvider.read.getLendingRateOracle() as Address;
  const poolAdmin: Address = await lendingPoolAddressesProvider.read.getPoolAdmin() as Address;

  const providerOwnerInfo = await ownerResolver.resolve(lendingPoolAddressesProviderOwner);

  obj['LendingPoolAddressesProvider'] = {
    address: addressBook.POOL_ADDRESSES_PROVIDER,
    modifiers: [
      {
        modifier: 'onlyOwner',
        addresses: [
          {
            address: lendingPoolAddressesProviderOwner,
            owners: providerOwnerInfo.owners,
            signersThreshold: providerOwnerInfo.threshold,
          },
        ],
        functions: roles['LendingPoolAddressesProvider']['onlyOwner'],
      },
    ],
  };

  obj['LendingPool'] = {
    address: addressBook.POOL,
    proxyAdmin: addressBook.POOL_ADDRESSES_PROVIDER,
    modifiers: [
      {
        modifier: 'onlyLendingPoolConfigurator',
        addresses: [
          {
            address: addressBook.POOL_CONFIGURATOR,
            owners: [],
          },
        ],
        functions: roles['LendingPool']['onlyLendingPoolConfigurator'],
      },
    ],
  };

  const lendingPoolConfiguratorContract = getContract({ address: getAddress(addressBook.POOL_ADDRESSES_PROVIDER), abi: lendingPoolConfigurator, client: provider });
  const poolConfiguratorAdmin: Address =
    await lendingPoolConfiguratorContract.read.getPoolAdmin() as Address;
  const emergencyAdminConfigurator: Address =
    await lendingPoolConfiguratorContract.read.getEmergencyAdmin() as Address;

  const poolConfiguratorAdminInfo = await ownerResolver.resolve(poolConfiguratorAdmin);
  const emergencyAdminInfo = await ownerResolver.resolve(emergencyAdminConfigurator);

  obj['LendingPoolConfigurator'] = {
    address: addressBook.POOL_CONFIGURATOR,
    proxyAdmin: addressBook.POOL_ADDRESSES_PROVIDER,
    modifiers: [
      {
        modifier: 'onlyPoolAdmin',
        addresses: [
          {
            address: poolConfiguratorAdmin,
            owners: poolConfiguratorAdminInfo.owners,
            signersThreshold: poolConfiguratorAdminInfo.threshold,
          },
        ],
        functions: roles['LendingPoolConfigurator']['onlyPoolAdmin'],
      },
      {
        modifier: 'onlyEmergencyAdmin',
        addresses: [
          {
            address: emergencyAdminConfigurator,
            owners: emergencyAdminInfo.owners,
            signersThreshold: emergencyAdminInfo.threshold,
          },
        ],
        functions: roles['LendingPoolConfigurator']['onlyEmergencyAdmin'],
      },
    ],
  };

  if (pool === Pools.V2) {
    obj['LendingPoolConfigurator'].modifiers.push({
      modifier: 'onlyPoolOrEmergencyAdmin',
      addresses: [
        {
          address: poolConfiguratorAdmin,
          owners: poolConfiguratorAdminInfo.owners,
          signersThreshold: poolConfiguratorAdminInfo.threshold,
        },
        {
          address: emergencyAdminConfigurator,
          owners: emergencyAdminInfo.owners,
          signersThreshold: emergencyAdminInfo.threshold,
        },
      ],
      functions: roles['LendingPoolConfigurator']['onlyPoolOrEmergencyAdmin'],
    });
  }

  // Proof of reserve contracts
  if (Number(chainId) === Number(ChainId.avalanche)) {
    const poolAdminInfo = await ownerResolver.resolve(poolAdmin);
    const porInfo = await ownerResolver.resolve(addressBook.PROOF_OF_RESERVE);

    obj['LendingPoolConfigurator'].modifiers.push({
      modifier: 'onlyPoolOrProofOfReserveAdmin',
      addresses: [
        {
          address: poolAdmin,
          owners: poolAdminInfo.owners,
          signersThreshold: poolAdminInfo.threshold,
        },
        {
          address: addressBook.PROOF_OF_RESERVE,
          owners: porInfo.owners,
          signersThreshold: porInfo.threshold,
        },
      ],
      functions:
        roles['LendingPoolConfigurator']['onlyPoolOrProofOfReserveAdmin'],
    });

    const porExecutorContract = getContract({ address: getAddress(addressBook.PROOF_OF_RESERVE), abi: onlyOwnerAbi, client: provider });
    const porExecutorOwner = await porExecutorContract.read.owner() as Address;
    const porExecutorOwnerInfo = await ownerResolver.resolve(porExecutorOwner);

    obj['ProofOfReserveExecutorV2'] = {
      address: addressBook.PROOF_OF_RESERVE,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: porExecutorOwner,
              owners: porExecutorOwnerInfo.owners,
              signersThreshold: porExecutorOwnerInfo.threshold,
            },
          ],
          functions: roles['ProofOfReserveExecutorV2']['onlyOwner'],
        },
      ],
    };

    const porAggregatorContract = getContract({ address: getAddress(addressBook.PROOF_OF_RESERVE_AGGREGATOR), abi: onlyOwnerAbi, client: provider });
    const porAggregatorOwner = await porAggregatorContract.read.owner() as Address;
    const porAggregatorOwnerInfo = await ownerResolver.resolve(porAggregatorOwner);

    obj['ProofOfReserveAggregatorV2'] = {
      address: addressBook.PROOF_OF_RESERVE_AGGREGATOR,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: porAggregatorOwner,
              owners: porAggregatorOwnerInfo.owners,
              signersThreshold: porAggregatorOwnerInfo.threshold,
            },
          ],
          functions: roles['ProofOfReserveAggregatorV2']['onlyOwner'],
        },
      ],
    };
  }

  const aaveOracle = getContract({ address: getAddress(addressBook.ORACLE), abi: onlyOwnerAbi, client: provider });
  const aaveOracleOwner = await aaveOracle.read.owner() as Address;
  const aaveOracleOwnerInfo = await ownerResolver.resolve(aaveOracleOwner);

  obj['AaveOracle'] = {
    address: addressBook.ORACLE,
    modifiers: [
      {
        modifier: 'onlyOwner',
        addresses: [
          {
            address: aaveOracleOwner,
            owners: aaveOracleOwnerInfo.owners,
            signersThreshold: aaveOracleOwnerInfo.threshold,
          },
        ],
        functions: roles['AaveOracle']['onlyOwner'],
      },
    ],
  };

  const lendingRateOracle = getContract({ address: getAddress(lendingRateOracleAddress), abi: onlyOwnerAbi, client: provider });
  const lendingRateOracleOwner = await lendingRateOracle.read.owner() as Address;
  const lendingRateOracleOwnerInfo = await ownerResolver.resolve(lendingRateOracleOwner);

  obj['LendingRateOracle'] = {
    address: lendingRateOracleAddress,
    modifiers: [
      {
        modifier: 'onlyOwner',
        addresses: [
          {
            address: lendingRateOracleOwner,
            owners: lendingRateOracleOwnerInfo.owners,
            signersThreshold: lendingRateOracleOwnerInfo.threshold,
          },
        ],
        functions: roles['LendingRateOracle']['onlyOwner'],
      },
    ],
  };

  const collectorProxyAdmin = await getProxyAdmin(
    addressBook.COLLECTOR,
    provider,
  );

  const proxyAdminContract = getContract({ address: getAddress(collectorProxyAdmin), abi: onlyOwnerAbi, client: provider });
  const proxyAdminOwner = await proxyAdminContract.read.owner() as Address;
  const proxyAdminOwnerInfo = await ownerResolver.resolve(proxyAdminOwner);

  obj['ProxyAdmin'] = {
    address: getAddress(collectorProxyAdmin),
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

  // extra contracts for arc
  if (pool === Pools.V2_ARC || pool === Pools.V2_ARC_TENDERLY) {
    const arcTimelock = getContract({ address: getAddress(poolAdmin), abi: arcTimelockAbi, client: provider });
    const governanceExecutor =
      await arcTimelock.read.getEthereumGovernanceExecutor() as Address;
    const arcTimelockGuardian = await arcTimelock.read.getGuardian() as Address;

    const govExecutorInfo = await ownerResolver.resolve(governanceExecutor);
    const arcTimelockGuardianInfo = await ownerResolver.resolve(arcTimelockGuardian);

    obj['ArcTimelock'] = {
      address: poolAdmin,
      modifiers: [
        {
          modifier: 'onlyEthereumGovernanceExecutor',
          addresses: [
            {
              address: governanceExecutor,
              owners: govExecutorInfo.owners,
              signersThreshold: govExecutorInfo.threshold,
            },
          ],
          functions: roles['ArcTimelock']['onlyEthereumGovernanceExecutor'],
        },
        {
          modifier: 'onlyGuardian',
          addresses: [
            {
              address: arcTimelockGuardian,
              owners: arcTimelockGuardianInfo.owners,
              signersThreshold: arcTimelockGuardianInfo.threshold,
            },
          ],
          functions: roles['ArcTimelock']['onlyGuardian'],
        },
      ],
    };

    const permissionManager = getContract({ address: getAddress(AaveV2EthereumArc.PERMISSION_MANAGER), abi: onlyOwnerAbi, client: provider });
    const permissionManagerOwner = await permissionManager.read.owner() as Address;
    const permissionManagerOwnerInfo = await ownerResolver.resolve(permissionManagerOwner);

    obj['PermissionManager'] = {
      address: AaveV2EthereumArc.PERMISSION_MANAGER,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: permissionManagerOwner,
              owners: permissionManagerOwnerInfo.owners,
              signersThreshold: permissionManagerOwnerInfo.threshold,
            },
          ],
          functions: roles['PermissionManager']['onlyOwner'],
        },
      ],
    };
  }

  if (pool !== Pools.V2_ARC && pool !== Pools.V2_ARC_TENDERLY) {
    const wethGatewayContract = getContract({ address: getAddress(addressBook.WETH_GATEWAY), abi: onlyOwnerAbi, client: provider });
    const wethGatewayOwner = await wethGatewayContract.read.owner() as Address;
    const wethGatewayOwnerInfo = await ownerResolver.resolve(wethGatewayOwner);

    obj['WrappedTokenGatewayV2'] = {
      address: addressBook.WETH_GATEWAY,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: wethGatewayOwner,
              owners: wethGatewayOwnerInfo.owners,
              signersThreshold: wethGatewayOwnerInfo.threshold,
            },
          ],
          functions: roles['WrappedTokenGatewayV2']['onlyOwner'],
        },
      ],
    };
  }

  if (
    pool !== Pools.V2_AMM &&
    pool !== Pools.V2_ARC &&
    pool !== Pools.V2_AMM_TENDERLY &&
    pool !== Pools.V2_ARC_TENDERLY
  ) {
    const paraswapLiquiditySwapContract = getContract({ address: getAddress(addressBook.SWAP_COLLATERAL_ADAPTER), abi: onlyOwnerAbi, client: provider });
    const liquiditySwapOwner = await paraswapLiquiditySwapContract.read.owner() as Address;
    const liquiditySwapOwnerInfo = await ownerResolver.resolve(liquiditySwapOwner);

    obj['ParaSwapLiquiditySwapAdapter'] = {
      address: addressBook.SWAP_COLLATERAL_ADAPTER,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: liquiditySwapOwner,
              owners: liquiditySwapOwnerInfo.owners,
              signersThreshold: liquiditySwapOwnerInfo.threshold,
            },
          ],
          functions: roles['ParaSwapLiquiditySwapAdapter']['onlyOwner'],
        },
      ],
    };

    const paraswapRepaySwapContract = getContract({ address: getAddress(addressBook.REPAY_WITH_COLLATERAL_ADAPTER), abi: onlyOwnerAbi, client: provider });
    const repaySwapOwner = await paraswapRepaySwapContract.read.owner() as Address;
    const repaySwapOwnerInfo = await ownerResolver.resolve(repaySwapOwner);

    obj['ParaSwapRepayAdapter'] = {
      address: addressBook.REPAY_WITH_COLLATERAL_ADAPTER,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: repaySwapOwner,
              owners: repaySwapOwnerInfo.owners,
              signersThreshold: repaySwapOwnerInfo.threshold,
            },
          ],
          functions: roles['ParaSwapRepayAdapter']['onlyOwner'],
        },
      ],
    };
  }

  if (pool !== Pools.V2_ARC && pool !== Pools.V2_ARC_TENDERLY) {
    const addressesRegistryContract = getContract({ address: getAddress(addressBook.POOL_ADDRESSES_PROVIDER_REGISTRY), abi: onlyOwnerAbi, client: provider });
    const addressRegistryOwner = await addressesRegistryContract.read.owner() as Address;
    const addressRegistryOwnerInfo = await ownerResolver.resolve(addressRegistryOwner);

    obj['LendingPoolAddressesProviderRegistry'] = {
      address: addressBook.POOL_ADDRESSES_PROVIDER_REGISTRY,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: addressRegistryOwner,
              owners: addressRegistryOwnerInfo.owners,
              signersThreshold: addressRegistryOwnerInfo.threshold,
            },
          ],
          functions: roles['LendingPoolAddressesProviderRegistry']['onlyOwner'],
        },
      ],
    };
  }

  // TODO: for now we use the first encountered as default
  if (
    addressBook.DEFAULT_INCENTIVES_CONTROLLER != undefined &&
    addressBook.DEFAULT_INCENTIVES_CONTROLLER !==
    zeroAddress
  ) {
    const emissionManagerInfo = await ownerResolver.resolve(addressBook.EMISSION_MANAGER);

    obj['DefaultIncentivesController'] = {
      address: addressBook.DEFAULT_INCENTIVES_CONTROLLER,
      modifiers: [
        {
          modifier: 'onlyEmissionManager',
          addresses: [
            {
              address: addressBook.EMISSION_MANAGER,
              owners: emissionManagerInfo.owners,
              signersThreshold: emissionManagerInfo.threshold,
            },
          ],
          functions:
            Number(chainId) === Number(ChainId.mainnet)
              ? roles['DefaultIncentivesController'][
                'onlyEmissionManager'
              ].filter((functionName) => functionName !== 'setRewardsVault')
              : roles['DefaultIncentivesController']['onlyEmissionManager'],
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
