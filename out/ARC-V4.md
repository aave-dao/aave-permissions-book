# ARC 
## V4 
### Contracts upgradeability
| contract |upgradeable by |
|----------|----------|
|  [CORE Hub](https://explorer.arc.io/address/0x17288dfc86205301064577b98B02b81017e6F79C) |  V4 Security Council | |--------|--------|
|  [HubConfigurator](https://explorer.arc.io/address/0x419cF771E08d927b23F2F1691968C5135Ad8B659) |  not upgradeable | |--------|--------|
|  [MAIN Spoke](https://explorer.arc.io/address/0xB843bdC3a87A05E77E07Df9FE48928b3A34b134d) |  V4 Security Council | |--------|--------|
|  [FOREX Spoke](https://explorer.arc.io/address/0x4164EBCAF74670aa74C8D4F59de6157c0780F1bB) |  V4 Security Council | |--------|--------|
|  [SpokeConfigurator](https://explorer.arc.io/address/0x102610d2A7Fd87A85ad8fdCfC78879be8Fd40576) |  not upgradeable | |--------|--------|
|  [TreasurySpoke](https://explorer.arc.io/address/0xcbd466CB8709D9f6dd8312668B4dbef394cE0e15) |  V4 Security Council | |--------|--------|
|  [PoolAddressesProvider](https://explorer.arc.io/address/0xf74284E5aeDC3AD57CD2Fa2461bf2E1762422a12) |  not upgradeable | |--------|--------|
|  [ACLManager](https://explorer.arc.io/address/0x4d4B307857eFff79E786923F2A277ea298E88aEA) |  not upgradeable | |--------|--------|

### TokenizationSpokes upgradeability
| contract |upgradeable by |
|----------|----------|
|  [CORE USDC TokenizationSpoke](https://explorer.arc.io/address/0x42EAB64310E1D1c66b4d8aF7C9C4ce253885eB83) |  V4 Security Council | |--------|--------|
|  [CORE EURC TokenizationSpoke](https://explorer.arc.io/address/0x5A10b1533C0f1f181DC8a428BF5Eb58B08fc8d2c) |  V4 Security Council | |--------|--------|
|  [CORE cirBTC TokenizationSpoke](https://explorer.arc.io/address/0x83D364DbAf4e7018E0b87dB3FaB3d1d8535a6F13) |  V4 Security Council | |--------|--------|
|  [CORE WETH TokenizationSpoke](https://explorer.arc.io/address/0xe8B890fea6e1E3915A337eD3136487F2f4f7e59D) |  V4 Security Council | |--------|--------|

### Actions type
| type |can be executed by |
|----------|----------|
|  adminsConfiguration |  Multi-sig | |--------|--------|
|  protocolUpgradeablity |  Multi-sig | |--------|--------|

### Contracts
| contract |proxyAdmin |modifier |permission owner |functions |
|----------|----------|----------|----------|----------|
|  [CORE Hub](https://explorer.arc.io/address/0x17288dfc86205301064577b98B02b81017e6F79C) |  [CORE Hub ProxyAdmin](https://explorer.arc.io/address/0x64F13f38798818D7AaC1bbD4dEfa163b90EA2fdD) |  HUB_CONFIGURATOR_ROLE |  [HubConfigurator](https://explorer.arc.io/address/0x419cF771E08d927b23F2F1691968C5135Ad8B659), [V4 Security Council](https://explorer.arc.io/address/0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9) |  addAsset, updateAssetConfig, addSpoke, updateSpokeConfig, setInterestRateData | |--------|--------|--------|--------|--------|
|  [CORE Hub](https://explorer.arc.io/address/0x17288dfc86205301064577b98B02b81017e6F79C) |  [CORE Hub ProxyAdmin](https://explorer.arc.io/address/0x64F13f38798818D7AaC1bbD4dEfa163b90EA2fdD) |  HUB_FEE_MINTER_ROLE |  [V4 Security Council](https://explorer.arc.io/address/0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9) |  mintFeeShares | |--------|--------|--------|--------|--------|
|  [CORE Hub](https://explorer.arc.io/address/0x17288dfc86205301064577b98B02b81017e6F79C) |  [CORE Hub ProxyAdmin](https://explorer.arc.io/address/0x64F13f38798818D7AaC1bbD4dEfa163b90EA2fdD) |  HUB_DEFICIT_ELIMINATOR_ROLE |  [V4 Security Council](https://explorer.arc.io/address/0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9) |  eliminateDeficit | |--------|--------|--------|--------|--------|
|  [HubConfigurator](https://explorer.arc.io/address/0x419cF771E08d927b23F2F1691968C5135Ad8B659) |  - |  HUB_CONFIGURATOR_DOMAIN_ADMIN_ROLE |  [V4 Security Council Executor](https://explorer.arc.io/address/0x8e79b0541122d3822eC93082cEB1ab03EDBc1Fd5) |  addAsset, addAssetWithDecimals, updateLiquidityFee, updateFeeReceiver, updateFeeConfig, updateInterestRateStrategy, updateReinvestmentController, resetAssetCaps, deactivateAsset, haltAsset, addSpoke, addSpokeToAssets, updateSpokeActive, updateSpokeHalted, updateSpokeAddCap, updateSpokeDrawCap, updateSpokeRiskPremiumThreshold, updateSpokeCaps, deactivateSpoke, haltSpoke, resetSpokeCaps, updateInterestRateData | |--------|--------|--------|--------|--------|
|  [MAIN Spoke](https://explorer.arc.io/address/0xB843bdC3a87A05E77E07Df9FE48928b3A34b134d) |  [MAIN Spoke ProxyAdmin](https://explorer.arc.io/address/0x6a1beE304Ce745Df8D3Ab5c18f16Ac0561BD2626) |  SPOKE_CONFIGURATOR_ROLE |  [SpokeConfigurator](https://explorer.arc.io/address/0x102610d2A7Fd87A85ad8fdCfC78879be8Fd40576), [V4 Security Council](https://explorer.arc.io/address/0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9) |  updateLiquidationConfig, addReserve, updateReserveConfig, updateDynamicReserveConfig, addDynamicReserveConfig, updatePositionManager, updateReservePriceSource | |--------|--------|--------|--------|--------|
|  [MAIN Spoke](https://explorer.arc.io/address/0xB843bdC3a87A05E77E07Df9FE48928b3A34b134d) |  [MAIN Spoke ProxyAdmin](https://explorer.arc.io/address/0x6a1beE304Ce745Df8D3Ab5c18f16Ac0561BD2626) |  SPOKE_USER_POSITION_UPDATER_ROLE |  [V4 Security Council](https://explorer.arc.io/address/0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9) |  updateUserDynamicConfig, updateUserRiskPremium | |--------|--------|--------|--------|--------|
|  [FOREX Spoke](https://explorer.arc.io/address/0x4164EBCAF74670aa74C8D4F59de6157c0780F1bB) |  [FOREX Spoke ProxyAdmin](https://explorer.arc.io/address/0xE8d75bb46C15c70dB2A464886f51b8a46A871108) |  SPOKE_CONFIGURATOR_ROLE |  [SpokeConfigurator](https://explorer.arc.io/address/0x102610d2A7Fd87A85ad8fdCfC78879be8Fd40576), [V4 Security Council](https://explorer.arc.io/address/0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9) |  updateLiquidationConfig, addReserve, updateReserveConfig, updateDynamicReserveConfig, addDynamicReserveConfig, updatePositionManager, updateReservePriceSource | |--------|--------|--------|--------|--------|
|  [FOREX Spoke](https://explorer.arc.io/address/0x4164EBCAF74670aa74C8D4F59de6157c0780F1bB) |  [FOREX Spoke ProxyAdmin](https://explorer.arc.io/address/0xE8d75bb46C15c70dB2A464886f51b8a46A871108) |  SPOKE_USER_POSITION_UPDATER_ROLE |  [V4 Security Council](https://explorer.arc.io/address/0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9) |  updateUserDynamicConfig, updateUserRiskPremium | |--------|--------|--------|--------|--------|
|  [SpokeConfigurator](https://explorer.arc.io/address/0x102610d2A7Fd87A85ad8fdCfC78879be8Fd40576) |  - |  SPOKE_CONFIGURATOR_DOMAIN_ADMIN_ROLE |  [V4 Security Council Executor](https://explorer.arc.io/address/0x8e79b0541122d3822eC93082cEB1ab03EDBc1Fd5) |  updateReservePriceSource, updateLiquidationTargetHealthFactor, updateHealthFactorForMaxBonus, updateLiquidationBonusFactor, updateLiquidationConfig, addReserve, updatePaused, updateFrozen, updateBorrowable, updateReceiveSharesEnabled, updateCollateralRisk, addCollateralFactor, updateCollateralFactor, addMaxLiquidationBonus, updateMaxLiquidationBonus, addLiquidationFee, updateLiquidationFee, addDynamicReserveConfig, updateDynamicReserveConfig, pauseAllReserves, freezeAllReserves, pauseReserve, freezeReserve, updatePositionManager | |--------|--------|--------|--------|--------|
|  [TreasurySpoke](https://explorer.arc.io/address/0xcbd466CB8709D9f6dd8312668B4dbef394cE0e15) |  [TreasurySpoke ProxyAdmin](https://explorer.arc.io/address/0xfa12D100A649c8D4dCC0047f9618b2bB4939f6A0) |  onlyOwner |  [V4 Security Council](https://explorer.arc.io/address/0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9) |  supply, supplySkimmed, withdraw, transfer | |--------|--------|--------|--------|--------|
|  [PoolAddressesProvider](https://explorer.arc.io/address/0xf74284E5aeDC3AD57CD2Fa2461bf2E1762422a12) |  - |  onlyOwner |  [V4 Security Council](https://explorer.arc.io/address/0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9) |  setMarketId, setAddress, setAddressAsProxy, setPoolImpl, setPoolConfiguratorImpl, setPriceOracle, setACLManager, setACLAdmin, setPriceOracleSentinel, setPoolDataProvider | |--------|--------|--------|--------|--------|
|  [ACLManager](https://explorer.arc.io/address/0x4d4B307857eFff79E786923F2A277ea298E88aEA) |  - |  onlyRole |  [V4 Security Council](https://explorer.arc.io/address/0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9) |  setRoleAdmin | |--------|--------|--------|--------|--------|

### PositionManagers Contracts
| contract |proxyAdmin |modifier |permission owner |functions |
|----------|----------|----------|----------|----------|
|  [GIVER POSITION MANAGER](https://explorer.arc.io/address/0x01Da80Eef3004ebbF90b7637B1De7fF30fBc7cf1) |  - |  onlyOwner |  [V4 Security Council](https://explorer.arc.io/address/0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9) |  registerSpoke, renouncePositionManagerRole | |--------|--------|--------|--------|--------|
|  [TAKER POSITION MANAGER](https://explorer.arc.io/address/0xe9fae1C386c6f45B1fb3C3Ef01aDE424DAd4bCcF) |  - |  onlyOwner |  [V4 Security Council](https://explorer.arc.io/address/0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9) |  registerSpoke | |--------|--------|--------|--------|--------|
|  [CONFIG POSITION MANAGER](https://explorer.arc.io/address/0xa5Aa65Ae1c830d2ae10853CeEa42AE653adB3312) |  - |  onlyOwner |  [V4 Security Council](https://explorer.arc.io/address/0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9) |  registerSpoke | |--------|--------|--------|--------|--------|
|  [SIGNATURE GATEWAY](https://explorer.arc.io/address/0x0d36A4a21119BBBDe559d59002254171D976289f) |  - |  onlyOwner |  [V4 Security Council](https://explorer.arc.io/address/0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9) |  registerSpoke, renouncePositionManagerRole | |--------|--------|--------|--------|--------|

### Spoke PositionManagers
| spoke |active position managers |
|----------|----------|
|  [MAIN Spoke](https://explorer.arc.io/address/0xB843bdC3a87A05E77E07Df9FE48928b3A34b134d) |  [GIVER POSITION MANAGER](https://explorer.arc.io/address/0x01Da80Eef3004ebbF90b7637B1De7fF30fBc7cf1), [TAKER POSITION MANAGER](https://explorer.arc.io/address/0xe9fae1C386c6f45B1fb3C3Ef01aDE424DAd4bCcF), [CONFIG POSITION MANAGER](https://explorer.arc.io/address/0xa5Aa65Ae1c830d2ae10853CeEa42AE653adB3312), [SIGNATURE GATEWAY](https://explorer.arc.io/address/0x0d36A4a21119BBBDe559d59002254171D976289f) | |--------|--------|
|  [FOREX Spoke](https://explorer.arc.io/address/0x4164EBCAF74670aa74C8D4F59de6157c0780F1bB) |  [GIVER POSITION MANAGER](https://explorer.arc.io/address/0x01Da80Eef3004ebbF90b7637B1De7fF30fBc7cf1), [TAKER POSITION MANAGER](https://explorer.arc.io/address/0xe9fae1C386c6f45B1fb3C3Ef01aDE424DAd4bCcF), [CONFIG POSITION MANAGER](https://explorer.arc.io/address/0xa5Aa65Ae1c830d2ae10853CeEa42AE653adB3312), [SIGNATURE GATEWAY](https://explorer.arc.io/address/0x0d36A4a21119BBBDe559d59002254171D976289f) | |--------|--------|

### Guardians 
| Guardian |Threshold |Address |Owners |
|----------|----------|----------|----------|
|  [V4 Security Council](https://explorer.arc.io/address/0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9) |  5/8 |  0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9 |  [0x76c82c2cB7C5dB3B053A251F3281081C6EC40FDF](https://explorer.arc.io/address/0x76c82c2cB7C5dB3B053A251F3281081C6EC40FDF), [0x9AB4e51a7cd8cE1279D9dbfA01Ad61367C3e3749](https://explorer.arc.io/address/0x9AB4e51a7cd8cE1279D9dbfA01Ad61367C3e3749), [0xc0A15667D6c63ac2CBFCAf5ABbFA0639018B2065](https://explorer.arc.io/address/0xc0A15667D6c63ac2CBFCAf5ABbFA0639018B2065), [0x437B97618dFB8c8B1f403Bd2E9436730f0f9D884](https://explorer.arc.io/address/0x437B97618dFB8c8B1f403Bd2E9436730f0f9D884), [0x75C26ED4D9c5D331665766394D933E12f8597a55](https://explorer.arc.io/address/0x75C26ED4D9c5D331665766394D933E12f8597a55), [0x9440850335c7C2a644dc2abEBBA93463c9736F2C](https://explorer.arc.io/address/0x9440850335c7C2a644dc2abEBBA93463c9736F2C), [0xbf113Fa52454A94185b65e6f2E818B7f178f937a](https://explorer.arc.io/address/0xbf113Fa52454A94185b65e6f2E818B7f178f937a), [0x606dC57cd166643760E049609bfd1D8a698D3bAc](https://explorer.arc.io/address/0x606dC57cd166643760E049609bfd1D8a698D3bAc) | |--------|--------|--------|--------|

### Admins
| Role |Contract |
|----------|----------|
|  DEFAULT_ADMIN |  [V4 Security Council](https://explorer.arc.io/address/0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9) | |--------|--------|
|  ASSET_LISTING_ADMIN |   | |--------|--------|
|  EMERGENCY_ADMIN |   | |--------|--------|
|  FLASH_BORROWER |   | |--------|--------|
|  POOL_ADMIN |   | |--------|--------|
|  RISK_ADMIN |   | |--------|--------|

### AccessManager Roles
| Role |Contract |
|----------|----------|
|  ACCESS_MANAGER_DEFAULT_ADMIN |  [V4 Security Council](https://explorer.arc.io/address/0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9) | |--------|--------|
|  HUB_CONFIGURATOR_ROLE |  [HubConfigurator](https://explorer.arc.io/address/0x419cF771E08d927b23F2F1691968C5135Ad8B659), [V4 Security Council](https://explorer.arc.io/address/0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9) | |--------|--------|
|  HUB_FEE_MINTER_ROLE |  [V4 Security Council](https://explorer.arc.io/address/0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9) | |--------|--------|
|  HUB_DEFICIT_ELIMINATOR_ROLE |  [V4 Security Council](https://explorer.arc.io/address/0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9) | |--------|--------|
|  HUB_CONFIGURATOR_DOMAIN_ADMIN_ROLE |  [V4 Security Council Executor](https://explorer.arc.io/address/0x8e79b0541122d3822eC93082cEB1ab03EDBc1Fd5) | |--------|--------|
|  SPOKE_CONFIGURATOR_ROLE |  [SpokeConfigurator](https://explorer.arc.io/address/0x102610d2A7Fd87A85ad8fdCfC78879be8Fd40576), [V4 Security Council](https://explorer.arc.io/address/0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9) | |--------|--------|
|  SPOKE_USER_POSITION_UPDATER_ROLE |  [V4 Security Council](https://explorer.arc.io/address/0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9) | |--------|--------|
|  SPOKE_CONFIGURATOR_DOMAIN_ADMIN_ROLE |  [V4 Security Council Executor](https://explorer.arc.io/address/0x8e79b0541122d3822eC93082cEB1ab03EDBc1Fd5) | |--------|--------|

