import {
  AaveV3Plasma,
  GovernanceV3Plasma,
  MiscPlasma,
  GhoPlasma
} from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import { createGhoPool,
createV3Pool, createTenderlyPool } from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// V3 Pool
// ============================================================================
const v3Pool = createV3Pool({
  aclBlock: 489190,
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
    // '': 'Gho Risk Council',
    '0x2Ce400703dAcc37b7edFA99D228b8E70a4d3831B': 'Gho Bucket Steward',
  }),
  pools: {
    [Pools.V3]: v3Pool,
    [Pools.GHO]: ghoPool,
    [Pools.TENDERLY]: createTenderlyPool(v3Pool, Pools.V3, {
      tenderlyBlock: 10671654,
      tenderlyRpcUrl:
        'https://virtual.plasma.eu.rpc.tenderly.co/7e890d40-1ab0-4575-9d6d-092588721c24',
    }),
  },
};
