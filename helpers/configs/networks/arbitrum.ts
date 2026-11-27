import {
  AaveV3Arbitrum,
  GovernanceV3Arbitrum,
  MiscArbitrum,
  GhoArbitrum,
} from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import { createV3Pool } from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// V3 Pool
// ============================================================================
const v3Pool = createV3Pool({
  aclBlock: 7740502,
  emissionManagerBlock: 7740502,
  collectorBlock: 302176258,
  crossChainControllerBlock: 112113800,
  granularGuardianBlock: 233088975,
  clinicStewardBlock: 311843330,
  addressBook: {
    ...AaveV3Arbitrum,
    ...MiscArbitrum,
    ...GhoArbitrum,
    // Until the aave-address-book release with the Arbitrum LlamaGuard caps entries ships.
    LLAMARISK_RISK_ORACLE_ADMIN_SAFE: '0x1a0267E9E5929a5914Ae9DbBf23Bc07B14365471',
    LLAMARISK_CAPS_RISK_ORACLE: '0x556c75E6bbf0672bf3510b839Ad229450C474f23',
    LLAMARISK_CAPS_RISK_ORACLE_ROUTER: '0x74d8dd6CfCC3BeED9C4Db3fd6c4e471aD721d9F0',
    LLAMARISK_CAPS_PARAMETER_REGISTRY: '0x2662d3A9d07589DCAbAA10ea85F66572b51c260d',
    LLAMARISK_CAPS_RANGE_VALIDATION_MODULE: '0x039C0E59F728bA984dFAA96dFF977B977aA82Beb',
    LLAMARISK_CAPS_REDUCER_ORACLE: '0xC8D89bd6894C315Fb13bBD057357D1380771C181',
    LLAMARISK_CAPS_RAISE_AGENT: '0x996126C29374EbBA1A3AC91c2564C29D0E634765',
    LLAMARISK_CAPS_CUT_AGENT: '0x3Fe54E476007CB315B23284BC1064cCC01a1f666',
    LLAMARISK_CAPS_BORROW_FORWARDER: '0x6bDBAF2B3aCdA83391D1C30b58dD137C5767eAdd',
  },
  functionsPermissionsLlamaRiskJson: './statics/functionsPermissionsLlamaRisk.json',
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
    [AaveV3Arbitrum.RISK_COUNCIL]: 'Risk Council',
    '0x1A0581dd5C7C3DA4Ba1CDa7e0BcA7286afc4973b': 'Aave Governance Guardian Arbitrum',
    '0xCb45E82419baeBCC9bA8b1e5c7858e48A3B26Ea6': 'Aave Protocol Guardian Arbitrum',
    '0x8513e6F37dBc52De87b166980Fa3F50639694B60': 'Gho Risk Council',
    '0xd2D586f849620ef042FE3aF52eAa10e9b78bf7De': 'Arbitrum Gho Aave Steward',
    '0x87dFb794364f2B117C8dbaE29EA622938b3Ce465': 'BGD Steward Injector Guardian',
  }),
  pools: {
    [Pools.V3]: v3Pool,
  },
};
