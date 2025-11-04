# XLAYER 
## V3 
### Contracts upgradeability
| contract |upgradeable by |
|----------|----------|
|  Aave a/v/s tokens |  Governance | |--------|--------|
|  [GranularGuardian](https://www.oklink.com/x-layer//address/0xD6727ec503A8d0C10a0EAA4e76eAf9A628188b25) |  not upgradeable | |--------|--------|
|  [PayloadsController](https://www.oklink.com/x-layer//address/0x80e11cB895a23C901a990239E5534054C66476B5) |  Governance | |--------|--------|
|  [PayloadsControllerProxyAdmin](https://www.oklink.com/x-layer//address/0xcd9d8e4b607c492a2363bc44b02794ada6533c57) |  not upgradeable | |--------|--------|
|  [Executor_lvl1](https://www.oklink.com/x-layer//address/0xE2E8Badc5d50f8a6188577B89f50701cDE2D4e19) |  not upgradeable | |--------|--------|
|  [XLayer native adapter](https://www.oklink.com/x-layer//address/0xEbc2c80073E4752e9A1D2e9A9bC98e8F4EeE9Be9) |  not upgradeable | |--------|--------|
|  [CrossChainController](https://www.oklink.com/x-layer//address/0xFdd46155fD3DA5B907AD3B9f9395366290f58097) |  Governance | |--------|--------|
|  [CrossChainControllerProxyAdmin](https://www.oklink.com/x-layer//address/0x74a75d024033bff99c196b4ae772df1e28df5b96) |  not upgradeable | |--------|--------|

### Actions type
| type |can be executed by |
|----------|----------|
|  adiConfigurations |  Governance | |--------|--------|
|  retryAndInvalidateMessages |  Multi-sig,Governance | |--------|--------|

### Governance V3 Contracts 
| contract |proxyAdmin |modifier |permission owner |functions |
|----------|----------|----------|----------|----------|
|  [GranularGuardian](https://www.oklink.com/x-layer//address/0xD6727ec503A8d0C10a0EAA4e76eAf9A628188b25) |  - |  onlyRetryGuardian |  [BGD](https://www.oklink.com/x-layer//address/0x734c3fF8DE95c3745770df69053A31FDC92F2526) |  retryEnvelope, retryTransaction | |--------|--------|--------|--------|--------|
|  [GranularGuardian](https://www.oklink.com/x-layer//address/0xD6727ec503A8d0C10a0EAA4e76eAf9A628188b25) |  - |  onlyEmergencyGuardian |  [Aave Governance Guardian xLayer](https://www.oklink.com/x-layer//address/0xeB55A63bf9993d80c86D47f819B5eC958c7C127B) |  solveEmergency | |--------|--------|--------|--------|--------|
|  [GranularGuardian](https://www.oklink.com/x-layer//address/0xD6727ec503A8d0C10a0EAA4e76eAf9A628188b25) |  - |  onlyDefaultAdmin |  [Executor_lvl1](https://www.oklink.com/x-layer//address/0xE2E8Badc5d50f8a6188577B89f50701cDE2D4e19) |  updateGuardian | |--------|--------|--------|--------|--------|
|  [PayloadsController](https://www.oklink.com/x-layer//address/0x80e11cB895a23C901a990239E5534054C66476B5) |  [PayloadsControllerProxyAdmin](https://www.oklink.com/x-layer//address/0xCd9d8E4b607C492a2363bc44B02794ADa6533C57) |  onlyOwner |  [Executor_lvl1](https://www.oklink.com/x-layer//address/0xE2E8Badc5d50f8a6188577B89f50701cDE2D4e19) |  updateExecutors | |--------|--------|--------|--------|--------|
|  [PayloadsController](https://www.oklink.com/x-layer//address/0x80e11cB895a23C901a990239E5534054C66476B5) |  [PayloadsControllerProxyAdmin](https://www.oklink.com/x-layer//address/0xCd9d8E4b607C492a2363bc44B02794ADa6533C57) |  onlyGuardian |  [Aave Governance Guardian xLayer](https://www.oklink.com/x-layer//address/0xeB55A63bf9993d80c86D47f819B5eC958c7C127B) |  cancelPayload | |--------|--------|--------|--------|--------|
|  [PayloadsController](https://www.oklink.com/x-layer//address/0x80e11cB895a23C901a990239E5534054C66476B5) |  [PayloadsControllerProxyAdmin](https://www.oklink.com/x-layer//address/0xCd9d8E4b607C492a2363bc44B02794ADa6533C57) |  onlyOwnerOrGuardian |  [Aave Governance Guardian xLayer](https://www.oklink.com/x-layer//address/0xeB55A63bf9993d80c86D47f819B5eC958c7C127B), [Executor_lvl1](https://www.oklink.com/x-layer//address/0xE2E8Badc5d50f8a6188577B89f50701cDE2D4e19) |  updateGuardian | |--------|--------|--------|--------|--------|
|  [PayloadsController](https://www.oklink.com/x-layer//address/0x80e11cB895a23C901a990239E5534054C66476B5) |  [PayloadsControllerProxyAdmin](https://www.oklink.com/x-layer//address/0xCd9d8E4b607C492a2363bc44B02794ADa6533C57) |  onlyRescueGuardian |  [Executor_lvl1](https://www.oklink.com/x-layer//address/0xE2E8Badc5d50f8a6188577B89f50701cDE2D4e19) |  emergencyTokenTransfer, emergencyEtherTransfer | |--------|--------|--------|--------|--------|
|  [PayloadsControllerProxyAdmin](https://www.oklink.com/x-layer//address/0xcd9d8e4b607c492a2363bc44b02794ada6533c57) |  - |  onlyOwner |  [Executor_lvl1](https://www.oklink.com/x-layer//address/0xE2E8Badc5d50f8a6188577B89f50701cDE2D4e19) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|
|  [Executor_lvl1](https://www.oklink.com/x-layer//address/0xE2E8Badc5d50f8a6188577B89f50701cDE2D4e19) |  - |  onlyOwner |  [PayloadsController](https://www.oklink.com/x-layer//address/0x80e11cB895a23C901a990239E5534054C66476B5) |  executeTransaction | |--------|--------|--------|--------|--------|
|  [XLayer native adapter](https://www.oklink.com/x-layer//address/0xEbc2c80073E4752e9A1D2e9A9bC98e8F4EeE9Be9) |  - |  trustedRemote |  [CrossChainController(Eth)](https://www.oklink.com/x-layer//address/0xEd42a7D8559a463722Ca4beD50E0Cc05a386b0e1) |  receiveMessage | |--------|--------|--------|--------|--------|
|  [CrossChainController](https://www.oklink.com/x-layer//address/0xFdd46155fD3DA5B907AD3B9f9395366290f58097) |  [CrossChainControllerProxyAdmin](https://www.oklink.com/x-layer//address/0x74a75d024033bff99c196B4aE772dF1E28df5b96) |  onlyOwner |  [Executor_lvl1](https://www.oklink.com/x-layer//address/0xE2E8Badc5d50f8a6188577B89f50701cDE2D4e19) |  approveSenders, removeSenders, enableBridgeAdapters, disableBridgeAdapters, updateMessagesValidityTimestamp, allowReceiverBridgeAdapters, disallowReceiverBridgeAdapters | |--------|--------|--------|--------|--------|
|  [CrossChainController](https://www.oklink.com/x-layer//address/0xFdd46155fD3DA5B907AD3B9f9395366290f58097) |  [CrossChainControllerProxyAdmin](https://www.oklink.com/x-layer//address/0x74a75d024033bff99c196B4aE772dF1E28df5b96) |  onlyOwnerOrGuardian |  [Aave Granular Guardian xLayer](https://www.oklink.com/x-layer//address/0xD6727ec503A8d0C10a0EAA4e76eAf9A628188b25), [Executor_lvl1](https://www.oklink.com/x-layer//address/0xE2E8Badc5d50f8a6188577B89f50701cDE2D4e19) |  retryEnvelope, retryTransaction, updateGuardian | |--------|--------|--------|--------|--------|
|  [CrossChainController](https://www.oklink.com/x-layer//address/0xFdd46155fD3DA5B907AD3B9f9395366290f58097) |  [CrossChainControllerProxyAdmin](https://www.oklink.com/x-layer//address/0x74a75d024033bff99c196B4aE772dF1E28df5b96) |  onlyRescueGuardian |  [Executor_lvl1](https://www.oklink.com/x-layer//address/0xE2E8Badc5d50f8a6188577B89f50701cDE2D4e19) |  emergencyTokenTransfer, emergencyEtherTransfer | |--------|--------|--------|--------|--------|
|  [CrossChainController](https://www.oklink.com/x-layer//address/0xFdd46155fD3DA5B907AD3B9f9395366290f58097) |  [CrossChainControllerProxyAdmin](https://www.oklink.com/x-layer//address/0x74a75d024033bff99c196B4aE772dF1E28df5b96) |  onlyApprovedSenders |   |  forwardMessage | |--------|--------|--------|--------|--------|
|  [CrossChainController](https://www.oklink.com/x-layer//address/0xFdd46155fD3DA5B907AD3B9f9395366290f58097) |  [CrossChainControllerProxyAdmin](https://www.oklink.com/x-layer//address/0x74a75d024033bff99c196B4aE772dF1E28df5b96) |  onlyApprovedBridges |  [XLayer native adapter](https://www.oklink.com/x-layer//address/0xEbc2c80073E4752e9A1D2e9A9bC98e8F4EeE9Be9) |  receiveCrossChainMessage | |--------|--------|--------|--------|--------|
|  [CrossChainControllerProxyAdmin](https://www.oklink.com/x-layer//address/0x74a75d024033bff99c196b4ae772df1e28df5b96) |  - |  onlyOwner |  [Executor_lvl1](https://www.oklink.com/x-layer//address/0xE2E8Badc5d50f8a6188577B89f50701cDE2D4e19) |  changeProxyAdmin, upgrade, upgradeAndCall | |--------|--------|--------|--------|--------|

### Guardians 
| Guardian |Threshold |Address |Owners |
|----------|----------|----------|----------|
|  [BGD](https://www.oklink.com/x-layer//address/0x734c3fF8DE95c3745770df69053A31FDC92F2526) |  2/3 |  0x734c3fF8DE95c3745770df69053A31FDC92F2526 |  [0xf71fc92e2949ccF6A5Fd369a0b402ba80Bc61E02](https://www.oklink.com/x-layer//address/0xf71fc92e2949ccF6A5Fd369a0b402ba80Bc61E02), [0x5811d9FF80ff4B73A8F9bA42A6082FaB82E89Ea7](https://www.oklink.com/x-layer//address/0x5811d9FF80ff4B73A8F9bA42A6082FaB82E89Ea7), [0x0650302887619fa7727D8BD480Cda11A638B219B](https://www.oklink.com/x-layer//address/0x0650302887619fa7727D8BD480Cda11A638B219B) | |--------|--------|--------|--------|
|  [Aave Governance Guardian xLayer](https://www.oklink.com/x-layer//address/0xeB55A63bf9993d80c86D47f819B5eC958c7C127B) |  5/9 |  0xeB55A63bf9993d80c86D47f819B5eC958c7C127B |  [0xDA5Ae43e179987a66B9831F92223567e1F38BE7D](https://www.oklink.com/x-layer//address/0xDA5Ae43e179987a66B9831F92223567e1F38BE7D), [0x1e3804357eD445251FfECbb6e40107bf03888885](https://www.oklink.com/x-layer//address/0x1e3804357eD445251FfECbb6e40107bf03888885), [0x4f96743057482a2E10253AFDacDA3fd9CF2C1DC9](https://www.oklink.com/x-layer//address/0x4f96743057482a2E10253AFDacDA3fd9CF2C1DC9), [0xebED04E9137AfeBFF6a1B97aC0adf61a544eFE29](https://www.oklink.com/x-layer//address/0xebED04E9137AfeBFF6a1B97aC0adf61a544eFE29), [0xbd4DCfA978c6D0d342cE36809AfFFa49d4B7f1F7](https://www.oklink.com/x-layer//address/0xbd4DCfA978c6D0d342cE36809AfFFa49d4B7f1F7), [0xA3103D0ED00d24795Faa2d641ACf6A320EeD7396](https://www.oklink.com/x-layer//address/0xA3103D0ED00d24795Faa2d641ACf6A320EeD7396), [0x936CD9654271083cCF93A975919Da0aB3Bc99EF3](https://www.oklink.com/x-layer//address/0x936CD9654271083cCF93A975919Da0aB3Bc99EF3), [0x0D2394C027602Dc4c3832Ffd849b5df45DBac0E9](https://www.oklink.com/x-layer//address/0x0D2394C027602Dc4c3832Ffd849b5df45DBac0E9), [0x4C30E33758216aD0d676419c21CB8D014C68099f](https://www.oklink.com/x-layer//address/0x4C30E33758216aD0d676419c21CB8D014C68099f) | |--------|--------|--------|--------|

### Granular Guardian Admins 
| Role |Contract |
|----------|----------|
|  DEFAULT_ADMIN |  [Executor_lvl1](https://www.oklink.com/x-layer//address/0xE2E8Badc5d50f8a6188577B89f50701cDE2D4e19) | |--------|--------|
|  SOLVE_EMERGENCY_ROLE |  [Aave Governance Guardian xLayer](https://www.oklink.com/x-layer//address/0xeB55A63bf9993d80c86D47f819B5eC958c7C127B) | |--------|--------|
|  RETRY_ROLE |  [BGD](https://www.oklink.com/x-layer//address/0x734c3fF8DE95c3745770df69053A31FDC92F2526) | |--------|--------|

