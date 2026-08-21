# MANTLE 
## GHO 
### Contracts upgradeability
| contract |upgradeable by |
|----------|----------|
|  [GHO](https://explorer.mantle.xyz//address/0xfc421aD3C883Bf9E7C4f42dE845C4e4405799e73) |  Governance | |--------|--------|
|  [GHO ProxyAdmin](https://explorer.mantle.xyz//address/0x06ba20fb633cbf38b7acfdc243829fb5f897e19c) |  not upgradeable | |--------|--------|
|  [GhoAaveSteward](https://explorer.mantle.xyz//address/0xA5Ba213867E175A182a5dd6A9193C6158738105A) |  not upgradeable | |--------|--------|

### Actions type
| type |can be executed by |
|----------|----------|
|  adiConfigurations |  Governance | |--------|--------|
|  retryAndInvalidateMessages |  Multi-sig,Governance | |--------|--------|

### Contracts
| contract |proxyAdmin |modifier |permission owner |functions |
|----------|----------|----------|----------|----------|
|  [GHO](https://explorer.mantle.xyz//address/0xfc421aD3C883Bf9E7C4f42dE845C4e4405799e73) |  [GHO ProxyAdmin](https://explorer.mantle.xyz//address/0x06BA20FB633cbF38b7acFdC243829Fb5f897e19c) |  onlyFacilitator |  [Gho Direct Minter](https://explorer.mantle.xyz//address/0xDe6539018B095353A40753Dc54C91C68c9487D4E) |  mint, burn | |--------|--------|--------|--------|--------|
|  [GHO](https://explorer.mantle.xyz//address/0xfc421aD3C883Bf9E7C4f42dE845C4e4405799e73) |  [GHO ProxyAdmin](https://explorer.mantle.xyz//address/0x06BA20FB633cbF38b7acFdC243829Fb5f897e19c) |  onlyFacilitatorManager |  [Executor_lvl1](https://explorer.mantle.xyz//address/0x70884634D0098782592111A2A6B8d223be31CB7b) |  addFacilitator, removeFacilitator | |--------|--------|--------|--------|--------|
|  [GHO](https://explorer.mantle.xyz//address/0xfc421aD3C883Bf9E7C4f42dE845C4e4405799e73) |  [GHO ProxyAdmin](https://explorer.mantle.xyz//address/0x06BA20FB633cbF38b7acFdC243829Fb5f897e19c) |  onlyBucketManager |  [Executor_lvl1](https://explorer.mantle.xyz//address/0x70884634D0098782592111A2A6B8d223be31CB7b), [Gho Bucket Steward](https://explorer.mantle.xyz//address/0x2Ce400703dAcc37b7edFA99D228b8E70a4d3831B) |  setFacilitatorBucketCapacity | |--------|--------|--------|--------|--------|
|  [GHO ProxyAdmin](https://explorer.mantle.xyz//address/0x06ba20fb633cbf38b7acfdc243829fb5f897e19c) |  - |  onlyOwner |  [Executor_lvl1](https://explorer.mantle.xyz//address/0x70884634D0098782592111A2A6B8d223be31CB7b) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|
|  [GhoAaveSteward](https://explorer.mantle.xyz//address/0xA5Ba213867E175A182a5dd6A9193C6158738105A) |  - |  onlyOwner |  [Executor_lvl1](https://explorer.mantle.xyz//address/0x70884634D0098782592111A2A6B8d223be31CB7b) |  setBorrowRateConfig | |--------|--------|--------|--------|--------|
|  [GhoAaveSteward](https://explorer.mantle.xyz//address/0xA5Ba213867E175A182a5dd6A9193C6158738105A) |  - |  onlyRiskCouncil |  [Gho Risk Council](https://explorer.mantle.xyz//address/0x8513e6F37dBc52De87b166980Fa3F50639694B60) |  updateGhoBorrowRate, updateGhoBorrowCap, updateGhoSupplyCap | |--------|--------|--------|--------|--------|

### Guardians 
| Guardian |Threshold |Address |Owners |
|----------|----------|----------|----------|
|  [Gho Risk Council](https://explorer.mantle.xyz//address/0x8513e6F37dBc52De87b166980Fa3F50639694B60) |  2/3 |  0x8513e6F37dBc52De87b166980Fa3F50639694B60 |  [0x4b752551fC6345A7de82F76fd7a5015CA16d1a74](https://explorer.mantle.xyz//address/0x4b752551fC6345A7de82F76fd7a5015CA16d1a74), [0xb291232F480F41c75802C4a60F1D2AC03404Afef](https://explorer.mantle.xyz//address/0xb291232F480F41c75802C4a60F1D2AC03404Afef), [0x9DE1d45e2786b03498289959203F25b29B4D1193](https://explorer.mantle.xyz//address/0x9DE1d45e2786b03498289959203F25b29B4D1193) | |--------|--------|--------|--------|

### Admins
| Role |Contract |
|----------|----------|
|  DEFAULT_ADMIN |  [Executor_lvl1](https://explorer.mantle.xyz//address/0x70884634D0098782592111A2A6B8d223be31CB7b) | |--------|--------|
|  FACILITATOR_MANAGER_ROLE |  [Executor_lvl1](https://explorer.mantle.xyz//address/0x70884634D0098782592111A2A6B8d223be31CB7b) | |--------|--------|
|  BUCKET_MANAGER_ROLE |  [Executor_lvl1](https://explorer.mantle.xyz//address/0x70884634D0098782592111A2A6B8d223be31CB7b), [Gho Bucket Steward](https://explorer.mantle.xyz//address/0x2Ce400703dAcc37b7edFA99D228b8E70a4d3831B) | |--------|--------|

