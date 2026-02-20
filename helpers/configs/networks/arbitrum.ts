import {
  AaveV3Arbitrum,
  GovernanceV3Arbitrum,
  MiscArbitrum,
  GhoArbitrum,
} from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import { createV3Pool, createTenderlyPool } from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// V3 Pool
// ============================================================================
const v3Pool = createV3Pool({
  aclBlock: 7740502,
  collectorBlock: 302176258,
  crossChainControllerBlock: 112113800,
  granularGuardianBlock: 233088975,
  clinicStewardBlock: 311843330,
  addressBook: { ...AaveV3Arbitrum, ...MiscArbitrum, ...GhoArbitrum },
  governanceAddressBook: GovernanceV3Arbitrum,
  addresses: {
    '0x3829943c53F2d00e20B58475aF19716724bF90Ba': 'ArbAdapter',
  },
});

// ============================================================================
// Network Config Export
// ============================================================================
export const arbitrumConfig: NetworkConfig = {
  name: 'Arbitrum',
  rpcUrl: process.env.RPC_ARBITRUM,
  explorer: 'https://arbiscan.io',
  addressesNames: mergeAddressNames({
    '0xbbd9f90699c1FA0D7A65870D241DD1f1217c96Eb': 'Aave Guardian Arbitrum',
    '0x1Fcd437D8a9a6ea68da858b78b6cf10E8E0bF959': 'BGD',
    '0x3Be327F22eB4BD8042e6944073b8826dCf357Aa2': 'Risk Council',
    '0x1A0581dd5C7C3DA4Ba1CDa7e0BcA7286afc4973b': 'Aave Governance Guardian Arbitrum',
    '0xCb45E82419baeBCC9bA8b1e5c7858e48A3B26Ea6': 'Aave Protocol Guardian Arbitrum',
    '0x8513e6F37dBc52De87b166980Fa3F50639694B60': 'Gho Risk Council',
    '0xd2D586f849620ef042FE3aF52eAa10e9b78bf7De': 'Arbitrum Gho Aave Steward',
    '0x87dFb794364f2B117C8dbaE29EA622938b3Ce465': 'BGD Steward Injector Guardian',
  }),
  pools: {
    [Pools.V3]: v3Pool,
    [Pools.TENDERLY]: createTenderlyPool(v3Pool, Pools.V3, {
      tenderlyBlock: 418099902,
      tenderlyRpcUrl:
        'https://virtual.arbitrum.eu.rpc.tenderly.co/fd1bbcd0-7f09-4993-896f-205fafa0805c',
    }),
  },
};
