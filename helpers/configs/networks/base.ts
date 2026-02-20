import {
  AaveV3Base,
  GovernanceV3Base,
  MiscBase,
  GhoBase,
} from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import { createV3Pool, createTenderlyPool, createGhoPool } from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// V3 Pool
// ============================================================================
const v3Pool = createV3Pool({
  aclBlock: 2357130,
  collectorBlock: 25895171,
  crossChainControllerBlock: 3686170,
  granularGuardianBlock: 17207502,
  clinicStewardBlock: 27111930,
  addressBook: { ...AaveV3Base, ...MiscBase, ...GhoBase },
  governanceAddressBook: GovernanceV3Base,
  addresses: {
    '0x7b62461a3570c6AC8a9f8330421576e417B71EE7': 'CBaseAdapter',
  },
});

// ============================================================================
// GHO Pool
// ============================================================================
const ghoPool = createGhoPool({
  ghoBlock: 24786494,
  addressBook: { ...AaveV3Base, ...MiscBase, ...GhoBase },
  gsmBlocks: {
  },
  addresses: {
  },
});

// ============================================================================
// Network Config Export
// ============================================================================
export const baseConfig: NetworkConfig = {
  name: 'Base',
  rpcUrl: process.env.RPC_BASE,
  explorer: 'https://basescan.org',
  addressesNames: mergeAddressNames({
    '0x9e10C0A1Eb8FF6a0AaA53a62C7a338f35D7D9a2A': 'Aave Guardian Base',
    '0x7FDA7C3528ad8f05e62148a700D456898b55f8d2': 'BGD',
    '0xfbeB4AcB31340bA4de9C87B11dfBf7e2bc8C0bF1': 'Risk Council',
    '0x360c0a69Ed2912351227a0b745f890CB2eBDbcFe': 'Aave Governance Guardian Base',
    '0x56C1a4b54921DEA9A344967a8693C7E661D72968': 'Aave Protocol Guardian Base',
    '0x8513e6F37dBc52De87b166980Fa3F50639694B60': 'Gho Risk Council',
    '0xA9F30e6ED4098e9439B2ac8aEA2d3fc26BcEbb45': 'Bridge Executor',
    '0xC5BcC58BE6172769ca1a78B8A45752E3C5059c39': 'Base Gho Aave Steward',
    '0x1B7e7b282Dff5661704E32838CAE4677FEB4C1F2': 'BGD Steward Injector Guardian',
    '0x98217A06721Ebf727f2C8d9aD7718ec28b7aAe34': 'Gho Direct Minter',
    '0x3c47237479e7569653eF9beC4a7Cd2ee3F78b396': 'Gho Bucket Steward',
  }),
  pools: {
    [Pools.V3]: v3Pool,
    [Pools.GHO]: ghoPool,
    [Pools.TENDERLY]: createTenderlyPool(v3Pool, Pools.V3, {
      tenderlyBlock: 40406343,
      tenderlyRpcUrl:
        'https://virtual.base.eu.rpc.tenderly.co/9bdf5ebd-aff6-42d9-bbc0-24fa68413e13',
    }),
  },
};
