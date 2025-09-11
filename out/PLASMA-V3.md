# PLASMA 
## V3 
### Contracts upgradeability
| contract |upgradeable by |
|----------|----------|
|  Aave a/v/s tokens |  Governance | |--------|--------|
|  [GranularGuardian](https://plasmascan.to//address/0x60665b4F4FF7073C5fed2656852dCa271DfE2684) |  not upgradeable | |--------|--------|
|  [PayloadsController](https://plasmascan.to//address/0xe76EB348E65eF163d85ce282125FF5a7F5712A1d) |  Governance | |--------|--------|
|  [PayloadsControllerProxyAdmin](https://plasmascan.to//address/0x4a195262caf35d94832458fd7b8d2c92bd355482) |  not upgradeable | |--------|--------|
|  [Executor_lvl1](https://plasmascan.to//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  not upgradeable | |--------|--------|
|  [LayerZero adapter](https://plasmascan.to//address/0x99950E7C7eB320A8551916e8676a42b90b058d5D) |  not upgradeable | |--------|--------|
|  [Hyperlane adapter](https://plasmascan.to//address/0x13Dc9eBb19bb1A14aa56215b443B2703A07ba2D5) |  not upgradeable | |--------|--------|
|  [CCIP adapter](https://plasmascan.to//address/0x719e23D7B48Fc5AEa65Cff1bc58865C2b8d89A34) |  not upgradeable | |--------|--------|
|  [CrossChainController](https://plasmascan.to//address/0x643441742f73e270e565619be6DE5f4D55E08cd6) |  Governance | |--------|--------|
|  [CrossChainControllerProxyAdmin](https://plasmascan.to//address/0x4b58bd6163c7020333b6e33a6e6495f308f420b9) |  not upgradeable | |--------|--------|

### Actions type
| type |can be executed by |
|----------|----------|
|  adiConfigurations |  Governance | |--------|--------|
|  retryAndInvalidateMessages |  Multi-sig,Governance | |--------|--------|

### Governance V3 Contracts 
| contract |proxyAdmin |modifier |permission owner |functions |
|----------|----------|----------|----------|----------|
|  [GranularGuardian](https://plasmascan.to//address/0x60665b4F4FF7073C5fed2656852dCa271DfE2684) |  - |  onlyRetryGuardian |  [BGD](https://plasmascan.to//address/0xdc62E0e65b2251Dc66404ca717FD32dcC365Be3A) |  retryEnvelope, retryTransaction | |--------|--------|--------|--------|--------|
|  [GranularGuardian](https://plasmascan.to//address/0x60665b4F4FF7073C5fed2656852dCa271DfE2684) |  - |  onlyEmergencyGuardian |  [Aave Governance Guardian Plasma](https://plasmascan.to//address/0x19CE4363FEA478Aa04B9EA2937cc5A2cbcD44be6) |  solveEmergency | |--------|--------|--------|--------|--------|
|  [GranularGuardian](https://plasmascan.to//address/0x60665b4F4FF7073C5fed2656852dCa271DfE2684) |  - |  onlyDefaultAdmin |  [Executor_lvl1](https://plasmascan.to//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  updateGuardian | |--------|--------|--------|--------|--------|
|  [PayloadsController](https://plasmascan.to//address/0xe76EB348E65eF163d85ce282125FF5a7F5712A1d) |  [PayloadsControllerProxyAdmin](https://plasmascan.to//address/0x4a195262cAf35D94832458Fd7b8D2c92bD355482) |  onlyOwner |  [Executor_lvl1](https://plasmascan.to//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  updateExecutors | |--------|--------|--------|--------|--------|
|  [PayloadsController](https://plasmascan.to//address/0xe76EB348E65eF163d85ce282125FF5a7F5712A1d) |  [PayloadsControllerProxyAdmin](https://plasmascan.to//address/0x4a195262cAf35D94832458Fd7b8D2c92bD355482) |  onlyGuardian |  [Aave Governance Guardian Plasma](https://plasmascan.to//address/0x19CE4363FEA478Aa04B9EA2937cc5A2cbcD44be6) |  cancelPayload | |--------|--------|--------|--------|--------|
|  [PayloadsController](https://plasmascan.to//address/0xe76EB348E65eF163d85ce282125FF5a7F5712A1d) |  [PayloadsControllerProxyAdmin](https://plasmascan.to//address/0x4a195262cAf35D94832458Fd7b8D2c92bD355482) |  onlyOwnerOrGuardian |  [Aave Governance Guardian Plasma](https://plasmascan.to//address/0x19CE4363FEA478Aa04B9EA2937cc5A2cbcD44be6), [Executor_lvl1](https://plasmascan.to//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  updateGuardian | |--------|--------|--------|--------|--------|
|  [PayloadsController](https://plasmascan.to//address/0xe76EB348E65eF163d85ce282125FF5a7F5712A1d) |  [PayloadsControllerProxyAdmin](https://plasmascan.to//address/0x4a195262cAf35D94832458Fd7b8D2c92bD355482) |  onlyRescueGuardian |  [Executor_lvl1](https://plasmascan.to//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  emergencyTokenTransfer, emergencyEtherTransfer | |--------|--------|--------|--------|--------|
|  [PayloadsControllerProxyAdmin](https://plasmascan.to//address/0x4a195262caf35d94832458fd7b8d2c92bd355482) |  - |  onlyOwner |  [Executor_lvl1](https://plasmascan.to//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|
|  [Executor_lvl1](https://plasmascan.to//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  - |  onlyOwner |  [PayloadsController](https://plasmascan.to//address/0xe76EB348E65eF163d85ce282125FF5a7F5712A1d) |  executeTransaction | |--------|--------|--------|--------|--------|
|  [LayerZero adapter](https://plasmascan.to//address/0x99950E7C7eB320A8551916e8676a42b90b058d5D) |  - |  trustedRemote |  [CrossChainController(Eth)](https://plasmascan.to//address/0xEd42a7D8559a463722Ca4beD50E0Cc05a386b0e1) |  receiveMessage | |--------|--------|--------|--------|--------|
|  [Hyperlane adapter](https://plasmascan.to//address/0x13Dc9eBb19bb1A14aa56215b443B2703A07ba2D5) |  - |  trustedRemote |  [CrossChainController(Eth)](https://plasmascan.to//address/0xEd42a7D8559a463722Ca4beD50E0Cc05a386b0e1) |  receiveMessage | |--------|--------|--------|--------|--------|
|  [CCIP adapter](https://plasmascan.to//address/0x719e23D7B48Fc5AEa65Cff1bc58865C2b8d89A34) |  - |  trustedRemote |  [CrossChainController(Eth)](https://plasmascan.to//address/0xEd42a7D8559a463722Ca4beD50E0Cc05a386b0e1) |  receiveMessage | |--------|--------|--------|--------|--------|
|  [CrossChainController](https://plasmascan.to//address/0x643441742f73e270e565619be6DE5f4D55E08cd6) |  [CrossChainControllerProxyAdmin](https://plasmascan.to//address/0x4B58BD6163c7020333b6e33a6E6495F308f420B9) |  onlyOwner |  [Executor_lvl1](https://plasmascan.to//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  approveSenders, removeSenders, enableBridgeAdapters, disableBridgeAdapters, updateMessagesValidityTimestamp, allowReceiverBridgeAdapters, disallowReceiverBridgeAdapters | |--------|--------|--------|--------|--------|
|  [CrossChainController](https://plasmascan.to//address/0x643441742f73e270e565619be6DE5f4D55E08cd6) |  [CrossChainControllerProxyAdmin](https://plasmascan.to//address/0x4B58BD6163c7020333b6e33a6E6495F308f420B9) |  onlyOwnerOrGuardian |  [Aave Granular Guardian Plasma](https://plasmascan.to//address/0x60665b4F4FF7073C5fed2656852dCa271DfE2684), [Executor_lvl1](https://plasmascan.to//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  retryEnvelope, retryTransaction, updateGuardian | |--------|--------|--------|--------|--------|
|  [CrossChainController](https://plasmascan.to//address/0x643441742f73e270e565619be6DE5f4D55E08cd6) |  [CrossChainControllerProxyAdmin](https://plasmascan.to//address/0x4B58BD6163c7020333b6e33a6E6495F308f420B9) |  onlyRescueGuardian |  [Executor_lvl1](https://plasmascan.to//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  emergencyTokenTransfer, emergencyEtherTransfer | |--------|--------|--------|--------|--------|
|  [CrossChainController](https://plasmascan.to//address/0x643441742f73e270e565619be6DE5f4D55E08cd6) |  [CrossChainControllerProxyAdmin](https://plasmascan.to//address/0x4B58BD6163c7020333b6e33a6E6495F308f420B9) |  onlyApprovedSenders |   |  forwardMessage | |--------|--------|--------|--------|--------|
|  [CrossChainController](https://plasmascan.to//address/0x643441742f73e270e565619be6DE5f4D55E08cd6) |  [CrossChainControllerProxyAdmin](https://plasmascan.to//address/0x4B58BD6163c7020333b6e33a6E6495F308f420B9) |  onlyApprovedBridges |  [LayerZero adapter](https://plasmascan.to//address/0x99950E7C7eB320A8551916e8676a42b90b058d5D), [Hyperlane adapter](https://plasmascan.to//address/0x13Dc9eBb19bb1A14aa56215b443B2703A07ba2D5), [CCIP adapter](https://plasmascan.to//address/0x719e23D7B48Fc5AEa65Cff1bc58865C2b8d89A34) |  receiveCrossChainMessage | |--------|--------|--------|--------|--------|
|  [CrossChainControllerProxyAdmin](https://plasmascan.to//address/0x4b58bd6163c7020333b6e33a6e6495f308f420b9) |  - |  onlyOwner |  [Executor_lvl1](https://plasmascan.to//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|

### Guardians 
| Guardian |Threshold |Address |Owners |
|----------|----------|----------|----------|
|  [BGD](https://plasmascan.to//address/0xdc62E0e65b2251Dc66404ca717FD32dcC365Be3A) |  2/3 |  0xdc62E0e65b2251Dc66404ca717FD32dcC365Be3A |  [0x0650302887619fa7727D8BD480Cda11A638B219B](https://plasmascan.to//address/0x0650302887619fa7727D8BD480Cda11A638B219B), [0xf71fc92e2949ccF6A5Fd369a0b402ba80Bc61E02](https://plasmascan.to//address/0xf71fc92e2949ccF6A5Fd369a0b402ba80Bc61E02), [0x5811d9FF80ff4B73A8F9bA42A6082FaB82E89Ea7](https://plasmascan.to//address/0x5811d9FF80ff4B73A8F9bA42A6082FaB82E89Ea7) | |--------|--------|--------|--------|
|  [Aave Governance Guardian Plasma](https://plasmascan.to//address/0x19CE4363FEA478Aa04B9EA2937cc5A2cbcD44be6) |  5/9 |  0x19CE4363FEA478Aa04B9EA2937cc5A2cbcD44be6 |  [0xDA5Ae43e179987a66B9831F92223567e1F38BE7D](https://plasmascan.to//address/0xDA5Ae43e179987a66B9831F92223567e1F38BE7D), [0x1e3804357eD445251FfECbb6e40107bf03888885](https://plasmascan.to//address/0x1e3804357eD445251FfECbb6e40107bf03888885), [0x4f96743057482a2E10253AFDacDA3fd9CF2C1DC9](https://plasmascan.to//address/0x4f96743057482a2E10253AFDacDA3fd9CF2C1DC9), [0xebED04E9137AfeBFF6a1B97aC0adf61a544eFE29](https://plasmascan.to//address/0xebED04E9137AfeBFF6a1B97aC0adf61a544eFE29), [0xbd4DCfA978c6D0d342cE36809AfFFa49d4B7f1F7](https://plasmascan.to//address/0xbd4DCfA978c6D0d342cE36809AfFFa49d4B7f1F7), [0xA3103D0ED00d24795Faa2d641ACf6A320EeD7396](https://plasmascan.to//address/0xA3103D0ED00d24795Faa2d641ACf6A320EeD7396), [0x936CD9654271083cCF93A975919Da0aB3Bc99EF3](https://plasmascan.to//address/0x936CD9654271083cCF93A975919Da0aB3Bc99EF3), [0x0D2394C027602Dc4c3832Ffd849b5df45DBac0E9](https://plasmascan.to//address/0x0D2394C027602Dc4c3832Ffd849b5df45DBac0E9), [0x4C30E33758216aD0d676419c21CB8D014C68099f](https://plasmascan.to//address/0x4C30E33758216aD0d676419c21CB8D014C68099f) | |--------|--------|--------|--------|

### Granular Guardian Admins 
| Role |Contract |
|----------|----------|
|  DEFAULT_ADMIN |  [Executor_lvl1](https://plasmascan.to//address/0x47aAdaAE1F05C978E6aBb7568d11B7F6e0FC4d6A) | |--------|--------|
|  SOLVE_EMERGENCY_ROLE |  [Aave Governance Guardian Plasma](https://plasmascan.to//address/0x19CE4363FEA478Aa04B9EA2937cc5A2cbcD44be6) | |--------|--------|
|  RETRY_ROLE |  [BGD](https://plasmascan.to//address/0xdc62E0e65b2251Dc66404ca717FD32dcC365Be3A) | |--------|--------|

