# ETHEREUM 
## SAFETY_MODULE 
### Contracts upgradeability
| contract |upgradeable by |
|----------|----------|
|  [stkAave](https://etherscan.io/address/0x4da27a545c0c5B758a6BA100e3a049001de870f5) |  Governance | |--------|--------|
|  [stkABPT](https://etherscan.io/address/0xa1116930326D21fB917d5A27F1E9943A9595fb47) |  Governance | |--------|--------|
|  [ABPT](https://etherscan.io/address/0x41A08648C3766F9F9d85598fF102a08f4ef84F84) |  Governance | |--------|--------|
|  [BPT](https://etherscan.io/address/0xC697051d1C6296C24aE3bceF39acA743861D9A81) |  not upgradeable | |--------|--------|

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
|  [stkAave](https://etherscan.io/address/0x4da27a545c0c5B758a6BA100e3a049001de870f5) |  [ProxyAdminLong](https://etherscan.io/address/0x86C3FfeE349A7cFf7cA88C449717B1b133bfb517) |  onlyEmissionManager |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  configureAssets | |--------|--------|--------|--------|--------|
|  [stkAave](https://etherscan.io/address/0x4da27a545c0c5B758a6BA100e3a049001de870f5) |  [ProxyAdminLong](https://etherscan.io/address/0x86C3FfeE349A7cFf7cA88C449717B1b133bfb517) |  onlySlashingAdmin |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  slash, settleSlashing, setMaxSlashablePercentage | |--------|--------|--------|--------|--------|
|  [stkAave](https://etherscan.io/address/0x4da27a545c0c5B758a6BA100e3a049001de870f5) |  [ProxyAdminLong](https://etherscan.io/address/0x86C3FfeE349A7cFf7cA88C449717B1b133bfb517) |  onlyCooldownAdmin |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  setCooldownSeconds | |--------|--------|--------|--------|--------|
|  [stkAave](https://etherscan.io/address/0x4da27a545c0c5B758a6BA100e3a049001de870f5) |  [ProxyAdminLong](https://etherscan.io/address/0x86C3FfeE349A7cFf7cA88C449717B1b133bfb517) |  onlyClaimHelper |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  cooldownOnBehalfOf, redeemOnBehalf, claimRewardsOnBehalf, claimRewardsAndRedeemOnBehalf | |--------|--------|--------|--------|--------|
|  [stkABPT](https://etherscan.io/address/0xa1116930326D21fB917d5A27F1E9943A9595fb47) |  [ProxyAdmin](https://etherscan.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  onlyEmissionManager |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  configureAssets | |--------|--------|--------|--------|--------|
|  [stkABPT](https://etherscan.io/address/0xa1116930326D21fB917d5A27F1E9943A9595fb47) |  [ProxyAdmin](https://etherscan.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  onlySlashingAdmin |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  slash, settleSlashing, setMaxSlashablePercentage | |--------|--------|--------|--------|--------|
|  [stkABPT](https://etherscan.io/address/0xa1116930326D21fB917d5A27F1E9943A9595fb47) |  [ProxyAdmin](https://etherscan.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  onlyCooldownAdmin |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  setCooldownSeconds | |--------|--------|--------|--------|--------|
|  [stkABPT](https://etherscan.io/address/0xa1116930326D21fB917d5A27F1E9943A9595fb47) |  [ProxyAdmin](https://etherscan.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  onlyClaimHelper |  [Executor_lvl1](https://etherscan.io/address/0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A) |  cooldownOnBehalfOf, redeemOnBehalf, claimRewardsOnBehalf, claimRewardsAndRedeemOnBehalf | |--------|--------|--------|--------|--------|
|  [ABPT](https://etherscan.io/address/0x41A08648C3766F9F9d85598fF102a08f4ef84F84) |  [ProxyAdmin](https://etherscan.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  onlyOwner |  [ProxyAdmin](https://etherscan.io/address/0xD3cF979e676265e4f6379749DECe4708B9A22476) |  setCap, setPublicSwap, createPool, updateWeight, updateWeightsGradually, commitAddToken, applyAddToken, removeToken, whitelistLiquidityProvider, removeWhitelistedLiquidityProvider | |--------|--------|--------|--------|--------|
|  [BPT](https://etherscan.io/address/0xC697051d1C6296C24aE3bceF39acA743861D9A81) |  - |  onlyController |  [ABPT](https://etherscan.io/address/0x41A08648C3766F9F9d85598fF102a08f4ef84F84) |  setSwapFee, setController, setPublicSwap, finalize, bind, rebind, unbind | |--------|--------|--------|--------|--------|

