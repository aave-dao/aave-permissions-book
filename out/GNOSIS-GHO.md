# GNOSIS 
## GHO 
### Contracts upgradeability
| contract |upgradeable by |
|----------|----------|
|  [GHO](https://gnosisscan.io//address/0xfc421aD3C883Bf9E7C4f42dE845C4e4405799e73) |  Governance | |--------|--------|
|  [GHO ProxyAdmin](https://gnosisscan.io//address/0x06ba20fb633cbf38b7acfdc243829fb5f897e19c) |  not upgradeable | |--------|--------|
|  [GhoAaveSteward](https://gnosisscan.io//address/0x6e637e1E48025E51315d50ab96d5b3be1971A715) |  not upgradeable | |--------|--------|

### Actions type
| type |can be executed by |
|----------|----------|
|  adiConfigurations |  Governance | |--------|--------|
|  retryAndInvalidateMessages |  Multi-sig,Governance | |--------|--------|

### Contracts
| contract |proxyAdmin |modifier |permission owner |functions |
|----------|----------|----------|----------|----------|
|  [GHO](https://gnosisscan.io//address/0xfc421aD3C883Bf9E7C4f42dE845C4e4405799e73) |  [GHO ProxyAdmin](https://gnosisscan.io//address/0x06BA20FB633cbF38b7acFdC243829Fb5f897e19c) |  onlyFacilitator |  [Gho Direct Minter](https://gnosisscan.io//address/0xDe6539018B095353A40753Dc54C91C68c9487D4E) |  mint, burn | |--------|--------|--------|--------|--------|
|  [GHO](https://gnosisscan.io//address/0xfc421aD3C883Bf9E7C4f42dE845C4e4405799e73) |  [GHO ProxyAdmin](https://gnosisscan.io//address/0x06BA20FB633cbF38b7acFdC243829Fb5f897e19c) |  onlyFacilitatorManager |  [Executor_lvl1](https://gnosisscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) |  addFacilitator, removeFacilitator | |--------|--------|--------|--------|--------|
|  [GHO](https://gnosisscan.io//address/0xfc421aD3C883Bf9E7C4f42dE845C4e4405799e73) |  [GHO ProxyAdmin](https://gnosisscan.io//address/0x06BA20FB633cbF38b7acFdC243829Fb5f897e19c) |  onlyBucketManager |  [Executor_lvl1](https://gnosisscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D), [Gho Bucket Steward](https://gnosisscan.io//address/0x6Bb7a212910682DCFdbd5BCBb3e28FB4E8da10Ee) |  setFacilitatorBucketCapacity | |--------|--------|--------|--------|--------|
|  [GHO ProxyAdmin](https://gnosisscan.io//address/0x06ba20fb633cbf38b7acfdc243829fb5f897e19c) |  - |  onlyOwner |  [Executor_lvl1](https://gnosisscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|
|  [GhoAaveSteward](https://gnosisscan.io//address/0x6e637e1E48025E51315d50ab96d5b3be1971A715) |  - |  onlyOwner |  [Executor_lvl1](https://gnosisscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) |  setBorrowRateConfig | |--------|--------|--------|--------|--------|
|  [GhoAaveSteward](https://gnosisscan.io//address/0x6e637e1E48025E51315d50ab96d5b3be1971A715) |  - |  onlyRiskCouncil |  [Gho Risk Council](https://gnosisscan.io//address/0x8513e6F37dBc52De87b166980Fa3F50639694B60) |  updateGhoBorrowRate, updateGhoBorrowCap, updateGhoSupplyCap | |--------|--------|--------|--------|--------|

### Guardians 
| Guardian |Threshold |Address |Owners |
|----------|----------|----------|----------|
|  [Gho Risk Council](https://gnosisscan.io//address/0x8513e6F37dBc52De87b166980Fa3F50639694B60) |  2/3 |  0x8513e6F37dBc52De87b166980Fa3F50639694B60 |  [0x4b752551fC6345A7de82F76fd7a5015CA16d1a74](https://gnosisscan.io//address/0x4b752551fC6345A7de82F76fd7a5015CA16d1a74), [0xb291232F480F41c75802C4a60F1D2AC03404Afef](https://gnosisscan.io//address/0xb291232F480F41c75802C4a60F1D2AC03404Afef), [0x9DE1d45e2786b03498289959203F25b29B4D1193](https://gnosisscan.io//address/0x9DE1d45e2786b03498289959203F25b29B4D1193) | |--------|--------|--------|--------|

### Admins
| Role |Contract |
|----------|----------|
|  DEFAULT_ADMIN |  [Executor_lvl1](https://gnosisscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) | |--------|--------|
|  FACILITATOR_MANAGER_ROLE |  [Executor_lvl1](https://gnosisscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) | |--------|--------|
|  BUCKET_MANAGER_ROLE |  [Executor_lvl1](https://gnosisscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D), [Gho Bucket Steward](https://gnosisscan.io//address/0x6Bb7a212910682DCFdbd5BCBb3e28FB4E8da10Ee) | |--------|--------|

