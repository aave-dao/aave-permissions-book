# PLASMA 
## GHO 
### Contracts upgradeability
| contract |upgradeable by |
|----------|----------|
|  [GHO](https://plasmascan.to//address/0xb77E872A68C62CfC0dFb02C067Ecc3DA23B4bbf3) |  Governance | |--------|--------|
|  [GHO ProxyAdmin](https://plasmascan.to//address/0x24c7badd8f85197ffb2c7e1e0c52e86010721f4c) |  not upgradeable | |--------|--------|
|  [GSM_USDT](https://plasmascan.to//address/0xd06114F714beCD6f373e5cE94E07278eF46eBF37) |  Governance | |--------|--------|
|  [GSM_USDT-proxyAdmin](https://plasmascan.to//address/0xf0c9f6dc58bd273a0b7bab4419fe3be164b78a16) |  not upgradeable | |--------|--------|
|  [GhoGSMSteward](https://plasmascan.to//address/0x86992b2E2385E478dd2eeBfaE06369636e0a64E8) |  not upgradeable | |--------|--------|
|  [GhoAaveSteward](https://plasmascan.to//address/0xA5Ba213867E175A182a5dd6A9193C6158738105A) |  not upgradeable | |--------|--------|

### Actions type
| type |can be executed by |
|----------|----------|
|  adiConfigurations |  Governance | |--------|--------|
|  retryAndInvalidateMessages |  Multi-sig,Governance | |--------|--------|

### Contracts
| contract |proxyAdmin |modifier |permission owner |functions |
|----------|----------|----------|----------|----------|
|  [GHO](https://plasmascan.to//address/0xb77E872A68C62CfC0dFb02C067Ecc3DA23B4bbf3) |  [GHO ProxyAdmin](https://plasmascan.to//address/0x24C7baDd8F85197ffB2c7E1E0C52E86010721f4c) |  onlyFacilitator |  [Gho Direct Minter](https://plasmascan.to//address/0x360d8aa8F6b09B7BC57aF34db2Eb84dD87bf4d12) |  mint, burn | |--------|--------|--------|--------|--------|
|  [GHO](https://plasmascan.to//address/0xb77E872A68C62CfC0dFb02C067Ecc3DA23B4bbf3) |  [GHO ProxyAdmin](https://plasmascan.to//address/0x24C7baDd8F85197ffB2c7E1E0C52E86010721f4c) |  onlyFacilitatorManager |  [Executor_lvl1](https://plasmascan.to//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  addFacilitator, removeFacilitator | |--------|--------|--------|--------|--------|
|  [GHO](https://plasmascan.to//address/0xb77E872A68C62CfC0dFb02C067Ecc3DA23B4bbf3) |  [GHO ProxyAdmin](https://plasmascan.to//address/0x24C7baDd8F85197ffB2c7E1E0C52E86010721f4c) |  onlyBucketManager |  [Executor_lvl1](https://plasmascan.to//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A), [Gho Bucket Steward](https://plasmascan.to//address/0x2Ce400703dAcc37b7edFA99D228b8E70a4d3831B) |  setFacilitatorBucketCapacity | |--------|--------|--------|--------|--------|
|  [GHO ProxyAdmin](https://plasmascan.to//address/0x24c7badd8f85197ffb2c7e1e0c52e86010721f4c) |  - |  onlyOwner |  [Executor_lvl1](https://plasmascan.to//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|
|  [GSM_USDT](https://plasmascan.to//address/0xd06114F714beCD6f373e5cE94E07278eF46eBF37) |  [GSM_USDT-proxyAdmin](https://plasmascan.to//address/0xF0C9f6dC58Bd273a0b7BAB4419FE3bE164B78a16) |  onlyRescuer |   |  rescueTokens | |--------|--------|--------|--------|--------|
|  [GSM_USDT](https://plasmascan.to//address/0xd06114F714beCD6f373e5cE94E07278eF46eBF37) |  [GSM_USDT-proxyAdmin](https://plasmascan.to//address/0xF0C9f6dC58Bd273a0b7BAB4419FE3bE164B78a16) |  onlySwapFreezer |  [Gho Chainlink Oracle Swap Freezer](https://plasmascan.to//address/0xa9afaE6A53E90f9E4CE0717162DF5Bc3d9aBe7B2), [Executor_lvl1](https://plasmascan.to//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  setSwapFreeze | |--------|--------|--------|--------|--------|
|  [GSM_USDT](https://plasmascan.to//address/0xd06114F714beCD6f373e5cE94E07278eF46eBF37) |  [GSM_USDT-proxyAdmin](https://plasmascan.to//address/0xF0C9f6dC58Bd273a0b7BAB4419FE3bE164B78a16) |  onlyLiquidator |   |  seize, burnAfterSeize | |--------|--------|--------|--------|--------|
|  [GSM_USDT](https://plasmascan.to//address/0xd06114F714beCD6f373e5cE94E07278eF46eBF37) |  [GSM_USDT-proxyAdmin](https://plasmascan.to//address/0xF0C9f6dC58Bd273a0b7BAB4419FE3bE164B78a16) |  onlyConfigurator |  [Executor_lvl1](https://plasmascan.to//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A), [GhoGSMSteward](https://plasmascan.to//address/0x86992b2E2385E478dd2eeBfaE06369636e0a64E8) |  updateFeeStrategy, updateExposureCap, updateGhoTreasury | |--------|--------|--------|--------|--------|
|  [GSM_USDT-proxyAdmin](https://plasmascan.to//address/0xf0c9f6dc58bd273a0b7bab4419fe3be164b78a16) |  - |  onlyOwner |  [Executor_lvl1](https://plasmascan.to//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|
|  [GhoGSMSteward](https://plasmascan.to//address/0x86992b2E2385E478dd2eeBfaE06369636e0a64E8) |  - |  onlyRiskCouncil |  [Gho Risk Council](https://plasmascan.to//address/0x8513e6F37dBc52De87b166980Fa3F50639694B60) |  updateGsmBuySellFees, updateGsmExposureCap | |--------|--------|--------|--------|--------|
|  [GhoAaveSteward](https://plasmascan.to//address/0xA5Ba213867E175A182a5dd6A9193C6158738105A) |  - |  onlyOwner |  [Executor_lvl1](https://plasmascan.to//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  setBorrowRateConfig | |--------|--------|--------|--------|--------|
|  [GhoAaveSteward](https://plasmascan.to//address/0xA5Ba213867E175A182a5dd6A9193C6158738105A) |  - |  onlyRiskCouncil |  [Gho Risk Council](https://plasmascan.to//address/0x8513e6F37dBc52De87b166980Fa3F50639694B60) |  updateGhoBorrowRate, updateGhoBorrowCap, updateGhoSupplyCap | |--------|--------|--------|--------|--------|

### Guardians 
| Guardian |Threshold |Address |Owners |
|----------|----------|----------|----------|
|  [Gho Risk Council](https://plasmascan.to//address/0x8513e6F37dBc52De87b166980Fa3F50639694B60) |  3/4 |  0x8513e6F37dBc52De87b166980Fa3F50639694B60 |  [0x329c54289Ff5D6B7b7daE13592C6B1EDA1543eD4](https://plasmascan.to//address/0x329c54289Ff5D6B7b7daE13592C6B1EDA1543eD4), [0xb647055A9915bF9c8021a684E175A353525b9890](https://plasmascan.to//address/0xb647055A9915bF9c8021a684E175A353525b9890), [0xCAC616Fffb687cBDDD250b2aE6F672449462985C](https://plasmascan.to//address/0xCAC616Fffb687cBDDD250b2aE6F672449462985C), [0x606dC57cd166643760E049609bfd1D8a698D3bAc](https://plasmascan.to//address/0x606dC57cd166643760E049609bfd1D8a698D3bAc) | |--------|--------|--------|--------|

### Admins
| Role |Contract |
|----------|----------|
|  DEFAULT_ADMIN |  [Executor_lvl1](https://plasmascan.to//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) | |--------|--------|
|  FACILITATOR_MANAGER_ROLE |  [Executor_lvl1](https://plasmascan.to//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) | |--------|--------|
|  BUCKET_MANAGER_ROLE |  [Executor_lvl1](https://plasmascan.to//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A), [Gho Bucket Steward](https://plasmascan.to//address/0x2Ce400703dAcc37b7edFA99D228b8E70a4d3831B) | |--------|--------|

### Admins GSM_USDT
| Role |Contract |
|----------|----------|
|  DEFAULT_ADMIN |  [Executor_lvl1](https://plasmascan.to//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) | |--------|--------|
|  CONFIGURATOR_ROLE |  [Executor_lvl1](https://plasmascan.to//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A), [GhoGSMSteward](https://plasmascan.to//address/0x86992b2E2385E478dd2eeBfaE06369636e0a64E8) | |--------|--------|
|  SWAP_FREEZER_ROLE |  [Gho Chainlink Oracle Swap Freezer](https://plasmascan.to//address/0xa9afaE6A53E90f9E4CE0717162DF5Bc3d9aBe7B2), [Executor_lvl1](https://plasmascan.to//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) | |--------|--------|
|  TOKEN_RESCUER_ROLE |   | |--------|--------|
|  LIQUIDATOR_ROLE |   | |--------|--------|

