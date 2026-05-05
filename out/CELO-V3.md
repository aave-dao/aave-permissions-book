# CELO 
## V3 
### Contracts upgradeability
| contract |upgradeable by |
|----------|----------|
|  [PoolAddressesProvider](https://celoscan.io//address/0x9F7Cf9417D5251C59fE94fB9147feEe1aAd9Cea5) |  not upgradeable | |--------|--------|
|  [Pool](https://celoscan.io//address/0x3E59A31363E2ad014dcbc521c4a0d5757d9f3402) |  Governance | |--------|--------|
|  [PoolConfigurator](https://celoscan.io//address/0x7567E3434CC1BEf724AB595e6072367Ef4914691) |  Governance | |--------|--------|
|  [AaveOracle](https://celoscan.io//address/0x1e693D088ceFD1E95ba4c4a5F7EeA41a1Ec37e8b) |  not upgradeable | |--------|--------|
|  [RewardsController](https://celoscan.io//address/0x4725A0FdbEB14A77964bC1C221eE3a7982263103) |  Governance | |--------|--------|
|  [EmissionManager](https://celoscan.io//address/0x9e04Cb339163b06068397d9b6af2dA78440954e0) |  not upgradeable | |--------|--------|
|  [PoolAddressesProviderRegistry](https://celoscan.io//address/0xB4B6939D0804DCE8d0Ac3e59b2eD5C072829d56b) |  not upgradeable | |--------|--------|
|  [ProxyAdmin](https://celoscan.io//address/0x54BDcc37c4143f944A3EE51C892a6cBDF305E7a0) |  not upgradeable | |--------|--------|
|  [ACLManager](https://celoscan.io//address/0x7a12dCfd73C1B4cddf294da4cFce75FcaBBa314C) |  not upgradeable | |--------|--------|
|  [Manual AGRS](https://celoscan.io//address/0xdb93e2712a8B36835078f8D28c70fCC95FD6d37c) |  not upgradeable | |--------|--------|
|  [Collector](https://celoscan.io//address/0xC959439207dA5341B74aDcdAC59016aa9Be7E9E7) |  Governance | |--------|--------|
|  [CollectorProxyAdmin](https://celoscan.io//address/0x3be917ff374858325b69623fa44556a6ebee7413) |  not upgradeable | |--------|--------|
|  Aave a/v/s tokens |  Governance | |--------|--------|
|  [GranularGuardian](https://celoscan.io//address/0xbE815420A63A413BB8D508d8022C0FF150Ea7C39) |  not upgradeable | |--------|--------|
|  [PayloadsController](https://celoscan.io//address/0xE48E10834C04E394A04BF22a565D063D40b9FA42) |  Governance | |--------|--------|
|  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) |  not upgradeable | |--------|--------|
|  [CCIP adapter](https://celoscan.io//address/0x3d534E8964e7aAcfc702751cc9A2BB6A9fe7d928) |  not upgradeable | |--------|--------|
|  [LayerZero adapter](https://celoscan.io//address/0x83BC62fbeA15B7Bfe11e8eEE57997afA5451f38C) |  not upgradeable | |--------|--------|
|  [Hyperlane adapter](https://celoscan.io//address/0x7b065E68E70f346B18636Ab86779980287ec73e0) |  not upgradeable | |--------|--------|
|  [CrossChainController](https://celoscan.io//address/0x50F4dAA86F3c747ce15C3C38bD0383200B61d6Dd) |  Governance | |--------|--------|

### Actions type
| type |can be executed by |
|----------|----------|
|  updateReserveBorrowSettings |  Governance | |--------|--------|
|  configureProtocolFees |  Governance | |--------|--------|
|  updateReserveCaps |  Governance,Steward | |--------|--------|
|  updateReserveSettings |  Governance | |--------|--------|
|  configureCollateral |  Governance | |--------|--------|
|  upgradeAaveTokens (a/v/s) |  Governance | |--------|--------|
|  upgradeAaveOracles |  Governance | |--------|--------|
|  reserveUpgradeability |  Governance | |--------|--------|
|  pausePool |  Governance,Multi-sig | |--------|--------|
|  pauseAndFreezeReserve |  Governance,Steward,Multi-sig | |--------|--------|
|  reserveListing |  Governance | |--------|--------|
|  adminsConfiguration |  Governance | |--------|--------|
|  protocolUpgradeablity |  Governance | |--------|--------|
|  adiConfigurations |  Governance | |--------|--------|
|  retryAndInvalidateMessages |  Multi-sig,Governance | |--------|--------|
|  updateRiskParameters |  Steward | |--------|--------|

### Contracts
| contract |proxyAdmin |modifier |permission owner |functions |
|----------|----------|----------|----------|----------|
|  [PoolAddressesProvider](https://celoscan.io//address/0x9F7Cf9417D5251C59fE94fB9147feEe1aAd9Cea5) |  - |  onlyOwner |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) |  setMarketId, setAddress, setAddressAsProxy, setPoolImpl, setPoolConfiguratorImpl, setPriceOracle, setACLManager, setACLAdmin, setPriceOracleSentinel, setPoolDataProvider | |--------|--------|--------|--------|--------|
|  [Pool](https://celoscan.io//address/0x3E59A31363E2ad014dcbc521c4a0d5757d9f3402) |  [PoolAddressesProvider](https://celoscan.io//address/0x9F7Cf9417D5251C59fE94fB9147feEe1aAd9Cea5) |  onlyPoolConfigurator |  [PoolConfigurator](https://celoscan.io//address/0x7567E3434CC1BEf724AB595e6072367Ef4914691) |  initReserve, dropReserve, setReserveInterestRateStrategyAddress, setConfiguration, updateBridgeProtocolFee, updateFlashloanPremiums, configureEModeCategory, resetIsolationModeTotalDebt | |--------|--------|--------|--------|--------|
|  [Pool](https://celoscan.io//address/0x3E59A31363E2ad014dcbc521c4a0d5757d9f3402) |  [PoolAddressesProvider](https://celoscan.io//address/0x9F7Cf9417D5251C59fE94fB9147feEe1aAd9Cea5) |  onlyPoolAdmin |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) |  rescueTokens | |--------|--------|--------|--------|--------|
|  [PoolConfigurator](https://celoscan.io//address/0x7567E3434CC1BEf724AB595e6072367Ef4914691) |  [PoolAddressesProvider](https://celoscan.io//address/0x9F7Cf9417D5251C59fE94fB9147feEe1aAd9Cea5) |  onlyPoolAdmin |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) |  dropReserve, dropReserve, updateAToken, updateStableDebtToken, updateVariableDebtToken, setReserveActive, updateBridgeProtocolFee, updateFlashloanPremiumTotal, updateFlashloanPremiumToProtocol | |--------|--------|--------|--------|--------|
|  [PoolConfigurator](https://celoscan.io//address/0x7567E3434CC1BEf724AB595e6072367Ef4914691) |  [PoolAddressesProvider](https://celoscan.io//address/0x9F7Cf9417D5251C59fE94fB9147feEe1aAd9Cea5) |  onlyAssetListingOrPoolAdmins |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) |  initReserves | |--------|--------|--------|--------|--------|
|  [PoolConfigurator](https://celoscan.io//address/0x7567E3434CC1BEf724AB595e6072367Ef4914691) |  [PoolAddressesProvider](https://celoscan.io//address/0x9F7Cf9417D5251C59fE94fB9147feEe1aAd9Cea5) |  onlyRiskOrPoolAdmins |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D), [Manual AGRS](https://celoscan.io//address/0xdb93e2712a8B36835078f8D28c70fCC95FD6d37c) |  setReserveBorrowing, setReserveBorrowing, configureReserveAsCollateral, setReserveStableRateBorrowing, setBorrowableInIsolation, setReserveFactor, setDebtCeiling, setSiloedBorrowing, setBorrowCap, setSupplyCap, setLiquidationProtocolFee, setEModeCategory, setAssetEModeCategory, setUnbackedMintCap, setReserveInterestRateStrategyAddress, setReserveFlashLoaning | |--------|--------|--------|--------|--------|
|  [PoolConfigurator](https://celoscan.io//address/0x7567E3434CC1BEf724AB595e6072367Ef4914691) |  [PoolAddressesProvider](https://celoscan.io//address/0x9F7Cf9417D5251C59fE94fB9147feEe1aAd9Cea5) |  onlyRiskOrPoolOrEmergencyAdmins |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D), [Manual AGRS](https://celoscan.io//address/0xdb93e2712a8B36835078f8D28c70fCC95FD6d37c), [Aave Protocol Guardian Celo](https://celoscan.io//address/0x88E7aB6ee481Cf92e548c0e1169F824F99142c85) |  setReserveFreeze | |--------|--------|--------|--------|--------|
|  [PoolConfigurator](https://celoscan.io//address/0x7567E3434CC1BEf724AB595e6072367Ef4914691) |  [PoolAddressesProvider](https://celoscan.io//address/0x9F7Cf9417D5251C59fE94fB9147feEe1aAd9Cea5) |  onlyEmergencyOrPoolAdmin |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D), [Aave Protocol Guardian Celo](https://celoscan.io//address/0x88E7aB6ee481Cf92e548c0e1169F824F99142c85) |  setPoolPause, setReservePause | |--------|--------|--------|--------|--------|
|  [AaveOracle](https://celoscan.io//address/0x1e693D088ceFD1E95ba4c4a5F7EeA41a1Ec37e8b) |  - |  onlyAssetListingOrPoolAdmins |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) |  setAssetSources, setFallbackOracle | |--------|--------|--------|--------|--------|
|  [RewardsController](https://celoscan.io//address/0x4725A0FdbEB14A77964bC1C221eE3a7982263103) |  [PoolAddressesProvider](https://celoscan.io//address/0x9F7Cf9417D5251C59fE94fB9147feEe1aAd9Cea5) |  onlyEmissionManager |  [EmissionManager](https://celoscan.io//address/0x9e04Cb339163b06068397d9b6af2dA78440954e0) |  configureAssets, setTransferStrategy, setRewardOracle, setClaimer | |--------|--------|--------|--------|--------|
|  [EmissionManager](https://celoscan.io//address/0x9e04Cb339163b06068397d9b6af2dA78440954e0) |  - |  onlyOwner |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) |  setClaimer, setEmissionAdmin, setRewardsController, renounceOwnership, transferOwnership | |--------|--------|--------|--------|--------|
|  [EmissionManager](https://celoscan.io//address/0x9e04Cb339163b06068397d9b6af2dA78440954e0) |  - |  onlyEmissionAdmin |  [ACI Safe](https://celoscan.io//address/0xac140648435d03f784879cd789130F22Ef588Fcd) |  configureAssets, setTransferStrategy, setRewardOracle, setDistributionEnd, setEmissionPerSecond | |--------|--------|--------|--------|--------|
|  [PoolAddressesProviderRegistry](https://celoscan.io//address/0xB4B6939D0804DCE8d0Ac3e59b2eD5C072829d56b) |  - |  onlyOwner |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) |  registerAddressesProvider, unregisterAddressesProvider | |--------|--------|--------|--------|--------|
|  [ProxyAdmin](https://celoscan.io//address/0x54BDcc37c4143f944A3EE51C892a6cBDF305E7a0) |  - |  onlyOwner |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|
|  [ACLManager](https://celoscan.io//address/0x7a12dCfd73C1B4cddf294da4cFce75FcaBBa314C) |  - |  onlyRole |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) |  setRoleAdmin | |--------|--------|--------|--------|--------|
|  [Manual AGRS](https://celoscan.io//address/0xdb93e2712a8B36835078f8D28c70fCC95FD6d37c) |  - |  onlyOwner |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) |  setRiskConfig, setAddressRestricted | |--------|--------|--------|--------|--------|
|  [Manual AGRS](https://celoscan.io//address/0xdb93e2712a8B36835078f8D28c70fCC95FD6d37c) |  - |  onlyRiskCouncil |  [Risk Council](https://celoscan.io//address/0xd85786B5FC61E2A0c0a3144a33A0fC70646a99f6) |  updateCaps, updateRates, updateCollateralSide, updateLstPriceCaps, updateStablePriceCaps | |--------|--------|--------|--------|--------|
|  [Collector](https://celoscan.io//address/0xC959439207dA5341B74aDcdAC59016aa9Be7E9E7) |  [CollectorProxyAdmin](https://celoscan.io//address/0x3Be917Ff374858325b69623FA44556a6ebEe7413) |  onlyFundsAdmin |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) |  approve, transfer, setFundsAdmin, createStream | |--------|--------|--------|--------|--------|
|  [Collector](https://celoscan.io//address/0xC959439207dA5341B74aDcdAC59016aa9Be7E9E7) |  [CollectorProxyAdmin](https://celoscan.io//address/0x3Be917Ff374858325b69623FA44556a6ebEe7413) |  onlyAdminOrRecipient |  [CollectorProxyAdmin](https://celoscan.io//address/0x3Be917Ff374858325b69623FA44556a6ebEe7413), [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) |  withdrawFromStream, cancelStream | |--------|--------|--------|--------|--------|
|  [CollectorProxyAdmin](https://celoscan.io//address/0x3be917ff374858325b69623fa44556a6ebee7413) |  - |  onlyOwner |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|

### Governance V3 Contracts
| contract |proxyAdmin |modifier |permission owner |functions |
|----------|----------|----------|----------|----------|
|  [GranularGuardian](https://celoscan.io//address/0xbE815420A63A413BB8D508d8022C0FF150Ea7C39) |  - |  onlyRetryGuardian |  [BGD](https://celoscan.io//address/0xfD3a6E65e470a7D7D730FFD5D36a9354E8F9F4Ea) |  retryEnvelope, retryTransaction | |--------|--------|--------|--------|--------|
|  [GranularGuardian](https://celoscan.io//address/0xbE815420A63A413BB8D508d8022C0FF150Ea7C39) |  - |  onlyEmergencyGuardian |  [Aave Governance Guardian Celo](https://celoscan.io//address/0x056E4C4E80D1D14a637ccbD0412CDAAEc5B51F4E) |  solveEmergency | |--------|--------|--------|--------|--------|
|  [GranularGuardian](https://celoscan.io//address/0xbE815420A63A413BB8D508d8022C0FF150Ea7C39) |  - |  onlyDefaultAdmin |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) |  updateGuardian | |--------|--------|--------|--------|--------|
|  [PayloadsController](https://celoscan.io//address/0xE48E10834C04E394A04BF22a565D063D40b9FA42) |  [ProxyAdmin](https://celoscan.io//address/0x54BDcc37c4143f944A3EE51C892a6cBDF305E7a0) |  onlyOwner |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) |  updateExecutors | |--------|--------|--------|--------|--------|
|  [PayloadsController](https://celoscan.io//address/0xE48E10834C04E394A04BF22a565D063D40b9FA42) |  [ProxyAdmin](https://celoscan.io//address/0x54BDcc37c4143f944A3EE51C892a6cBDF305E7a0) |  onlyGuardian |  [Aave Governance Guardian Celo](https://celoscan.io//address/0x056E4C4E80D1D14a637ccbD0412CDAAEc5B51F4E) |  cancelPayload | |--------|--------|--------|--------|--------|
|  [PayloadsController](https://celoscan.io//address/0xE48E10834C04E394A04BF22a565D063D40b9FA42) |  [ProxyAdmin](https://celoscan.io//address/0x54BDcc37c4143f944A3EE51C892a6cBDF305E7a0) |  onlyOwnerOrGuardian |  [Aave Governance Guardian Celo](https://celoscan.io//address/0x056E4C4E80D1D14a637ccbD0412CDAAEc5B51F4E), [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) |  updateGuardian | |--------|--------|--------|--------|--------|
|  [PayloadsController](https://celoscan.io//address/0xE48E10834C04E394A04BF22a565D063D40b9FA42) |  [ProxyAdmin](https://celoscan.io//address/0x54BDcc37c4143f944A3EE51C892a6cBDF305E7a0) |  onlyRescueGuardian |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) |  emergencyTokenTransfer, emergencyEtherTransfer | |--------|--------|--------|--------|--------|
|  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) |  - |  onlyOwner |  [PayloadsController](https://celoscan.io//address/0xE48E10834C04E394A04BF22a565D063D40b9FA42) |  executeTransaction | |--------|--------|--------|--------|--------|
|  [CCIP adapter](https://celoscan.io//address/0x3d534E8964e7aAcfc702751cc9A2BB6A9fe7d928) |  - |  trustedRemote |  [CrossChainController(Eth)](https://celoscan.io//address/0xEd42a7D8559a463722Ca4beD50E0Cc05a386b0e1) |  receiveMessage | |--------|--------|--------|--------|--------|
|  [LayerZero adapter](https://celoscan.io//address/0x83BC62fbeA15B7Bfe11e8eEE57997afA5451f38C) |  - |  trustedRemote |  [CrossChainController(Eth)](https://celoscan.io//address/0xEd42a7D8559a463722Ca4beD50E0Cc05a386b0e1) |  receiveMessage | |--------|--------|--------|--------|--------|
|  [Hyperlane adapter](https://celoscan.io//address/0x7b065E68E70f346B18636Ab86779980287ec73e0) |  - |  trustedRemote |  [CrossChainController(Eth)](https://celoscan.io//address/0xEd42a7D8559a463722Ca4beD50E0Cc05a386b0e1) |  receiveMessage | |--------|--------|--------|--------|--------|
|  [CrossChainController](https://celoscan.io//address/0x50F4dAA86F3c747ce15C3C38bD0383200B61d6Dd) |  [ProxyAdmin](https://celoscan.io//address/0x54BDcc37c4143f944A3EE51C892a6cBDF305E7a0) |  onlyOwner |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) |  approveSenders, removeSenders, enableBridgeAdapters, disableBridgeAdapters, updateMessagesValidityTimestamp, allowReceiverBridgeAdapters, disallowReceiverBridgeAdapters | |--------|--------|--------|--------|--------|
|  [CrossChainController](https://celoscan.io//address/0x50F4dAA86F3c747ce15C3C38bD0383200B61d6Dd) |  [ProxyAdmin](https://celoscan.io//address/0x54BDcc37c4143f944A3EE51C892a6cBDF305E7a0) |  onlyOwnerOrGuardian |  [Aave Granular Guardian Celo](https://celoscan.io//address/0xbE815420A63A413BB8D508d8022C0FF150Ea7C39), [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) |  retryEnvelope, retryTransaction, updateGuardian | |--------|--------|--------|--------|--------|
|  [CrossChainController](https://celoscan.io//address/0x50F4dAA86F3c747ce15C3C38bD0383200B61d6Dd) |  [ProxyAdmin](https://celoscan.io//address/0x54BDcc37c4143f944A3EE51C892a6cBDF305E7a0) |  onlyRescueGuardian |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) |  emergencyTokenTransfer, emergencyEtherTransfer | |--------|--------|--------|--------|--------|
|  [CrossChainController](https://celoscan.io//address/0x50F4dAA86F3c747ce15C3C38bD0383200B61d6Dd) |  [ProxyAdmin](https://celoscan.io//address/0x54BDcc37c4143f944A3EE51C892a6cBDF305E7a0) |  onlyApprovedSenders |   |  forwardMessage | |--------|--------|--------|--------|--------|
|  [CrossChainController](https://celoscan.io//address/0x50F4dAA86F3c747ce15C3C38bD0383200B61d6Dd) |  [ProxyAdmin](https://celoscan.io//address/0x54BDcc37c4143f944A3EE51C892a6cBDF305E7a0) |  onlyApprovedBridges |  [CCIP adapter](https://celoscan.io//address/0x3d534E8964e7aAcfc702751cc9A2BB6A9fe7d928), [LayerZero adapter](https://celoscan.io//address/0x83BC62fbeA15B7Bfe11e8eEE57997afA5451f38C), [Hyperlane adapter](https://celoscan.io//address/0x7b065E68E70f346B18636Ab86779980287ec73e0) |  receiveCrossChainMessage | |--------|--------|--------|--------|--------|
|  [CrossChainController](https://celoscan.io//address/0x50F4dAA86F3c747ce15C3C38bD0383200B61d6Dd) |  [ProxyAdmin](https://celoscan.io//address/0x54BDcc37c4143f944A3EE51C892a6cBDF305E7a0) |  onlyGuardian |  [Aave Granular Guardian Celo](https://celoscan.io//address/0xbE815420A63A413BB8D508d8022C0FF150Ea7C39) |  solveEmergency | |--------|--------|--------|--------|--------|

### Guardians 
| Guardian |Threshold |Address |Owners |
|----------|----------|----------|----------|
|  [Aave Protocol Guardian Celo](https://celoscan.io//address/0x88E7aB6ee481Cf92e548c0e1169F824F99142c85) |  5/8 |  0x88E7aB6ee481Cf92e548c0e1169F824F99142c85 |  [0xbA037E4746ff58c55dc8F27a328C428F258DDACb](https://celoscan.io//address/0xbA037E4746ff58c55dc8F27a328C428F258DDACb), [0x818C277dBE886b934e60aa047250A73529E26A99](https://celoscan.io//address/0x818C277dBE886b934e60aa047250A73529E26A99), [0x4f96743057482a2E10253AFDacDA3fd9CF2C1DC9](https://celoscan.io//address/0x4f96743057482a2E10253AFDacDA3fd9CF2C1DC9), [0xb647055A9915bF9c8021a684E175A353525b9890](https://celoscan.io//address/0xb647055A9915bF9c8021a684E175A353525b9890), [0x57ab7ee15cE5ECacB1aB84EE42D5A9d0d8112922](https://celoscan.io//address/0x57ab7ee15cE5ECacB1aB84EE42D5A9d0d8112922), [0xC5bE5c0134857B4b96F45AA6f6B77DB96Ac1487e](https://celoscan.io//address/0xC5bE5c0134857B4b96F45AA6f6B77DB96Ac1487e), [0xd4af2E86a27F8F77B0556E081F97B215C9cA8f2E](https://celoscan.io//address/0xd4af2E86a27F8F77B0556E081F97B215C9cA8f2E), [0xf71fc92e2949ccF6A5Fd369a0b402ba80Bc61E02](https://celoscan.io//address/0xf71fc92e2949ccF6A5Fd369a0b402ba80Bc61E02) | |--------|--------|--------|--------|
|  [ACI Safe](https://celoscan.io//address/0xac140648435d03f784879cd789130F22Ef588Fcd) |  2/3 |  0xac140648435d03f784879cd789130F22Ef588Fcd |  [0x206b3C563258Dd88dd98e5Ff8e2AF975DE16a416](https://celoscan.io//address/0x206b3C563258Dd88dd98e5Ff8e2AF975DE16a416), [0x57ab7ee15cE5ECacB1aB84EE42D5A9d0d8112922](https://celoscan.io//address/0x57ab7ee15cE5ECacB1aB84EE42D5A9d0d8112922), [0x329c54289Ff5D6B7b7daE13592C6B1EDA1543eD4](https://celoscan.io//address/0x329c54289Ff5D6B7b7daE13592C6B1EDA1543eD4) | |--------|--------|--------|--------|
|  [Risk Council](https://celoscan.io//address/0xd85786B5FC61E2A0c0a3144a33A0fC70646a99f6) |  2/2 |  0xd85786B5FC61E2A0c0a3144a33A0fC70646a99f6 |  [0x606dC57cd166643760E049609bfd1D8a698D3bAc](https://celoscan.io//address/0x606dC57cd166643760E049609bfd1D8a698D3bAc), [0xb291232F480F41c75802C4a60F1D2AC03404Afef](https://celoscan.io//address/0xb291232F480F41c75802C4a60F1D2AC03404Afef) | |--------|--------|--------|--------|
|  [BGD](https://celoscan.io//address/0xfD3a6E65e470a7D7D730FFD5D36a9354E8F9F4Ea) |  2/3 |  0xfD3a6E65e470a7D7D730FFD5D36a9354E8F9F4Ea |  [0x0650302887619fa7727D8BD480Cda11A638B219B](https://celoscan.io//address/0x0650302887619fa7727D8BD480Cda11A638B219B), [0xf71fc92e2949ccF6A5Fd369a0b402ba80Bc61E02](https://celoscan.io//address/0xf71fc92e2949ccF6A5Fd369a0b402ba80Bc61E02), [0x5811d9FF80ff4B73A8F9bA42A6082FaB82E89Ea7](https://celoscan.io//address/0x5811d9FF80ff4B73A8F9bA42A6082FaB82E89Ea7) | |--------|--------|--------|--------|
|  [Aave Governance Guardian Celo](https://celoscan.io//address/0x056E4C4E80D1D14a637ccbD0412CDAAEc5B51F4E) |  5/9 |  0x056E4C4E80D1D14a637ccbD0412CDAAEc5B51F4E |  [0xDA5Ae43e179987a66B9831F92223567e1F38BE7D](https://celoscan.io//address/0xDA5Ae43e179987a66B9831F92223567e1F38BE7D), [0x1e3804357eD445251FfECbb6e40107bf03888885](https://celoscan.io//address/0x1e3804357eD445251FfECbb6e40107bf03888885), [0x4f96743057482a2E10253AFDacDA3fd9CF2C1DC9](https://celoscan.io//address/0x4f96743057482a2E10253AFDacDA3fd9CF2C1DC9), [0xebED04E9137AfeBFF6a1B97aC0adf61a544eFE29](https://celoscan.io//address/0xebED04E9137AfeBFF6a1B97aC0adf61a544eFE29), [0xbd4DCfA978c6D0d342cE36809AfFFa49d4B7f1F7](https://celoscan.io//address/0xbd4DCfA978c6D0d342cE36809AfFFa49d4B7f1F7), [0xA3103D0ED00d24795Faa2d641ACf6A320EeD7396](https://celoscan.io//address/0xA3103D0ED00d24795Faa2d641ACf6A320EeD7396), [0x936CD9654271083cCF93A975919Da0aB3Bc99EF3](https://celoscan.io//address/0x936CD9654271083cCF93A975919Da0aB3Bc99EF3), [0x0D2394C027602Dc4c3832Ffd849b5df45DBac0E9](https://celoscan.io//address/0x0D2394C027602Dc4c3832Ffd849b5df45DBac0E9), [0x4C30E33758216aD0d676419c21CB8D014C68099f](https://celoscan.io//address/0x4C30E33758216aD0d676419c21CB8D014C68099f) | |--------|--------|--------|--------|

### Admins
| Role |Contract |
|----------|----------|
|  DEFAULT_ADMIN |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) | |--------|--------|
|  POOL_ADMIN |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) | |--------|--------|
|  EMERGENCY_ADMIN |  [Aave Protocol Guardian Celo](https://celoscan.io//address/0x88E7aB6ee481Cf92e548c0e1169F824F99142c85) | |--------|--------|
|  ASSET_LISTING_ADMIN |   | |--------|--------|
|  FLASH_BORROWER |   | |--------|--------|
|  RISK_ADMIN |  [Manual AGRS](https://celoscan.io//address/0xdb93e2712a8B36835078f8D28c70fCC95FD6d37c) | |--------|--------|

### Granular Guardian Admins
| Role |Contract |
|----------|----------|
|  DEFAULT_ADMIN |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) | |--------|--------|
|  SOLVE_EMERGENCY_ROLE |  [Aave Governance Guardian Celo](https://celoscan.io//address/0x056E4C4E80D1D14a637ccbD0412CDAAEc5B51F4E) | |--------|--------|
|  RETRY_ROLE |  [BGD](https://celoscan.io//address/0xfD3a6E65e470a7D7D730FFD5D36a9354E8F9F4Ea) | |--------|--------|

### Collector Admins
| Role |Contract |
|----------|----------|
|  DEFAULT_ADMIN |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) | |--------|--------|
|  FUNDS_ADMIN_ROLE |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) | |--------|--------|

### Emission Admins
| admin |tokens count |tokens |
|----------|----------|----------|
|  [ACI Safe](https://celoscan.io//address/0xac140648435d03f784879cd789130F22Ef588Fcd) |  12 |  [aCelCELO](https://celoscan.io//address/0xC3e77dC389537Db1EEc7C33B95Cf3beECA71A209), [aCelcEUR](https://celoscan.io//address/0x34c02571094e08E935B8cf8dC10F1Ad6795f1f81), [aCelcUSD](https://celoscan.io//address/0xBba98352628B0B0c4b40583F593fFCb630935a45), [aCelUSDC](https://celoscan.io//address/0xFF8309b9e99bfd2D4021bc71a362aBD93dBd4785), [aCelUSDT](https://celoscan.io//address/0xDeE98402A302e4D707fB9bf2bac66fAEEc31e8Df), [aCelWETH](https://celoscan.io//address/0xf385280F36e009C157697D25E0B802EfaBfd789c), [CELO](https://celoscan.io//address/0x471EcE3750Da237f93B8E339c536989b8978a438), [EURm](https://celoscan.io//address/0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73), [USD₮](https://celoscan.io//address/0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e), [USDC](https://celoscan.io//address/0xcebA9300f2b948710d2653dD7B07f33A8B32118C), [USDm](https://celoscan.io//address/0x765DE816845861e75A25fCA122bb6898B8B1282a), [WETH](https://celoscan.io//address/0xD221812de1BD094f35587EE8E174B07B6167D9Af) | |--------|--------|--------|

