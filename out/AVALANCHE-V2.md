# AVALANCHE 
## V2_TENDERLY 
### Contracts upgradeability
| contract |upgradeable by |
|----------|----------|
|  [LendingPoolAddressesProvider](https://snowtrace.io/address/0xb6A86025F0FE1862B372cb0ca18CE3EDe02A318f) |  not upgradeable | |--------|--------|
|  [LendingPool](https://snowtrace.io/address/0x4F01AeD16D97E3aB5ab2B501154DC9bb0F1A5A2C) |  Governance | |--------|--------|
|  [LendingPoolConfigurator](https://snowtrace.io/address/0x230B618aD4C475393A7239aE03630042281BD86e) |  Governance | |--------|--------|
|  [ProofOfReserveExecutorV2](https://snowtrace.io/address/0x7fc3FCb14eF04A48Bb0c12f0c39CD74C249c37d8) |  not upgradeable | |--------|--------|
|  [ProofOfReserveAggregatorV2](https://snowtrace.io/address/0x80f2c02224a2E548FC67c0bF705eBFA825dd5439) |  not upgradeable | |--------|--------|
|  [AaveOracle](https://snowtrace.io/address/0xdC336Cd4769f4cC7E9d726DA53e6d3fC710cEB89) |  not upgradeable | |--------|--------|
|  [LendingRateOracle](https://snowtrace.io/address/0xc34254642B504484465F38Cb1CC396d45a9c7c80) |  not upgradeable | |--------|--------|
|  [Collector](https://snowtrace.io/address/0x5ba7fd868c40c16f7aDfAe6CF87121E13FC2F7a0) |  Governance | |--------|--------|
|  [ProxyAdmin](https://snowtrace.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  not upgradeable | |--------|--------|
|  [WrappedTokenGatewayV2](https://snowtrace.io/address/0x68c815cB8C8390bc3F2CE99265044dEC9D350C49) |  not upgradeable | |--------|--------|
|  [ParaSwapLiquiditySwapAdapter](https://snowtrace.io/address/0x2EcF2a2e74B19Aab2a62312167aFF4B78E93B6C5) |  not upgradeable | |--------|--------|
|  [ParaSwapRepayAdapter](https://snowtrace.io/address/0x935b362EE3E1f342cc48118C528AAbee5118F6e6) |  not upgradeable | |--------|--------|
|  [LendingPoolAddressesProviderRegistry](https://snowtrace.io/address/0x4235E22d9C3f28DCDA82b58276cb6370B01265C2) |  not upgradeable | |--------|--------|
|  [DefaultIncentivesController](https://snowtrace.io/address/0x01D83Fe6A10D2f2B7AF17034343746188272cAc9) |  not upgradeable | |--------|--------|
|  Aave a/v/s tokens |  Governance | |--------|--------|

### Actions type
| type |can be executed by |
|----------|----------|
|  updateReserveBorrowSettings |  Governance | |--------|--------|
|  updateReserveSettings |  Governance | |--------|--------|
|  configureCollateral |  Governance | |--------|--------|
|  upgradeAaveTokens (a/v/s) |  Governance | |--------|--------|
|  upgradeAaveOracles |  Governance | |--------|--------|
|  reserveUpgradeability |  Governance | |--------|--------|
|  pausePool |  Multi-sig | |--------|--------|
|  reserveListing |  Governance | |--------|--------|
|  protocolUpgradeablity |  Governance | |--------|--------|
|  adiConfigurations |  Governance | |--------|--------|
|  retryAndInvalidateMessages |  Multi-sig,Governance | |--------|--------|
|  configureGovernance |  Governance | |--------|--------|

### Contracts
| contract |proxyAdmin |modifier |permission owner |functions |
|----------|----------|----------|----------|----------|
|  [LendingPoolAddressesProvider](https://snowtrace.io/address/0xb6A86025F0FE1862B372cb0ca18CE3EDe02A318f) |  - |  onlyOwner |  [Executor_lvl1](https://snowtrace.io/address/0x3C06dce358add17aAf230f2234bCCC4afd50d090) |  setMarketId, setAddressAsProxy, setAddress, setLendingPoolImpl, setLendingPoolConfiguratorImpl, setLendingPoolCollateralManager, setPoolAdmin, setEmergencyAdmin, setPriceOracle, setLendingRateOracle | |--------|--------|--------|--------|--------|
|  [LendingPool](https://snowtrace.io/address/0x4F01AeD16D97E3aB5ab2B501154DC9bb0F1A5A2C) |  [LendingPoolAddressesProvider](https://snowtrace.io/address/0xb6A86025F0FE1862B372cb0ca18CE3EDe02A318f) |  onlyLendingPoolConfigurator |  [LendingPoolConfigurator](https://snowtrace.io/address/0x230B618aD4C475393A7239aE03630042281BD86e) |  initReserve, setReserveInterestRateStrategyAddress, setConfiguration, setPause | |--------|--------|--------|--------|--------|
|  [LendingPoolConfigurator](https://snowtrace.io/address/0x230B618aD4C475393A7239aE03630042281BD86e) |  [LendingPoolAddressesProvider](https://snowtrace.io/address/0xb6A86025F0FE1862B372cb0ca18CE3EDe02A318f) |  onlyPoolAdmin |  [Executor_lvl1](https://snowtrace.io/address/0x3C06dce358add17aAf230f2234bCCC4afd50d090) |  initReserve, updateAToken, updateStableDebtToken, updateVariableDebtToken, enableBorrowingOnReserve, configureReserveAsCollateral, enableReserveStableRate, activateReserve, deactivateReserve, setReserveFactor, setReserveInterestRateStrategyAddress | |--------|--------|--------|--------|--------|
|  [LendingPoolConfigurator](https://snowtrace.io/address/0x230B618aD4C475393A7239aE03630042281BD86e) |  [LendingPoolAddressesProvider](https://snowtrace.io/address/0xb6A86025F0FE1862B372cb0ca18CE3EDe02A318f) |  onlyEmergencyAdmin |  [New Aave Guardian Avalanche](https://snowtrace.io/address/0x56C1a4b54921DEA9A344967a8693C7E661D72968) |  setPoolPause | |--------|--------|--------|--------|--------|
|  [LendingPoolConfigurator](https://snowtrace.io/address/0x230B618aD4C475393A7239aE03630042281BD86e) |  [LendingPoolAddressesProvider](https://snowtrace.io/address/0xb6A86025F0FE1862B372cb0ca18CE3EDe02A318f) |  onlyPoolOrEmergencyAdmin |  [Executor_lvl1](https://snowtrace.io/address/0x3C06dce358add17aAf230f2234bCCC4afd50d090), [New Aave Guardian Avalanche](https://snowtrace.io/address/0x56C1a4b54921DEA9A344967a8693C7E661D72968) |  unfreezeReserve | |--------|--------|--------|--------|--------|
|  [LendingPoolConfigurator](https://snowtrace.io/address/0x230B618aD4C475393A7239aE03630042281BD86e) |  [LendingPoolAddressesProvider](https://snowtrace.io/address/0xb6A86025F0FE1862B372cb0ca18CE3EDe02A318f) |  onlyPoolOrProofOfReserveAdmin |  [Executor_lvl1](https://snowtrace.io/address/0x3C06dce358add17aAf230f2234bCCC4afd50d090), [ProofOfReserveExecutorV2](https://snowtrace.io/address/0x7fc3FCb14eF04A48Bb0c12f0c39CD74C249c37d8) |  disableBorrowingOnReserve, disableReserveStableRate, freezeReserve | |--------|--------|--------|--------|--------|
|  [ProofOfReserveExecutorV2](https://snowtrace.io/address/0x7fc3FCb14eF04A48Bb0c12f0c39CD74C249c37d8) |  - |  onlyOwner |  [Executor_lvl1](https://snowtrace.io/address/0x3C06dce358add17aAf230f2234bCCC4afd50d090) |  enableAssets, disableAssets | |--------|--------|--------|--------|--------|
|  [ProofOfReserveAggregatorV2](https://snowtrace.io/address/0x80f2c02224a2E548FC67c0bF705eBFA825dd5439) |  - |  onlyOwner |  [Executor_lvl1](https://snowtrace.io/address/0x3C06dce358add17aAf230f2234bCCC4afd50d090) |  enableProofOfReserveFeed, enableProofOfReserveFeedWithBridgeWrapper, disableProofOfReserveFeed | |--------|--------|--------|--------|--------|
|  [AaveOracle](https://snowtrace.io/address/0xdC336Cd4769f4cC7E9d726DA53e6d3fC710cEB89) |  - |  onlyOwner |  [Executor_lvl1](https://snowtrace.io/address/0x3C06dce358add17aAf230f2234bCCC4afd50d090) |  setAssetSources, setFallbackOracle | |--------|--------|--------|--------|--------|
|  [LendingRateOracle](https://snowtrace.io/address/0xc34254642B504484465F38Cb1CC396d45a9c7c80) |  - |  onlyOwner |  [Executor_lvl1](https://snowtrace.io/address/0x3C06dce358add17aAf230f2234bCCC4afd50d090) |  setMarketBorrowRate | |--------|--------|--------|--------|--------|
|  [Collector](https://snowtrace.io/address/0x5ba7fd868c40c16f7aDfAe6CF87121E13FC2F7a0) |  [ProxyAdmin](https://snowtrace.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  onlyFundsAdmin |  [Executor_lvl1](https://snowtrace.io/address/0x3C06dce358add17aAf230f2234bCCC4afd50d090) |  approve, transfer, setFundsAdmin, createStream | |--------|--------|--------|--------|--------|
|  [Collector](https://snowtrace.io/address/0x5ba7fd868c40c16f7aDfAe6CF87121E13FC2F7a0) |  [ProxyAdmin](https://snowtrace.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  onlyAdminOrRecipient |  [ProxyAdmin](https://snowtrace.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476), [Executor_lvl1](https://snowtrace.io/address/0x3C06dce358add17aAf230f2234bCCC4afd50d090) |  withdrawFromStream, cancelStream | |--------|--------|--------|--------|--------|
|  [ProxyAdmin](https://snowtrace.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  - |  onlyOwner |  [Executor_lvl1](https://snowtrace.io/address/0x3C06dce358add17aAf230f2234bCCC4afd50d090) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|
|  [WrappedTokenGatewayV2](https://snowtrace.io/address/0x68c815cB8C8390bc3F2CE99265044dEC9D350C49) |  - |  onlyOwner |  [Executor_lvl1](https://snowtrace.io/address/0x3C06dce358add17aAf230f2234bCCC4afd50d090) |  emergencyTokenTransfer, emergencyEtherTransfer | |--------|--------|--------|--------|--------|
|  [ParaSwapLiquiditySwapAdapter](https://snowtrace.io/address/0x2EcF2a2e74B19Aab2a62312167aFF4B78E93B6C5) |  - |  onlyOwner |  [0x05182E579FDfCf69E4390c3411D8FeA1fb6467cf](https://snowtrace.io/address/0x05182E579FDfCf69E4390c3411D8FeA1fb6467cf) |  rescueTokens | |--------|--------|--------|--------|--------|
|  [ParaSwapRepayAdapter](https://snowtrace.io/address/0x935b362EE3E1f342cc48118C528AAbee5118F6e6) |  - |  onlyOwner |  [Executor_lvl1](https://snowtrace.io/address/0x3C06dce358add17aAf230f2234bCCC4afd50d090) |  rescueTokens | |--------|--------|--------|--------|--------|
|  [LendingPoolAddressesProviderRegistry](https://snowtrace.io/address/0x4235E22d9C3f28DCDA82b58276cb6370B01265C2) |  - |  onlyOwner |  [Executor_lvl1](https://snowtrace.io/address/0x3C06dce358add17aAf230f2234bCCC4afd50d090) |  registerAddressesProvider, unregisterAddressesProvider | |--------|--------|--------|--------|--------|
|  [DefaultIncentivesController](https://snowtrace.io/address/0x01D83Fe6A10D2f2B7AF17034343746188272cAc9) |  - |  onlyEmissionManager |  [Avalanche v2 incentives admin](https://snowtrace.io/address/0x5CfCd7E6D055Ba4f7B998914336254aDE3F69f26) |  setDistributionEnd, configureAssets, setClaimer, setRewardsVault | |--------|--------|--------|--------|--------|

### Guardians 
| Guardian |Threshold |Address |Owners |
|----------|----------|----------|----------|
|  [New Aave Guardian Avalanche](https://snowtrace.io/address/0x56C1a4b54921DEA9A344967a8693C7E661D72968) |  5/9 |  0x56C1a4b54921DEA9A344967a8693C7E661D72968 |  [0x5d49dBcdd300aECc2C311cFB56593E71c445d60d](https://snowtrace.io/address/0x5d49dBcdd300aECc2C311cFB56593E71c445d60d), [0xbA037E4746ff58c55dc8F27a328C428F258DDACb](https://snowtrace.io/address/0xbA037E4746ff58c55dc8F27a328C428F258DDACb), [0x818C277dBE886b934e60aa047250A73529E26A99](https://snowtrace.io/address/0x818C277dBE886b934e60aa047250A73529E26A99), [0x4f96743057482a2E10253AFDacDA3fd9CF2C1DC9](https://snowtrace.io/address/0x4f96743057482a2E10253AFDacDA3fd9CF2C1DC9), [0xb647055A9915bF9c8021a684E175A353525b9890](https://snowtrace.io/address/0xb647055A9915bF9c8021a684E175A353525b9890), [0x57ab7ee15cE5ECacB1aB84EE42D5A9d0d8112922](https://snowtrace.io/address/0x57ab7ee15cE5ECacB1aB84EE42D5A9d0d8112922), [0xC5bE5c0134857B4b96F45AA6f6B77DB96Ac1487e](https://snowtrace.io/address/0xC5bE5c0134857B4b96F45AA6f6B77DB96Ac1487e), [0xd4af2E86a27F8F77B0556E081F97B215C9cA8f2E](https://snowtrace.io/address/0xd4af2E86a27F8F77B0556E081F97B215C9cA8f2E), [0xf71fc92e2949ccF6A5Fd369a0b402ba80Bc61E02](https://snowtrace.io/address/0xf71fc92e2949ccF6A5Fd369a0b402ba80Bc61E02) | |--------|--------|--------|--------|
|  [Avalanche v2 incentives admin](https://snowtrace.io/address/0x5CfCd7E6D055Ba4f7B998914336254aDE3F69f26) |  0/3 |  0x5CfCd7E6D055Ba4f7B998914336254aDE3F69f26 |  [0xb87F46f6B7589B6a777be7230D19Beb0b6229aa1](https://snowtrace.io/address/0xb87F46f6B7589B6a777be7230D19Beb0b6229aa1), [0xfb1C51EEC9F0ADbb0ed5E8795aAc325eDC358149](https://snowtrace.io/address/0xfb1C51EEC9F0ADbb0ed5E8795aAc325eDC358149), [0xe79CA1B546774eEc2cd1e07cA6626eB2D435cdc7](https://snowtrace.io/address/0xe79CA1B546774eEc2cd1e07cA6626eB2D435cdc7) | |--------|--------|--------|--------|

