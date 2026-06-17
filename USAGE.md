# Usage Guide

This document explains how the Aave Permissions Book works, and how to extend it with new networks, pools, and fork mode.

## Table of Contents

- [Overview](#overview)
- [Setup](#setup)
- [Running the Scripts](#running-the-scripts)
- [How It Works](#how-it-works)
- [Adding a New Network](#adding-a-new-network)
- [Adding a New Pool](#adding-a-new-pool)
- [Using Fork Mode](#using-fork-mode)
- [Project Structure](#project-structure)

## Overview

The Aave Permissions Book is a two-phase pipeline:

1. **Phase 1 — Permission Indexing** (`modifiers:generate`): Indexes on-chain events (RoleGranted, RoleRevoked, SenderUpdated) from Aave smart contracts across all supported networks. Produces a JSON snapshot per network under `out/permissions/`.

2. **Phase 2 — Table Generation** (`tables:create`): Reads the JSON snapshots and generates human-readable Markdown tables under `out/`, showing contract upgradeability, action types, role assignments, guardians, and function-level permissions.

Both phases support CLI filtering by network, pool, and fork mode.

## Setup

```bash
npm install
cp .env.example .env
```

Configure your `.env` with RPC provider credentials. The tool uses `@aave-dao/toolbox` for RPC resolution, which supports:

- **Alchemy**: Set `ALCHEMY_KEY`
- **QuickNode**: Set `QUICKNODE_ENDPOINT_NAME` and `QUICKNODE_TOKEN`
- **Direct RPCs**: Set `RPC_<NETWORK>` variables (e.g., `RPC_MAINNET`, `RPC_POLYGON`)

## Running the Scripts

### Generate Permission Snapshots

```bash
# All networks and pools
npm run modifiers:generate

# Specific network (by chain ID)
npm run modifiers:generate -- -n 1

# Specific network and pool
npm run modifiers:generate -- -n 1 -p V3

# Multiple networks
npm run modifiers:generate -- -n 1 -n 137

# Fork mode with payload (see "Using Fork Mode" section)
npm run modifiers:generate -- -n 1 -p V3 --fork --payload 0xYourPayloadAddress

# Fork mode with raw calldata (see "Using Fork Mode" section)
npm run modifiers:generate -- -n 1 -p V3 --fork --calldata 0xCalldata --caller 0xCallerAddress --target 0xTargetAddress
```

### Generate Markdown Tables

```bash
# All networks and pools
npm run tables:create

# Specific network and pool
npm run tables:create -- -n 1 -p V3
```

### CLI Options

| Flag | Short | Description |
|------|-------|-------------|
| `--network <chainId>` | `-n` | Filter by network chain ID (repeatable) |
| `--pool <poolKey>` | `-p` | Filter by pool key (repeatable, requires `--network`) |
| `--fork` | `-f` | Enable fork mode (requires `--network`, `--pool`, and either `--payload` or `--calldata`) |
| `--payload <address>` | | Payload address to execute on the fork (mutually exclusive with `--calldata`) |
| `--calldata <hex>` | | Raw calldata to execute on the fork (mutually exclusive with `--payload`) |
| `--caller <address>` | | Address to impersonate as the transaction sender (requires `--calldata`) |
| `--target <address>` | | Target contract address for the calldata (requires `--calldata`) |

## How It Works

### Phase 1: Permission Indexing (`modifiersCalculator.ts`)

For each network and pool, the indexer:

1. **Loads the pool configuration** from `helpers/configs/networks/<network>.ts`, which defines contract addresses (from `@bgd-labs/aave-address-book`), deployment block numbers, and static permission definitions.

2. **Reads previously saved state** from `out/permissions/<chainId>-permissions.json`. On the first run, this is empty. On subsequent runs, it resumes from the last indexed block, avoiding re-scanning the entire history.

3. **Fetches on-chain events** using paginated RPC calls (`getLogsRecursive`). The events indexed depend on the pool type:
   - **V3 pools**: ACL Manager events (RoleGranted/RoleRevoked), Collector roles, Governance V3 components, CrossChainController senders, GranularGuardian roles, Umbrella/PPC roles, ClinicSteward roles.
   - **V2 pools**: Legacy admin roles from V2 contracts.
   - **GHO pools**: GHO token roles and GSM (GHO Stability Module) roles.
   - **Safety Module**: Staking contract roles.

4. **Resolves contract metadata**: For each contract, determines its proxy admin, modifier owners, and modifier-to-function mappings using the static permissions JSON and the on-chain role assignments.

5. **Saves the updated JSON** to `out/permissions/<chainId>-permissions.json`.

### Phase 2: Table Generation (`createTables.ts`)

For each network and pool:

1. **Aggregates contracts** across pool sections. The aggregation strategy depends on pool type:
   - **V3**: Uses only V3 contracts.
   - **LIDO / ETHERFI**: Inherits V3 governance, collector, and cross-chain components, then adds pool-specific contracts.
   - **V2 / GHO / Safety Module**: Merges with all V3 components to show the complete picture.
   - **V3_WHITE_LABEL**: Isolated, no merging.

2. **Resolves ownership chains** recursively: For each modifier owner, walks through proxy admins, multisigs, and governance contracts to determine whether the ultimate control lies with Aave Governance, a multisig, a steward, or an EOA.

3. **Generates Markdown tables**: Contracts, upgradeability, action types (with decentralization classification), roles, and guardians.

4. **Writes tables** to `out/<networkName>/<poolKey>.md`.

## Adding a New Network

### 1. Create the Network Config File

Create `helpers/configs/networks/<network>.ts`:

```typescript
import {
  AaveV3NewNetwork,
  GovernanceV3NewNetwork,
  MiscNewNetwork,
} from '@bgd-labs/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import { createV3Pool } from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

const v3Pool = createV3Pool({
  // Block number where ACLManager was deployed
  aclBlock: 123456,
  // Block number where Collector was deployed (if applicable)
  collectorBlock: 123460,
  // Block number where CrossChainController was deployed (if applicable)
  crossChainControllerBlock: 123470,
  // Block number where GranularGuardian was deployed (if applicable)
  granularGuardianBlock: 123480,
  // Address book from @bgd-labs/aave-address-book
  addressBook: { ...AaveV3NewNetwork, ...MiscNewNetwork },
  governanceAddressBook: GovernanceV3NewNetwork,
  // Custom addresses not in the address book (e.g., bridge adapters)
  addresses: {
    '0x...': 'SomeAdapter',
  },
});

export const newNetworkConfig: NetworkConfig = {
  name: 'NewNetwork',
  rpcUrl: process.env.RPC_NEW_NETWORK,
  explorer: 'https://explorer.newnetwork.io',
  addressesNames: mergeAddressNames({
    '0x...': 'Aave Guardian NewNetwork',
    '0x...': 'Risk Council',
  }),
  pools: {
    [Pools.V3]: v3Pool,
  },
};
```

### 2. Register the Network

In `helpers/configs/networks/index.ts`, add:

```typescript
import { newNetworkConfig } from './newNetwork.js';

export const networkConfigs: NetworkConfigs = {
  // ... existing networks
  [ChainId.newNetwork]: newNetworkConfig,
};
```

The chain ID must be available in `@aave-dao/toolbox`'s `ChainId` enum.

### 3. Add the RPC URL

Add `RPC_NEW_NETWORK=<url>` to your `.env` file (and to `.env.example`).

### 4. Add Address Names (Optional)

If there are addresses that appear across multiple networks (e.g., deployers), add them to `helpers/configs/addresses/shared.ts`. For network-specific addresses (guardians, multisigs, etc.), add them to the `addressesNames` field in the network config using `mergeAddressNames()`.

### 5. Run

```bash
npm run modifiers:generate -- -n <chainId>
npm run tables:create -- -n <chainId>
```

## Adding a New Pool

There are two scenarios: adding a **new instance** of an existing pool type (e.g., another V3 pool on a new network), or adding a **completely new pool type** with different contracts and access-control patterns.

### Adding a Pool Instance (Existing Type)

If your pool follows an existing pattern (V3, V2, GHO, etc.), use the corresponding builder function:

| Builder | Pool Type | Description |
|---------|-----------|-------------|
| `createV3Pool` | V3, LIDO, ETHERFI | ACL-based V3 pools with optional governance, collector, umbrella, PPC |
| `createV2Pool` | V2 | Legacy V2 pools |
| `createV2AmmPool` | V2_AMM | V2 AMM variant |
| `createV2PoRPool` | - | V2 Proof of Reserve variant |
| `createGhoPool` | GHO | GHO token and GSM modules |
| `createSafetyPool` | SAFETY_MODULE | Aave Safety Module |

1. **Add a pool key** to the `Pools` enum in `helpers/configs/constants.ts`:

```typescript
export enum Pools {
  // ... existing pools
  NEW_POOL = 'NEW_POOL',
}
```

2. **Create the pool** in the network config file using the appropriate builder:

```typescript
const newPool = createV3Pool({
  aclBlock: 123456,
  addressBook: { ...AaveV3NewPool, ...MiscNetwork },
  // ... other config as needed
});
```

3. **Register the pool** in the network config's `pools` map:

```typescript
pools: {
  [Pools.V3]: v3Pool,
  [Pools.NEW_POOL]: newPool,
},
```

The existing dispatch chain in `modifiersCalculator.ts` will handle the pool automatically based on its configuration (presence of `aclBlock`, `ghoBlock`, etc.).

### Adding a New Pool Type

If your pool has a different contract architecture, different access-control patterns, or different events than any existing pool type, you need to create a new pool type from scratch. This involves:

1. Writing a static permissions JSON that maps your contracts' functions to their modifiers.
2. Creating a permission resolver script that reads on-chain state to determine who holds each role.
3. Optionally configuring the event indexer if your contracts use `RoleGranted`/`RoleRevoked` events.
4. Adding dispatch logic in `modifiersCalculator.ts`.
5. Handling table generation and contract aggregation.

This is a more involved process. See the **[Adding Pool Types Guide](./ADDING_POOL_TYPES.md)** for a complete step-by-step walkthrough with code examples.

## Using Fork Mode

Fork mode uses [Anvil](https://book.getfoundry.sh/reference/anvil/) (from Foundry) to create a local fork of the blockchain, execute an action on it, and then index the resulting permission changes. This lets you see what permissions would change if the action were executed.

There are two fork execution modes:
- **Payload mode** (`--payload`): Executes an Aave governance payload through the PayloadsController.
- **Calldata mode** (`--calldata`): Executes raw calldata by impersonating a caller address. Useful for simulating multisig transactions, direct contract calls, or any action that doesn't go through the Aave governance payload flow.

### Prerequisites

Install Foundry (which includes Anvil):

```bash
curl -L https://foundry.paradigm.xyz | bash && foundryup
```

### How Fork Mode Works

1. **Anvil fork**: The tool starts a local Anvil fork from the latest block of the target network.
2. **Action execution**: Depending on the mode:
   - **Payload mode** (`--payload`): The governance payload is executed on the fork. The tool handles all payload states automatically:
     - **Not registered**: Creates the payload, queues it via cross-chain message simulation, advances time, and executes it.
     - **Created**: Queues, advances time, and executes.
     - **Queued**: Advances time and executes.
     - **Executed**: Throws an error (fork is not needed).
     - **Cancelled / Expired**: Throws an error (payload cannot be executed).
   - **Calldata mode** (`--calldata`): The caller address is impersonated using Anvil's `impersonateAccount`, funded with native token for gas, and the calldata is sent to the target contract. This works with any address, including multisigs (e.g., Gnosis Safe).
3. **Permission indexing**: Events are indexed from mainnet first (up to the fork block), then from the fork (post-execution). The fork events are layered on top.
4. **State queries**: All contract state reads (owner, guardian, roles, etc.) are made against the fork, reflecting the post-execution state.

### Output Overwrite Behavior

**Important**: Fork mode intentionally **overwrites** the target pool's output files. For example, running fork mode on `V3` will overwrite the existing `ETHEREUM-V3.md` table.

This is by design: the goal is to produce a `git diff` that clearly shows what permissions would change if the governance proposal were executed.

**Because of this overwrite behavior:**
- **Do not merge fork mode results into the main branch.** Fork runs should be done on a separate branch for review purposes only.
- Fork mode results are ephemeral — they only represent the state after a specific payload execution.

### Typical Workflow

#### With a governance payload

```bash
# 1. Create a branch for the review
git checkout -b review/proposal-name

# 2. Ensure the base permissions are up to date
npm run modifiers:generate -- -n 1 -p V3
npm run tables:create -- -n 1 -p V3

# 3. Run fork mode with the payload address
npm run modifiers:generate -- -n 1 -p V3 --fork --payload 0xYourPayloadAddress
npm run tables:create -- -n 1 -p V3

# 4. Review the diff
git diff
```

#### With raw calldata (e.g., multisig transaction)

```bash
# 1. Create a branch for the review
git checkout -b review/multisig-action-name

# 2. Ensure the base permissions are up to date
npm run modifiers:generate -- -n 1 -p V3
npm run tables:create -- -n 1 -p V3

# 3. Run fork mode with calldata, caller (e.g., a multisig), and target contract
npm run modifiers:generate -- -n 1 -p V3 --fork \
  --calldata 0xabcdef... \
  --caller 0xMultisigAddress \
  --target 0xTargetContract
npm run tables:create -- -n 1 -p V3

# 4. Review the diff
git diff
```

## Project Structure

```
├── scripts/
│   ├── modifiersCalculator.ts   # Phase 1: Permission indexing
│   ├── createTables.ts          # Phase 2: Table generation
│   └── readme.ts                # README template generation
├── helpers/
│   ├── configs/
│   │   ├── networks/            # Per-network configurations
│   │   ├── addresses/           # Shared address name mappings
│   │   ├── constants.ts         # Pool enum, role names
│   │   ├── poolBuilder.ts       # Pool configuration builders
│   │   └── index.ts             # Config re-exports
│   ├── types.ts                 # TypeScript type definitions
│   ├── rpc.ts                   # RPC client setup, event fetching
│   ├── eventIndexer.ts          # Generic event indexing logic
│   ├── adminRoles.ts            # Role hash resolution
│   ├── contractResolvers.ts     # Contract metadata resolution
│   ├── ownerResolver.ts         # Proxy admin and owner resolution
│   ├── jsonParsers.ts           # JSON transformation utilities
│   ├── fileSystem.ts            # File I/O for permission snapshots
│   ├── tableGenerator.ts        # Markdown table rendering
│   ├── decentralization.ts      # Ownership chain classification
│   ├── poolHelpers.ts           # Provider resolution for fork/regular mode
│   ├── anvil.ts                  # Anvil fork management, payload and calldata execution
│   ├── cli.ts                   # CLI argument parsing
│   └── logger.ts                # Structured logging
├── statics/                     # Static permissions JSON files
├── abis/                        # Contract ABI definitions
└── out/                         # Generated output (permissions JSON + tables)
```
