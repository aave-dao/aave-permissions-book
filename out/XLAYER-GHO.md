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
|  [Gho Risk Council](https://www.oklink.com/x-layer/address/0x8513e6F37dBc52De87b166980Fa3F50639694B60) |  2/3 |  0x8513e6F37dBc52De87b166980Fa3F50639694B60 |  [0xb291232F480F41c75802C4a60F1D2AC03404Afef](https://www.oklink.com/x-layer/address/0xb291232F480F41c75802C4a60F1D2AC03404Afef), [0x9DE1d45e2786b03498289959203F25b29B4D1193](https://www.oklink.com/x-layer/address/0x9DE1d45e2786b03498289959203F25b29B4D1193), [0x4b752551fC6345A7de82F76fd7a5015CA16d1a74](https://www.oklink.com/x-layer/address/0x4b752551fC6345A7de82F76fd7a5015CA16d1a74) | |--------|--------|--------|--------|

### Admins
| Role |Contract |
|----------|----------|
|  DEFAULT_ADMIN |  [Executor_lvl1](https://www.oklink.com/x-layer/address/0xE2E8Badc5d50f8a6188577B89f50701cDE2D4e19) | |--------|--------|
|  FACILITATOR_MANAGER_ROLE |  [Executor_lvl1](https://www.oklink.com/x-layer/address/0xE2E8Badc5d50f8a6188577B89f50701cDE2D4e19) | |--------|--------|
|  BUCKET_MANAGER_ROLE |  [Executor_lvl1](https://www.oklink.com/x-layer/address/0xE2E8Badc5d50f8a6188577B89f50701cDE2D4e19), [Gho Bucket Steward](https://www.oklink.com/x-layer/address/0x20fd5f3FCac8883a3A0A2bBcD658A2d2c6EFa6B6) | |--------|--------|

