# XLAYER 
## GHO 
### Contracts upgradeability
| contract |upgradeable by |
|----------|----------|
|  [GHO](https://www.oklink.com/x-layer/address/0xDe6539018B095353A40753Dc54C91C68c9487D4E) |  Governance | |--------|--------|
|  [GHO ProxyAdmin](https://www.oklink.com/x-layer/address/0xef3f9c1d5c69c47027ac7f232af4f1e52ff11579) |  not upgradeable | |--------|--------|
|  [GhoAaveSteward](https://www.oklink.com/x-layer/address/0x6e637e1E48025E51315d50ab96d5b3be1971A715) |  not upgradeable | |--------|--------|

### Actions type
| type |can be executed by |
|----------|----------|
|  adiConfigurations |  Governance | |--------|--------|
|  retryAndInvalidateMessages |  Multi-sig,Governance | |--------|--------|

### Contracts
| contract |proxyAdmin |modifier |permission owner |functions |
|----------|----------|----------|----------|----------|
|  [GHO](https://www.oklink.com/x-layer/address/0xDe6539018B095353A40753Dc54C91C68c9487D4E) |  [GHO ProxyAdmin](https://www.oklink.com/x-layer/address/0xEF3f9c1D5c69c47027ac7f232Af4F1e52fF11579) |  onlyFacilitator |  [Gho Direct Minter](https://www.oklink.com/x-layer/address/0xA5Ba213867E175A182a5dd6A9193C6158738105A) |  mint, burn | |--------|--------|--------|--------|--------|
|  [GHO](https://www.oklink.com/x-layer/address/0xDe6539018B095353A40753Dc54C91C68c9487D4E) |  [GHO ProxyAdmin](https://www.oklink.com/x-layer/address/0xEF3f9c1D5c69c47027ac7f232Af4F1e52fF11579) |  onlyFacilitatorManager |  [Executor_lvl1](https://www.oklink.com/x-layer/address/0xE2E8Badc5d50f8a6188577B89f50701cDE2D4e19) |  addFacilitator, removeFacilitator | |--------|--------|--------|--------|--------|
|  [GHO](https://www.oklink.com/x-layer/address/0xDe6539018B095353A40753Dc54C91C68c9487D4E) |  [GHO ProxyAdmin](https://www.oklink.com/x-layer/address/0xEF3f9c1D5c69c47027ac7f232Af4F1e52fF11579) |  onlyBucketManager |  [Executor_lvl1](https://www.oklink.com/x-layer/address/0xE2E8Badc5d50f8a6188577B89f50701cDE2D4e19), [Gho Bucket Steward](https://www.oklink.com/x-layer/address/0x20fd5f3FCac8883a3A0A2bBcD658A2d2c6EFa6B6) |  setFacilitatorBucketCapacity | |--------|--------|--------|--------|--------|
|  [GHO ProxyAdmin](https://www.oklink.com/x-layer/address/0xef3f9c1d5c69c47027ac7f232af4f1e52ff11579) |  - |  onlyOwner |  [Executor_lvl1](https://www.oklink.com/x-layer/address/0xE2E8Badc5d50f8a6188577B89f50701cDE2D4e19) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|
|  [GhoAaveSteward](https://www.oklink.com/x-layer/address/0x6e637e1E48025E51315d50ab96d5b3be1971A715) |  - |  onlyOwner |  [Executor_lvl1](https://www.oklink.com/x-layer/address/0xE2E8Badc5d50f8a6188577B89f50701cDE2D4e19) |  setBorrowRateConfig | |--------|--------|--------|--------|--------|
|  [GhoAaveSteward](https://www.oklink.com/x-layer/address/0x6e637e1E48025E51315d50ab96d5b3be1971A715) |  - |  onlyRiskCouncil |  [Gho Risk Council](https://www.oklink.com/x-layer/address/0x8513e6F37dBc52De87b166980Fa3F50639694B60) |  updateGhoBorrowRate, updateGhoBorrowCap, updateGhoSupplyCap | |--------|--------|--------|--------|--------|

### Guardians 
| Guardian |Threshold |Address |Owners |
|----------|----------|----------|----------|
|  [Gho Risk Council](https://www.oklink.com/x-layer/address/0x8513e6F37dBc52De87b166980Fa3F50639694B60) |  3/4 |  0x8513e6F37dBc52De87b166980Fa3F50639694B60 |  [0x329c54289Ff5D6B7b7daE13592C6B1EDA1543eD4](https://www.oklink.com/x-layer/address/0x329c54289Ff5D6B7b7daE13592C6B1EDA1543eD4), [0xb647055A9915bF9c8021a684E175A353525b9890](https://www.oklink.com/x-layer/address/0xb647055A9915bF9c8021a684E175A353525b9890), [0x818C277dBE886b934e60aa047250A73529E26A99](https://www.oklink.com/x-layer/address/0x818C277dBE886b934e60aa047250A73529E26A99), [0x5d49dBcdd300aECc2C311cFB56593E71c445d60d](https://www.oklink.com/x-layer/address/0x5d49dBcdd300aECc2C311cFB56593E71c445d60d) | |--------|--------|--------|--------|

### Admins
| Role |Contract |
|----------|----------|
|  DEFAULT_ADMIN |  [Executor_lvl1](https://www.oklink.com/x-layer/address/0xE2E8Badc5d50f8a6188577B89f50701cDE2D4e19) | |--------|--------|
|  FACILITATOR_MANAGER_ROLE |  [Executor_lvl1](https://www.oklink.com/x-layer/address/0xE2E8Badc5d50f8a6188577B89f50701cDE2D4e19) | |--------|--------|
|  BUCKET_MANAGER_ROLE |  [Executor_lvl1](https://www.oklink.com/x-layer/address/0xE2E8Badc5d50f8a6188577B89f50701cDE2D4e19), [Gho Bucket Steward](https://www.oklink.com/x-layer/address/0x20fd5f3FCac8883a3A0A2bBcD658A2d2c6EFa6B6) | |--------|--------|

