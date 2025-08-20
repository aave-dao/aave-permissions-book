# INK 
## V3 
### Contracts upgradeability
| contract |upgradeable by |
|----------|----------|
|  Aave a/v/s tokens |  Governance | |--------|--------|
|  [GranularGuardian](https://explorer.inkonchain.com//address/0xa2bDB2335Faf1940c99654c592B1a80618d79Fc9) |  not upgradeable | |--------|--------|
|  [PayloadsController](https://explorer.inkonchain.com//address/0x44D73D7C4b2f98F426Bf8B5e87628d9eE38ef0Cf) |  Governance | |--------|--------|
|  [PayloadsControllerProxyAdmin](https://explorer.inkonchain.com//address/0xf2ba11f27ae9c11eb5a6c453c2421f6c0b29c700) |  not upgradeable | |--------|--------|
|  [Executor_lvl1](https://explorer.inkonchain.com//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  not upgradeable | |--------|--------|
|  [Ink native adapter](https://explorer.inkonchain.com//address/0xC2cD4F76B7a77AEaE3C04A9B6B105EC1Ad28e984) |  not upgradeable | |--------|--------|
|  [CrossChainController](https://explorer.inkonchain.com//address/0x990B75fD1a2345D905a385dBC6e17BEe0Cb2f505) |  Governance | |--------|--------|
|  [CrossChainControllerProxyAdmin](https://explorer.inkonchain.com//address/0x0c62e1e46e91bb2c277387bcb1b2887ed3267b9c) |  not upgradeable | |--------|--------|

### Actions type
| type |can be executed by |
|----------|----------|
|  updateReserveBorrowSettings |  Governance | |--------|--------|
|  configureProtocolFees |  External Contract | |--------|--------|
|  updateReserveCaps |  External Contract | |--------|--------|
|  updateReserveSettings |  Governance | |--------|--------|
|  configureCollateral |  Governance | |--------|--------|
|  upgradeAaveTokens (a/v/s) |  External Contract | |--------|--------|
|  upgradeAaveOracles |  External Contract | |--------|--------|
|  reserveUpgradeability |  Governance | |--------|--------|
|  pausePool |  External Contract,Multi-sig | |--------|--------|
|  pauseAndFreezeReserve |  External Contract,Multi-sig | |--------|--------|
|  reserveListing |  External Contract | |--------|--------|
|  adminsConfiguration |  External Contract | |--------|--------|
|  protocolUpgradeablity |  External Contract | |--------|--------|
|  adiConfigurations |  Governance | |--------|--------|
|  retryAndInvalidateMessages |  Multi-sig,Governance | |--------|--------|

### Governance V3 Contracts 
| contract |proxyAdmin |modifier |permission owner |functions |
|----------|----------|----------|----------|----------|
|  [GranularGuardian](https://explorer.inkonchain.com//address/0xa2bDB2335Faf1940c99654c592B1a80618d79Fc9) |  - |  onlyRetryGuardian |  [BGD](https://explorer.inkonchain.com//address/0x81D251dA015A0C7bD882918Ca1ec6B7B8E094585) |  retryEnvelope, retryTransaction | |--------|--------|--------|--------|--------|
|  [GranularGuardian](https://explorer.inkonchain.com//address/0xa2bDB2335Faf1940c99654c592B1a80618d79Fc9) |  - |  onlyEmergencyGuardian |  [Aave Governance Guardian Ink](https://explorer.inkonchain.com//address/0x1bBcC6F0BB563067Ca45450023a13E34fa963Fa9) |  solveEmergency | |--------|--------|--------|--------|--------|
|  [GranularGuardian](https://explorer.inkonchain.com//address/0xa2bDB2335Faf1940c99654c592B1a80618d79Fc9) |  - |  onlyDefaultAdmin |  [Executor_lvl1](https://explorer.inkonchain.com//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  updateGuardian | |--------|--------|--------|--------|--------|
|  [PayloadsController](https://explorer.inkonchain.com//address/0x44D73D7C4b2f98F426Bf8B5e87628d9eE38ef0Cf) |  [PayloadsControllerProxyAdmin](https://explorer.inkonchain.com//address/0xf2Ba11f27ae9c11eB5a6C453c2421F6c0B29c700) |  onlyOwner |  [Executor_lvl1](https://explorer.inkonchain.com//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  updateExecutors | |--------|--------|--------|--------|--------|
|  [PayloadsController](https://explorer.inkonchain.com//address/0x44D73D7C4b2f98F426Bf8B5e87628d9eE38ef0Cf) |  [PayloadsControllerProxyAdmin](https://explorer.inkonchain.com//address/0xf2Ba11f27ae9c11eB5a6C453c2421F6c0B29c700) |  onlyGuardian |  [Aave Governance Guardian Ink](https://explorer.inkonchain.com//address/0x1bBcC6F0BB563067Ca45450023a13E34fa963Fa9) |  cancelPayload | |--------|--------|--------|--------|--------|
|  [PayloadsController](https://explorer.inkonchain.com//address/0x44D73D7C4b2f98F426Bf8B5e87628d9eE38ef0Cf) |  [PayloadsControllerProxyAdmin](https://explorer.inkonchain.com//address/0xf2Ba11f27ae9c11eB5a6C453c2421F6c0B29c700) |  onlyOwnerOrGuardian |  [Aave Governance Guardian Ink](https://explorer.inkonchain.com//address/0x1bBcC6F0BB563067Ca45450023a13E34fa963Fa9), [Executor_lvl1](https://explorer.inkonchain.com//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  updateGuardian | |--------|--------|--------|--------|--------|
|  [PayloadsController](https://explorer.inkonchain.com//address/0x44D73D7C4b2f98F426Bf8B5e87628d9eE38ef0Cf) |  [PayloadsControllerProxyAdmin](https://explorer.inkonchain.com//address/0xf2Ba11f27ae9c11eB5a6C453c2421F6c0B29c700) |  onlyRescueGuardian |  [Executor_lvl1](https://explorer.inkonchain.com//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  emergencyTokenTransfer, emergencyEtherTransfer | |--------|--------|--------|--------|--------|
|  [PayloadsControllerProxyAdmin](https://explorer.inkonchain.com//address/0xf2ba11f27ae9c11eb5a6c453c2421f6c0b29c700) |  - |  onlyOwner |  [Executor_lvl1](https://explorer.inkonchain.com//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|
|  [Executor_lvl1](https://explorer.inkonchain.com//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  - |  onlyOwner |  [PayloadsController](https://explorer.inkonchain.com//address/0x44D73D7C4b2f98F426Bf8B5e87628d9eE38ef0Cf) |  executeTransaction | |--------|--------|--------|--------|--------|
|  [Ink native adapter](https://explorer.inkonchain.com//address/0xC2cD4F76B7a77AEaE3C04A9B6B105EC1Ad28e984) |  - |  trustedRemote |  [CrossChainController(Eth)](https://explorer.inkonchain.com//address/0xEd42a7D8559a463722Ca4beD50E0Cc05a386b0e1) |  receiveMessage | |--------|--------|--------|--------|--------|
|  [CrossChainController](https://explorer.inkonchain.com//address/0x990B75fD1a2345D905a385dBC6e17BEe0Cb2f505) |  [CrossChainControllerProxyAdmin](https://explorer.inkonchain.com//address/0x0C62e1e46E91bB2c277387BcB1b2887ed3267b9c) |  onlyOwner |  [Executor_lvl1](https://explorer.inkonchain.com//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  approveSenders, removeSenders, enableBridgeAdapters, disableBridgeAdapters, updateMessagesValidityTimestamp, allowReceiverBridgeAdapters, disallowReceiverBridgeAdapters | |--------|--------|--------|--------|--------|
|  [CrossChainController](https://explorer.inkonchain.com//address/0x990B75fD1a2345D905a385dBC6e17BEe0Cb2f505) |  [CrossChainControllerProxyAdmin](https://explorer.inkonchain.com//address/0x0C62e1e46E91bB2c277387BcB1b2887ed3267b9c) |  onlyOwnerOrGuardian |  [GranularGuardian](https://explorer.inkonchain.com//address/0xa2bDB2335Faf1940c99654c592B1a80618d79Fc9), [Executor_lvl1](https://explorer.inkonchain.com//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  retryEnvelope, retryTransaction, updateGuardian | |--------|--------|--------|--------|--------|
|  [CrossChainController](https://explorer.inkonchain.com//address/0x990B75fD1a2345D905a385dBC6e17BEe0Cb2f505) |  [CrossChainControllerProxyAdmin](https://explorer.inkonchain.com//address/0x0C62e1e46E91bB2c277387BcB1b2887ed3267b9c) |  onlyRescueGuardian |  [Executor_lvl1](https://explorer.inkonchain.com//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  emergencyTokenTransfer, emergencyEtherTransfer | |--------|--------|--------|--------|--------|
|  [CrossChainController](https://explorer.inkonchain.com//address/0x990B75fD1a2345D905a385dBC6e17BEe0Cb2f505) |  [CrossChainControllerProxyAdmin](https://explorer.inkonchain.com//address/0x0C62e1e46E91bB2c277387BcB1b2887ed3267b9c) |  onlyApprovedSenders |   |  forwardMessage | |--------|--------|--------|--------|--------|
|  [CrossChainController](https://explorer.inkonchain.com//address/0x990B75fD1a2345D905a385dBC6e17BEe0Cb2f505) |  [CrossChainControllerProxyAdmin](https://explorer.inkonchain.com//address/0x0C62e1e46E91bB2c277387BcB1b2887ed3267b9c) |  onlyApprovedBridges |  [Ink native adapter](https://explorer.inkonchain.com//address/0xC2cD4F76B7a77AEaE3C04A9B6B105EC1Ad28e984) |  receiveCrossChainMessage | |--------|--------|--------|--------|--------|
|  [CrossChainControllerProxyAdmin](https://explorer.inkonchain.com//address/0x0c62e1e46e91bb2c277387bcb1b2887ed3267b9c) |  - |  onlyOwner |  [Executor_lvl1](https://explorer.inkonchain.com//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|

### Guardians 
| Guardian |Threshold |Address |Owners |
|----------|----------|----------|----------|
|  [BGD](https://explorer.inkonchain.com//address/0x81D251dA015A0C7bD882918Ca1ec6B7B8E094585) |  2/3 |  0x81D251dA015A0C7bD882918Ca1ec6B7B8E094585 |  [0x0650302887619fa7727D8BD480Cda11A638B219B](https://explorer.inkonchain.com//address/0x0650302887619fa7727D8BD480Cda11A638B219B), [0xf71fc92e2949ccF6A5Fd369a0b402ba80Bc61E02](https://explorer.inkonchain.com//address/0xf71fc92e2949ccF6A5Fd369a0b402ba80Bc61E02), [0x5811d9FF80ff4B73A8F9bA42A6082FaB82E89Ea7](https://explorer.inkonchain.com//address/0x5811d9FF80ff4B73A8F9bA42A6082FaB82E89Ea7) | |--------|--------|--------|--------|
|  [Aave Governance Guardian Ink](https://explorer.inkonchain.com//address/0x1bBcC6F0BB563067Ca45450023a13E34fa963Fa9) |  5/9 |  0x1bBcC6F0BB563067Ca45450023a13E34fa963Fa9 |  [0xDA5Ae43e179987a66B9831F92223567e1F38BE7D](https://explorer.inkonchain.com//address/0xDA5Ae43e179987a66B9831F92223567e1F38BE7D), [0x1e3804357eD445251FfECbb6e40107bf03888885](https://explorer.inkonchain.com//address/0x1e3804357eD445251FfECbb6e40107bf03888885), [0x4f96743057482a2E10253AFDacDA3fd9CF2C1DC9](https://explorer.inkonchain.com//address/0x4f96743057482a2E10253AFDacDA3fd9CF2C1DC9), [0xebED04E9137AfeBFF6a1B97aC0adf61a544eFE29](https://explorer.inkonchain.com//address/0xebED04E9137AfeBFF6a1B97aC0adf61a544eFE29), [0xbd4DCfA978c6D0d342cE36809AfFFa49d4B7f1F7](https://explorer.inkonchain.com//address/0xbd4DCfA978c6D0d342cE36809AfFFa49d4B7f1F7), [0xA3103D0ED00d24795Faa2d641ACf6A320EeD7396](https://explorer.inkonchain.com//address/0xA3103D0ED00d24795Faa2d641ACf6A320EeD7396), [0x936CD9654271083cCF93A975919Da0aB3Bc99EF3](https://explorer.inkonchain.com//address/0x936CD9654271083cCF93A975919Da0aB3Bc99EF3), [0x0D2394C027602Dc4c3832Ffd849b5df45DBac0E9](https://explorer.inkonchain.com//address/0x0D2394C027602Dc4c3832Ffd849b5df45DBac0E9), [0x4C30E33758216aD0d676419c21CB8D014C68099f](https://explorer.inkonchain.com//address/0x4C30E33758216aD0d676419c21CB8D014C68099f) | |--------|--------|--------|--------|

### Granular Guardian Admins 
| Role |Contract |
|----------|----------|
|  DEFAULT_ADMIN |  [Executor_lvl1](https://explorer.inkonchain.com//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) | |--------|--------|
|  SOLVE_EMERGENCY_ROLE |  [Aave Governance Guardian Ink](https://explorer.inkonchain.com//address/0x1bBcC6F0BB563067Ca45450023a13E34fa963Fa9) | |--------|--------|
|  RETRY_ROLE |  [BGD](https://explorer.inkonchain.com//address/0x81D251dA015A0C7bD882918Ca1ec6B7B8E094585) | |--------|--------|

