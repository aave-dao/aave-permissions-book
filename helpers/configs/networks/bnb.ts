import {
  AaveV3BNB,
  GovernanceV3BNB,
  MiscBNB,
} from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import { createV3Pool, createTenderlyPool } from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// V3 Pool
// ============================================================================
const v3Pool = createV3Pool({
  aclBlock: 33571625,
  collectorBlock: 46332799,
  crossChainControllerBlock: 31558150,
  granularGuardianBlock: 40546332,
  clinicStewardBlock: 47144040,
  addressBook: { ...AaveV3BNB, ...MiscBNB },
  governanceAddressBook: GovernanceV3BNB,
  addresses: {
    '0xFF1137243698CaA18EE364Cc966CF0e02A4e6327': 'LayerZeroAdapter',
    '0x118DFD5418890c0332042ab05173Db4A2C1d283c': 'HyperLaneAdapter',
  },
});

// ============================================================================
// Network Config Export
// ============================================================================
export const bnbConfig: NetworkConfig = {
  name: 'Binance',
  rpcUrl: process.env.RPC_BINANCE,
  explorer: 'https://bscscan.com',
  addressesNames: mergeAddressNames({
    '0xE8C5ab722d0b1B7316Cc4034f2BE91A5B1d29964': 'BGD',
    '0x25170e9Ed4077ABA7D3DD03cf4A9F45Dc6D0fcCD': 'Aave Guardian Binance',
    '0x126dc589cc75f17385dD95516F3F1788d862E7bc': 'Risk Council',
    '0x1A0581dd5C7C3DA4Ba1CDa7e0BcA7286afc4973b': 'Aave Governance Guardian Binance',
    '0xCb45E82419baeBCC9bA8b1e5c7858e48A3B26Ea6': 'Aave Protocol Guardian Binance',
    '0xB5ABc2BcB050bE70EF53338E547d87d06F7c877d': 'BGD Steward Injector Guardian',
  }),
  pools: {
    [Pools.V3]: v3Pool,
    [Pools.TENDERLY]: createTenderlyPool(v3Pool, Pools.V3, {
      tenderlyBlock: 74133283,
      tenderlyRpcUrl:
        'https://virtual.binance.eu.rpc.tenderly.co/1a97adbf-9e3c-488a-83e4-e3082a99c4a3',
    }),
  },
};
