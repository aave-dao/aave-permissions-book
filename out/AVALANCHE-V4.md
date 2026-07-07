# AVALANCHE 
## V4 
### Contracts upgradeability
| contract |upgradeable by |
|----------|----------|
|  [CORE Hub](https://snowscan.xyz/address/0xd07369fAE4A5BB13c9Ce446B052c7867B1AbDf6e) |  V4 Security Council | |--------|--------|
|  [HubConfigurator](https://snowscan.xyz/address/0xbdf92ed96FF6D678469aFAFFa1e7d37B25beaa33) |  not upgradeable | |--------|--------|
|  [MAIN Spoke](https://snowscan.xyz/address/0x435272CefF93a1E657E8ABfdf0A13e95900A3a56) |  V4 Security Council | |--------|--------|
|  [FOREX Spoke](https://snowscan.xyz/address/0x6a37776B5E026dBdF043b4F933c323C84DD1B514) |  V4 Security Council | |--------|--------|
|  [AVAX_CORRELATED Spoke](https://snowscan.xyz/address/0x3b517594277c67307CF2d7CBE6FE1D4399B68c41) |  V4 Security Council | |--------|--------|
|  [SpokeConfigurator](https://snowscan.xyz/address/0x8F72573F1Aa0A1e39fFD2a2A69e9EDAa8B982642) |  not upgradeable | |--------|--------|
|  [TreasurySpoke](https://snowscan.xyz/address/0x2C4Aea1A5F000889c6DfFE8f52377aFc2CB113a6) |  V4 Security Council | |--------|--------|

### TokenizationSpokes upgradeability
| contract |upgradeable by |
|----------|----------|
|  [CORE WAVAX TokenizationSpoke](https://snowscan.xyz/address/0x1604D602f8A05CBA2d8Ff5d14DE4C3498f15B6B4) |  V4 Security Council | |--------|--------|
|  [CORE BTCb TokenizationSpoke](https://snowscan.xyz/address/0x7cd3Ccc737f442050a861EC6b00768AE96B2F58E) |  V4 Security Council | |--------|--------|
|  [CORE USDC TokenizationSpoke](https://snowscan.xyz/address/0x01D7f7B7CE2123192fECC20bd1caF3e4d9e4C10D) |  V4 Security Council | |--------|--------|
|  [CORE USDt TokenizationSpoke](https://snowscan.xyz/address/0x2E4BA06fF97E10D09FA4F5a270e97301eae729A9) |  V4 Security Council | |--------|--------|
|  [CORE WETHe TokenizationSpoke](https://snowscan.xyz/address/0xF5c849468318c8D5670020fdb96ae135FED37070) |  V4 Security Council | |--------|--------|
|  [CORE EURC TokenizationSpoke](https://snowscan.xyz/address/0x7b538a1840EAf2Ed92EEB67eE744AE627335e201) |  V4 Security Council | |--------|--------|
|  [CORE sAVAX TokenizationSpoke](https://snowscan.xyz/address/0x6c27A7435040B7cC512319d5690BeEF234dfE76e) |  V4 Security Council | |--------|--------|

### Contracts
| contract |proxyAdmin |modifier |permission owner |functions |
|----------|----------|----------|----------|----------|
|  [CORE Hub](https://snowscan.xyz/address/0xd07369fAE4A5BB13c9Ce446B052c7867B1AbDf6e) |  [CORE Hub ProxyAdmin](https://snowscan.xyz/address/0x6CE69885f42339C033f0f13b118c5c9157659ACA) |  HUB_CONFIGURATOR_ROLE |  [HubConfigurator](https://snowscan.xyz/address/0xbdf92ed96FF6D678469aFAFFa1e7d37B25beaa33) |  addAsset, updateAssetConfig, addSpoke, updateSpokeConfig, setInterestRateData | |--------|--------|--------|--------|--------|
|  [CORE Hub](https://snowscan.xyz/address/0xd07369fAE4A5BB13c9Ce446B052c7867B1AbDf6e) |  [CORE Hub ProxyAdmin](https://snowscan.xyz/address/0x6CE69885f42339C033f0f13b118c5c9157659ACA) |  HUB_FEE_MINTER_ROLE |   |  mintFeeShares | |--------|--------|--------|--------|--------|
|  [CORE Hub](https://snowscan.xyz/address/0xd07369fAE4A5BB13c9Ce446B052c7867B1AbDf6e) |  [CORE Hub ProxyAdmin](https://snowscan.xyz/address/0x6CE69885f42339C033f0f13b118c5c9157659ACA) |  HUB_DEFICIT_ELIMINATOR_ROLE |   |  eliminateDeficit | |--------|--------|--------|--------|--------|
|  [HubConfigurator](https://snowscan.xyz/address/0xbdf92ed96FF6D678469aFAFFa1e7d37B25beaa33) |  - |  HUB_CONFIGURATOR_DOMAIN_ADMIN_ROLE |  [Executor_lvl1](https://snowscan.xyz/address/0x3C06dce358add17aAf230f2234bCCC4afd50d090), [V4 Security Council Executor](https://snowscan.xyz/address/0xb619fA61e795D47f517702e63ce50292370561F1) |  addAsset, addAssetWithDecimals, updateLiquidityFee, updateFeeReceiver, updateFeeConfig, updateInterestRateStrategy, updateReinvestmentController, resetAssetCaps, deactivateAsset, haltAsset, addSpoke, addSpokeToAssets, updateSpokeActive, updateSpokeHalted, updateSpokeAddCap, updateSpokeDrawCap, updateSpokeRiskPremiumThreshold, updateSpokeCaps, deactivateSpoke, haltSpoke, resetSpokeCaps, updateInterestRateData | |--------|--------|--------|--------|--------|
|  [MAIN Spoke](https://snowscan.xyz/address/0x435272CefF93a1E657E8ABfdf0A13e95900A3a56) |  [MAIN Spoke ProxyAdmin](https://snowscan.xyz/address/0xb06223f25B191D46AF2Aa1fc1bFCdBE81a00f8c8) |  SPOKE_CONFIGURATOR_ROLE |  [SpokeConfigurator](https://snowscan.xyz/address/0x8F72573F1Aa0A1e39fFD2a2A69e9EDAa8B982642) |  updateLiquidationConfig, addReserve, updateReserveConfig, updateDynamicReserveConfig, addDynamicReserveConfig, updatePositionManager, updateReservePriceSource | |--------|--------|--------|--------|--------|
|  [MAIN Spoke](https://snowscan.xyz/address/0x435272CefF93a1E657E8ABfdf0A13e95900A3a56) |  [MAIN Spoke ProxyAdmin](https://snowscan.xyz/address/0xb06223f25B191D46AF2Aa1fc1bFCdBE81a00f8c8) |  SPOKE_USER_POSITION_UPDATER_ROLE |   |  updateUserDynamicConfig, updateUserRiskPremium | |--------|--------|--------|--------|--------|
|  [FOREX Spoke](https://snowscan.xyz/address/0x6a37776B5E026dBdF043b4F933c323C84DD1B514) |  [FOREX Spoke ProxyAdmin](https://snowscan.xyz/address/0x00D7c7d0D021715eaA921F72F60489D6653ecCfE) |  SPOKE_CONFIGURATOR_ROLE |  [SpokeConfigurator](https://snowscan.xyz/address/0x8F72573F1Aa0A1e39fFD2a2A69e9EDAa8B982642) |  updateLiquidationConfig, addReserve, updateReserveConfig, updateDynamicReserveConfig, addDynamicReserveConfig, updatePositionManager, updateReservePriceSource | |--------|--------|--------|--------|--------|
|  [FOREX Spoke](https://snowscan.xyz/address/0x6a37776B5E026dBdF043b4F933c323C84DD1B514) |  [FOREX Spoke ProxyAdmin](https://snowscan.xyz/address/0x00D7c7d0D021715eaA921F72F60489D6653ecCfE) |  SPOKE_USER_POSITION_UPDATER_ROLE |   |  updateUserDynamicConfig, updateUserRiskPremium | |--------|--------|--------|--------|--------|
|  [AVAX_CORRELATED Spoke](https://snowscan.xyz/address/0x3b517594277c67307CF2d7CBE6FE1D4399B68c41) |  [AVAX_CORRELATED Spoke ProxyAdmin](https://snowscan.xyz/address/0x34F5392e2CFEDf971223f070d3c51BD5165196F4) |  SPOKE_CONFIGURATOR_ROLE |  [SpokeConfigurator](https://snowscan.xyz/address/0x8F72573F1Aa0A1e39fFD2a2A69e9EDAa8B982642) |  updateLiquidationConfig, addReserve, updateReserveConfig, updateDynamicReserveConfig, addDynamicReserveConfig, updatePositionManager, updateReservePriceSource | |--------|--------|--------|--------|--------|
|  [AVAX_CORRELATED Spoke](https://snowscan.xyz/address/0x3b517594277c67307CF2d7CBE6FE1D4399B68c41) |  [AVAX_CORRELATED Spoke ProxyAdmin](https://snowscan.xyz/address/0x34F5392e2CFEDf971223f070d3c51BD5165196F4) |  SPOKE_USER_POSITION_UPDATER_ROLE |   |  updateUserDynamicConfig, updateUserRiskPremium | |--------|--------|--------|--------|--------|
|  [SpokeConfigurator](https://snowscan.xyz/address/0x8F72573F1Aa0A1e39fFD2a2A69e9EDAa8B982642) |  - |  SPOKE_CONFIGURATOR_DOMAIN_ADMIN_ROLE |  [V4 Security Council Executor](https://snowscan.xyz/address/0xb619fA61e795D47f517702e63ce50292370561F1) |  updateReservePriceSource, updateLiquidationTargetHealthFactor, updateHealthFactorForMaxBonus, updateLiquidationBonusFactor, updateLiquidationConfig, addReserve, updatePaused, updateFrozen, updateBorrowable, updateReceiveSharesEnabled, updateCollateralRisk, addCollateralFactor, updateCollateralFactor, addMaxLiquidationBonus, updateMaxLiquidationBonus, addLiquidationFee, updateLiquidationFee, addDynamicReserveConfig, updateDynamicReserveConfig, pauseAllReserves, freezeAllReserves, pauseReserve, freezeReserve, updatePositionManager | |--------|--------|--------|--------|--------|
|  [TreasurySpoke](https://snowscan.xyz/address/0x2C4Aea1A5F000889c6DfFE8f52377aFc2CB113a6) |  [TreasurySpoke ProxyAdmin](https://snowscan.xyz/address/0x0b448c233298d33B163D877aC43bF8Fa884480e1) |  onlyOwner |  [0xB00A89E5C8756bA8629846eEF8a4a9C71Ad1930A](https://snowscan.xyz/address/0xB00A89E5C8756bA8629846eEF8a4a9C71Ad1930A) |  supply, supplySkimmed, withdraw, transfer | |--------|--------|--------|--------|--------|

### PositionManagers Contracts
| contract |proxyAdmin |modifier |permission owner |functions |
|----------|----------|----------|----------|----------|
|  [GIVER POSITION MANAGER](https://snowscan.xyz/address/0x50c4C40aB6BaE46B372a251BEacE388439aa96b4) |  - |  onlyOwner |  [0x5066364AE356DC95837772d9fC17ed926Fd54576](https://snowscan.xyz/address/0x5066364AE356DC95837772d9fC17ed926Fd54576) |  registerSpoke, renouncePositionManagerRole | |--------|--------|--------|--------|--------|
|  [TAKER POSITION MANAGER](https://snowscan.xyz/address/0x5A5A711560eb9293Ef6F4bc33CD8589b4A603D10) |  - |  onlyOwner |  [0x5066364AE356DC95837772d9fC17ed926Fd54576](https://snowscan.xyz/address/0x5066364AE356DC95837772d9fC17ed926Fd54576) |  registerSpoke | |--------|--------|--------|--------|--------|
|  [CONFIG POSITION MANAGER](https://snowscan.xyz/address/0x50BE00C5EbF6CC230B8970f4205Cd0B5A70EaEB1) |  - |  onlyOwner |  [0x5066364AE356DC95837772d9fC17ed926Fd54576](https://snowscan.xyz/address/0x5066364AE356DC95837772d9fC17ed926Fd54576) |  registerSpoke | |--------|--------|--------|--------|--------|
|  [NATIVE TOKEN GATEWAY](https://snowscan.xyz/address/0xE4C7183A5f22c365140F41d733d8A8baD5A1a6bA) |  - |  onlyOwner |  [0x5066364AE356DC95837772d9fC17ed926Fd54576](https://snowscan.xyz/address/0x5066364AE356DC95837772d9fC17ed926Fd54576) |  registerSpoke, renouncePositionManagerRole | |--------|--------|--------|--------|--------|
|  [SIGNATURE GATEWAY](https://snowscan.xyz/address/0x6E3B91A951DA9b515a5E98F0c7D210a697382e7F) |  - |  onlyOwner |  [0x5066364AE356DC95837772d9fC17ed926Fd54576](https://snowscan.xyz/address/0x5066364AE356DC95837772d9fC17ed926Fd54576) |  registerSpoke, renouncePositionManagerRole | |--------|--------|--------|--------|--------|

### AccessManager Roles
| Role |Contract |
|----------|----------|
|  ACCESS_MANAGER_DEFAULT_ADMIN |  [Executor_lvl1](https://snowscan.xyz/address/0x3C06dce358add17aAf230f2234bCCC4afd50d090), [V4 Security Council](https://snowscan.xyz/address/0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9) | |--------|--------|
|  HUB_CONFIGURATOR_ROLE |  [HubConfigurator](https://snowscan.xyz/address/0xbdf92ed96FF6D678469aFAFFa1e7d37B25beaa33) | |--------|--------|
|  HUB_FEE_MINTER_ROLE |   | |--------|--------|
|  HUB_DEFICIT_ELIMINATOR_ROLE |   | |--------|--------|
|  HUB_CONFIGURATOR_DOMAIN_ADMIN_ROLE |  [Executor_lvl1](https://snowscan.xyz/address/0x3C06dce358add17aAf230f2234bCCC4afd50d090), [V4 Security Council Executor](https://snowscan.xyz/address/0xb619fA61e795D47f517702e63ce50292370561F1) | |--------|--------|
|  SPOKE_CONFIGURATOR_ROLE |  [SpokeConfigurator](https://snowscan.xyz/address/0x8F72573F1Aa0A1e39fFD2a2A69e9EDAa8B982642) | |--------|--------|
|  SPOKE_USER_POSITION_UPDATER_ROLE |   | |--------|--------|
|  SPOKE_CONFIGURATOR_DOMAIN_ADMIN_ROLE |  [V4 Security Council Executor](https://snowscan.xyz/address/0xb619fA61e795D47f517702e63ce50292370561F1) | |--------|--------|

