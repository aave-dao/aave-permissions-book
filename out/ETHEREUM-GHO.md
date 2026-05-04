# ETHEREUM 
## GHO 
### Contracts upgradeability
| contract |upgradeable by |
|----------|----------|
|  [GHO](https://etherscan.io/address/0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f) |  not upgradeable | |--------|--------|
|  [GSM_USDC](https://etherscan.io/address/0x3A3868898305f04beC7FEa77BecFf04C13444112) |  Governance | |--------|--------|
|  [GSM_USDC-proxyAdmin](https://etherscan.io/address/0x51bbc06d0032f8fea31f4f7a39e369c5e282cc21) |  not upgradeable | |--------|--------|
|  [GSM_USDT](https://etherscan.io/address/0x882285E62656b9623AF136Ce3078c6BdCc33F5E3) |  Governance | |--------|--------|
|  [GSM_USDT-proxyAdmin](https://etherscan.io/address/0xafca3761fb08e5d67b0ec0e26059a0d6976d91f3) |  not upgradeable | |--------|--------|
|  [GSMRegistry](https://etherscan.io/address/0x167527DB01325408696326e3580cd8e55D99Dc1A) |  not upgradeable | |--------|--------|
|  [GhoStewardV2](https://etherscan.io/address/0x8F2411a538381aae2b464499005F0211e867d84f) |  not upgradeable | |--------|--------|
|  [GhoGSMSteward](https://etherscan.io/address/0xD1E856a947CdF56b4f000ee29d34F5808E0A6848) |  not upgradeable | |--------|--------|
|  [Gho Core Direct Minter](https://etherscan.io/address/0x5513224daaEABCa31af5280727878d52097afA05) |  Governance | |--------|--------|
|  [Gho Core Direct Minter-proxyAdmin](https://etherscan.io/address/0x40e4243c9471bb0a84ba0968bccc9b8975e5ee62) |  not upgradeable | |--------|--------|
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
|  [GHO](https://etherscan.io/address/0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f) |  - |  onlyFacilitator |  [Gho Core Direct Minter](https://etherscan.io/address/0x5513224daaEABCa31af5280727878d52097afA05), [GhoFlashMinter](https://etherscan.io/address/0xb639D208Bcf0589D54FaC24E655C79EC529762B8), [Gho direct facilitator plasma](https://etherscan.io/address/0x2bd010Ab5393AB51b601B99C4B33ba148d9466e9), [Gho direct facilitator mainnet](https://etherscan.io/address/0xE9ac5231fAecb633dA0Fe85Fcb2785b8363427d2), [Gho Lido Direct Minter](https://etherscan.io/address/0x2cE01c87Fec1b71A9041c52CaED46Fc5f4807285), [facilitator-5](https://etherscan.io/address/0xe10C78A3AC7f016eD2DE1A89c5479b1039EAB9eA) |  mint, burn | |--------|--------|--------|--------|--------|
|  [GHO](https://etherscan.io/address/0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f) |  - |  onlyFacilitatorManager |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  addFacilitator, removeFacilitator | |--------|--------|--------|--------|--------|
|  [GHO](https://etherscan.io/address/0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f) |  - |  onlyBucketManager |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A), [Gho Bucket Steward](https://etherscan.io/address/0x46Aa1063e5265b43663E81329333B47c517A5409) |  setFacilitatorBucketCapacity | |--------|--------|--------|--------|--------|
|  [GSM_USDC](https://etherscan.io/address/0x3A3868898305f04beC7FEa77BecFf04C13444112) |  [GSM_USDC-proxyAdmin](https://etherscan.io/address/0x51BBC06d0032f8feA31f4f7a39e369C5E282cC21) |  onlyRescuer |   |  rescueTokens | |--------|--------|--------|--------|--------|
|  [GSM_USDC](https://etherscan.io/address/0x3A3868898305f04beC7FEa77BecFf04C13444112) |  [GSM_USDC-proxyAdmin](https://etherscan.io/address/0x51BBC06d0032f8feA31f4f7a39e369C5E282cC21) |  onlySwapFreezer |  [USDC Chainlink Oracle Swap Freezer](https://etherscan.io/address/0x6e51936e0ED4256f9dA4794B536B619c88Ff0047), [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  setSwapFreeze | |--------|--------|--------|--------|--------|
|  [GSM_USDC](https://etherscan.io/address/0x3A3868898305f04beC7FEa77BecFf04C13444112) |  [GSM_USDC-proxyAdmin](https://etherscan.io/address/0x51BBC06d0032f8feA31f4f7a39e369C5E282cC21) |  onlyLiquidator |   |  seize, burnAfterSeize | |--------|--------|--------|--------|--------|
|  [GSM_USDC](https://etherscan.io/address/0x3A3868898305f04beC7FEa77BecFf04C13444112) |  [GSM_USDC-proxyAdmin](https://etherscan.io/address/0x51BBC06d0032f8feA31f4f7a39e369C5E282cC21) |  onlyConfigurator |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A), [Gho Gsm Steward](https://etherscan.io/address/0xD1E856a947CdF56b4f000ee29d34F5808E0A6848) |  updateFeeStrategy, updateExposureCap, updateGhoTreasury | |--------|--------|--------|--------|--------|
|  [GSM_USDC-proxyAdmin](https://etherscan.io/address/0x51bbc06d0032f8fea31f4f7a39e369c5e282cc21) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|
|  [GSM_USDT](https://etherscan.io/address/0x882285E62656b9623AF136Ce3078c6BdCc33F5E3) |  [GSM_USDT-proxyAdmin](https://etherscan.io/address/0xaFcA3761Fb08e5D67B0ec0E26059a0D6976d91f3) |  onlyRescuer |   |  rescueTokens | |--------|--------|--------|--------|--------|
|  [GSM_USDT](https://etherscan.io/address/0x882285E62656b9623AF136Ce3078c6BdCc33F5E3) |  [GSM_USDT-proxyAdmin](https://etherscan.io/address/0xaFcA3761Fb08e5D67B0ec0E26059a0D6976d91f3) |  onlySwapFreezer |  [USDT Chainlink Oracle Swap Freezer](https://etherscan.io/address/0x733AB16005c39d07FD3D9d1A350AA6768D10125b), [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  setSwapFreeze | |--------|--------|--------|--------|--------|
|  [GSM_USDT](https://etherscan.io/address/0x882285E62656b9623AF136Ce3078c6BdCc33F5E3) |  [GSM_USDT-proxyAdmin](https://etherscan.io/address/0xaFcA3761Fb08e5D67B0ec0E26059a0D6976d91f3) |  onlyLiquidator |   |  seize, burnAfterSeize | |--------|--------|--------|--------|--------|
|  [GSM_USDT](https://etherscan.io/address/0x882285E62656b9623AF136Ce3078c6BdCc33F5E3) |  [GSM_USDT-proxyAdmin](https://etherscan.io/address/0xaFcA3761Fb08e5D67B0ec0E26059a0D6976d91f3) |  onlyConfigurator |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A), [Gho Gsm Steward](https://etherscan.io/address/0xD1E856a947CdF56b4f000ee29d34F5808E0A6848) |  updateFeeStrategy, updateExposureCap, updateGhoTreasury | |--------|--------|--------|--------|--------|
|  [GSM_USDT-proxyAdmin](https://etherscan.io/address/0xafca3761fb08e5d67b0ec0e26059a0d6976d91f3) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|
|  [GSMRegistry](https://etherscan.io/address/0x167527DB01325408696326e3580cd8e55D99Dc1A) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  addGsm, removeGsm | |--------|--------|--------|--------|--------|
|  [GhoStewardV2](https://etherscan.io/address/0x8F2411a538381aae2b464499005F0211e867d84f) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  setControlledFacilitator | |--------|--------|--------|--------|--------|
|  [GhoStewardV2](https://etherscan.io/address/0x8F2411a538381aae2b464499005F0211e867d84f) |  - |  onlyRiskCouncil |  [Gho Risk Council](https://etherscan.io/address/0x8513e6F37dBc52De87b166980Fa3F50639694B60) |  updateGsmBuySellFees, updateGsmExposureCap, updateGhoBorrowRate, updateGhoBorrowCap, updateFacilitatorBucketCapacity | |--------|--------|--------|--------|--------|
|  [GhoGSMSteward](https://etherscan.io/address/0xD1E856a947CdF56b4f000ee29d34F5808E0A6848) |  - |  onlyRiskCouncil |  [Gho Risk Council](https://etherscan.io/address/0x8513e6F37dBc52De87b166980Fa3F50639694B60) |  updateGsmBuySellFees, updateGsmExposureCap | |--------|--------|--------|--------|--------|
|  [Gho Core Direct Minter](https://etherscan.io/address/0x5513224daaEABCa31af5280727878d52097afA05) |  [Gho Core Direct Minter-proxyAdmin](https://etherscan.io/address/0x40E4243C9471bb0a84Ba0968bccc9b8975E5Ee62) |  onlyOwnerOrGuardian |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A), [Gho Risk Council](https://etherscan.io/address/0x8513e6F37dBc52De87b166980Fa3F50639694B60) |  mintAndSupply, withdrawAndBurn, updateGuardian | |--------|--------|--------|--------|--------|
|  [Gho Core Direct Minter](https://etherscan.io/address/0x5513224daaEABCa31af5280727878d52097afA05) |  [Gho Core Direct Minter-proxyAdmin](https://etherscan.io/address/0x40E4243C9471bb0a84Ba0968bccc9b8975E5Ee62) |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  renounceOwnership, transferOwnership | |--------|--------|--------|--------|--------|
|  [Gho Core Direct Minter-proxyAdmin](https://etherscan.io/address/0x40e4243c9471bb0a84ba0968bccc9b8975e5ee62) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|
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
|  [Gho Risk Council](https://etherscan.io/address/0x8513e6F37dBc52De87b166980Fa3F50639694B60) |  3/4 |  0x8513e6F37dBc52De87b166980Fa3F50639694B60 |  [0xCAC616Fffb687cBDDD250b2aE6F672449462985C](https://etherscan.io/address/0xCAC616Fffb687cBDDD250b2aE6F672449462985C), [0x329c54289Ff5D6B7b7daE13592C6B1EDA1543eD4](https://etherscan.io/address/0x329c54289Ff5D6B7b7daE13592C6B1EDA1543eD4), [0xb647055A9915bF9c8021a684E175A353525b9890](https://etherscan.io/address/0xb647055A9915bF9c8021a684E175A353525b9890), [0x606dC57cd166643760E049609bfd1D8a698D3bAc](https://etherscan.io/address/0x606dC57cd166643760E049609bfd1D8a698D3bAc) | |--------|--------|--------|--------|

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
|  SWAP_FREEZER_ROLE |  [USDC Chainlink Oracle Swap Freezer](https://etherscan.io/address/0x6e51936e0ED4256f9dA4794B536B619c88Ff0047), [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) | |--------|--------|
|  TOKEN_RESCUER_ROLE |   | |--------|--------|
|  LIQUIDATOR_ROLE |   | |--------|--------|

### Admins GSM_USDT
| Role |Contract |
|----------|----------|
|  DEFAULT_ADMIN |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) | |--------|--------|
|  CONFIGURATOR_ROLE |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A), [Gho Gsm Steward](https://etherscan.io/address/0xD1E856a947CdF56b4f000ee29d34F5808E0A6848) | |--------|--------|
|  SWAP_FREEZER_ROLE |  [USDT Chainlink Oracle Swap Freezer](https://etherscan.io/address/0x733AB16005c39d07FD3D9d1A350AA6768D10125b), [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) | |--------|--------|
|  TOKEN_RESCUER_ROLE |   | |--------|--------|
|  LIQUIDATOR_ROLE |   | |--------|--------|

