import {
  AaveV3Soneium,
  GovernanceV3Soneium,
  MiscSoneium,
} from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import { createV3Pool } from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// V3 Pool
// ============================================================================
const v3Pool = createV3Pool({
  aclBlock: 6402340,
  collectorBlock: 7004610,
  crossChainControllerBlock: 6442410,
  granularGuardianBlock: 6448120,
  addressBook: {
    ...AaveV3Soneium,
    ...MiscSoneium,
  },
  governanceAddressBook: {
    ...GovernanceV3Soneium,
    ...MiscSoneium,
  },
});

// ============================================================================
// Network Config Export
// ============================================================================
export const soneiumConfig: NetworkConfig = {
  name: 'Soneium',
  rpcUrl: process.env.RPC_SONEIUM,
  explorer: 'https://soneium.blockscout.com/',
  addressesNames: mergeAddressNames({
    '0xEf323B194caD8e02D9E5D8F07B34f625f1c088f1': 'Aave Protocol Guardian Soneium',
    '0xdc62E0e65b2251Dc66404ca717FD32dcC365Be3A': 'BGD',
    '0xD8E6956718784B914740267b7A50B952fb516656': 'Aave Granular Guardian Soneium',
    '0x19CE4363FEA478Aa04B9EA2937cc5A2cbcD44be6': 'Aave Governance Guardian Soneium',
    '0x45cCB319C57A6Ae0d53C4dB1a151dF75015103b1': 'Risk Council',
  }),
  pools: {
    [Pools.V3]: v3Pool,
  },
};
