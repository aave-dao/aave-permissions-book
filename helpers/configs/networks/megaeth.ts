import {
  AaveV3MegaEth,
  GovernanceV3MegaEth,
  MiscMegaEth,
} from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import { createV3Pool } from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// V3 Pool
// ============================================================================
const v3Pool = createV3Pool({
  aclBlock: 5516650,
  collectorBlock: 5516650,
  crossChainControllerBlock: 5516650,
  granularGuardianBlock: 5516650,
  addressBook: {
    ...AaveV3MegaEth,
    ...MiscMegaEth,
  },
  governanceAddressBook: {
    ...GovernanceV3MegaEth,
    ...MiscMegaEth,
  },
});

// ============================================================================
// Network Config Export
// ============================================================================
export const megaethConfig: NetworkConfig = {
  name: 'MegaEth',
  rpcUrl: process.env.RPC_MEGAETH,
  explorer: 'https://megaeth.blockscout.com/',
  addressesNames: mergeAddressNames({
    '0x8126eAd44383cb52Cf6A1bb70F1b4d7399DE34ef': 'Aave Protocol Guardian MegaETH',
    '0x58528Cd7B8E84520df4D3395249D24543f431c21': 'BGD',
    '0x8Fa22D09b13486A40cd6b04398b948AA8bD5853A': 'Aave Granular Guardian MegaETH',
    '0x5a578ee1dA2c798Be60036AdDD223Ac164d948Af': 'Aave Governance Guardian MegaETH',
    '0x36CF7a4377aAf1988E01a4b38224FC8D583E50A9': 'Risk Council',
  }),
  pools: {
    [Pools.V3]: v3Pool,
  },
};
