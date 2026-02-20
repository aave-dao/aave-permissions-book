import {
  AaveV3Scroll,
  GovernanceV3Scroll,
  MiscScroll,
} from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import { createV3Pool } from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// V3 Pool
// ============================================================================
const v3Pool = createV3Pool({
  aclBlock: 2618760,
  collectorBlock: 13165804,
  crossChainControllerBlock: 2140900,
  granularGuardianBlock: 7517784,
  clinicStewardBlock: 13798480,
  addressBook: { ...AaveV3Scroll, ...MiscScroll },
  governanceAddressBook: GovernanceV3Scroll,
  addresses: {
    '0x118DFD5418890c0332042ab05173Db4A2C1d283c': 'ScrollAdapter',
  },
});

// ============================================================================
// Network Config Export
// ============================================================================
export const scrollConfig: NetworkConfig = {
  name: 'Scroll',
  rpcUrl: process.env.RPC_SCROLL,
  explorer: 'https://scrollscan.com/',
  addressesNames: mergeAddressNames({
    '0x63B20270b695E44Ac94Ad7592D5f81E3575b93e7': 'Aave Guardian Scroll',
    '0x4aAa03F0A61cf93eA252e987b585453578108358': 'BGD',
    '0x611439a74546888c3535B4dd119A5Cbb9f5332EA': 'Risk Council',
    '0x1A0581dd5C7C3DA4Ba1CDa7e0BcA7286afc4973b': 'Aave Governance Guardian Scroll',
    '0xCb45E82419baeBCC9bA8b1e5c7858e48A3B26Ea6': 'Aave Protocol Guardian Scroll',
  }),
  pools: {
    [Pools.V3]: v3Pool,
  },
};
