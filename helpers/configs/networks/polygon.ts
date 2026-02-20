import {
  AaveV2Polygon,
  AaveV3Polygon,
  GovernanceV3Polygon,
  MiscPolygon,
} from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import { createV3Pool, createV2PoRPool, createTenderlyPool } from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// V3 Pool
// ============================================================================
const v3Pool = createV3Pool({
  aclBlock: 25824416,
  collectorBlock: 67485143,
  crossChainControllerBlock: 45029910,
  granularGuardianBlock: 59461826,
  clinicStewardBlock: 68599710,
  addressBook: { ...AaveV3Polygon, ...MiscPolygon },
  governanceAddressBook: GovernanceV3Polygon,
  addresses: {
    '0xDA4B6024aA06f7565BBcAaD9B8bE24C3c229AAb5': 'LayerZeroAdapter',
    '0x3c25b96fF62D21E90556869272a277eE2E229747': 'HyperLaneAdapter',
  },
});

// ============================================================================
// V2 Pool (Proof of Reserve)
// ============================================================================
const v2Pool = createV2PoRPool({
  addressBook: AaveV2Polygon,
  collectorBlock: 67485143,
});

// ============================================================================
// Network Config Export
// ============================================================================
export const polygonConfig: NetworkConfig = {
  name: 'Polygon',
  rpcUrl: process.env.RPC_POLYGON,
  explorer: 'https://polygonscan.com',
  addressesNames: mergeAddressNames({
    '0x1450F2898D6bA2710C98BE9CAF3041330eD5ae58': 'Aave Guardian Polygon',
    '0x46DF4eb6f7A3B0AdF526f6955b15d3fE02c618b7': 'ParaSwap',
    '0x2bB25175d9B0F8965780209EB558Cc3b56cA6d32': 'Polygon v2 incentives admin',
    '0xbCEB4f363f2666E2E8E430806F37e97C405c130b': 'BGD',
    '0x2C40FB1ACe63084fc0bB95F83C31B5854C6C4cB5': 'Risk Council',
    '0x1A0581dd5C7C3DA4Ba1CDa7e0BcA7286afc4973b': 'Aave Governance Guardian Polygon',
    '0xCb45E82419baeBCC9bA8b1e5c7858e48A3B26Ea6': 'Aave Protocol Guardian Polygon',
    '0xc8a2ADC4261c6b669CdFf69E717E77C9cFeB420d': 'Old VotingMachine',
    '0x7683177b05a92e8B169D833718BDF9d0ce809aA9': 'BGD Steward Injector Guardian',
    '0xF93b565c96446afdf8C3D37E6B4781D5d5EDef1C': 'ClinicStewardV2',
  }),
  pools: {
    [Pools.V3]: v3Pool,
    [Pools.V2]: v2Pool,
    [Pools.TENDERLY]: createTenderlyPool(v3Pool, Pools.V3, {
      tenderlyBlock: 81241271,
      tenderlyRpcUrl:
        'https://virtual.polygon.eu.rpc.tenderly.co/a36f16fa-fe15-46d6-9e07-e83e78c40ac6',
    }),
  },
};
