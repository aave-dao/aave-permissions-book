# ETHEREUM 
## V2_MISC 
### Contracts upgradeability
| contract |upgradeable by |
|----------|----------|
|  [LendToAaveMigrator](https://etherscan.io/address/0x317625234562B1526Ea2FaC4030Ea499C5291de4) |  Governance | |--------|--------|
|  [EcosystemReserve](https://etherscan.io/address/0x25F2226B597E8F9514B3F68F00f494cF4f286491) |  Governance | |--------|--------|
|  [EcosystemReserveController](https://etherscan.io/address/0x3d569673dAa0575c936c7c67c4E6AedA69CC630C) |  not upgradeable | |--------|--------|
|  Aave a/v/s tokens |  Governance | |--------|--------|

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
|  [LendToAaveMigrator](https://etherscan.io/address/0x317625234562B1526Ea2FaC4030Ea499C5291de4) |  [ProxyAdmin](https://etherscan.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  - |  - |  - | |--------|--------|--------|--------|--------|
|  [EcosystemReserve](https://etherscan.io/address/0x25F2226B597E8F9514B3F68F00f494cF4f286491) |  [ProxyAdmin](https://etherscan.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  onlyFundsAdmin |  [EcosystemReserveController](https://etherscan.io/address/0x3d569673dAa0575c936c7c67c4E6AedA69CC630C) |  approve, transfer, createStream | |--------|--------|--------|--------|--------|
|  [EcosystemReserve](https://etherscan.io/address/0x25F2226B597E8F9514B3F68F00f494cF4f286491) |  [ProxyAdmin](https://etherscan.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  onlyAdminOrRecipient |  [EcosystemReserveController](https://etherscan.io/address/0x3d569673dAa0575c936c7c67c4E6AedA69CC630C) |  withdrawFromStream, cancelStream | |--------|--------|--------|--------|--------|
|  [EcosystemReserveController](https://etherscan.io/address/0x3d569673dAa0575c936c7c67c4E6AedA69CC630C) |  - |  onlyOwner |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  approve, transfer, createStream, withdrawFromStream, cancelStream | |--------|--------|--------|--------|--------|

