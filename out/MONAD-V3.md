# MONAD 
## V3 
### Contracts upgradeability
| contract |upgradeable by |
|----------|----------|
|  Aave a/v/s tokens |  Governance | |--------|--------|
|  [GranularGuardian](https://monadscan.com/address/0xD3DD0bE957fcE2dCd359e09374Cbc99f60337D42) |  not upgradeable | |--------|--------|
|  [PayloadsController](https://monadscan.com/address/0x442CA936e5E6Db875357d0A16481145c96dd9a82) |  Governance | |--------|--------|
|  [PayloadsControllerProxyAdmin](https://monadscan.com/address/0x7c01dcaa05d42c16ca3eb5031b0b604c3152857c) |  not upgradeable | |--------|--------|
|  [Executor_lvl1](https://monadscan.com/address/0xa9d0EAFF48cE1DF468f9eAeb7e628c413343F6A2) |  not upgradeable | |--------|--------|
|  [CCIP adapter](https://monadscan.com/address/0x7Cd4245433185A08084E9cf80300682397F733AC) |  not upgradeable | |--------|--------|
|  [Hyperlane adapter](https://monadscan.com/address/0xb8F8aFdB7f1F4Ca9D842adFF86d052cb0C9f20CA) |  not upgradeable | |--------|--------|
|  [LayerZero adapter](https://monadscan.com/address/0xb544322f8e59B71d7875e0E2EbceB7f3783257BE) |  not upgradeable | |--------|--------|
|  [CrossChainController](https://monadscan.com/address/0x8dd5b84b26ae3916A5Fb34C8968F93d206216b63) |  Governance | |--------|--------|
|  [CrossChainControllerProxyAdmin](https://monadscan.com/address/0x2a405b06fe71e12062c41272f01c789adac9fdd9) |  not upgradeable | |--------|--------|

### Actions type
| type |can be executed by |
|----------|----------|
|  adiConfigurations |  Governance | |--------|--------|
|  retryAndInvalidateMessages |  Multi-sig,Governance | |--------|--------|

### Governance V3 Contracts
| contract |proxyAdmin |modifier |permission owner |functions |
|----------|----------|----------|----------|----------|
|  [GranularGuardian](https://monadscan.com/address/0xD3DD0bE957fcE2dCd359e09374Cbc99f60337D42) |  - |  onlyRetryGuardian |  [Aave Labs Guardian Monad](https://monadscan.com/address/0x2B99790c35a401be873FA7Eb514D9220736BB1cA) |  retryEnvelope, retryTransaction | |--------|--------|--------|--------|--------|
|  [GranularGuardian](https://monadscan.com/address/0xD3DD0bE957fcE2dCd359e09374Cbc99f60337D42) |  - |  onlyEmergencyGuardian |  [Aave Governance Guardian Monad](https://monadscan.com/address/0x056E4C4E80D1D14a637ccbD0412CDAAEc5B51F4E) |  solveEmergency | |--------|--------|--------|--------|--------|
|  [GranularGuardian](https://monadscan.com/address/0xD3DD0bE957fcE2dCd359e09374Cbc99f60337D42) |  - |  onlyDefaultAdmin |  [Executor_lvl1](https://monadscan.com/address/0xa9d0EAFF48cE1DF468f9eAeb7e628c413343F6A2) |  updateGuardian | |--------|--------|--------|--------|--------|
|  [PayloadsController](https://monadscan.com/address/0x442CA936e5E6Db875357d0A16481145c96dd9a82) |  [PayloadsControllerProxyAdmin](https://monadscan.com/address/0x7C01dCAA05d42C16cA3eb5031B0B604C3152857c) |  onlyOwner |  [Executor_lvl1](https://monadscan.com/address/0xa9d0EAFF48cE1DF468f9eAeb7e628c413343F6A2) |  updateExecutors | |--------|--------|--------|--------|--------|
|  [PayloadsController](https://monadscan.com/address/0x442CA936e5E6Db875357d0A16481145c96dd9a82) |  [PayloadsControllerProxyAdmin](https://monadscan.com/address/0x7C01dCAA05d42C16cA3eb5031B0B604C3152857c) |  onlyGuardian |  [Aave Governance Guardian Monad](https://monadscan.com/address/0x056E4C4E80D1D14a637ccbD0412CDAAEc5B51F4E) |  cancelPayload | |--------|--------|--------|--------|--------|
|  [PayloadsController](https://monadscan.com/address/0x442CA936e5E6Db875357d0A16481145c96dd9a82) |  [PayloadsControllerProxyAdmin](https://monadscan.com/address/0x7C01dCAA05d42C16cA3eb5031B0B604C3152857c) |  onlyOwnerOrGuardian |  [Aave Governance Guardian Monad](https://monadscan.com/address/0x056E4C4E80D1D14a637ccbD0412CDAAEc5B51F4E), [Executor_lvl1](https://monadscan.com/address/0xa9d0EAFF48cE1DF468f9eAeb7e628c413343F6A2) |  updateGuardian | |--------|--------|--------|--------|--------|
|  [PayloadsController](https://monadscan.com/address/0x442CA936e5E6Db875357d0A16481145c96dd9a82) |  [PayloadsControllerProxyAdmin](https://monadscan.com/address/0x7C01dCAA05d42C16cA3eb5031B0B604C3152857c) |  onlyRescueGuardian |  [Executor_lvl1](https://monadscan.com/address/0xa9d0EAFF48cE1DF468f9eAeb7e628c413343F6A2) |  emergencyTokenTransfer, emergencyEtherTransfer | |--------|--------|--------|--------|--------|
|  [PayloadsControllerProxyAdmin](https://monadscan.com/address/0x7c01dcaa05d42c16ca3eb5031b0b604c3152857c) |  - |  onlyOwner |  [Executor_lvl1](https://monadscan.com/address/0xa9d0EAFF48cE1DF468f9eAeb7e628c413343F6A2) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|
|  [Executor_lvl1](https://monadscan.com/address/0xa9d0EAFF48cE1DF468f9eAeb7e628c413343F6A2) |  - |  onlyOwner |  [PayloadsController](https://monadscan.com/address/0x442CA936e5E6Db875357d0A16481145c96dd9a82) |  executeTransaction | |--------|--------|--------|--------|--------|
|  [CCIP adapter](https://monadscan.com/address/0x7Cd4245433185A08084E9cf80300682397F733AC) |  - |  trustedRemote |  [CrossChainController(Eth)](https://monadscan.com/address/0xEd42a7D8559a463722Ca4beD50E0Cc05a386b0e1) |  receiveMessage | |--------|--------|--------|--------|--------|
|  [Hyperlane adapter](https://monadscan.com/address/0xb8F8aFdB7f1F4Ca9D842adFF86d052cb0C9f20CA) |  - |  trustedRemote |  [CrossChainController(Eth)](https://monadscan.com/address/0xEd42a7D8559a463722Ca4beD50E0Cc05a386b0e1) |  receiveMessage | |--------|--------|--------|--------|--------|
|  [LayerZero adapter](https://monadscan.com/address/0xb544322f8e59B71d7875e0E2EbceB7f3783257BE) |  - |  trustedRemote |  [CrossChainController(Eth)](https://monadscan.com/address/0xEd42a7D8559a463722Ca4beD50E0Cc05a386b0e1) |  receiveMessage | |--------|--------|--------|--------|--------|
|  [CrossChainController](https://monadscan.com/address/0x8dd5b84b26ae3916A5Fb34C8968F93d206216b63) |  [CrossChainControllerProxyAdmin](https://monadscan.com/address/0x2A405B06FE71e12062C41272F01c789ADAC9Fdd9) |  onlyOwner |  [Executor_lvl1](https://monadscan.com/address/0xa9d0EAFF48cE1DF468f9eAeb7e628c413343F6A2) |  approveSenders, removeSenders, enableBridgeAdapters, disableBridgeAdapters, updateMessagesValidityTimestamp, allowReceiverBridgeAdapters, disallowReceiverBridgeAdapters | |--------|--------|--------|--------|--------|
|  [CrossChainController](https://monadscan.com/address/0x8dd5b84b26ae3916A5Fb34C8968F93d206216b63) |  [CrossChainControllerProxyAdmin](https://monadscan.com/address/0x2A405B06FE71e12062C41272F01c789ADAC9Fdd9) |  onlyOwnerOrGuardian |  [Aave Granular Guardian Monad](https://monadscan.com/address/0xD3DD0bE957fcE2dCd359e09374Cbc99f60337D42), [Executor_lvl1](https://monadscan.com/address/0xa9d0EAFF48cE1DF468f9eAeb7e628c413343F6A2) |  retryEnvelope, retryTransaction, updateGuardian | |--------|--------|--------|--------|--------|
|  [CrossChainController](https://monadscan.com/address/0x8dd5b84b26ae3916A5Fb34C8968F93d206216b63) |  [CrossChainControllerProxyAdmin](https://monadscan.com/address/0x2A405B06FE71e12062C41272F01c789ADAC9Fdd9) |  onlyRescueGuardian |  [Executor_lvl1](https://monadscan.com/address/0xa9d0EAFF48cE1DF468f9eAeb7e628c413343F6A2) |  emergencyTokenTransfer, emergencyEtherTransfer | |--------|--------|--------|--------|--------|
|  [CrossChainController](https://monadscan.com/address/0x8dd5b84b26ae3916A5Fb34C8968F93d206216b63) |  [CrossChainControllerProxyAdmin](https://monadscan.com/address/0x2A405B06FE71e12062C41272F01c789ADAC9Fdd9) |  onlyApprovedSenders |   |  forwardMessage | |--------|--------|--------|--------|--------|
|  [CrossChainController](https://monadscan.com/address/0x8dd5b84b26ae3916A5Fb34C8968F93d206216b63) |  [CrossChainControllerProxyAdmin](https://monadscan.com/address/0x2A405B06FE71e12062C41272F01c789ADAC9Fdd9) |  onlyApprovedBridges |  [CCIP adapter](https://monadscan.com/address/0x7Cd4245433185A08084E9cf80300682397F733AC), [Hyperlane adapter](https://monadscan.com/address/0xb8F8aFdB7f1F4Ca9D842adFF86d052cb0C9f20CA), [LayerZero adapter](https://monadscan.com/address/0xb544322f8e59B71d7875e0E2EbceB7f3783257BE) |  receiveCrossChainMessage | |--------|--------|--------|--------|--------|
|  [CrossChainControllerProxyAdmin](https://monadscan.com/address/0x2a405b06fe71e12062c41272f01c789adac9fdd9) |  - |  onlyOwner |  [Executor_lvl1](https://monadscan.com/address/0xa9d0EAFF48cE1DF468f9eAeb7e628c413343F6A2) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|

### Guardians 
| Guardian |Threshold |Address |Owners |
|----------|----------|----------|----------|
|  [Aave Labs Guardian Monad](https://monadscan.com/address/0x2B99790c35a401be873FA7Eb514D9220736BB1cA) |  1/2 |  0x2B99790c35a401be873FA7Eb514D9220736BB1cA |  [0x606dC57cd166643760E049609bfd1D8a698D3bAc](https://monadscan.com/address/0x606dC57cd166643760E049609bfd1D8a698D3bAc), [0xbf113Fa52454A94185b65e6f2E818B7f178f937a](https://monadscan.com/address/0xbf113Fa52454A94185b65e6f2E818B7f178f937a) | |--------|--------|--------|--------|
|  [Aave Governance Guardian Monad](https://monadscan.com/address/0x056E4C4E80D1D14a637ccbD0412CDAAEc5B51F4E) |  5/9 |  0x056E4C4E80D1D14a637ccbD0412CDAAEc5B51F4E |  [0xDA5Ae43e179987a66B9831F92223567e1F38BE7D](https://monadscan.com/address/0xDA5Ae43e179987a66B9831F92223567e1F38BE7D), [0x1e3804357eD445251FfECbb6e40107bf03888885](https://monadscan.com/address/0x1e3804357eD445251FfECbb6e40107bf03888885), [0x4f96743057482a2E10253AFDacDA3fd9CF2C1DC9](https://monadscan.com/address/0x4f96743057482a2E10253AFDacDA3fd9CF2C1DC9), [0xebED04E9137AfeBFF6a1B97aC0adf61a544eFE29](https://monadscan.com/address/0xebED04E9137AfeBFF6a1B97aC0adf61a544eFE29), [0xbd4DCfA978c6D0d342cE36809AfFFa49d4B7f1F7](https://monadscan.com/address/0xbd4DCfA978c6D0d342cE36809AfFFa49d4B7f1F7), [0xA3103D0ED00d24795Faa2d641ACf6A320EeD7396](https://monadscan.com/address/0xA3103D0ED00d24795Faa2d641ACf6A320EeD7396), [0x936CD9654271083cCF93A975919Da0aB3Bc99EF3](https://monadscan.com/address/0x936CD9654271083cCF93A975919Da0aB3Bc99EF3), [0x0D2394C027602Dc4c3832Ffd849b5df45DBac0E9](https://monadscan.com/address/0x0D2394C027602Dc4c3832Ffd849b5df45DBac0E9), [0x4C30E33758216aD0d676419c21CB8D014C68099f](https://monadscan.com/address/0x4C30E33758216aD0d676419c21CB8D014C68099f) | |--------|--------|--------|--------|

### Granular Guardian Admins
| Role |Contract |
|----------|----------|
|  DEFAULT_ADMIN |  [Executor_lvl1](https://monadscan.com/address/0xa9d0EAFF48cE1DF468f9eAeb7e628c413343F6A2) | |--------|--------|
|  SOLVE_EMERGENCY_ROLE |  [Aave Governance Guardian Monad](https://monadscan.com/address/0x056E4C4E80D1D14a637ccbD0412CDAAEc5B51F4E) | |--------|--------|
|  RETRY_ROLE |  [Aave Labs Guardian Monad](https://monadscan.com/address/0x2B99790c35a401be873FA7Eb514D9220736BB1cA) | |--------|--------|

