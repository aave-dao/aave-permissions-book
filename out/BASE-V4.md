# BASE 
## V4 
### Contracts upgradeability
| contract |upgradeable by |
|----------|----------|
|  [EQUITIES Hub](https://basescan.org/address/0xa4d5947Eb727A052bae69C593FfC84247EC9864E) |  V4 Security Council | |--------|--------|
|  [HubConfigurator](https://basescan.org/address/0x2Cd40DFF9f2F74e8765dA148102b6668A5e9778A) |  not upgradeable | |--------|--------|
|  [MAG7 Spoke](https://basescan.org/address/0x17905Db0e4A3514467539956c084180616AE7B8D) |  V4 Security Council | |--------|--------|
|  [SpokeConfigurator](https://basescan.org/address/0x0191B1Aa743c6B3C545119B5D56a0577D7f3a57F) |  not upgradeable | |--------|--------|
|  [TreasurySpoke](https://basescan.org/address/0x5F8d0102F5B51Fae6DE9d2F2561bda63Fb5Db674) |  V4 Security Council | |--------|--------|

### TokenizationSpokes upgradeability
| contract |upgradeable by |
|----------|----------|
|  [EQUITIES USDC TokenizationSpoke](https://basescan.org/address/0x7081CE7EB1282c53CF38EA9B622f6269cb8FeFDc) |  V4 Security Council | |--------|--------|

### Contracts
| contract |proxyAdmin |modifier |permission owner |functions |
|----------|----------|----------|----------|----------|
|  [EQUITIES Hub](https://basescan.org/address/0xa4d5947Eb727A052bae69C593FfC84247EC9864E) |  [EQUITIES Hub ProxyAdmin](https://basescan.org/address/0xeb681e0cA77FA31b26D9C8FeCF8A7A7aE0512707) |  HUB_CONFIGURATOR_ROLE |  [HubConfigurator](https://basescan.org/address/0x2Cd40DFF9f2F74e8765dA148102b6668A5e9778A) |  addAsset, updateAssetConfig, addSpoke, updateSpokeConfig, setInterestRateData | |--------|--------|--------|--------|--------|
|  [EQUITIES Hub](https://basescan.org/address/0xa4d5947Eb727A052bae69C593FfC84247EC9864E) |  [EQUITIES Hub ProxyAdmin](https://basescan.org/address/0xeb681e0cA77FA31b26D9C8FeCF8A7A7aE0512707) |  HUB_FEE_MINTER_ROLE |   |  mintFeeShares | |--------|--------|--------|--------|--------|
|  [EQUITIES Hub](https://basescan.org/address/0xa4d5947Eb727A052bae69C593FfC84247EC9864E) |  [EQUITIES Hub ProxyAdmin](https://basescan.org/address/0xeb681e0cA77FA31b26D9C8FeCF8A7A7aE0512707) |  HUB_DEFICIT_ELIMINATOR_ROLE |   |  eliminateDeficit | |--------|--------|--------|--------|--------|
|  [HubConfigurator](https://basescan.org/address/0x2Cd40DFF9f2F74e8765dA148102b6668A5e9778A) |  - |  HUB_CONFIGURATOR_DOMAIN_ADMIN_ROLE |  [V4 Security Council Executor](https://basescan.org/address/0xA9D9923A1ADC1200771aaaA38CFeD6A5b8483d70), [Executor_lvl1](https://basescan.org/address/0x9390B1735def18560c509E2d0bc090E9d6BA257a) |  addAsset, addAssetWithDecimals, updateLiquidityFee, updateFeeReceiver, updateFeeConfig, updateInterestRateStrategy, updateReinvestmentController, resetAssetCaps, deactivateAsset, haltAsset, addSpoke, addSpokeToAssets, updateSpokeActive, updateSpokeHalted, updateSpokeAddCap, updateSpokeDrawCap, updateSpokeRiskPremiumThreshold, updateSpokeCaps, deactivateSpoke, haltSpoke, resetSpokeCaps, updateInterestRateData | |--------|--------|--------|--------|--------|
|  [MAG7 Spoke](https://basescan.org/address/0x17905Db0e4A3514467539956c084180616AE7B8D) |  [MAG7 Spoke ProxyAdmin](https://basescan.org/address/0x45eb3a4CAE1E8f74f03E08B6aC45f68a3A518ba4) |  SPOKE_CONFIGURATOR_ROLE |  [SpokeConfigurator](https://basescan.org/address/0x0191B1Aa743c6B3C545119B5D56a0577D7f3a57F) |  updateLiquidationConfig, addReserve, updateReserveConfig, updateDynamicReserveConfig, addDynamicReserveConfig, updatePositionManager, updateReservePriceSource | |--------|--------|--------|--------|--------|
|  [MAG7 Spoke](https://basescan.org/address/0x17905Db0e4A3514467539956c084180616AE7B8D) |  [MAG7 Spoke ProxyAdmin](https://basescan.org/address/0x45eb3a4CAE1E8f74f03E08B6aC45f68a3A518ba4) |  SPOKE_USER_POSITION_UPDATER_ROLE |   |  updateUserDynamicConfig, updateUserRiskPremium | |--------|--------|--------|--------|--------|
|  [SpokeConfigurator](https://basescan.org/address/0x0191B1Aa743c6B3C545119B5D56a0577D7f3a57F) |  - |  SPOKE_CONFIGURATOR_DOMAIN_ADMIN_ROLE |  [V4 Security Council Executor](https://basescan.org/address/0xA9D9923A1ADC1200771aaaA38CFeD6A5b8483d70) |  updateReservePriceSource, updateLiquidationTargetHealthFactor, updateHealthFactorForMaxBonus, updateLiquidationBonusFactor, updateLiquidationConfig, addReserve, updatePaused, updateFrozen, updateBorrowable, updateReceiveSharesEnabled, updateCollateralRisk, addCollateralFactor, updateCollateralFactor, addMaxLiquidationBonus, updateMaxLiquidationBonus, addLiquidationFee, updateLiquidationFee, addDynamicReserveConfig, updateDynamicReserveConfig, pauseAllReserves, freezeAllReserves, pauseReserve, freezeReserve, updatePositionManager | |--------|--------|--------|--------|--------|
|  [TreasurySpoke](https://basescan.org/address/0x5F8d0102F5B51Fae6DE9d2F2561bda63Fb5Db674) |  [TreasurySpoke ProxyAdmin](https://basescan.org/address/0x14d27703A0dA83260BB54B7F14314B2914Be7C47) |  onlyOwner |  [V4 Security Council](https://basescan.org/address/0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9) |  supply, supplySkimmed, withdraw, transfer | |--------|--------|--------|--------|--------|

### PositionManagers Contracts
| contract |proxyAdmin |modifier |permission owner |functions |
|----------|----------|----------|----------|----------|
|  [GIVER POSITION MANAGER](https://basescan.org/address/0x9E81c2fDE4E34CAB3AB1667ca3c932dBAED95F08) |  - |  onlyOwner |  [0x4C11ed256D43762811B093145e6F6b58F2be4782](https://basescan.org/address/0x4C11ed256D43762811B093145e6F6b58F2be4782) |  registerSpoke, renouncePositionManagerRole | |--------|--------|--------|--------|--------|
|  [TAKER POSITION MANAGER](https://basescan.org/address/0x8481204E528735aF2F3391AD98f36E757A56D695) |  - |  onlyOwner |  [0x4C11ed256D43762811B093145e6F6b58F2be4782](https://basescan.org/address/0x4C11ed256D43762811B093145e6F6b58F2be4782) |  registerSpoke | |--------|--------|--------|--------|--------|
|  [CONFIG POSITION MANAGER](https://basescan.org/address/0xe90F830bEe4b190B4910e146908437075b0BDaaF) |  - |  onlyOwner |  [0x4C11ed256D43762811B093145e6F6b58F2be4782](https://basescan.org/address/0x4C11ed256D43762811B093145e6F6b58F2be4782) |  registerSpoke | |--------|--------|--------|--------|--------|
|  [NATIVE TOKEN GATEWAY](https://basescan.org/address/0xdFC11f7037Ba11D9cC29A822844f5dC19C42B70d) |  - |  onlyOwner |  [0x4C11ed256D43762811B093145e6F6b58F2be4782](https://basescan.org/address/0x4C11ed256D43762811B093145e6F6b58F2be4782) |  registerSpoke, renouncePositionManagerRole | |--------|--------|--------|--------|--------|
|  [SIGNATURE GATEWAY](https://basescan.org/address/0x5d488d3EAAa86DDb6D4f834FC34938054eC505A7) |  - |  onlyOwner |  [0x4C11ed256D43762811B093145e6F6b58F2be4782](https://basescan.org/address/0x4C11ed256D43762811B093145e6F6b58F2be4782) |  registerSpoke, renouncePositionManagerRole | |--------|--------|--------|--------|--------|

### Spoke PositionManagers
| spoke |active position managers |
|----------|----------|
|  [MAG7 Spoke](https://basescan.org/address/0x17905Db0e4A3514467539956c084180616AE7B8D) |  [GIVER POSITION MANAGER](https://basescan.org/address/0x9E81c2fDE4E34CAB3AB1667ca3c932dBAED95F08), [TAKER POSITION MANAGER](https://basescan.org/address/0x8481204E528735aF2F3391AD98f36E757A56D695), [CONFIG POSITION MANAGER](https://basescan.org/address/0xe90F830bEe4b190B4910e146908437075b0BDaaF), [NATIVE TOKEN GATEWAY](https://basescan.org/address/0xdFC11f7037Ba11D9cC29A822844f5dC19C42B70d), [SIGNATURE GATEWAY](https://basescan.org/address/0x5d488d3EAAa86DDb6D4f834FC34938054eC505A7) | |--------|--------|

### Guardians 
| Guardian |Threshold |Address |Owners |
|----------|----------|----------|----------|
|  [V4 Security Council](https://basescan.org/address/0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9) |  5/9 |  0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9 |  [0x606dC57cd166643760E049609bfd1D8a698D3bAc](https://basescan.org/address/0x606dC57cd166643760E049609bfd1D8a698D3bAc), [0x76c82c2cB7C5dB3B053A251F3281081C6EC40FDF](https://basescan.org/address/0x76c82c2cB7C5dB3B053A251F3281081C6EC40FDF), [0x9AB4e51a7cd8cE1279D9dbfA01Ad61367C3e3749](https://basescan.org/address/0x9AB4e51a7cd8cE1279D9dbfA01Ad61367C3e3749), [0xc0A15667D6c63ac2CBFCAf5ABbFA0639018B2065](https://basescan.org/address/0xc0A15667D6c63ac2CBFCAf5ABbFA0639018B2065), [0x437B97618dFB8c8B1f403Bd2E9436730f0f9D884](https://basescan.org/address/0x437B97618dFB8c8B1f403Bd2E9436730f0f9D884), [0x75C26ED4D9c5D331665766394D933E12f8597a55](https://basescan.org/address/0x75C26ED4D9c5D331665766394D933E12f8597a55), [0xbf113Fa52454A94185b65e6f2E818B7f178f937a](https://basescan.org/address/0xbf113Fa52454A94185b65e6f2E818B7f178f937a), [0x9440850335c7C2a644dc2abEBBA93463c9736F2C](https://basescan.org/address/0x9440850335c7C2a644dc2abEBBA93463c9736F2C), [0x5063b3D23C3640d51c9E2aef41063B1d482C70ff](https://basescan.org/address/0x5063b3D23C3640d51c9E2aef41063B1d482C70ff) | |--------|--------|--------|--------|

### AccessManager Roles
| Role |Contract |
|----------|----------|
|  ACCESS_MANAGER_DEFAULT_ADMIN |  [Executor_lvl1](https://basescan.org/address/0x9390B1735def18560c509E2d0bc090E9d6BA257a), [V4 Security Council](https://basescan.org/address/0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9) | |--------|--------|
|  HUB_CONFIGURATOR_ROLE |  [HubConfigurator](https://basescan.org/address/0x2Cd40DFF9f2F74e8765dA148102b6668A5e9778A) | |--------|--------|
|  HUB_CONFIGURATOR_DOMAIN_ADMIN_ROLE |  [V4 Security Council Executor](https://basescan.org/address/0xA9D9923A1ADC1200771aaaA38CFeD6A5b8483d70), [Executor_lvl1](https://basescan.org/address/0x9390B1735def18560c509E2d0bc090E9d6BA257a) | |--------|--------|
|  SPOKE_CONFIGURATOR_ROLE |  [SpokeConfigurator](https://basescan.org/address/0x0191B1Aa743c6B3C545119B5D56a0577D7f3a57F) | |--------|--------|
|  SPOKE_CONFIGURATOR_DOMAIN_ADMIN_ROLE |  [V4 Security Council Executor](https://basescan.org/address/0xA9D9923A1ADC1200771aaaA38CFeD6A5b8483d70) | |--------|--------|

