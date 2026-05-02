# POLYGON 
## V2 
### Contracts upgradeability
| contract |upgradeable by |
|----------|----------|
|  [LendingPoolAddressesProvider](https://polygonscan.com/address/0xd05e3E715d945B59290df0ae8eF85c1BdB684744) |  not upgradeable | |--------|--------|
|  [LendingPool](https://polygonscan.com/address/0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf) |  Governance | |--------|--------|
|  [LendingPoolConfigurator](https://polygonscan.com/address/0x26db2B833021583566323E3b8985999981b9F1F3) |  Governance | |--------|--------|
|  [AaveOracle](https://polygonscan.com/address/0x0229F777B0fAb107F9591a41d5F02E4e98dB6f2d) |  not upgradeable | |--------|--------|
|  [LendingRateOracle](https://polygonscan.com/address/0x17F73aEaD876CC4059089ff815EDA37052960dFB) |  not upgradeable | |--------|--------|
|  [ProxyAdmin](https://polygonscan.com/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  not upgradeable | |--------|--------|
|  [WrappedTokenGatewayV2](https://polygonscan.com/address/0xf1e6d4347105138B51E2bacA9A22fA228309ebB1) |  not upgradeable | |--------|--------|
|  [ParaSwapLiquiditySwapAdapter](https://polygonscan.com/address/0x35784a624D4FfBC3594f4d16fA3801FeF063241c) |  not upgradeable | |--------|--------|
|  [ParaSwapRepayAdapter](https://polygonscan.com/address/0x6D49dC81a1f07a6B1902DC79bc2D408cb9D555d1) |  not upgradeable | |--------|--------|
|  [LendingPoolAddressesProviderRegistry](https://polygonscan.com/address/0x3ac4e9aa29940770aeC38fe853a4bbabb2dA9C19) |  not upgradeable | |--------|--------|
|  [DefaultIncentivesController](https://polygonscan.com/address/0x357D51124f59836DeD84c8a1730D72B749d8BC23) |  not upgradeable | |--------|--------|
|  [Collector](https://polygonscan.com/address/0xe8599F3cc5D38a9aD6F3684cd5CEa72f10Dbc383) |  Governance | |--------|--------|
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
|  [LendingPoolAddressesProvider](https://polygonscan.com/address/0xd05e3E715d945B59290df0ae8eF85c1BdB684744) |  - |  onlyOwner |  [Executor_lvl1](https://polygonscan.com/address/0xDf7d0e6454DB638881302729F5ba99936EaAB233) |  setMarketId, setAddressAsProxy, setAddress, setLendingPoolImpl, setLendingPoolConfiguratorImpl, setLendingPoolCollateralManager, setPoolAdmin, setEmergencyAdmin, setPriceOracle, setLendingRateOracle | |--------|--------|--------|--------|--------|
|  [LendingPool](https://polygonscan.com/address/0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf) |  [LendingPoolAddressesProvider](https://polygonscan.com/address/0xd05e3E715d945B59290df0ae8eF85c1BdB684744) |  onlyLendingPoolConfigurator |  [LendingPoolConfigurator](https://polygonscan.com/address/0x26db2B833021583566323E3b8985999981b9F1F3) |  initReserve, setReserveInterestRateStrategyAddress, setConfiguration, setPause | |--------|--------|--------|--------|--------|
|  [LendingPoolConfigurator](https://polygonscan.com/address/0x26db2B833021583566323E3b8985999981b9F1F3) |  [LendingPoolAddressesProvider](https://polygonscan.com/address/0xd05e3E715d945B59290df0ae8eF85c1BdB684744) |  onlyPoolAdmin |  [Executor_lvl1](https://polygonscan.com/address/0xDf7d0e6454DB638881302729F5ba99936EaAB233) |  initReserve, updateAToken, updateStableDebtToken, updateVariableDebtToken, enableBorrowingOnReserve, configureReserveAsCollateral, enableReserveStableRate, activateReserve, deactivateReserve, setReserveFactor, setReserveInterestRateStrategyAddress | |--------|--------|--------|--------|--------|
|  [LendingPoolConfigurator](https://polygonscan.com/address/0x26db2B833021583566323E3b8985999981b9F1F3) |  [LendingPoolAddressesProvider](https://polygonscan.com/address/0xd05e3E715d945B59290df0ae8eF85c1BdB684744) |  onlyEmergencyAdmin |  [Aave Protocol Guardian Polygon](https://polygonscan.com/address/0xCb45E82419baeBCC9bA8b1e5c7858e48A3B26Ea6) |  setPoolPause | |--------|--------|--------|--------|--------|
|  [LendingPoolConfigurator](https://polygonscan.com/address/0x26db2B833021583566323E3b8985999981b9F1F3) |  [LendingPoolAddressesProvider](https://polygonscan.com/address/0xd05e3E715d945B59290df0ae8eF85c1BdB684744) |  onlyPoolOrEmergencyAdmin |  [Executor_lvl1](https://polygonscan.com/address/0xDf7d0e6454DB638881302729F5ba99936EaAB233), [Aave Protocol Guardian Polygon](https://polygonscan.com/address/0xCb45E82419baeBCC9bA8b1e5c7858e48A3B26Ea6) |  unfreezeReserve | |--------|--------|--------|--------|--------|
|  [AaveOracle](https://polygonscan.com/address/0x0229F777B0fAb107F9591a41d5F02E4e98dB6f2d) |  - |  onlyOwner |  [Executor_lvl1](https://polygonscan.com/address/0xDf7d0e6454DB638881302729F5ba99936EaAB233) |  setAssetSources, setFallbackOracle | |--------|--------|--------|--------|--------|
|  [LendingRateOracle](https://polygonscan.com/address/0x17F73aEaD876CC4059089ff815EDA37052960dFB) |  - |  onlyOwner |  [Executor_lvl1](https://polygonscan.com/address/0xDf7d0e6454DB638881302729F5ba99936EaAB233) |  setMarketBorrowRate | |--------|--------|--------|--------|--------|
|  [ProxyAdmin](https://polygonscan.com/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  - |  onlyOwner |  [Executor_lvl1](https://polygonscan.com/address/0xDf7d0e6454DB638881302729F5ba99936EaAB233) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|
|  [WrappedTokenGatewayV2](https://polygonscan.com/address/0xf1e6d4347105138B51E2bacA9A22fA228309ebB1) |  - |  onlyOwner |  [Executor_lvl1](https://polygonscan.com/address/0xDf7d0e6454DB638881302729F5ba99936EaAB233) |  emergencyTokenTransfer, emergencyEtherTransfer | |--------|--------|--------|--------|--------|
|  [ParaSwapLiquiditySwapAdapter](https://polygonscan.com/address/0x35784a624D4FfBC3594f4d16fA3801FeF063241c) |  - |  onlyOwner |  [Executor_lvl1](https://polygonscan.com/address/0xDf7d0e6454DB638881302729F5ba99936EaAB233) |  rescueTokens | |--------|--------|--------|--------|--------|
|  [ParaSwapRepayAdapter](https://polygonscan.com/address/0x6D49dC81a1f07a6B1902DC79bc2D408cb9D555d1) |  - |  onlyOwner |  [Executor_lvl1](https://polygonscan.com/address/0xDf7d0e6454DB638881302729F5ba99936EaAB233) |  rescueTokens | |--------|--------|--------|--------|--------|
|  [LendingPoolAddressesProviderRegistry](https://polygonscan.com/address/0x3ac4e9aa29940770aeC38fe853a4bbabb2dA9C19) |  - |  onlyOwner |  [Executor_lvl1](https://polygonscan.com/address/0xDf7d0e6454DB638881302729F5ba99936EaAB233) |  registerAddressesProvider, unregisterAddressesProvider | |--------|--------|--------|--------|--------|
|  [DefaultIncentivesController](https://polygonscan.com/address/0x357D51124f59836DeD84c8a1730D72B749d8BC23) |  - |  onlyEmissionManager |  [Polygon v2 incentives admin](https://polygonscan.com/address/0x2bB25175d9B0F8965780209EB558Cc3b56cA6d32) |  setDistributionEnd, configureAssets, setClaimer, setRewardsVault | |--------|--------|--------|--------|--------|
|  [Collector](https://polygonscan.com/address/0xe8599F3cc5D38a9aD6F3684cd5CEa72f10Dbc383) |  [ProxyAdmin](https://polygonscan.com/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  onlyFundsAdmin |  [Executor_lvl1](https://polygonscan.com/address/0xDf7d0e6454DB638881302729F5ba99936EaAB233), [ClinicSteward](https://polygonscan.com/address/0x476B3D5509f600cC377Ab86658b623337Fc6A717), [PoolExposureSteward](https://polygonscan.com/address/0xE5b11ab4D36E58C9171e3DB98Ba17336606Cd6ef), [ClinicStewardV2](https://polygonscan.com/address/0xF93b565c96446afdf8C3D37E6B4781D5d5EDef1C) |  approve, transfer, setFundsAdmin, createStream | |--------|--------|--------|--------|--------|
|  [Collector](https://polygonscan.com/address/0xe8599F3cc5D38a9aD6F3684cd5CEa72f10Dbc383) |  [ProxyAdmin](https://polygonscan.com/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  onlyAdminOrRecipient |  [ProxyAdmin](https://polygonscan.com/address/0xD3cF979e676265e4f6379749DECe4708B9A22476), [Executor_lvl1](https://polygonscan.com/address/0xDf7d0e6454DB638881302729F5ba99936EaAB233), [ClinicSteward](https://polygonscan.com/address/0x476B3D5509f600cC377Ab86658b623337Fc6A717), [PoolExposureSteward](https://polygonscan.com/address/0xE5b11ab4D36E58C9171e3DB98Ba17336606Cd6ef), [ClinicStewardV2](https://polygonscan.com/address/0xF93b565c96446afdf8C3D37E6B4781D5d5EDef1C) |  withdrawFromStream, cancelStream | |--------|--------|--------|--------|--------|

### Guardians 
| Guardian |Threshold |Address |Owners |
|----------|----------|----------|----------|
|  [Aave Protocol Guardian Polygon](https://polygonscan.com/address/0xCb45E82419baeBCC9bA8b1e5c7858e48A3B26Ea6) |  5/8 |  0xCb45E82419baeBCC9bA8b1e5c7858e48A3B26Ea6 |  [0xbA037E4746ff58c55dc8F27a328C428F258DDACb](https://polygonscan.com/address/0xbA037E4746ff58c55dc8F27a328C428F258DDACb), [0x818C277dBE886b934e60aa047250A73529E26A99](https://polygonscan.com/address/0x818C277dBE886b934e60aa047250A73529E26A99), [0x4f96743057482a2E10253AFDacDA3fd9CF2C1DC9](https://polygonscan.com/address/0x4f96743057482a2E10253AFDacDA3fd9CF2C1DC9), [0xb647055A9915bF9c8021a684E175A353525b9890](https://polygonscan.com/address/0xb647055A9915bF9c8021a684E175A353525b9890), [0x57ab7ee15cE5ECacB1aB84EE42D5A9d0d8112922](https://polygonscan.com/address/0x57ab7ee15cE5ECacB1aB84EE42D5A9d0d8112922), [0xC5bE5c0134857B4b96F45AA6f6B77DB96Ac1487e](https://polygonscan.com/address/0xC5bE5c0134857B4b96F45AA6f6B77DB96Ac1487e), [0xd4af2E86a27F8F77B0556E081F97B215C9cA8f2E](https://polygonscan.com/address/0xd4af2E86a27F8F77B0556E081F97B215C9cA8f2E), [0xf71fc92e2949ccF6A5Fd369a0b402ba80Bc61E02](https://polygonscan.com/address/0xf71fc92e2949ccF6A5Fd369a0b402ba80Bc61E02) | |--------|--------|--------|--------|
|  [Polygon v2 incentives admin](https://polygonscan.com/address/0x2bB25175d9B0F8965780209EB558Cc3b56cA6d32) |  0/5 |  0x2bB25175d9B0F8965780209EB558Cc3b56cA6d32 |  [0xE7A4F2b1772603170111BC633cbCF1AcEbD60BCe](https://polygonscan.com/address/0xE7A4F2b1772603170111BC633cbCF1AcEbD60BCe), [0xCE990b1f86e954746AD3a57F5Aa6CFa9CC0c3348](https://polygonscan.com/address/0xCE990b1f86e954746AD3a57F5Aa6CFa9CC0c3348), [0x803B74766D8f79195D4DaeCF6f2aac31Dba78F25](https://polygonscan.com/address/0x803B74766D8f79195D4DaeCF6f2aac31Dba78F25), [0x087A7AFB6975A2837453BE685EB6272576c0bC06](https://polygonscan.com/address/0x087A7AFB6975A2837453BE685EB6272576c0bC06), [0x42409227ce8C7D22B283E7DdB2F26449B49e93EF](https://polygonscan.com/address/0x42409227ce8C7D22B283E7DdB2F26449B49e93EF) | |--------|--------|--------|--------|

### Collector Admins
| Role |Contract |
|----------|----------|
|  DEFAULT_ADMIN |  [Executor_lvl1](https://polygonscan.com/address/0xDf7d0e6454DB638881302729F5ba99936EaAB233) | |--------|--------|
|  FUNDS_ADMIN_ROLE |  [Executor_lvl1](https://polygonscan.com/address/0xDf7d0e6454DB638881302729F5ba99936EaAB233), [ClinicSteward](https://polygonscan.com/address/0x476B3D5509f600cC377Ab86658b623337Fc6A717), [PoolExposureSteward](https://polygonscan.com/address/0xE5b11ab4D36E58C9171e3DB98Ba17336606Cd6ef), [ClinicStewardV2](https://polygonscan.com/address/0xF93b565c96446afdf8C3D37E6B4781D5d5EDef1C) | |--------|--------|

