import {
  AaveV3Metis,
  GovernanceV3Metis,
  MiscMetis,
} from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import { createV3Pool } from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// V3 Pool
// ============================================================================
const v3Pool = createV3Pool({
  aclBlock: 5405900,
  collectorBlock: 19689741,
  crossChainControllerBlock: 8526247,
  granularGuardianBlock: 17700310,
  clinicStewardBlock: 19835080,
  addressBook: { ...AaveV3Metis, ...MiscMetis },
  governanceAddressBook: GovernanceV3Metis,
  addresses: {
    '0x746c675dAB49Bcd5BB9Dc85161f2d7Eb435009bf': 'MetisAdapter',
  },
});

// ============================================================================
// Network Config Export
// ============================================================================
export const metisConfig: NetworkConfig = {
  name: 'Metis',
  rpcUrl: process.env.RPC_METIS,
  explorer: 'https://andromeda-explorer.metis.io',
  addressesNames: mergeAddressNames({
    '0xF6Db48C5968A9eBCB935786435530f28e32Cc501': 'Aave Guardian Metis',
    '0x9853589F951D724D9f7c6724E0fD63F9d888C429': 'BGD',
    '0x0f547846920C34E70FBE4F3d87E46452a3FeAFfa': 'Risk Council',
    '0x360c0a69Ed2912351227a0b745f890CB2eBDbcFe': 'Aave Governance Guardian Metis',
    '0x56C1a4b54921DEA9A344967a8693C7E661D72968': 'Aave Protocol Guardian Metis',
  }),
  pools: {
    [Pools.V3]: v3Pool,
  },
};
