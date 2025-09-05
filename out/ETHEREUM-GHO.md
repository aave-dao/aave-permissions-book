# ETHEREUM 
## GHO 
### Contracts upgradeability
| contract |upgradeable by |
|----------|----------|
|  [GHO](https://etherscan.io/address/0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f) |  not upgradeable | |--------|--------|
|  [GSM_USDC](https://etherscan.io/address/0xFeeb6FE430B7523fEF2a38327241eE7153779535) |  Governance | |--------|--------|
|  [GSM_USDC-proxyAdmin](https://etherscan.io/address/0x87f9ff2246ac5756a099c9d10802980fb75cce2b) |  not upgradeable | |--------|--------|
|  [GSM_USDT](https://etherscan.io/address/0x535b2f7C20B9C83d70e519cf9991578eF9816B7B) |  Governance | |--------|--------|
|  [GSM_USDT-proxyAdmin](https://etherscan.io/address/0x20004c21e23c44adfdd118392c914a31a488f64d) |  not upgradeable | |--------|--------|
|  [GSMRegistry](https://etherscan.io/address/0x167527DB01325408696326e3580cd8e55D99Dc1A) |  not upgradeable | |--------|--------|
|  [GhoStewardV2](https://etherscan.io/address/0x8F2411a538381aae2b464499005F0211e867d84f) |  not upgradeable | |--------|--------|
|  [Gho Core Direct Minter](https://etherscan.io/address/0x593B09afc075B3c326CE2AD7750888645BA8943d) |  Governance | |--------|--------|
|  [Gho Core Direct Minter-proxyAdmin](https://etherscan.io/address/0xf02d4931e0d5c79af9094cd9dff16ea6e3d9acb8) |  not upgradeable | |--------|--------|
|  [Gho Lido Direct Minter](https://etherscan.io/address/0x2cE01c87Fec1b71A9041c52CaED46Fc5f4807285) |  Governance | |--------|--------|
|  [facilitator-5](https://etherscan.io/address/0xe10C78A3AC7f016eD2DE1A89c5479b1039EAB9eA) |  Governance | |--------|--------|
|  [facilitator-5-proxyAdmin](https://etherscan.io/address/0x8abd1892a1c31b8e52fc1210098fe4cac4e52acc) |  not upgradeable | |--------|--------|
|  [GhoFlashMinter](https://etherscan.io/address/0xb639D208Bcf0589D54FaC24E655C79EC529762B8) |  not upgradeable | |--------|--------|
|  [GhoAaveSteward](https://etherscan.io/address/0x98217A06721Ebf727f2C8d9aD7718ec28b7aAe34) |  not upgradeable | |--------|--------|

### Actions type
| type |can be executed by |
|----------|----------|
|  adiConfigurations |  Governance | |--------|--------|
|  retryAndInvalidateMessages |  Multi-sig,Governance | |--------|--------|
|  configureGovernance |  Governance | |--------|--------|
|  cancelProposal |  Multi-sig | |--------|--------|

### Contracts
| contract |proxyAdmin |modifier |permission owner |functions |
|----------|----------|----------|----------|----------|
|  [GHO](https://etherscan.io/address/0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f) |  - |  onlyFacilitator |  [Gho Core Direct Minter](https://etherscan.io/address/0x593B09afc075B3c326CE2AD7750888645BA8943d), [GhoFlashMinter](https://etherscan.io/address/0xb639D208Bcf0589D54FaC24E655C79EC529762B8), [GSM_USDT](https://etherscan.io/address/0x535b2f7C20B9C83d70e519cf9991578eF9816B7B), [GSM_USDC](https://etherscan.io/address/0xFeeb6FE430B7523fEF2a38327241eE7153779535), [Gho Lido Direct Minter](https://etherscan.io/address/0x2cE01c87Fec1b71A9041c52CaED46Fc5f4807285), [facilitator-5](https://etherscan.io/address/0xe10C78A3AC7f016eD2DE1A89c5479b1039EAB9eA) |  mint, burn | |--------|--------|--------|--------|--------|
|  [GHO](https://etherscan.io/address/0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f) |  - |  onlyFacilitatorManager |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  addFacilitator, removeFacilitator | |--------|--------|--------|--------|--------|
|  [GHO](https://etherscan.io/address/0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f) |  - |  onlyBucketManager |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A), [Gho Bucket Steward](https://etherscan.io/address/0x46Aa1063e5265b43663E81329333B47c517A5409) |  setFacilitatorBucketCapacity | |--------|--------|--------|--------|--------|
|  [GSM_USDC](https://etherscan.io/address/0xFeeb6FE430B7523fEF2a38327241eE7153779535) |  [GSM_USDC-proxyAdmin](https://etherscan.io/address/0x87F9ff2246aC5756A099c9D10802980fb75cCE2b) |  onlyRescuer |   |  rescueTokens | |--------|--------|--------|--------|--------|
|  [GSM_USDC](https://etherscan.io/address/0xFeeb6FE430B7523fEF2a38327241eE7153779535) |  [GSM_USDC-proxyAdmin](https://etherscan.io/address/0x87F9ff2246aC5756A099c9D10802980fb75cCE2b) |  onlySwapFreezer |  [USDC Oracle Swap Freezer](https://etherscan.io/address/0x29F8c924B7aB50649c9597B8811d08f9Ef0310c3), [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  setSwapFreeze | |--------|--------|--------|--------|--------|
|  [GSM_USDC](https://etherscan.io/address/0xFeeb6FE430B7523fEF2a38327241eE7153779535) |  [GSM_USDC-proxyAdmin](https://etherscan.io/address/0x87F9ff2246aC5756A099c9D10802980fb75cCE2b) |  onlyLiquidator |   |  seize, burnAfterSeize | |--------|--------|--------|--------|--------|
|  [GSM_USDC](https://etherscan.io/address/0xFeeb6FE430B7523fEF2a38327241eE7153779535) |  [GSM_USDC-proxyAdmin](https://etherscan.io/address/0x87F9ff2246aC5756A099c9D10802980fb75cCE2b) |  onlyConfigurator |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A), [Gho Gsm Steward](https://etherscan.io/address/0xD1E856a947CdF56b4f000ee29d34F5808E0A6848) |  updateFeeStrategy, updateExposureCap, updateGhoTreasury | |--------|--------|--------|--------|--------|
|  [GSM_USDC-proxyAdmin](https://etherscan.io/address/0x87f9ff2246ac5756a099c9d10802980fb75cce2b) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|
|  [GSM_USDT](https://etherscan.io/address/0x535b2f7C20B9C83d70e519cf9991578eF9816B7B) |  [GSM_USDT-proxyAdmin](https://etherscan.io/address/0x20004C21E23c44AdfdD118392C914a31A488f64d) |  onlyRescuer |   |  rescueTokens | |--------|--------|--------|--------|--------|
|  [GSM_USDT](https://etherscan.io/address/0x535b2f7C20B9C83d70e519cf9991578eF9816B7B) |  [GSM_USDT-proxyAdmin](https://etherscan.io/address/0x20004C21E23c44AdfdD118392C914a31A488f64d) |  onlySwapFreezer |  [USDT Oracle Swap Freezer](https://etherscan.io/address/0x6439DA186BD3d37fE7Fd36036543b403e9FAbaE7), [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  setSwapFreeze | |--------|--------|--------|--------|--------|
|  [GSM_USDT](https://etherscan.io/address/0x535b2f7C20B9C83d70e519cf9991578eF9816B7B) |  [GSM_USDT-proxyAdmin](https://etherscan.io/address/0x20004C21E23c44AdfdD118392C914a31A488f64d) |  onlyLiquidator |   |  seize, burnAfterSeize | |--------|--------|--------|--------|--------|
|  [GSM_USDT](https://etherscan.io/address/0x535b2f7C20B9C83d70e519cf9991578eF9816B7B) |  [GSM_USDT-proxyAdmin](https://etherscan.io/address/0x20004C21E23c44AdfdD118392C914a31A488f64d) |  onlyConfigurator |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A), [Gho Gsm Steward](https://etherscan.io/address/0xD1E856a947CdF56b4f000ee29d34F5808E0A6848) |  updateFeeStrategy, updateExposureCap, updateGhoTreasury | |--------|--------|--------|--------|--------|
|  [GSM_USDT-proxyAdmin](https://etherscan.io/address/0x20004c21e23c44adfdd118392c914a31a488f64d) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|
|  [GSMRegistry](https://etherscan.io/address/0x167527DB01325408696326e3580cd8e55D99Dc1A) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  addGsm, removeGsm | |--------|--------|--------|--------|--------|
|  [GhoStewardV2](https://etherscan.io/address/0x8F2411a538381aae2b464499005F0211e867d84f) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  setControlledFacilitator | |--------|--------|--------|--------|--------|
|  [GhoStewardV2](https://etherscan.io/address/0x8F2411a538381aae2b464499005F0211e867d84f) |  - |  onlyRiskCouncil |  [Gho Risk Council](https://etherscan.io/address/0x8513e6F37dBc52De87b166980Fa3F50639694B60) |  updateGsmBuySellFees, updateGsmExposureCap, updateGhoBorrowRate, updateGhoBorrowCap, updateFacilitatorBucketCapacity | |--------|--------|--------|--------|--------|
|  [Gho Core Direct Minter](https://etherscan.io/address/0x593B09afc075B3c326CE2AD7750888645BA8943d) |  [Gho Core Direct Minter-proxyAdmin](https://etherscan.io/address/0xF02D4931e0D5C79Af9094Cd9DFF16ea6e3D9acB8) |  onlyOwnerOrGuardian |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A), [Gho Risk Council](https://etherscan.io/address/0x8513e6F37dBc52De87b166980Fa3F50639694B60) |  mintAndSupply, withdrawAndBurn, updateGuardian | |--------|--------|--------|--------|--------|
|  [Gho Core Direct Minter](https://etherscan.io/address/0x593B09afc075B3c326CE2AD7750888645BA8943d) |  [Gho Core Direct Minter-proxyAdmin](https://etherscan.io/address/0xF02D4931e0D5C79Af9094Cd9DFF16ea6e3D9acB8) |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  renounceOwnership, transferOwnership | |--------|--------|--------|--------|--------|
|  [Gho Core Direct Minter-proxyAdmin](https://etherscan.io/address/0xf02d4931e0d5c79af9094cd9dff16ea6e3d9acb8) |  - |  onlyOwner |  [ProxyAdmin](https://etherscan.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|
|  [Gho Lido Direct Minter](https://etherscan.io/address/0x2cE01c87Fec1b71A9041c52CaED46Fc5f4807285) |  [ProxyAdmin](https://etherscan.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  onlyOwnerOrGuardian |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A), [Gho Risk Council](https://etherscan.io/address/0x8513e6F37dBc52De87b166980Fa3F50639694B60) |  mintAndSupply, withdrawAndBurn, updateGuardian | |--------|--------|--------|--------|--------|
|  [Gho Lido Direct Minter](https://etherscan.io/address/0x2cE01c87Fec1b71A9041c52CaED46Fc5f4807285) |  [ProxyAdmin](https://etherscan.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  renounceOwnership, transferOwnership | |--------|--------|--------|--------|--------|
|  [facilitator-5](https://etherscan.io/address/0xe10C78A3AC7f016eD2DE1A89c5479b1039EAB9eA) |  [facilitator-5-proxyAdmin](https://etherscan.io/address/0x8aBd1892a1c31b8e52fC1210098fE4cAc4E52aCc) |  onlyOwnerOrGuardian |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A), [Gho Risk Council](https://etherscan.io/address/0x8513e6F37dBc52De87b166980Fa3F50639694B60) |  mintAndSupply, withdrawAndBurn, updateGuardian | |--------|--------|--------|--------|--------|
|  [facilitator-5](https://etherscan.io/address/0xe10C78A3AC7f016eD2DE1A89c5479b1039EAB9eA) |  [facilitator-5-proxyAdmin](https://etherscan.io/address/0x8aBd1892a1c31b8e52fC1210098fE4cAc4E52aCc) |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  renounceOwnership, transferOwnership | |--------|--------|--------|--------|--------|
|  [facilitator-5-proxyAdmin](https://etherscan.io/address/0x8abd1892a1c31b8e52fc1210098fe4cac4e52acc) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|
|  [GhoFlashMinter](https://etherscan.io/address/0xb639D208Bcf0589D54FaC24E655C79EC529762B8) |  - |  onlyPoolAdmin |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  updateGhoTreasury, updateFee | |--------|--------|--------|--------|--------|
|  [GhoAaveSteward](https://etherscan.io/address/0x98217A06721Ebf727f2C8d9aD7718ec28b7aAe34) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  setBorrowRateConfig | |--------|--------|--------|--------|--------|
|  [GhoAaveSteward](https://etherscan.io/address/0x98217A06721Ebf727f2C8d9aD7718ec28b7aAe34) |  - |  onlyRiskCouncil |  [Gho Risk Council](https://etherscan.io/address/0x8513e6F37dBc52De87b166980Fa3F50639694B60) |  updateGhoBorrowRate, updateGhoBorrowCap, updateGhoSupplyCap | |--------|--------|--------|--------|--------|

### Guardians 
| Guardian |Threshold |Address |Owners |
|----------|----------|----------|----------|
|  [Gho Risk Council](https://etherscan.io/address/0x8513e6F37dBc52De87b166980Fa3F50639694B60) |  3/4 |  0x8513e6F37dBc52De87b166980Fa3F50639694B60 |  [0xbA037E4746ff58c55dc8F27a328C428F258DDACb](https://etherscan.io/address/0xbA037E4746ff58c55dc8F27a328C428F258DDACb), [0x329c54289Ff5D6B7b7daE13592C6B1EDA1543eD4](https://etherscan.io/address/0x329c54289Ff5D6B7b7daE13592C6B1EDA1543eD4), [0xb647055A9915bF9c8021a684E175A353525b9890](https://etherscan.io/address/0xb647055A9915bF9c8021a684E175A353525b9890), [0x5d49dBcdd300aECc2C311cFB56593E71c445d60d](https://etherscan.io/address/0x5d49dBcdd300aECc2C311cFB56593E71c445d60d) | |--------|--------|--------|--------|

### Admins 
| Role |Contract |
|----------|----------|
|  DEFAULT_ADMIN |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) | |--------|--------|
|  FACILITATOR_MANAGER_ROLE |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) | |--------|--------|
|  BUCKET_MANAGER_ROLE |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A), [Gho Bucket Steward](https://etherscan.io/address/0x46Aa1063e5265b43663E81329333B47c517A5409) | |--------|--------|

### Admins GSM_USDC
| Role |Contract |
|----------|----------|
|  DEFAULT_ADMIN |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) | |--------|--------|
|  CONFIGURATOR_ROLE |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A), [Gho Gsm Steward](https://etherscan.io/address/0xD1E856a947CdF56b4f000ee29d34F5808E0A6848) | |--------|--------|
|  SWAP_FREEZER_ROLE |  [USDC Oracle Swap Freezer](https://etherscan.io/address/0x29F8c924B7aB50649c9597B8811d08f9Ef0310c3), [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) | |--------|--------|
|  DEFAULT_ADMIN_ROLE |   | |--------|--------|
|  TOKEN_RESCUER_ROLE |   | |--------|--------|
|  LIQUIDATOR_ROLE |   | |--------|--------|

### Admins GSM_USDT
| Role |Contract |
|----------|----------|
|  DEFAULT_ADMIN |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) | |--------|--------|
|  CONFIGURATOR_ROLE |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A), [Gho Gsm Steward](https://etherscan.io/address/0xD1E856a947CdF56b4f000ee29d34F5808E0A6848) | |--------|--------|
|  SWAP_FREEZER_ROLE |  [USDT Oracle Swap Freezer](https://etherscan.io/address/0x6439DA186BD3d37fE7Fd36036543b403e9FAbaE7), [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) | |--------|--------|
|  DEFAULT_ADMIN_ROLE |   | |--------|--------|
|  TOKEN_RESCUER_ROLE |   | |--------|--------|
|  LIQUIDATOR_ROLE |   | |--------|--------|

