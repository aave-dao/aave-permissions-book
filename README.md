
![Aave Permissions Book](./permissions_banner.jpg)
# Aave Permissions Book

Tool to index and visualize all permissions across the Aave smart contracts ecosystem.

## Table of Contents
- [Description](#description)
- [Permissions](#permissions)
- [Usage](#usage)
- [License](#license)

## Description

The Aave Protocol smart contracts use a system of roles, modifiers, and access control to gate who can execute which functions. These permissions are held by various addresses: other smart contracts, multi-sigs, governance, stewards, or EOAs.

This repository indexes on-chain events to produce a comprehensive directory of tables showing:
- Which permissions are needed to execute each function of every Aave contract.
- Who holds those permissions (and the full ownership chain behind them).
- Whether each contract is upgradeable, and who controls the upgrade.

## Permissions

A [permissions document](./out) has been generated for every pool on every network where the Aave Protocol is deployed. Each document contains the following tables:

- **Contracts Upgradeability**: Indicates whether each smart contract uses an upgradeable proxy and, if so, who can perform the upgrade.
- **Actions Type**: An aggregated view of the actions that can affect the Aave protocol, classified by who can execute them (governance, multisig, steward, or EOA).
- **Contracts**: Detailed per-contract information:
  - **contract**: Name of the contract.
  - **proxyAdmin**: The proxy admin address (if the contract follows the Proxy Pattern), which has permission to upgrade the implementation.
  - **modifier**: The access control gate that restricts who can call a function. There is an entry for every modifier on the contract.
  - **permission owner**: The address that holds permission to pass through the modifier, along with its ownership chain.
  - **functions**: The functions gated by that modifier.
- **Guardians**: Multi-sig addresses with permissions to call certain emergency or operational methods, acting under a mandate from Aave Governance.
- **Roles**: The different roles defined by each protocol component (e.g., POOL_ADMIN, EMERGENCY_ADMIN) and which addresses hold each role.

### Permissions Directory
| Network |System type |Tables |
|----------|----------|----------|
|  ETHEREUM |  V3 |  [Permissions](./out/ETHEREUM-V3.md#contracts) | |--------|--------|--------|
|  ETHEREUM |  LIDO |  [Permissions](./out/ETHEREUM-LIDO.md#contracts) | |--------|--------|--------|
|  ETHEREUM |  ETHERFI |  [Permissions](./out/ETHEREUM-ETHERFI.md#contracts) | |--------|--------|--------|
|  ETHEREUM |  GHO |  [Permissions](./out/ETHEREUM-GHO.md#contracts) | |--------|--------|--------|
|  ETHEREUM |  V2 |  [Permissions](./out/ETHEREUM-V2.md#contracts) | |--------|--------|--------|
|  ETHEREUM |  V2_AMM |  [Permissions](./out/ETHEREUM-V2_AMM.md#contracts) | |--------|--------|--------|
|  ETHEREUM |  SAFETY_MODULE |  [Permissions](./out/ETHEREUM-SAFETY_MODULE.md#contracts) | |--------|--------|--------|
|  ETHEREUM |  V2_MISC |  [Permissions](./out/ETHEREUM-V2_MISC.md#contracts) | |--------|--------|--------|
|  ETHEREUM |  V4 |  [Permissions](./out/ETHEREUM-V4.md#contracts) | |--------|--------|--------|
|  OPTIMISM |  V3 |  [Permissions](./out/OPTIMISM-V3.md#contracts) | |--------|--------|--------|
|  BINANCE |  V3 |  [Permissions](./out/BINANCE-V3.md#contracts) | |--------|--------|--------|
|  GNOSIS |  V3 |  [Permissions](./out/GNOSIS-V3.md#contracts) | |--------|--------|--------|
|  GNOSIS |  GHO |  [Permissions](./out/GNOSIS-GHO.md#contracts) | |--------|--------|--------|
|  POLYGON |  V3 |  [Permissions](./out/POLYGON-V3.md#contracts) | |--------|--------|--------|
|  POLYGON |  V2 |  [Permissions](./out/POLYGON-V2.md#contracts) | |--------|--------|--------|
|  SONIC |  V3 |  [Permissions](./out/SONIC-V3.md#contracts) | |--------|--------|--------|
|  XLAYER |  V3 |  [Permissions](./out/XLAYER-V3.md#contracts) | |--------|--------|--------|
|  XLAYER |  GHO |  [Permissions](./out/XLAYER-GHO.md#contracts) | |--------|--------|--------|
|  ZKSYNC |  V3 |  [Permissions](./out/ZKSYNC-V3.md#contracts) | |--------|--------|--------|
|  METIS |  V3 |  [Permissions](./out/METIS-V3.md#contracts) | |--------|--------|--------|
|  SONEIUM |  V3 |  [Permissions](./out/SONEIUM-V3.md#contracts) | |--------|--------|--------|
|  MEGAETH |  V3 |  [Permissions](./out/MEGAETH-V3.md#contracts) | |--------|--------|--------|
|  MANTLE |  V3 |  [Permissions](./out/MANTLE-V3.md#contracts) | |--------|--------|--------|
|  MANTLE |  GHO |  [Permissions](./out/MANTLE-GHO.md#contracts) | |--------|--------|--------|
|  BASE |  V3 |  [Permissions](./out/BASE-V3.md#contracts) | |--------|--------|--------|
|  BASE |  GHO |  [Permissions](./out/BASE-GHO.md#contracts) | |--------|--------|--------|
|  PLASMA |  V3 |  [Permissions](./out/PLASMA-V3.md#contracts) | |--------|--------|--------|
|  PLASMA |  GHO |  [Permissions](./out/PLASMA-GHO.md#contracts) | |--------|--------|--------|
|  ARBITRUM |  V3 |  [Permissions](./out/ARBITRUM-V3.md#contracts) | |--------|--------|--------|
|  CELO |  V3 |  [Permissions](./out/CELO-V3.md#contracts) | |--------|--------|--------|
|  AVALANCHE |  V3 |  [Permissions](./out/AVALANCHE-V3.md#contracts) | |--------|--------|--------|
|  AVALANCHE |  V2 |  [Permissions](./out/AVALANCHE-V2.md#contracts) | |--------|--------|--------|
|  INK |  V3_WHITE_LABEL |  [Permissions](./out/INK-V3_WHITE_LABEL.md#contracts) | |--------|--------|--------|
|  INK |  GHO |  [Permissions](./out/INK-GHO.md#contracts) | |--------|--------|--------|
|  LINEA |  V3 |  [Permissions](./out/LINEA-V3.md#contracts) | |--------|--------|--------|
|  SCROLL |  V3 |  [Permissions](./out/SCROLL-V3.md#contracts) | |--------|--------|--------|


## Usage

For setup instructions, CLI options, how to add new networks and pools, and how to use Anvil forks, see the [Usage Guide](./USAGE.md).

## License
This repository is under [MIT License](./LICENSE)
