import { GovernanceV3Monad, MiscMonad } from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig, PoolConfigs } from '../../types.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// Governance / a.DI (no V3 pool deployed on Monad yet)
// ============================================================================
// Monad only has a.DI (CrossChainController + GranularGuardian) and Aave
// Governance (PayloadsController, Executor lvl1, Governance Guardian) plus the
// Protocol Guardian. There is no V3 pool (no ACLManager / Pool / Collector), so
// we register a governance-only pool config: no `aclBlock`/`addressBook`, just the
// `governanceAddressBook` + a.DI deployment blocks. The modifiers calculator
// resolves the govV3 (a.DI + governance) section independently of the V3 pool path.
//
// It is keyed under `Pools.V3` because the table generator
// (scripts/createTables.ts) reads `networkPermits['V3'].govV3` for the
// governance section; using any other key would dereference an undefined V3 pool.
const governancePool: PoolConfigs = {
  permissionsJson: './statics/functionsPermissionsV3.json',
  crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
  addressBook: {},
  governanceAddressBook: {
    ...GovernanceV3Monad,
    ...MiscMonad,
  },
  // Deployment blocks on Monad (chainId 143), used to seed event indexing.
  crossChainControllerBlock: 80572118,
  granularGuardianBlock: 80783599,
};

// ============================================================================
// Network Config Export
// ============================================================================
export const monadConfig: NetworkConfig = {
  name: 'Monad',
  rpcUrl: process.env.RPC_MONAD,
  explorer: 'https://monadscan.com',
  addressesNames: mergeAddressNames({
    '0xc887455536CBD4e615B745e70CaCde15B3117e74': 'Aave Protocol Guardian Monad',
    '0x056E4C4E80D1D14a637ccbD0412CDAAEc5B51F4E': 'Aave Governance Guardian Monad',
    '0xD3DD0bE957fcE2dCd359e09374Cbc99f60337D42': 'Aave Granular Guardian Monad',
    '0x2B99790c35a401be873FA7Eb514D9220736BB1cA': 'Aave Labs Guardian Monad',
  }),
  pools: {
    [Pools.V3]: governancePool,
  },
};
