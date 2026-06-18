import { AaveV3Monad, GovernanceV3Monad, MiscMonad } from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import { createV3Pool } from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// V3 Pool
// ============================================================================
// Deployment blocks on Monad (chainId 143), used to seed event indexing.
const v3Pool = createV3Pool({
  aclBlock: 81909758,
  collectorBlock: 81909749,
  emissionManagerBlock: 81909749,
  crossChainControllerBlock: 80572118,
  granularGuardianBlock: 80783599,
  addressBook: {
    ...AaveV3Monad,
    ...MiscMonad,
  },
  governanceAddressBook: {
    ...GovernanceV3Monad,
    ...MiscMonad,
  },
});

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
    [Pools.V3]: v3Pool,
  },
};
