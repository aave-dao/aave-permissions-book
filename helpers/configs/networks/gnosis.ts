import {
  AaveV3Gnosis,
  GovernanceV3Gnosis,
  MiscGnosis,
  GhoGnosis,
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
  aclBlock: 30293056,
  collectorBlock: 38371783,
  crossChainControllerBlock: 30373982,
  granularGuardianBlock: 35008853,
  clinicStewardBlock: 38845800,
  addressBook: { ...AaveV3Gnosis, ...MiscGnosis },
  governanceAddressBook: GovernanceV3Gnosis,
  addresses: {
    '0x7b62461a3570c6AC8a9f8330421576e417B71EE7': 'LayerZeroAdapter',
    '0x4A4c73d563395ad827511F70097d4Ef82E653805': 'HyperLaneAdapter',
    '0x889c0cc3283DB588A34E89Ad1E8F25B0fc827b4b': 'GnosisChainAdapter',
  },
});

// ============================================================================
// GHO Pool
// ============================================================================
const ghoPool = createGhoPool({
  ghoBlock: 39729042,
  addressBook: { ...AaveV3Gnosis, ...MiscGnosis, ...GhoGnosis },
  gsmBlocks: {
  },
  addresses: {
  },
});

// ============================================================================
// Network Config Export
// ============================================================================
export const gnosisConfig: NetworkConfig = {
  name: 'Gnosis',
  rpcUrl: process.env.RPC_GNOSIS,
  explorer: 'https://gnosisscan.io/',
  addressesNames: mergeAddressNames({
    '0xF163b8698821cefbD33Cf449764d69Ea445cE23D': 'Aave Guardian Gnosis',
    '0xcb8a3E864D12190eD2b03cbA0833b15f2c314Ed8': 'BGD',
    '0xF221B08dD10e0C68D74F035764931Baa3b030481': 'Risk Council',
    '0x1A0581dd5C7C3DA4Ba1CDa7e0BcA7286afc4973b': 'Aave Governance Guardian Gnosis',
    '0xCb45E82419baeBCC9bA8b1e5c7858e48A3B26Ea6': 'Aave Protocol Guardian Gnosis',
    '0x6e637e1E48025E51315d50ab96d5b3be1971A715': 'Gnosis Gho Aave Steward',
    '0x4bBBcfF03E94B2B661c5cA9c3BD34f6504591764': 'BGD Steward Injector Guardian',
    '0xDe6539018B095353A40753Dc54C91C68c9487D4E': 'Gho Direct Minter',
    '0x8513e6F37dBc52De87b166980Fa3F50639694B60': 'Gho Risk Council',
    '0x6Bb7a212910682DCFdbd5BCBb3e28FB4E8da10Ee': 'Gho Bucket Steward',
  }),
  pools: {
    [Pools.V3]: v3Pool,
    [Pools.GHO]: ghoPool,
    [Pools.TENDERLY]: createTenderlyPool(v3Pool, Pools.V3, {
      tenderlyBlock: 44006822,
      tenderlyRpcUrl:
        'https://virtual.gnosis.eu.rpc.tenderly.co/d74ddb46-4550-4e2f-8934-0263fbaabcbb',
    }),
  },
};
