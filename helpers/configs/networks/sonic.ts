import {
  AaveV3Sonic,
  GovernanceV3Sonic,
  MiscSonic,
} from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import { createV3Pool } from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// V3 Pool
// ============================================================================
const v3Pool = createV3Pool({
  aclBlock: 7408201,
  collectorBlock: 7408280,
  crossChainControllerBlock: 7277160,
  granularGuardianBlock: 7281310,
  addressBook: {
    ...AaveV3Sonic,
    ...MiscSonic,
  },
  governanceAddressBook: {
    ...GovernanceV3Sonic,
    ...MiscSonic,
  },
  addresses: {
    '0x1905fCdDa41241C0871A5eC3f9dcC3E8d247261D': 'CCIPAdapter',
    '0x7B8FaC105A7a85f02C3f31559d2ee7313BDC5d7f': 'LayerZeroAdapter',
    '0x1098F187F5f444Bc1c77cD9beE99e8d460347F5F': 'HyperLaneAdapter',
  },
});

// ============================================================================
// Network Config Export
// ============================================================================
export const sonicConfig: NetworkConfig = {
  name: 'Sonic',
  rpcUrl: process.env.RPC_SONIC,
  explorer: 'https://sonicscan.org/',
  addressesNames: mergeAddressNames({
    '0xA4aF5175ed38e791362F01c67a487DbA4aE07dFe': 'Aave Protocol Guardian Sonic',
    '0x7837d7a167732aE41627A3B829871d9e32e2e7f2': 'BGD',
    '0x10078c1D8E46dd1ed5D8df2C42d5ABb969b11566': 'Aave Granular Guardian Sonic',
    '0x63C4422D6cc849549daeb600B7EcE52bD18fAd7f': 'Aave Governance Guardian Sonic',
    '0x1dE39A17a9Fa8c76899fff37488482EEb7835d04': 'Risk Council',
  }),
  pools: {
    [Pools.V3]: v3Pool,
  },
};
