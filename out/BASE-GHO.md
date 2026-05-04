# BASE 
## GHO 
### Contracts upgradeability
| contract |upgradeable by |
|----------|----------|
|  [GHO](https://basescan.org/address/0x6Bb7a212910682DCFdbd5BCBb3e28FB4E8da10Ee) |  Governance | |--------|--------|
|  [GHO ProxyAdmin](https://basescan.org/address/0x882c95f502384515e82607074668d19dacb42a09) |  not upgradeable | |--------|--------|
|  [GhoAaveSteward](https://basescan.org/address/0xC5BcC58BE6172769ca1a78B8A45752E3C5059c39) |  not upgradeable | |--------|--------|

### Actions type
| type |can be executed by |
|----------|----------|
|  adiConfigurations |  Governance | |--------|--------|
|  retryAndInvalidateMessages |  Multi-sig,Governance | |--------|--------|

### Contracts
| contract |proxyAdmin |modifier |permission owner |functions |
|----------|----------|----------|----------|----------|
|  [GHO](https://basescan.org/address/0x6Bb7a212910682DCFdbd5BCBb3e28FB4E8da10Ee) |  [GHO ProxyAdmin](https://basescan.org/address/0x882c95F502384515e82607074668d19DacB42A09) |  onlyFacilitator |  [Gho Direct Minter](https://basescan.org/address/0x98217A06721Ebf727f2C8d9aD7718ec28b7aAe34) |  mint, burn | |--------|--------|--------|--------|--------|
|  [GHO](https://basescan.org/address/0x6Bb7a212910682DCFdbd5BCBb3e28FB4E8da10Ee) |  [GHO ProxyAdmin](https://basescan.org/address/0x882c95F502384515e82607074668d19DacB42A09) |  onlyFacilitatorManager |  [Executor_lvl1](https://basescan.org/address/0x9390B1735def18560c509E2d0bc090E9d6BA257a) |  addFacilitator, removeFacilitator | |--------|--------|--------|--------|--------|
|  [GHO](https://basescan.org/address/0x6Bb7a212910682DCFdbd5BCBb3e28FB4E8da10Ee) |  [GHO ProxyAdmin](https://basescan.org/address/0x882c95F502384515e82607074668d19DacB42A09) |  onlyBucketManager |  [Executor_lvl1](https://basescan.org/address/0x9390B1735def18560c509E2d0bc090E9d6BA257a), [Gho Bucket Steward](https://basescan.org/address/0x3c47237479e7569653eF9beC4a7Cd2ee3F78b396) |  setFacilitatorBucketCapacity | |--------|--------|--------|--------|--------|
|  [GHO ProxyAdmin](https://basescan.org/address/0x882c95f502384515e82607074668d19dacb42a09) |  - |  onlyOwner |  [Executor_lvl1](https://basescan.org/address/0x9390B1735def18560c509E2d0bc090E9d6BA257a) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|
|  [GhoAaveSteward](https://basescan.org/address/0xC5BcC58BE6172769ca1a78B8A45752E3C5059c39) |  - |  onlyOwner |  [Executor_lvl1](https://basescan.org/address/0x9390B1735def18560c509E2d0bc090E9d6BA257a) |  setBorrowRateConfig | |--------|--------|--------|--------|--------|
|  [GhoAaveSteward](https://basescan.org/address/0xC5BcC58BE6172769ca1a78B8A45752E3C5059c39) |  - |  onlyRiskCouncil |  [Gho Risk Council](https://basescan.org/address/0x8513e6F37dBc52De87b166980Fa3F50639694B60) |  updateGhoBorrowRate, updateGhoBorrowCap, updateGhoSupplyCap | |--------|--------|--------|--------|--------|

### Guardians 
| Guardian |Threshold |Address |Owners |
|----------|----------|----------|----------|
|  [Gho Risk Council](https://basescan.org/address/0x8513e6F37dBc52De87b166980Fa3F50639694B60) |  3/4 |  0x8513e6F37dBc52De87b166980Fa3F50639694B60 |  [0xCAC616Fffb687cBDDD250b2aE6F672449462985C](https://basescan.org/address/0xCAC616Fffb687cBDDD250b2aE6F672449462985C), [0x329c54289Ff5D6B7b7daE13592C6B1EDA1543eD4](https://basescan.org/address/0x329c54289Ff5D6B7b7daE13592C6B1EDA1543eD4), [0xb647055A9915bF9c8021a684E175A353525b9890](https://basescan.org/address/0xb647055A9915bF9c8021a684E175A353525b9890), [0x606dC57cd166643760E049609bfd1D8a698D3bAc](https://basescan.org/address/0x606dC57cd166643760E049609bfd1D8a698D3bAc) | |--------|--------|--------|--------|

### Admins
| Role |Contract |
|----------|----------|
|  DEFAULT_ADMIN |  [Executor_lvl1](https://basescan.org/address/0x9390B1735def18560c509E2d0bc090E9d6BA257a) | |--------|--------|
|  FACILITATOR_MANAGER_ROLE |  [Executor_lvl1](https://basescan.org/address/0x9390B1735def18560c509E2d0bc090E9d6BA257a) | |--------|--------|
|  BUCKET_MANAGER_ROLE |  [Executor_lvl1](https://basescan.org/address/0x9390B1735def18560c509E2d0bc090E9d6BA257a), [Gho Bucket Steward](https://basescan.org/address/0x3c47237479e7569653eF9beC4a7Cd2ee3F78b396) | |--------|--------|

