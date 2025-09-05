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
|  updateReserveCaps |  Governance,Multi-sig,Steward | |--------|--------|
|  updateReserveSettings |  Governance | |--------|--------|
|  configureCollateral |  Governance | |--------|--------|
|  upgradeAaveTokens (a/v/s) |  Governance,Multi-sig | |--------|--------|
|  upgradeAaveOracles |  Governance,Multi-sig | |--------|--------|
|  reserveUpgradeability |  Governance | |--------|--------|
|  pausePool |  Governance,Multi-sig | |--------|--------|
|  pauseAndFreezeReserve |  Governance,Multi-sig,Steward | |--------|--------|
|  reserveListing |  Governance,Multi-sig | |--------|--------|
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
|  [Pool](https://celoscan.io//address/0x3E59A31363E2ad014dcbc521c4a0d5757d9f3402) |  [PoolAddressesProvider](https://celoscan.io//address/0x9F7Cf9417D5251C59fE94fB9147feEe1aAd9Cea5) |  onlyPoolAdmin |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D), [Aave Protocol Guardian Celo](https://celoscan.io//address/0x88E7aB6ee481Cf92e548c0e1169F824F99142c85) |  rescueTokens | |--------|--------|--------|--------|--------|
|  [PoolConfigurator](https://celoscan.io//address/0x7567E3434CC1BEf724AB595e6072367Ef4914691) |  [PoolAddressesProvider](https://celoscan.io//address/0x9F7Cf9417D5251C59fE94fB9147feEe1aAd9Cea5) |  onlyPoolAdmin |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D), [Aave Protocol Guardian Celo](https://celoscan.io//address/0x88E7aB6ee481Cf92e548c0e1169F824F99142c85) |  dropReserve, dropReserve, updateAToken, updateStableDebtToken, updateVariableDebtToken, setReserveActive, updateBridgeProtocolFee, updateFlashloanPremiumTotal, updateFlashloanPremiumToProtocol | |--------|--------|--------|--------|--------|
|  [PoolConfigurator](https://celoscan.io//address/0x7567E3434CC1BEf724AB595e6072367Ef4914691) |  [PoolAddressesProvider](https://celoscan.io//address/0x9F7Cf9417D5251C59fE94fB9147feEe1aAd9Cea5) |  onlyAssetListingOrPoolAdmins |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D), [Aave Protocol Guardian Celo](https://celoscan.io//address/0x88E7aB6ee481Cf92e548c0e1169F824F99142c85) |  initReserves | |--------|--------|--------|--------|--------|
|  [PoolConfigurator](https://celoscan.io//address/0x7567E3434CC1BEf724AB595e6072367Ef4914691) |  [PoolAddressesProvider](https://celoscan.io//address/0x9F7Cf9417D5251C59fE94fB9147feEe1aAd9Cea5) |  onlyRiskOrPoolAdmins |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D), [Aave Protocol Guardian Celo](https://celoscan.io//address/0x88E7aB6ee481Cf92e548c0e1169F824F99142c85), [Manual AGRS](https://celoscan.io//address/0xdb93e2712a8B36835078f8D28c70fCC95FD6d37c) |  setReserveBorrowing, setReserveBorrowing, configureReserveAsCollateral, setReserveStableRateBorrowing, setBorrowableInIsolation, setReserveFactor, setDebtCeiling, setSiloedBorrowing, setBorrowCap, setSupplyCap, setLiquidationProtocolFee, setEModeCategory, setAssetEModeCategory, setUnbackedMintCap, setReserveInterestRateStrategyAddress, setReserveFlashLoaning | |--------|--------|--------|--------|--------|
|  [PoolConfigurator](https://celoscan.io//address/0x7567E3434CC1BEf724AB595e6072367Ef4914691) |  [PoolAddressesProvider](https://celoscan.io//address/0x9F7Cf9417D5251C59fE94fB9147feEe1aAd9Cea5) |  onlyRiskOrPoolOrEmergencyAdmins |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D), [Aave Protocol Guardian Celo](https://celoscan.io//address/0x88E7aB6ee481Cf92e548c0e1169F824F99142c85), [Manual AGRS](https://celoscan.io//address/0xdb93e2712a8B36835078f8D28c70fCC95FD6d37c) |  setReserveFreeze | |--------|--------|--------|--------|--------|
|  [PoolConfigurator](https://celoscan.io//address/0x7567E3434CC1BEf724AB595e6072367Ef4914691) |  [PoolAddressesProvider](https://celoscan.io//address/0x9F7Cf9417D5251C59fE94fB9147feEe1aAd9Cea5) |  onlyEmergencyOrPoolAdmin |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D), [Aave Protocol Guardian Celo](https://celoscan.io//address/0x88E7aB6ee481Cf92e548c0e1169F824F99142c85) |  setPoolPause, setReservePause | |--------|--------|--------|--------|--------|
|  [AaveOracle](https://celoscan.io//address/0x1e693D088ceFD1E95ba4c4a5F7EeA41a1Ec37e8b) |  - |  onlyAssetListingOrPoolAdmins |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D), [Aave Protocol Guardian Celo](https://celoscan.io//address/0x88E7aB6ee481Cf92e548c0e1169F824F99142c85) |  setAssetSources, setFallbackOracle | |--------|--------|--------|--------|--------|
|  [RewardsController](https://celoscan.io//address/0x4725A0FdbEB14A77964bC1C221eE3a7982263103) |  [PoolAddressesProvider](https://celoscan.io//address/0x9F7Cf9417D5251C59fE94fB9147feEe1aAd9Cea5) |  onlyEmissionManager |  [EmissionManager](https://celoscan.io//address/0x9e04Cb339163b06068397d9b6af2dA78440954e0) |  configureAssets, setTransferStrategy, setRewardOracle, setClaimer | |--------|--------|--------|--------|--------|
|  [EmissionManager](https://celoscan.io//address/0x9e04Cb339163b06068397d9b6af2dA78440954e0) |  - |  onlyOwner |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) |  setClaimer, setEmissionAdmin, setRewardsController | |--------|--------|--------|--------|--------|
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
|  [Aave Protocol Guardian Celo](https://celoscan.io//address/0x88E7aB6ee481Cf92e548c0e1169F824F99142c85) |  5/9 |  0x88E7aB6ee481Cf92e548c0e1169F824F99142c85 |  [0x5d49dBcdd300aECc2C311cFB56593E71c445d60d](https://celoscan.io//address/0x5d49dBcdd300aECc2C311cFB56593E71c445d60d), [0xbA037E4746ff58c55dc8F27a328C428F258DDACb](https://celoscan.io//address/0xbA037E4746ff58c55dc8F27a328C428F258DDACb), [0x818C277dBE886b934e60aa047250A73529E26A99](https://celoscan.io//address/0x818C277dBE886b934e60aa047250A73529E26A99), [0x4f96743057482a2E10253AFDacDA3fd9CF2C1DC9](https://celoscan.io//address/0x4f96743057482a2E10253AFDacDA3fd9CF2C1DC9), [0xb647055A9915bF9c8021a684E175A353525b9890](https://celoscan.io//address/0xb647055A9915bF9c8021a684E175A353525b9890), [0x57ab7ee15cE5ECacB1aB84EE42D5A9d0d8112922](https://celoscan.io//address/0x57ab7ee15cE5ECacB1aB84EE42D5A9d0d8112922), [0xC5bE5c0134857B4b96F45AA6f6B77DB96Ac1487e](https://celoscan.io//address/0xC5bE5c0134857B4b96F45AA6f6B77DB96Ac1487e), [0xd4af2E86a27F8F77B0556E081F97B215C9cA8f2E](https://celoscan.io//address/0xd4af2E86a27F8F77B0556E081F97B215C9cA8f2E), [0xf71fc92e2949ccF6A5Fd369a0b402ba80Bc61E02](https://celoscan.io//address/0xf71fc92e2949ccF6A5Fd369a0b402ba80Bc61E02) | |--------|--------|--------|--------|
|  [Risk Council](https://celoscan.io//address/0xd85786B5FC61E2A0c0a3144a33A0fC70646a99f6) |  2/2 |  0xd85786B5FC61E2A0c0a3144a33A0fC70646a99f6 |  [0xc2cf0387f2a83A7F5C6675F4CDe7F367ea1B989a](https://celoscan.io//address/0xc2cf0387f2a83A7F5C6675F4CDe7F367ea1B989a), [0x5d49dBcdd300aECc2C311cFB56593E71c445d60d](https://celoscan.io//address/0x5d49dBcdd300aECc2C311cFB56593E71c445d60d) | |--------|--------|--------|--------|
|  [BGD](https://celoscan.io//address/0xfD3a6E65e470a7D7D730FFD5D36a9354E8F9F4Ea) |  2/3 |  0xfD3a6E65e470a7D7D730FFD5D36a9354E8F9F4Ea |  [0x0650302887619fa7727D8BD480Cda11A638B219B](https://celoscan.io//address/0x0650302887619fa7727D8BD480Cda11A638B219B), [0xf71fc92e2949ccF6A5Fd369a0b402ba80Bc61E02](https://celoscan.io//address/0xf71fc92e2949ccF6A5Fd369a0b402ba80Bc61E02), [0x5811d9FF80ff4B73A8F9bA42A6082FaB82E89Ea7](https://celoscan.io//address/0x5811d9FF80ff4B73A8F9bA42A6082FaB82E89Ea7) | |--------|--------|--------|--------|
|  [Aave Governance Guardian Celo](https://celoscan.io//address/0x056E4C4E80D1D14a637ccbD0412CDAAEc5B51F4E) |  5/9 |  0x056E4C4E80D1D14a637ccbD0412CDAAEc5B51F4E |  [0xDA5Ae43e179987a66B9831F92223567e1F38BE7D](https://celoscan.io//address/0xDA5Ae43e179987a66B9831F92223567e1F38BE7D), [0x1e3804357eD445251FfECbb6e40107bf03888885](https://celoscan.io//address/0x1e3804357eD445251FfECbb6e40107bf03888885), [0x4f96743057482a2E10253AFDacDA3fd9CF2C1DC9](https://celoscan.io//address/0x4f96743057482a2E10253AFDacDA3fd9CF2C1DC9), [0xebED04E9137AfeBFF6a1B97aC0adf61a544eFE29](https://celoscan.io//address/0xebED04E9137AfeBFF6a1B97aC0adf61a544eFE29), [0xbd4DCfA978c6D0d342cE36809AfFFa49d4B7f1F7](https://celoscan.io//address/0xbd4DCfA978c6D0d342cE36809AfFFa49d4B7f1F7), [0xA3103D0ED00d24795Faa2d641ACf6A320EeD7396](https://celoscan.io//address/0xA3103D0ED00d24795Faa2d641ACf6A320EeD7396), [0x936CD9654271083cCF93A975919Da0aB3Bc99EF3](https://celoscan.io//address/0x936CD9654271083cCF93A975919Da0aB3Bc99EF3), [0x0D2394C027602Dc4c3832Ffd849b5df45DBac0E9](https://celoscan.io//address/0x0D2394C027602Dc4c3832Ffd849b5df45DBac0E9), [0x4C30E33758216aD0d676419c21CB8D014C68099f](https://celoscan.io//address/0x4C30E33758216aD0d676419c21CB8D014C68099f) | |--------|--------|--------|--------|

### Admins 
| Role |Contract |
|----------|----------|
|  DEFAULT_ADMIN |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) | |--------|--------|
|  POOL_ADMIN |  [Executor_lvl1](https://celoscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D), [Aave Protocol Guardian Celo](https://celoscan.io//address/0x88E7aB6ee481Cf92e548c0e1169F824F99142c85) | |--------|--------|
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

