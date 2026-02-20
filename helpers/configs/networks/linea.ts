import {
  AaveV3Linea,
  GovernanceV3Linea,
  MiscLinea,
} from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import { createV3Pool, createTenderlyPool } from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// V3 Pool
// ============================================================================
const v3Pool = createV3Pool({
  aclBlock: 12430800,
  collectorBlock: 15376154,
  crossChainControllerBlock: 13185200,
  granularGuardianBlock: 13223700,
  clinicStewardBlock: 16499170,
  addressBook: {
    ...AaveV3Linea,
    ...MiscLinea,
    COLLECTOR: '0x86E2938daE289763D4e09a7e42c5cCcA62Cf9809', // TODO: REMOVE ONCE ADDED ON ADDRESS BOOK
  },
  governanceAddressBook: GovernanceV3Linea,
  addresses: {
    '0xB3332d31ECFC3ef3BF6Cda79833D11d1A53f5cE6': 'LineaAdapter',
  },
});

// ============================================================================
// Network Config Export
// ============================================================================
export const lineaConfig: NetworkConfig = {
  name: 'Linea',
  rpcUrl: process.env.RPC_LINEA,
  explorer: 'https://lineascan.build/',
  addressesNames: mergeAddressNames({
    '0x0BF186764D8333a938f35e5dD124a7b9b9dccDF9': 'Aave Protocol Guardian Linea',
    '0xfD3a6E65e470a7D7D730FFD5D36a9354E8F9F4Ea': 'BGD',
    '0xc1cd6faF6e9138b4e6C21d438f9ebF2bd6F6cA16': 'Aave Granular Guardian Linea',
    '0x056E4C4E80D1D14a637ccbD0412CDAAEc5B51F4E': 'Aave Governance Guardian Linea',
    '0xF092A5aC5E284E7c433dAFE5b8B138bFcA53a4Ee': 'Risk Council',
    '0x0c28C535CE08345851F150dFC9c737978d726aEc': 'BGD Injector Guardian',
  }),
  pools: {
    [Pools.V3]: v3Pool,
    [Pools.TENDERLY]: createTenderlyPool(v3Pool, Pools.V3, {
      tenderlyBlock: 27445993,
      tenderlyRpcUrl:
        'https://virtual.linea.eu.rpc.tenderly.co/429f3112-eb0e-418c-bd6a-30fdbbc881d3',
    }),
  },
};
