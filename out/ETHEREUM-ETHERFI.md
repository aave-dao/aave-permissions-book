# ETHEREUM 
## ETHERFI 
### Contracts upgradeability
| contract |upgradeable by |
|----------|----------|
|  [PoolAddressesProvider](https://etherscan.io/address/0xeBa440B438Ad808101d1c451C1C5322c90BEFCdA) |  not upgradeable | |--------|--------|
|  [Pool](https://etherscan.io/address/0x0AA97c284e98396202b6A04024F5E2c65026F3c0) |  Governance | |--------|--------|
|  [PoolConfigurator](https://etherscan.io/address/0x8438F4D29D895d75C86BDC25360c25eF0607E65d) |  Governance | |--------|--------|
|  [AaveOracle](https://etherscan.io/address/0x43b64f28A678944E0655404B0B98E443851cC34F) |  not upgradeable | |--------|--------|
|  [RewardsController](https://etherscan.io/address/0x8164Cc65827dcFe994AB23944CBC90e0aa80bFcb) |  Governance | |--------|--------|
|  [WrappedTokenGatewayV3](https://etherscan.io/address/0xf956B38F035dC9067fb827A512D3CF35202AB0Bc) |  not upgradeable | |--------|--------|
|  [ParaSwapLiquiditySwapAdapter](https://etherscan.io/address/0xB04427eFdd15b0EC233400d2F7f7E4fd0291C285) |  not upgradeable | |--------|--------|
|  [ParaSwapRepayAdapter](https://etherscan.io/address/0x23b282c49C88d9161aae14b5eD777B976A5Ae65D) |  not upgradeable | |--------|--------|
|  [EmissionManager](https://etherscan.io/address/0x223d844fc4B006D67c0cDbd39371A9F73f69d974) |  not upgradeable | |--------|--------|
|  [PoolAddressesProviderRegistry](https://etherscan.io/address/0xbaA999AC55EAce41CcAE355c77809e68Bb345170) |  not upgradeable | |--------|--------|
|  [ProxyAdmin](https://etherscan.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  not upgradeable | |--------|--------|
|  [ProxyAdminLong](https://etherscan.io/address/0x86C3FfeE349A7cFf7cA88C449717B1b133bfb517) |  not upgradeable | |--------|--------|
|  [ACLManager](https://etherscan.io/address/0x3cE8E2eb6501d4705477643E96881B1bef6A2DB3) |  not upgradeable | |--------|--------|
|  [AaveMerkleDistributor](https://etherscan.io/address/0xa88c6D90eAe942291325f9ae3c66f3563B93FE10) |  not upgradeable | |--------|--------|
|  [AavePolEthBridge](https://etherscan.io/address/0x1C2BA5b8ab8e795fF44387ba6d251fa65AD20b36) |  not upgradeable | |--------|--------|
|  [Manual AGRS](https://etherscan.io/address/0x9Db34dC89D9BC56A5E2899c328D959eF9E072645) |  not upgradeable | |--------|--------|
|  [Collector](https://etherscan.io/address/0x464C71f6c2F760DdA6093dCB91C24c39e5d6e18c) |  Governance | |--------|--------|
|  [PoolExposureSteward](https://etherscan.io/address/0x22aC12a6937BBBC0a301AF9154d08EaD95673122) |  not upgradeable | |--------|--------|
|  Aave a/v/s tokens |  Governance | |--------|--------|

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
|  configureGovernance |  Governance | |--------|--------|
|  cancelProposal |  Multi-sig | |--------|--------|
|  updateRiskParameters |  Steward | |--------|--------|

### Contracts
| contract |proxyAdmin |modifier |permission owner |functions |
|----------|----------|----------|----------|----------|
|  [PoolAddressesProvider](https://etherscan.io/address/0xeBa440B438Ad808101d1c451C1C5322c90BEFCdA) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  setMarketId, setAddress, setAddressAsProxy, setPoolImpl, setPoolConfiguratorImpl, setPriceOracle, setACLManager, setACLAdmin, setPriceOracleSentinel, setPoolDataProvider | |--------|--------|--------|--------|--------|
|  [Pool](https://etherscan.io/address/0x0AA97c284e98396202b6A04024F5E2c65026F3c0) |  [PoolAddressesProvider](https://etherscan.io/address/0xeBa440B438Ad808101d1c451C1C5322c90BEFCdA) |  onlyPoolConfigurator |  [PoolConfigurator](https://etherscan.io/address/0x8438F4D29D895d75C86BDC25360c25eF0607E65d) |  initReserve, dropReserve, setReserveInterestRateStrategyAddress, setConfiguration, updateBridgeProtocolFee, updateFlashloanPremiums, configureEModeCategory, resetIsolationModeTotalDebt | |--------|--------|--------|--------|--------|
|  [Pool](https://etherscan.io/address/0x0AA97c284e98396202b6A04024F5E2c65026F3c0) |  [PoolAddressesProvider](https://etherscan.io/address/0xeBa440B438Ad808101d1c451C1C5322c90BEFCdA) |  onlyPoolAdmin |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  rescueTokens | |--------|--------|--------|--------|--------|
|  [PoolConfigurator](https://etherscan.io/address/0x8438F4D29D895d75C86BDC25360c25eF0607E65d) |  [PoolAddressesProvider](https://etherscan.io/address/0xeBa440B438Ad808101d1c451C1C5322c90BEFCdA) |  onlyPoolAdmin |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  dropReserve, dropReserve, updateAToken, updateStableDebtToken, updateVariableDebtToken, setReserveActive, updateBridgeProtocolFee, updateFlashloanPremiumTotal, updateFlashloanPremiumToProtocol | |--------|--------|--------|--------|--------|
|  [PoolConfigurator](https://etherscan.io/address/0x8438F4D29D895d75C86BDC25360c25eF0607E65d) |  [PoolAddressesProvider](https://etherscan.io/address/0xeBa440B438Ad808101d1c451C1C5322c90BEFCdA) |  onlyAssetListingOrPoolAdmins |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  initReserves | |--------|--------|--------|--------|--------|
|  [PoolConfigurator](https://etherscan.io/address/0x8438F4D29D895d75C86BDC25360c25eF0607E65d) |  [PoolAddressesProvider](https://etherscan.io/address/0xeBa440B438Ad808101d1c451C1C5322c90BEFCdA) |  onlyRiskOrPoolAdmins |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A), [Etherfi Caps Plus Risk Steward](https://etherscan.io/address/0x1EBdbE77bbDDD284BdCE8D7981D7eD26D6af58cA), [Manual AGRS](https://etherscan.io/address/0x9Db34dC89D9BC56A5E2899c328D959eF9E072645) |  setReserveBorrowing, setReserveBorrowing, configureReserveAsCollateral, setReserveStableRateBorrowing, setBorrowableInIsolation, setReserveFactor, setDebtCeiling, setSiloedBorrowing, setBorrowCap, setSupplyCap, setLiquidationProtocolFee, setEModeCategory, setAssetEModeCategory, setUnbackedMintCap, setReserveInterestRateStrategyAddress, setReserveFlashLoaning | |--------|--------|--------|--------|--------|
|  [PoolConfigurator](https://etherscan.io/address/0x8438F4D29D895d75C86BDC25360c25eF0607E65d) |  [PoolAddressesProvider](https://etherscan.io/address/0xeBa440B438Ad808101d1c451C1C5322c90BEFCdA) |  onlyRiskOrPoolOrEmergencyAdmins |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A), [Etherfi Caps Plus Risk Steward](https://etherscan.io/address/0x1EBdbE77bbDDD284BdCE8D7981D7eD26D6af58cA), [Manual AGRS](https://etherscan.io/address/0x9Db34dC89D9BC56A5E2899c328D959eF9E072645), [Aave Protocol Guardian Ethereum](https://etherscan.io/address/0x2CFe3ec4d5a6811f4B8067F0DE7e47DfA938Aa30) |  setReserveFreeze | |--------|--------|--------|--------|--------|
|  [PoolConfigurator](https://etherscan.io/address/0x8438F4D29D895d75C86BDC25360c25eF0607E65d) |  [PoolAddressesProvider](https://etherscan.io/address/0xeBa440B438Ad808101d1c451C1C5322c90BEFCdA) |  onlyEmergencyOrPoolAdmin |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A), [Aave Protocol Guardian Ethereum](https://etherscan.io/address/0x2CFe3ec4d5a6811f4B8067F0DE7e47DfA938Aa30) |  setPoolPause, setReservePause | |--------|--------|--------|--------|--------|
|  [AaveOracle](https://etherscan.io/address/0x43b64f28A678944E0655404B0B98E443851cC34F) |  - |  onlyAssetListingOrPoolAdmins |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  setAssetSources, setFallbackOracle | |--------|--------|--------|--------|--------|
|  [RewardsController](https://etherscan.io/address/0x8164Cc65827dcFe994AB23944CBC90e0aa80bFcb) |  [PoolAddressesProvider](https://etherscan.io/address/0xeBa440B438Ad808101d1c451C1C5322c90BEFCdA) |  onlyEmissionManager |  [EmissionManager](https://etherscan.io/address/0x223d844fc4B006D67c0cDbd39371A9F73f69d974) |  configureAssets, setTransferStrategy, setRewardOracle, setClaimer | |--------|--------|--------|--------|--------|
|  [WrappedTokenGatewayV3](https://etherscan.io/address/0xf956B38F035dC9067fb827A512D3CF35202AB0Bc) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  emergencyTokenTransfer, emergencyEtherTransfer | |--------|--------|--------|--------|--------|
|  [ParaSwapLiquiditySwapAdapter](https://etherscan.io/address/0xB04427eFdd15b0EC233400d2F7f7E4fd0291C285) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  rescueTokens | |--------|--------|--------|--------|--------|
|  [ParaSwapRepayAdapter](https://etherscan.io/address/0x23b282c49C88d9161aae14b5eD777B976A5Ae65D) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  rescueTokens | |--------|--------|--------|--------|--------|
|  [EmissionManager](https://etherscan.io/address/0x223d844fc4B006D67c0cDbd39371A9F73f69d974) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  setClaimer, setEmissionAdmin, setRewardsController, renounceOwnership, transferOwnership | |--------|--------|--------|--------|--------|
|  [EmissionManager](https://etherscan.io/address/0x223d844fc4B006D67c0cDbd39371A9F73f69d974) |  - |  onlyEmissionAdmin |  [ACI Safe](https://etherscan.io/address/0xac140648435d03f784879cd789130F22Ef588Fcd) |  configureAssets, setTransferStrategy, setRewardOracle, setDistributionEnd, setEmissionPerSecond | |--------|--------|--------|--------|--------|
|  [PoolAddressesProviderRegistry](https://etherscan.io/address/0xbaA999AC55EAce41CcAE355c77809e68Bb345170) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  registerAddressesProvider, unregisterAddressesProvider | |--------|--------|--------|--------|--------|
|  [ProxyAdmin](https://etherscan.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|
|  [ProxyAdminLong](https://etherscan.io/address/0x86C3FfeE349A7cFf7cA88C449717B1b133bfb517) |  - |  onlyOwner |  [Executor_lvl2](https://etherscan.io/address/0x17Dd33Ed0e3dD2a80E37489B8A63063161BE6957) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|
|  [ACLManager](https://etherscan.io/address/0x3cE8E2eb6501d4705477643E96881B1bef6A2DB3) |  - |  onlyRole |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  setRoleAdmin | |--------|--------|--------|--------|--------|
|  [AaveMerkleDistributor](https://etherscan.io/address/0xa88c6D90eAe942291325f9ae3c66f3563B93FE10) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  addDistributions, emergencyTokenTransfer, emergencyEtherTransfer | |--------|--------|--------|--------|--------|
|  [AavePolEthBridge](https://etherscan.io/address/0x1C2BA5b8ab8e795fF44387ba6d251fa65AD20b36) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  bridge | |--------|--------|--------|--------|--------|
|  [AavePolEthBridge](https://etherscan.io/address/0x1C2BA5b8ab8e795fF44387ba6d251fa65AD20b36) |  - |  onlyRescueGuardian |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  emergencyTokenTransfer, emergencyEtherTransfer | |--------|--------|--------|--------|--------|
|  [Manual AGRS](https://etherscan.io/address/0x9Db34dC89D9BC56A5E2899c328D959eF9E072645) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  setRiskConfig, setAddressRestricted | |--------|--------|--------|--------|--------|
|  [Manual AGRS](https://etherscan.io/address/0x9Db34dC89D9BC56A5E2899c328D959eF9E072645) |  - |  onlyRiskCouncil |  [Risk Council](https://etherscan.io/address/0x47c71dFEB55Ebaa431Ae3fbF99Ea50e0D3d30fA8) |  updateCaps, updateRates, updateCollateralSide, updateLstPriceCaps, updateStablePriceCaps | |--------|--------|--------|--------|--------|
|  [Collector](https://etherscan.io/address/0x464C71f6c2F760DdA6093dCB91C24c39e5d6e18c) |  [ProxyAdmin](https://etherscan.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  onlyFundsAdmin |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A), [ClinicSteward](https://etherscan.io/address/0xf00E2de0E78DFf055A92AD4719a179CE275b6Ef7), [Lido ClinicSteward](https://etherscan.io/address/0x7571F419F7Df2d0622C1A20154a0D4250B2265cC), [PoolExposureSteward](https://etherscan.io/address/0x22aC12a6937BBBC0a301AF9154d08EaD95673122), [ClinicStewardV2](https://etherscan.io/address/0x6A14eBe9A934c8EFE15C3811a999149472876b56), [ClinicStewardV2 AMM](https://etherscan.io/address/0xE1e62c3ee0c581F715fBb0e23CDA536Fc29eeB2c), [SwapSteward](https://etherscan.io/address/0xb7D402138Cb01BfE97d95181C849379d6AD14d19) |  approve, transfer, setFundsAdmin, createStream | |--------|--------|--------|--------|--------|
|  [Collector](https://etherscan.io/address/0x464C71f6c2F760DdA6093dCB91C24c39e5d6e18c) |  [ProxyAdmin](https://etherscan.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  onlyAdminOrRecipient |  [ProxyAdmin](https://etherscan.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476), [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A), [ClinicSteward](https://etherscan.io/address/0xf00E2de0E78DFf055A92AD4719a179CE275b6Ef7), [Lido ClinicSteward](https://etherscan.io/address/0x7571F419F7Df2d0622C1A20154a0D4250B2265cC), [PoolExposureSteward](https://etherscan.io/address/0x22aC12a6937BBBC0a301AF9154d08EaD95673122), [ClinicStewardV2](https://etherscan.io/address/0x6A14eBe9A934c8EFE15C3811a999149472876b56), [ClinicStewardV2 AMM](https://etherscan.io/address/0xE1e62c3ee0c581F715fBb0e23CDA536Fc29eeB2c), [SwapSteward](https://etherscan.io/address/0xb7D402138Cb01BfE97d95181C849379d6AD14d19) |  withdrawFromStream, cancelStream | |--------|--------|--------|--------|--------|
|  [PoolExposureSteward](https://etherscan.io/address/0x22aC12a6937BBBC0a301AF9154d08EaD95673122) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  approvePool, revokePool | |--------|--------|--------|--------|--------|
|  [PoolExposureSteward](https://etherscan.io/address/0x22aC12a6937BBBC0a301AF9154d08EaD95673122) |  - |  onlyOwnerOrGuardian |  [AFC](https://etherscan.io/address/0x22740deBa78d5a0c24C58C740e3715ec29de1bFa), [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  depositV3, withdrawV3, withdrawV2, migrateV2toV3, migrateBetweenV3 | |--------|--------|--------|--------|--------|

### Risk Agent Contracts
| contract |proxyAdmin |modifier |permission owner |functions |
|----------|----------|----------|----------|----------|
|  [AgentHub](https://etherscan.io/address/0x95E3015c67EF62B866cC28ca5A9AB5017A55e336) |  [AgentHubProxyAdmin](https://etherscan.io/address/0xD26dcF055E16ed3048a17b37006082779CF0297c) |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  registerAgent, setAgentAdmin, setMaxBatchSize, setAgentAddress, renounceOwnership, transferOwnership | |--------|--------|--------|--------|--------|
|  [AgentHub](https://etherscan.io/address/0x95E3015c67EF62B866cC28ca5A9AB5017A55e336) |  [AgentHubProxyAdmin](https://etherscan.io/address/0xD26dcF055E16ed3048a17b37006082779CF0297c) |  onlyOwnerOrAgentAdmin |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  setAgentAsPermissioned, addPermissionedSender, removePermissionedSender, addAllowedMarket, removeAllowedMarket, addRestrictedMarket, removeRestrictedMarket, setExpirationPeriod, setAgentEnabled, setMinimumDelay, setAgentContext, setMarketsFromAgentEnabled, addAllowedMarket, addAllowedMarket | |--------|--------|--------|--------|--------|
|  [AgentHubProxyAdmin](https://etherscan.io/address/0xd26dcf055e16ed3048a17b37006082779cf0297c) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|

### Guardians 
| Guardian |Threshold |Address |Owners |
|----------|----------|----------|----------|
|  [Aave Protocol Guardian Ethereum](https://etherscan.io/address/0x2CFe3ec4d5a6811f4B8067F0DE7e47DfA938Aa30) |  4/7 |  0x2CFe3ec4d5a6811f4B8067F0DE7e47DfA938Aa30 |  [0x3fa960f8355D00874D9C7E3350147f5E94859bc2](https://etherscan.io/address/0x3fa960f8355D00874D9C7E3350147f5E94859bc2), [0xa2DCdD6e0b5e0d118E2Fa8922552AC0Fe26EFe58](https://etherscan.io/address/0xa2DCdD6e0b5e0d118E2Fa8922552AC0Fe26EFe58), [0xb291232F480F41c75802C4a60F1D2AC03404Afef](https://etherscan.io/address/0xb291232F480F41c75802C4a60F1D2AC03404Afef), [0xe6838d834674eC35EDd53D485770Baa10bdd6AAe](https://etherscan.io/address/0xe6838d834674eC35EDd53D485770Baa10bdd6AAe), [0xc2674C1A1aF0557E1d217fF4F13DF44A637c7C13](https://etherscan.io/address/0xc2674C1A1aF0557E1d217fF4F13DF44A637c7C13), [0x4Ab2Bed1d667260dB34244Ba412817651C2dD52b](https://etherscan.io/address/0x4Ab2Bed1d667260dB34244Ba412817651C2dD52b), [0xd4af2E86a27F8F77B0556E081F97B215C9cA8f2E](https://etherscan.io/address/0xd4af2E86a27F8F77B0556E081F97B215C9cA8f2E) | |--------|--------|--------|--------|
|  [ACI Safe](https://etherscan.io/address/0xac140648435d03f784879cd789130F22Ef588Fcd) |  1/2 |  0xac140648435d03f784879cd789130F22Ef588Fcd |  [0x57ab7ee15cE5ECacB1aB84EE42D5A9d0d8112922](https://etherscan.io/address/0x57ab7ee15cE5ECacB1aB84EE42D5A9d0d8112922), [0x329c54289Ff5D6B7b7daE13592C6B1EDA1543eD4](https://etherscan.io/address/0x329c54289Ff5D6B7b7daE13592C6B1EDA1543eD4) | |--------|--------|--------|--------|
|  [Risk Council](https://etherscan.io/address/0x47c71dFEB55Ebaa431Ae3fbF99Ea50e0D3d30fA8) |  2/2 |  0x47c71dFEB55Ebaa431Ae3fbF99Ea50e0D3d30fA8 |  [0x606dC57cd166643760E049609bfd1D8a698D3bAc](https://etherscan.io/address/0x606dC57cd166643760E049609bfd1D8a698D3bAc), [0xb291232F480F41c75802C4a60F1D2AC03404Afef](https://etherscan.io/address/0xb291232F480F41c75802C4a60F1D2AC03404Afef) | |--------|--------|--------|--------|
|  [AFC](https://etherscan.io/address/0x22740deBa78d5a0c24C58C740e3715ec29de1bFa) |  2/3 |  0x22740deBa78d5a0c24C58C740e3715ec29de1bFa |  [0xa2DCdD6e0b5e0d118E2Fa8922552AC0Fe26EFe58](https://etherscan.io/address/0xa2DCdD6e0b5e0d118E2Fa8922552AC0Fe26EFe58), [0x4b752551fC6345A7de82F76fd7a5015CA16d1a74](https://etherscan.io/address/0x4b752551fC6345A7de82F76fd7a5015CA16d1a74), [0xb291232F480F41c75802C4a60F1D2AC03404Afef](https://etherscan.io/address/0xb291232F480F41c75802C4a60F1D2AC03404Afef) | |--------|--------|--------|--------|

### Admins
| Role |Contract |
|----------|----------|
|  DEFAULT_ADMIN |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) | |--------|--------|
|  POOL_ADMIN |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) | |--------|--------|
|  EMERGENCY_ADMIN |  [Aave Protocol Guardian Ethereum](https://etherscan.io/address/0x2CFe3ec4d5a6811f4B8067F0DE7e47DfA938Aa30) | |--------|--------|
|  ASSET_LISTING_ADMIN |   | |--------|--------|
|  FLASH_BORROWER |  [0x49d9409111a6363d82C4371fFa43fAEA660C917B](https://etherscan.io/address/0x49d9409111a6363d82C4371fFa43fAEA660C917B), [0x45c00508C14601fd1C1e296eB3C0e3eEEdCa45D0](https://etherscan.io/address/0x45c00508C14601fd1C1e296eB3C0e3eEEdCa45D0), [0xab515542d621574f9b5212d50593cD0C07e641bD](https://etherscan.io/address/0xab515542d621574f9b5212d50593cD0C07e641bD) | |--------|--------|
|  RISK_ADMIN |  [Etherfi Caps Plus Risk Steward](https://etherscan.io/address/0x1EBdbE77bbDDD284BdCE8D7981D7eD26D6af58cA), [Manual AGRS](https://etherscan.io/address/0x9Db34dC89D9BC56A5E2899c328D959eF9E072645) | |--------|--------|

### Collector Admins
| Role |Contract |
|----------|----------|
|  DEFAULT_ADMIN |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) | |--------|--------|
|  FUNDS_ADMIN_ROLE |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A), [ClinicSteward](https://etherscan.io/address/0xf00E2de0E78DFf055A92AD4719a179CE275b6Ef7), [Lido ClinicSteward](https://etherscan.io/address/0x7571F419F7Df2d0622C1A20154a0D4250B2265cC), [PoolExposureSteward](https://etherscan.io/address/0x22aC12a6937BBBC0a301AF9154d08EaD95673122), [ClinicStewardV2](https://etherscan.io/address/0x6A14eBe9A934c8EFE15C3811a999149472876b56), [ClinicStewardV2 AMM](https://etherscan.io/address/0xE1e62c3ee0c581F715fBb0e23CDA536Fc29eeB2c), [SwapSteward](https://etherscan.io/address/0xb7D402138Cb01BfE97d95181C849379d6AD14d19) | |--------|--------|

### Emission Admins
| admin |tokens count |tokens |
|----------|----------|----------|
|  [ACI Safe](https://etherscan.io/address/0xac140648435d03f784879cd789130F22Ef588Fcd) |  7 |  [aEthPT_srUSDe_25JUN2026](https://etherscan.io/address/0xA78Eba24D89e70A03ddB7AC195A15E53315aA5b4), [aEthPT_USDG_28MAY2026](https://etherscan.io/address/0xA9ecb0503075124cc0B786096849A331FBe9EE6D), [PT-srUSDe-25JUN2026](https://etherscan.io/address/0x619D75E3b790eBC21c289f2805Bb7177A7D732E2), [PT-USDG-28MAY2026](https://etherscan.io/address/0x9db38D74a0D29380899aD354121DfB521aDb0548), [PYUSD](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8), [variableDebtEthPT_srUSDe_25JUN2026](https://etherscan.io/address/0x9Ba896531F878Ed5f0A4F73E82d63bA7b424F910), [variableDebtEthPT_USDG_28MAY2026](https://etherscan.io/address/0x1a83eCA2d3b0cea2595Fb11Ec60cb2D428217C2e) | |--------|--------|--------|

