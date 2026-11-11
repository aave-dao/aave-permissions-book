# Adding a New Pool Type

This guide walks through every step needed to add a completely new pool type to the Aave Permissions Book, from defining the static permissions to generating the final tables.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Step 1: Define the Static Permissions JSON](#step-1-define-the-static-permissions-json)
- [Step 2: Add the Pool Enum Key](#step-2-add-the-pool-enum-key)
- [Step 3: Create the Pool Builder](#step-3-create-the-pool-builder)
- [Step 4: Write the Permission Resolver](#step-4-write-the-permission-resolver)
- [Step 5: Add Event Indexing (if needed)](#step-5-add-event-indexing-if-needed)
- [Step 6: Wire Into the Dispatch Chain](#step-6-wire-into-the-dispatch-chain)
- [Step 7: Configure the Network](#step-7-configure-the-network)
- [Step 8: Handle Table Generation](#step-8-handle-table-generation)
- [Step 9: Add ABIs (if needed)](#step-9-add-abis-if-needed)
- [End-to-End Example](#end-to-end-example)
- [Testing Your Changes](#testing-your-changes)

## Architecture Overview

The system has two phases, and a new pool type may need changes in both:

```
Phase 1: Permission Indexing (modifiersCalculator.ts)
┌─────────────────────────────────────────────────────────────────┐
│  Static Permissions JSON  ──▶  Event Indexer  ──▶  Resolver    │
│  (contract→modifier→fn)       (RoleGranted/     (RPC calls to  │
│                                RoleRevoked)      resolve who    │
│                                                  holds roles)   │
│                                       ▼                         │
│                              Permissions JSON                   │
│                         (out/permissions/*.json)                │
└─────────────────────────────────────────────────────────────────┘

Phase 2: Table Generation (createTables.ts)
┌─────────────────────────────────────────────────────────────────┐
│  Permissions JSON  ──▶  Contract Aggregation  ──▶  Markdown     │
│                         (merge with V3 etc.)      Tables        │
│                                                  (out/*.md)     │
└─────────────────────────────────────────────────────────────────┘
```

### Key files you'll touch:

| File | Purpose |
|------|---------|
| `statics/functionsPermissions*.json` | Static mapping of contract functions to their access-control modifiers |
| `helpers/configs/constants.ts` | Pool enum and role name arrays |
| `helpers/configs/poolBuilder.ts` | Factory functions for pool configs |
| `helpers/types.ts` | TypeScript type definitions (`PoolConfigs`, `PoolInfo`, etc.) |
| `scripts/<poolType>Permissions.ts` | **New file** — Permission resolver for your pool type |
| `helpers/eventIndexer.ts` | Event indexing config builder (if your pool uses role events) |
| `scripts/modifiersCalculator.ts` | Main dispatch chain |
| `scripts/createTables.ts` | Table generation and contract aggregation |
| `helpers/configs/networks/<network>.ts` | Network-specific pool configuration |
| `abis/*.ts` | Contract ABIs (if you need new ones) |

## Step 1: Define the Static Permissions JSON

The static permissions JSON maps each contract's functions to the modifiers (access-control gates) that protect them. This file is written by hand by inspecting the smart contract source code.

Create `statics/functionsPermissionsMyPool.json`:

```json
[
  {
    "contract": "MyContract",
    "proxyAdmin": true,
    "functions": [
      {
        "name": "setParameter",
        "roles": ["onlyAdmin"]
      },
      {
        "name": "pause",
        "roles": ["onlyEmergencyAdmin"]
      },
      {
        "name": "unpause",
        "roles": ["onlyAdmin", "onlyEmergencyAdmin"]
      }
    ]
  },
  {
    "contract": "MyOtherContract",
    "functions": [
      {
        "name": "doSomething",
        "roles": ["onlyOwner"]
      }
    ]
  }
]
```

### Key fields:

- **`contract`**: The contract name. Must match exactly what you use in the resolver (`obj['MyContract'] = { ... }`).
- **`proxyAdmin`**: Set to `true` if this contract is behind an upgradeable proxy. The resolver will automatically call `getProxyAdmin()` for these contracts.
- **`functions[].name`**: The Solidity function name.
- **`functions[].roles`**: Array of modifier names that gate this function. If a function has multiple modifiers (e.g., `onlyAdmin` OR `onlyEmergencyAdmin`), list them all.

### How it's used:

The `generateRoles()` function inverts this JSON into a lookup table:

```
Input:  { contract: "MyContract", functions: [{ name: "pause", roles: ["onlyEmergencyAdmin"] }] }
Output: { "MyContract": { "onlyEmergencyAdmin": ["pause"] } }
```

Your resolver then uses this to attach the correct function list to each modifier:

```typescript
const roles = generateRoles(permissionsJson);
// roles['MyContract']['onlyEmergencyAdmin'] → ['pause']
```

## Step 2: Add the Pool Enum Key

In `helpers/configs/constants.ts`, add your pool type:

```typescript
export enum Pools {
  // ... existing pools
  MY_POOL = 'MY_POOL',
}
```

### Role name arrays (if your pool uses event-indexed roles)

If your pool type has its own AccessControl/role-based contract, define the role names:

```typescript
export const myPoolRoleNames = [
  'DEFAULT_ADMIN',
  'MY_CUSTOM_ROLE',
  'ANOTHER_ROLE',
];
```

These must match the Solidity role names used in `keccak256(abi.encodePacked(roleName))`. The `getRoleAdmins()` function will hash them and match against `RoleGranted`/`RoleRevoked` event logs.

## Step 3: Create the Pool Builder

In `helpers/configs/poolBuilder.ts`, add a config interface and builder:

```typescript
/**
 * Configuration for MyPool pools.
 */
export interface MyPoolConfig {
  addressBook: AddressBook;
  myContractBlock?: number;  // Deployment block for event indexing
  addresses?: Record<string, string>;
}

/**
 * Creates a MyPool configuration with standard defaults.
 */
export const createMyPool = (config: MyPoolConfig): PoolConfigs => ({
  permissionsJson: './statics/functionsPermissionsMyPool.json',
  ...config,
});
```

### Extending `PoolConfigs` (if needed)

If your pool type needs new config fields that don't exist in `PoolConfigs`, add them to `helpers/types.ts`:

```typescript
export type PoolConfigs = {
  // ... existing fields
  myContractBlock?: number;
  myContractAddressBook?: AddressBook;
};
```

Similarly, if your pool stores new data sections (beyond `contracts`, `roles`, `govV3`, etc.), extend `PoolInfo`:

```typescript
export type MyPoolSection = {
  contracts: Contracts;
  myRoles: Roles;
};

export type PoolInfo = {
  // ... existing sections
  myPoolSection?: MyPoolSection;
};
```

## Step 4: Write the Permission Resolver

Create `scripts/myPoolPermissions.ts`. This is the core of your pool type — it resolves who actually holds each permission by making RPC calls to the blockchain.

### Pattern 1: Simple (no event indexing)

Use this pattern for pools where permissions are read directly from contract state (e.g., `owner()`, `getAdmin()`).

```typescript
import { generateRoles } from '../helpers/jsonParsers.js';
import { getProxyAdmin } from '../helpers/proxyAdmin.js';
import { AddressBook, Contracts, PermissionsJson } from '../helpers/types.js';
import { Address, Client, getAddress, getContract } from 'viem';
import { createOwnerResolver } from '../helpers/ownerResolver.js';
import { myContractAbi } from '../abis/myContractAbi.js';

export const resolveMyPoolModifiers = async (
  addressBook: AddressBook,
  provider: Client,
  permissionsObject: PermissionsJson,
): Promise<Contracts> => {
  const obj: Contracts = {};

  // 1. Invert the static permissions JSON: modifier → functions[]
  const roles = generateRoles(permissionsObject);

  // 2. Create a cached owner resolver (resolves Safe owners/thresholds)
  const ownerResolver = createOwnerResolver(provider);

  // 3. For each contract, read its state and build the ContractInfo
  const myContract = getContract({
    address: getAddress(addressBook.MY_CONTRACT as string),
    abi: myContractAbi,
    client: provider,
  });

  // Read the admin address from the contract
  const admin = await myContract.read.admin() as Address;
  const emergencyAdmin = await myContract.read.emergencyAdmin() as Address;

  // Resolve ownership chain (is it a Safe? who are the signers?)
  const adminInfo = await ownerResolver.resolve(admin);
  const emergencyAdminInfo = await ownerResolver.resolve(emergencyAdmin);

  // Build the contract entry
  obj['MyContract'] = {
    address: addressBook.MY_CONTRACT as string,
    modifiers: [
      {
        modifier: 'onlyAdmin',
        addresses: [{
          address: admin,
          owners: adminInfo.owners,
          signersThreshold: adminInfo.threshold,
        }],
        functions: roles['MyContract']['onlyAdmin'],
      },
      {
        modifier: 'onlyEmergencyAdmin',
        addresses: [{
          address: emergencyAdmin,
          owners: emergencyAdminInfo.owners,
          signersThreshold: emergencyAdminInfo.threshold,
        }],
        functions: roles['MyContract']['onlyEmergencyAdmin'],
      },
    ],
  };

  // 4. Resolve proxy admins for upgradeable contracts
  const proxyAdminContracts = permissionsObject
    .filter((c) => c.proxyAdmin)
    .map((c) => c.contract);

  for (const contractName of proxyAdminContracts) {
    if (obj[contractName]) {
      obj[contractName].proxyAdmin = await getProxyAdmin(
        obj[contractName].address,
        provider,
      );
    }
  }

  return obj;
};
```

### Pattern 2: Event-indexed roles (AccessControl pattern)

Use this pattern for pools where role assignments are tracked via `RoleGranted`/`RoleRevoked` events (like V3's ACL Manager, Collector, etc.).

In this case, the events are fetched by the unified event indexer, and your resolver receives the **already-processed role assignments** as a parameter:

```typescript
export const resolveMyPoolModifiers = async (
  addressBook: AddressBook,
  provider: Client,
  permissionsObject: PermissionsJson,
  adminRoles: Record<string, string[]>,  // Pre-processed role assignments
): Promise<Contracts> => {
  const obj: Contracts = {};
  const roles = generateRoles(permissionsObject);
  const ownerResolver = createOwnerResolver(provider);

  // adminRoles looks like:
  // { 'MY_CUSTOM_ROLE': ['0x123...', '0x456...'], 'ANOTHER_ROLE': ['0x789...'] }

  // Resolve all role holders' ownership info in bulk
  const resolvedOwners = await ownerResolver.resolveRoleOwners(adminRoles);

  // Build modifier entries using the resolved roles
  const myRoleAddresses = (adminRoles['MY_CUSTOM_ROLE'] || []).map((addr) => ({
    address: addr,
    owners: resolvedOwners['MY_CUSTOM_ROLE']?.[addr]?.owners || [],
    signersThreshold: resolvedOwners['MY_CUSTOM_ROLE']?.[addr]?.threshold,
  }));

  obj['MyContract'] = {
    address: addressBook.MY_CONTRACT as string,
    modifiers: [
      {
        modifier: 'onlyMyRole',
        addresses: myRoleAddresses,
        functions: roles['MyContract']['onlyMyRole'],
      },
    ],
  };

  return obj;
};
```

### The `ContractInfo` structure

Each contract entry in the output has this shape:

```typescript
{
  address: '0x...',           // Contract address
  proxyAdmin: '0x...',        // Optional: proxy admin address
  modifiers: [
    {
      modifier: 'onlyAdmin',  // Modifier name (matches the static JSON)
      addresses: [             // Who can pass through this modifier
        {
          address: '0x...',        // The direct holder
          owners: ['0x...'],       // If it's a Safe: the signers
          signersThreshold: 3,     // If it's a Safe: required signatures
        }
      ],
      functions: ['setParam', 'pause'],  // Functions gated by this modifier
    }
  ]
}
```

## Step 5: Add Event Indexing (if needed)

If your pool's access control uses `RoleGranted`/`RoleRevoked` events, register your contracts in the unified event indexer.

### 5a. Register in `buildPoolContractConfigs()`

In `helpers/eventIndexer.ts`, add your contract to the `buildPoolContractConfigs()` function:

```typescript
export const buildPoolContractConfigs = (pool: PoolConfig): ContractEventConfig[] => {
  const configs: ContractEventConfig[] = [];

  // ... existing V3, Umbrella, Governance, GHO contracts ...

  // ===== MyPool Contracts =====
  if (pool.addressBook.MY_CONTRACT && pool.myContractBlock) {
    configs.push({
      id: 'MY_CONTRACT',
      address: pool.addressBook.MY_CONTRACT,
      deploymentBlock: pool.myContractBlock,
      eventTypes: ROLE_EVENT_TYPES,  // ['RoleGranted', 'RoleRevoked']
    });
  }

  return configs;
};
```

Also extend the `PoolConfig` interface in the same file:

```typescript
interface PoolConfig {
  // ... existing fields
  myContractBlock?: number;
}
```

### 5b. Register the ABI (if using custom events)

If your contract emits events other than the standard `RoleGranted`/`RoleRevoked` from OpenZeppelin's AccessControl, you need to register the ABI.

In `helpers/rpc.ts`, add your event type to the ABI mapping:

```typescript
const abiByEventType: Record<string, any> = {
  'RoleGranted': aclManagerAbi,
  'RoleRevoked': aclManagerAbi,
  'SenderUpdated': crossChainControllerAbi,
  'MyCustomEvent': myContractAbi,  // Add your custom event
};
```

### 5c. How events flow through the system

The event flow is:

```
1. buildPoolContractConfigs()     → Returns list of {id, address, block, eventTypes}
2. indexPoolEvents()              → Fetches events via RPC, returns eventsByContract
3. modifiersCalculator.ts         → Reads indexedEvents['MY_CONTRACT']
4. getRoleAdmins()                → Processes RoleGranted/RoleRevoked into role→addresses map
5. Your resolver                  → Receives the processed roles as a parameter
```

## Step 6: Wire Into the Dispatch Chain

In `scripts/modifiersCalculator.ts`, add your pool type to the dispatch chain.

### Important: dispatch order

The dispatch chain in `modifiersCalculator.ts` uses if/else-if to route pool types. More specific pool types are matched first. The general V2 branch is a catch-all (matched by exclusion). Your new pool type should be added **before the V3 branch** (the `pool.aclBlock` check) and **before the catch-all V2 branch**.

```typescript
// Add your pool type check BEFORE the V3 and V2 catch-all branches
} else if (poolKey === Pools.MY_POOL) {
  logTableGeneration(network, poolKey, undefined, indexedLatestBlock || pool.myContractBlock);

  if (Object.keys(pool.addressBook).length > 0) {
    const poolProvider = getProviderForPool(provider, forkRpcUrl);

    // If using event-indexed roles:
    const myEvents = indexedEvents['MY_CONTRACT'] || [];
    const myRoles = getRoleAdmins({
      oldRoles: (fullJson[poolKey]?.roles?.role) || {},
      roleNames: myPoolRoleNames,
      eventLogs: myEvents,
    });
    admins = { role: myRoles };

    poolPermissions = await resolveMyPoolModifiers(
      pool.addressBook,
      poolProvider,
      permissionsJson,
      admins.role,  // Pass event-indexed roles
    );
  }
}
```

Also add the import at the top of the file:

```typescript
import { resolveMyPoolModifiers } from './myPoolPermissions.js';
import { myPoolRoleNames } from '../helpers/configs.js';
```

And update the V2 catch-all exclusion list (the first `if` branch):

```typescript
if (
  poolKey !== Pools.GOV_V2 &&
  // ... existing exclusions ...
  poolKey !== Pools.MY_POOL &&           // Add
  !pool.aclBlock &&
  !pool.crossChainControllerBlock
) {
```

### Needs event indexing trigger

If your pool type uses event indexing, make sure the `needsEventIndexing` check includes your block field:

```typescript
const needsEventIndexing =
  pool.aclBlock ||
  pool.ghoBlock ||
  pool.collectorBlock ||
  pool.clinicStewardBlock ||
  pool.umbrellaBlock ||
  pool.crossChainControllerBlock ||
  pool.granularGuardianBlock ||
  pool.myContractBlock;  // Add your block field
```

## Step 7: Configure the Network

Add your pool to the network configuration.

### 7a. Create the pool in the network config

In `helpers/configs/networks/<network>.ts`:

```typescript
import { createMyPool } from '../poolBuilder.js';
import { Pools } from '../constants.js';

const myPool = createMyPool({
  addressBook: MyPoolAddressBook,    // From @aave-dao/aave-address-book
  myContractBlock: 12345678,         // Block where your contract was deployed
  addresses: {                       // Custom address names (optional)
    '0x...': 'My Custom Contract',
  },
});

export const networkConfig: NetworkConfig = {
  // ...
  pools: {
    [Pools.V3]: v3Pool,
    [Pools.MY_POOL]: myPool,
  },
};
```

### 7b. Add address names

For contract names that appear only on this network, add them to the network config's `addressesNames` (via `mergeAddressNames()`).

For addresses shared across networks (e.g., deployers, common guardians), add them to `helpers/configs/addresses/shared.ts`.

## Step 8: Handle Table Generation

In `scripts/createTables.ts`, you may need to adjust the contract aggregation logic depending on how your pool type relates to existing pools.

### Contract aggregation

The `buildPoolInfoContracts()` function controls which contracts appear in a pool's tables. By default, non-V3 pools merge with all V3 data. If your pool type needs different behavior, add a condition:

```typescript
const buildPoolInfoContracts = (network, pool, currentPoolContracts) => {
  // ...
  if (pool === Pools.MY_POOL) {
    // Option A: Isolated — only show this pool's own contracts
    return currentPoolContracts;

    // Option B: Merge with V3 (default for most pools)
    // (no special handling needed, falls through to default)

    // Option C: Custom merge
    return {
      ...currentPoolContracts,
      ...extractPoolContracts(networkPermits['V3']),
    };
  }
};
```

### Governance checks

Similarly, `buildGovV3Contracts()` controls which governance contracts appear. By default, pools use V3's governance. If your pool has its own governance setup, add handling here.

### Output file naming

Output tables are written to `out/<networkName>-<poolKey>.md`. When using fork mode, the output overwrites the same pool's file so you can review changes via `git diff` (see [Using Fork Mode](./USAGE.md#using-fork-mode)).

## Step 9: Add ABIs (if needed)

If your contracts use non-standard ABIs (not AccessControl's `RoleGranted`/`RoleRevoked`), add the ABI to `abis/`:

```typescript
// abis/myContractAbi.ts
export const myContractAbi = [
  {
    inputs: [],
    name: 'admin',
    outputs: [{ type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'emergencyAdmin',
    outputs: [{ type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  // ... other functions you need to call
] as const;
```

## End-to-End Example

Here's a minimal but complete example of adding a hypothetical "Rewards" pool type that has an AccessControl-based RewardsController:

### 1. Static permissions (`statics/functionsPermissionsRewards.json`):
```json
[
  {
    "contract": "RewardsController",
    "proxyAdmin": true,
    "functions": [
      { "name": "configureAssets", "roles": ["onlyEmissionManager"] },
      { "name": "setDistributionEnd", "roles": ["onlyEmissionManager"] },
      { "name": "setClaimer", "roles": ["onlyEmissionManager"] }
    ]
  }
]
```

### 2. Pool enum (`helpers/configs/constants.ts`):
```typescript
export enum Pools {
  REWARDS = 'REWARDS',
}

export const rewardsRoleNames = [
  'DEFAULT_ADMIN',
  'EMISSION_MANAGER_ROLE',
];
```

### 3. Pool builder (`helpers/configs/poolBuilder.ts`):
```typescript
export const createRewardsPool = (config: { addressBook: AddressBook; rewardsBlock: number }): PoolConfigs => ({
  permissionsJson: './statics/functionsPermissionsRewards.json',
  ...config,
});
```

### 4. Permission resolver (`scripts/rewardsPermissions.ts`):
```typescript
import { generateRoles } from '../helpers/jsonParsers.js';
import { getProxyAdmin } from '../helpers/proxyAdmin.js';
import { AddressBook, Contracts, PermissionsJson } from '../helpers/types.js';
import { Client } from 'viem';
import { createOwnerResolver } from '../helpers/ownerResolver.js';

export const resolveRewardsModifiers = async (
  addressBook: AddressBook,
  provider: Client,
  permissionsObject: PermissionsJson,
  adminRoles: Record<string, string[]>,
): Promise<Contracts> => {
  const obj: Contracts = {};
  const roles = generateRoles(permissionsObject);
  const ownerResolver = createOwnerResolver(provider);
  const resolvedOwners = await ownerResolver.resolveRoleOwners(adminRoles);

  const emissionManagers = (adminRoles['EMISSION_MANAGER_ROLE'] || []).map((addr) => ({
    address: addr,
    owners: resolvedOwners['EMISSION_MANAGER_ROLE']?.[addr]?.owners || [],
    signersThreshold: resolvedOwners['EMISSION_MANAGER_ROLE']?.[addr]?.threshold,
  }));

  obj['RewardsController'] = {
    address: addressBook.REWARDS_CONTROLLER as string,
    modifiers: [{
      modifier: 'onlyEmissionManager',
      addresses: emissionManagers,
      functions: roles['RewardsController']['onlyEmissionManager'],
    }],
  };

  // Proxy admin resolution
  for (const entry of permissionsObject.filter(c => c.proxyAdmin)) {
    if (obj[entry.contract]) {
      obj[entry.contract].proxyAdmin = await getProxyAdmin(obj[entry.contract].address, provider);
    }
  }

  return obj;
};
```

### 5. Event indexer (`helpers/eventIndexer.ts`):
```typescript
// In buildPoolContractConfigs():
if (pool.addressBook.REWARDS_CONTROLLER && pool.rewardsBlock) {
  configs.push({
    id: 'REWARDS_CONTROLLER',
    address: pool.addressBook.REWARDS_CONTROLLER,
    deploymentBlock: pool.rewardsBlock,
    eventTypes: ROLE_EVENT_TYPES,
  });
}
```

### 6. Dispatch (`scripts/modifiersCalculator.ts`):
```typescript
} else if (poolKey === Pools.REWARDS) {
  logTableGeneration(network, poolKey, undefined, indexedLatestBlock);
  const rewardsEvents = indexedEvents['REWARDS_CONTROLLER'] || [];
  const rewardsRoles = getRoleAdmins({
    oldRoles: (fullJson[poolKey]?.roles?.role) || {},
    roleNames: rewardsRoleNames,
    eventLogs: rewardsEvents,
  });
  admins = { role: rewardsRoles };
  poolPermissions = await resolveRewardsModifiers(
    pool.addressBook, getProviderForPool(poolKey, pool, provider),
    permissionsJson, admins.role,
  );
}
```

### 7. Network config (`helpers/configs/networks/mainnet.ts`):
```typescript
const rewardsPool = createRewardsPool({
  addressBook: RewardsAddressBook,
  rewardsBlock: 19000000,
});

export const mainnetConfig = {
  pools: {
    [Pools.REWARDS]: rewardsPool,
  },
};
```

## Testing Your Changes

1. **Run for a single network and pool** to iterate quickly:
   ```bash
   npm run modifiers:generate -- -n <chainId> -p MY_POOL
   ```

2. **Check the output JSON** at `out/permissions/<chainId>-permissions.json`. Verify your pool's section has the expected contracts, modifiers, and role assignments.

3. **Generate tables** and inspect the markdown:
   ```bash
   npm run tables:create -- -n <chainId> -p MY_POOL
   ```

4. **Compare with the contract source code** to verify that all gated functions are listed under the correct modifiers and that the role holders match on-chain state.
