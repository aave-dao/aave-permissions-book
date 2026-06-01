# ETHEREUM 
## V2 
### Contracts upgradeability
| contract |upgradeable by |
|----------|----------|
|  [LendingPoolAddressesProvider](https://etherscan.io/address/0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5) |  not upgradeable | |--------|--------|
|  [LendingPool](https://etherscan.io/address/0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9) |  Governance | |--------|--------|
|  [LendingPoolConfigurator](https://etherscan.io/address/0x311Bb771e4F8952E6Da169b425E7e92d6Ac45756) |  Governance | |--------|--------|
|  [AaveOracle](https://etherscan.io/address/0xA50ba011c48153De246E5192C8f9258A2ba79Ca9) |  not upgradeable | |--------|--------|
|  [LendingRateOracle](https://etherscan.io/address/0x8A32f49FFbA88aba6EFF96F45D8BD1D4b3f35c7D) |  not upgradeable | |--------|--------|
|  [ProxyAdmin](https://etherscan.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  not upgradeable | |--------|--------|
|  [WrappedTokenGatewayV2](https://etherscan.io/address/0xa0d9C1E9E48Ca30c8d8C3B5D69FF5dc1f6DFfC24) |  not upgradeable | |--------|--------|
|  [ParaSwapLiquiditySwapAdapter](https://etherscan.io/address/0x135896DE8421be2ec868E0b811006171D9df802A) |  not upgradeable | |--------|--------|
|  [ParaSwapRepayAdapter](https://etherscan.io/address/0x80Aca0C645fEdABaa20fd2Bf0Daf57885A309FE6) |  not upgradeable | |--------|--------|
|  [LendingPoolAddressesProviderRegistry](https://etherscan.io/address/0x52D306e36E3B6B02c153d0266ff0f85d18BCD413) |  not upgradeable | |--------|--------|
|  [DefaultIncentivesController](https://etherscan.io/address/0xd784927Ff2f95ba542BfC824c8a8a98F3495f6b5) |  not upgradeable | |--------|--------|
|  [Collector](https://etherscan.io/address/0x464C71f6c2F760DdA6093dCB91C24c39e5d6e18c) |  Governance | |--------|--------|
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
|  cancelProposal |  Multi-sig | |--------|--------|

### Contracts
| contract |proxyAdmin |modifier |permission owner |functions |
|----------|----------|----------|----------|----------|
|  [LendingPoolAddressesProvider](https://etherscan.io/address/0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  setMarketId, setAddressAsProxy, setAddress, setLendingPoolImpl, setLendingPoolConfiguratorImpl, setLendingPoolCollateralManager, setPoolAdmin, setEmergencyAdmin, setPriceOracle, setLendingRateOracle | |--------|--------|--------|--------|--------|
|  [LendingPool](https://etherscan.io/address/0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9) |  [LendingPoolAddressesProvider](https://etherscan.io/address/0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5) |  onlyLendingPoolConfigurator |  [LendingPoolConfigurator](https://etherscan.io/address/0x311Bb771e4F8952E6Da169b425E7e92d6Ac45756) |  initReserve, setReserveInterestRateStrategyAddress, setConfiguration, setPause | |--------|--------|--------|--------|--------|
|  [LendingPoolConfigurator](https://etherscan.io/address/0x311Bb771e4F8952E6Da169b425E7e92d6Ac45756) |  [LendingPoolAddressesProvider](https://etherscan.io/address/0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5) |  onlyPoolAdmin |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  initReserve, updateAToken, updateStableDebtToken, updateVariableDebtToken, enableBorrowingOnReserve, disableBorrowingOnReserve, configureReserveAsCollateral, enableReserveStableRate, disableReserveStableRate, activateReserve, deactivateReserve, setReserveFactor, setReserveInterestRateStrategyAddress | |--------|--------|--------|--------|--------|
|  [LendingPoolConfigurator](https://etherscan.io/address/0x311Bb771e4F8952E6Da169b425E7e92d6Ac45756) |  [LendingPoolAddressesProvider](https://etherscan.io/address/0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5) |  onlyEmergencyAdmin |  [Aave Protocol Guardian Ethereum](https://etherscan.io/address/0x2CFe3ec4d5a6811f4B8067F0DE7e47DfA938Aa30) |  setPoolPause | |--------|--------|--------|--------|--------|
|  [LendingPoolConfigurator](https://etherscan.io/address/0x311Bb771e4F8952E6Da169b425E7e92d6Ac45756) |  [LendingPoolAddressesProvider](https://etherscan.io/address/0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5) |  onlyPoolOrEmergencyAdmin |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A), [Aave Protocol Guardian Ethereum](https://etherscan.io/address/0x2CFe3ec4d5a6811f4B8067F0DE7e47DfA938Aa30) |  freezeReserve, unfreezeReserve | |--------|--------|--------|--------|--------|
|  [AaveOracle](https://etherscan.io/address/0xA50ba011c48153De246E5192C8f9258A2ba79Ca9) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  setAssetSources, setFallbackOracle | |--------|--------|--------|--------|--------|
|  [LendingRateOracle](https://etherscan.io/address/0x8A32f49FFbA88aba6EFF96F45D8BD1D4b3f35c7D) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  setMarketBorrowRate | |--------|--------|--------|--------|--------|
|  [ProxyAdmin](https://etherscan.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|
|  [WrappedTokenGatewayV2](https://etherscan.io/address/0xa0d9C1E9E48Ca30c8d8C3B5D69FF5dc1f6DFfC24) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  emergencyTokenTransfer, emergencyEtherTransfer | |--------|--------|--------|--------|--------|
|  [ParaSwapLiquiditySwapAdapter](https://etherscan.io/address/0x135896DE8421be2ec868E0b811006171D9df802A) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  rescueTokens | |--------|--------|--------|--------|--------|
|  [ParaSwapRepayAdapter](https://etherscan.io/address/0x80Aca0C645fEdABaa20fd2Bf0Daf57885A309FE6) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  rescueTokens | |--------|--------|--------|--------|--------|
|  [LendingPoolAddressesProviderRegistry](https://etherscan.io/address/0x52D306e36E3B6B02c153d0266ff0f85d18BCD413) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  registerAddressesProvider, unregisterAddressesProvider | |--------|--------|--------|--------|--------|
|  [DefaultIncentivesController](https://etherscan.io/address/0xd784927Ff2f95ba542BfC824c8a8a98F3495f6b5) |  - |  onlyEmissionManager |  [ShortExecutor](https://etherscan.io/address/0xEE56e2B3D491590B5b31738cC34d5232F378a8D5) |  setDistributionEnd, configureAssets, setClaimer | |--------|--------|--------|--------|--------|
|  [Collector](https://etherscan.io/address/0x464C71f6c2F760DdA6093dCB91C24c39e5d6e18c) |  [ProxyAdmin](https://etherscan.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  onlyFundsAdmin |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A), [ClinicSteward](https://etherscan.io/address/0xf00E2de0E78DFf055A92AD4719a179CE275b6Ef7), [Lido ClinicSteward](https://etherscan.io/address/0x7571F419F7Df2d0622C1A20154a0D4250B2265cC), [PoolExposureSteward](https://etherscan.io/address/0x22aC12a6937BBBC0a301AF9154d08EaD95673122), [ClinicStewardV2](https://etherscan.io/address/0x6A14eBe9A934c8EFE15C3811a999149472876b56), [ClinicStewardV2 AMM](https://etherscan.io/address/0xE1e62c3ee0c581F715fBb0e23CDA536Fc29eeB2c), [SwapSteward](https://etherscan.io/address/0xb7D402138Cb01BfE97d95181C849379d6AD14d19) |  approve, transfer, setFundsAdmin, createStream | |--------|--------|--------|--------|--------|
|  [Collector](https://etherscan.io/address/0x464C71f6c2F760DdA6093dCB91C24c39e5d6e18c) |  [ProxyAdmin](https://etherscan.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  onlyAdminOrRecipient |  [ProxyAdmin](https://etherscan.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476), [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A), [ClinicSteward](https://etherscan.io/address/0xf00E2de0E78DFf055A92AD4719a179CE275b6Ef7), [Lido ClinicSteward](https://etherscan.io/address/0x7571F419F7Df2d0622C1A20154a0D4250B2265cC), [PoolExposureSteward](https://etherscan.io/address/0x22aC12a6937BBBC0a301AF9154d08EaD95673122), [ClinicStewardV2](https://etherscan.io/address/0x6A14eBe9A934c8EFE15C3811a999149472876b56), [ClinicStewardV2 AMM](https://etherscan.io/address/0xE1e62c3ee0c581F715fBb0e23CDA536Fc29eeB2c), [SwapSteward](https://etherscan.io/address/0xb7D402138Cb01BfE97d95181C849379d6AD14d19) |  withdrawFromStream, cancelStream | |--------|--------|--------|--------|--------|

### Guardians 
| Guardian |Threshold |Address |Owners |
|----------|----------|----------|----------|
|  [Aave Protocol Guardian Ethereum](https://etherscan.io/address/0x2CFe3ec4d5a6811f4B8067F0DE7e47DfA938Aa30) |  4/7 |  0x2CFe3ec4d5a6811f4B8067F0DE7e47DfA938Aa30 |  [0x3fa960f8355D00874D9C7E3350147f5E94859bc2](https://etherscan.io/address/0x3fa960f8355D00874D9C7E3350147f5E94859bc2), [0xa2DCdD6e0b5e0d118E2Fa8922552AC0Fe26EFe58](https://etherscan.io/address/0xa2DCdD6e0b5e0d118E2Fa8922552AC0Fe26EFe58), [0xb291232F480F41c75802C4a60F1D2AC03404Afef](https://etherscan.io/address/0xb291232F480F41c75802C4a60F1D2AC03404Afef), [0xe6838d834674eC35EDd53D485770Baa10bdd6AAe](https://etherscan.io/address/0xe6838d834674eC35EDd53D485770Baa10bdd6AAe), [0xc2674C1A1aF0557E1d217fF4F13DF44A637c7C13](https://etherscan.io/address/0xc2674C1A1aF0557E1d217fF4F13DF44A637c7C13), [0x4Ab2Bed1d667260dB34244Ba412817651C2dD52b](https://etherscan.io/address/0x4Ab2Bed1d667260dB34244Ba412817651C2dD52b), [0xd4af2E86a27F8F77B0556E081F97B215C9cA8f2E](https://etherscan.io/address/0xd4af2E86a27F8F77B0556E081F97B215C9cA8f2E) | |--------|--------|--------|--------|

### Collector Admins
| Role |Contract |
|----------|----------|
|  DEFAULT_ADMIN |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) | |--------|--------|
|  FUNDS_ADMIN_ROLE |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A), [ClinicSteward](https://etherscan.io/address/0xf00E2de0E78DFf055A92AD4719a179CE275b6Ef7), [Lido ClinicSteward](https://etherscan.io/address/0x7571F419F7Df2d0622C1A20154a0D4250B2265cC), [PoolExposureSteward](https://etherscan.io/address/0x22aC12a6937BBBC0a301AF9154d08EaD95673122), [ClinicStewardV2](https://etherscan.io/address/0x6A14eBe9A934c8EFE15C3811a999149472876b56), [ClinicStewardV2 AMM](https://etherscan.io/address/0xE1e62c3ee0c581F715fBb0e23CDA536Fc29eeB2c), [SwapSteward](https://etherscan.io/address/0xb7D402138Cb01BfE97d95181C849379d6AD14d19) | |--------|--------|

