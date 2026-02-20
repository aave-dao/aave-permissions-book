import {
  AaveV3Mantle,
  GovernanceV3Mantle,
  MiscMantle,
  GhoMantle
} from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import { createGhoPool,
createV3Pool } from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// V3 Pool
// ============================================================================
const v3Pool = createV3Pool({
  aclBlock: 90172810,
  collectorBlock: 90172810,
  crossChainControllerBlock: 75528130,
  granularGuardianBlock: 75528470,
  addressBook: {
    ...AaveV3Mantle,
    ...MiscMantle,
  },
  governanceAddressBook: {
    ...GovernanceV3Mantle,
    ...MiscMantle,
  },
});


// ============================================================================
// GHO Pool
// ============================================================================
const ghoPool = createGhoPool({
  ghoBlock: 89778470,
  addressBook: { ...AaveV3Mantle, ...MiscMantle, ...GhoMantle },
  gsmBlocks: {
  },
  addresses: {
  },
});

// ============================================================================
// Network Config Export
// ============================================================================
export const mantleConfig: NetworkConfig = {
  name: 'Mantle',
  rpcUrl: process.env.RPC_MANTLE,
  explorer: 'https://explorer.mantle.xyz/',
  addressesNames: mergeAddressNames({
    '0x172867391d690Eb53896623DaD22208624230686': 'Aave Protocol Guardian Mantle',
    '0x0686f59Cc2aEc1ccf891472Dc6C89bB747F6a4A7': 'BGD',
    '0xb26670d2800DBB9cfCe2f2660FfDcA48C799c86d': 'Aave Granular Guardian Mantle',
    '0x14816fC7f443A9C834d30eeA64daD20C4f56fBCD': 'Aave Governance Guardian Mantle',
    '0xfF0ACe5060bd25f6900eb4bD91a868213C5346B5': 'Risk Council',
    '0xDe6539018B095353A40753Dc54C91C68c9487D4E': 'Gho Direct Minter',
    '0x8513e6F37dBc52De87b166980Fa3F50639694B60': 'Gho Risk Council',
    '0x2Ce400703dAcc37b7edFA99D228b8E70a4d3831B': 'Gho Bucket Steward',
  }),
  pools: {
    [Pools.V3]: v3Pool,
    [Pools.GHO]: ghoPool,
  },
};
