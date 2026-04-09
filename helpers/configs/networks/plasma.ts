import {
  AaveV3Plasma,
  GovernanceV3Plasma,
  MiscPlasma,
  GhoPlasma
} from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import { createGhoPool, createV3Pool } from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// V3 Pool
// ============================================================================
const v3Pool = createV3Pool({
  aclBlock: 489190,
  emissionManagerBlock: 489190,
  collectorBlock: 489190,
  crossChainControllerBlock: 697270,
  granularGuardianBlock: 698830,
  addressBook: {
    ...AaveV3Plasma,
    ...MiscPlasma,
  },
  governanceAddressBook: {
    ...GovernanceV3Plasma,
    ...MiscPlasma,
  },
});


// ============================================================================
// GHO Pool
// ============================================================================
const ghoPool = createGhoPool({
  ghoBlock: 1385857,
  addressBook: { ...AaveV3Plasma, ...MiscPlasma, ...GhoPlasma },
  gsmBlocks: {
    GSM_USDT: 4757510,
  },
  addresses: {
  },
});

// ============================================================================
// Network Config Export
// ============================================================================
export const plasmaConfig: NetworkConfig = {
  name: 'Plasma',
  rpcUrl: process.env.RPC_PLASMA,
  explorer: 'https://plasmascan.to/',
  addressesNames: mergeAddressNames({
    '0xEf323B194caD8e02D9E5D8F07B34f625f1c088f1': 'Aave Protocol Guardian Plasma',
    '0xdc62E0e65b2251Dc66404ca717FD32dcC365Be3A': 'BGD',
    '0x60665b4F4FF7073C5fed2656852dCa271DfE2684': 'Aave Granular Guardian Plasma',
    '0x19CE4363FEA478Aa04B9EA2937cc5A2cbcD44be6': 'Aave Governance Guardian Plasma',
    '0xE71C189C7D8862EfDa0D9E031157199D2F3B4893': 'Risk Council',
    '0x1cF16B4e76D4919bD939e12C650b8F6eb9e02916': 'BGD Injector Guardian',
    '0x360d8aa8F6b09B7BC57aF34db2Eb84dD87bf4d12': 'Gho Direct Minter',
    '0x8513e6F37dBc52De87b166980Fa3F50639694B60': 'Gho Risk Council',
    '0x2Ce400703dAcc37b7edFA99D228b8E70a4d3831B': 'Gho Bucket Steward',
    '0xa9afaE6A53E90f9E4CE0717162DF5Bc3d9aBe7B2': 'Gho Chainlink Oracle Swap Freezer' 
  }),
  pools: {
    [Pools.V3]: v3Pool,
    [Pools.GHO]: ghoPool,
  },
};
