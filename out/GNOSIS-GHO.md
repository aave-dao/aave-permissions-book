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
|  [Gho Risk Council](https://gnosisscan.io//address/0x8513e6F37dBc52De87b166980Fa3F50639694B60) |  3/4 |  0x8513e6F37dBc52De87b166980Fa3F50639694B60 |  [0xCAC616Fffb687cBDDD250b2aE6F672449462985C](https://gnosisscan.io//address/0xCAC616Fffb687cBDDD250b2aE6F672449462985C), [0x329c54289Ff5D6B7b7daE13592C6B1EDA1543eD4](https://gnosisscan.io//address/0x329c54289Ff5D6B7b7daE13592C6B1EDA1543eD4), [0xb647055A9915bF9c8021a684E175A353525b9890](https://gnosisscan.io//address/0xb647055A9915bF9c8021a684E175A353525b9890), [0x606dC57cd166643760E049609bfd1D8a698D3bAc](https://gnosisscan.io//address/0x606dC57cd166643760E049609bfd1D8a698D3bAc) | |--------|--------|--------|--------|

### Admins
| Role |Contract |
|----------|----------|
|  DEFAULT_ADMIN |  [Executor_lvl1](https://gnosisscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) | |--------|--------|
|  FACILITATOR_MANAGER_ROLE |  [Executor_lvl1](https://gnosisscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D) | |--------|--------|
|  BUCKET_MANAGER_ROLE |  [Executor_lvl1](https://gnosisscan.io//address/0x1dF462e2712496373A347f8ad10802a5E95f053D), [Gho Bucket Steward](https://gnosisscan.io//address/0x6Bb7a212910682DCFdbd5BCBb3e28FB4E8da10Ee) | |--------|--------|

