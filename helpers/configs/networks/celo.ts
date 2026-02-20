import {
  AaveV3Celo,
  GovernanceV3Celo,
  MiscCelo,
} from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import { createV3Pool } from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// V3 Pool
// ============================================================================
const v3Pool = createV3Pool({
  aclBlock: 30390000,
  collectorBlock: 30390060,
  crossChainControllerBlock: 29733820,
  granularGuardianBlock: 29750070,
  addressBook: {
    ...AaveV3Celo,
    ...MiscCelo,
  },
  governanceAddressBook: {
    ...GovernanceV3Celo,
    ...MiscCelo,
  },
  addresses: {
    '0x3d534E8964e7aAcfc702751cc9A2BB6A9fe7d928': 'CCIPAdapter',
    '0x7B065E68E70f346B18636Ab86779980287ec73e0': 'HyperLaneAdapter',
    '0x83BC62fbeA15B7Bfe11e8eEE57997afA5451f38C': 'LayerZeroAdapter',
  },
});

// ============================================================================
// Network Config Export
// ============================================================================
export const celoConfig: NetworkConfig = {
  name: 'Celo',
  rpcUrl: process.env.RPC_CELO,
  explorer: 'https://celoscan.io/',
  addressesNames: mergeAddressNames({
    '0x88E7aB6ee481Cf92e548c0e1169F824F99142c85': 'Aave Protocol Guardian Celo',
    '0xfD3a6E65e470a7D7D730FFD5D36a9354E8F9F4Ea': 'BGD',
    '0xbE815420A63A413BB8D508d8022C0FF150Ea7C39': 'Aave Granular Guardian Celo',
    '0x056E4C4E80D1D14a637ccbD0412CDAAEc5B51F4E': 'Aave Governance Guardian Celo',
    '0xd85786B5FC61E2A0c0a3144a33A0fC70646a99f6': 'Risk Council',
  }),
  pools: {
    [Pools.V3]: v3Pool,
  },
};
