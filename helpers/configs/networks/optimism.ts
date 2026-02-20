import {
  AaveV3Optimism,
  GovernanceV3Optimism,
  MiscOptimism,
} from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import { createV3Pool, createTenderlyPool } from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// V3 Pool
// ============================================================================
const v3Pool = createV3Pool({
  aclBlock: 4365546,
  collectorBlock: 131490051,
  crossChainControllerBlock: 106996150,
  granularGuardianBlock: 122802392,
  clinicStewardBlock: 132707080,
  addressBook: { ...AaveV3Optimism, ...MiscOptimism },
  governanceAddressBook: GovernanceV3Optimism,
  addresses: {
    '0x81d32B36380e6266e1BDd490eAC56cdB300afBe0': 'OpAdapter',
  },
});

// ============================================================================
// Network Config Export
// ============================================================================
export const optimismConfig: NetworkConfig = {
  name: 'Optimism',
  rpcUrl: process.env.RPC_OPTIMISM,
  explorer: 'https://optimistic.etherscan.io',
  addressesNames: mergeAddressNames({
    '0xE50c8C619d05ff98b22Adf991F17602C774F785c': 'Aave Guardian Optimism',
    '0x3A800fbDeAC82a4d9c68A9FA0a315e095129CDBF': 'BGD',
    '0xCb86256A994f0c505c5e15c75BF85fdFEa0F2a56': 'Risk Council',
    '0x360c0a69Ed2912351227a0b745f890CB2eBDbcFe': 'Aave Governance Guardian Optimism',
    '0x56C1a4b54921DEA9A344967a8693C7E661D72968': 'Aave Protocol Guardian Optimism',
    '0x9867Ce43D2a574a152fE6b134F64c9578ce3cE03': 'BGD Steward Injector Guardian',
  }),
  pools: {
    [Pools.V3]: v3Pool,
    [Pools.TENDERLY]: createTenderlyPool(v3Pool, Pools.V3, {
      tenderlyBlock: 146001573,
      tenderlyRpcUrl:
        'https://virtual.optimism.eu.rpc.tenderly.co/392d0f38-7d4a-4b7e-9f9d-ed2accc1fe24',
    }),
  },
};
