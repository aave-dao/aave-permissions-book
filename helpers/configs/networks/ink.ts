import {
  AaveV3InkWhitelabel,
  GovernanceV3InkWhitelabel,
  MiscInkWhitelabel,
  GovernanceV3Ink,
  MiscInk,
  GhoInk
} from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import { createGhoPool,
createV3Pool } from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// V3 White Label Pool
// ============================================================================
const v3WhiteLabelPool = createV3Pool({
  aclBlock: 19948732,
  collectorBlock: 19948732,
  addressBook: {
    ...AaveV3InkWhitelabel,
    ...MiscInkWhitelabel,
  },
  ppcPermissionsJson: './statics/functionsPermissionsPpcV2.json',
  ppcAddressBook: {
    ...GovernanceV3InkWhitelabel,
    ...MiscInkWhitelabel,
  },
});

// ============================================================================
// V3 Pool (Governance only)
// ============================================================================
const v3Pool = createV3Pool({
  aclBlock: 0, // Not applicable - governance only
  crossChainControllerBlock: 9342650,
  granularGuardianBlock: 9343700,
  addressBook: {
    ...MiscInk,
  },
  governanceAddressBook: {
    ...GovernanceV3Ink,
    ...MiscInk,
  },
});


// ============================================================================
// GHO Pool
// ============================================================================
const ghoPool = createGhoPool({
  ghoBlock: 21969030,
  addressBook: { ...MiscInk, ...GhoInk },
  gsmBlocks: {
  },
  addresses: {
  },
});

// ============================================================================
// Network Config Export
// ============================================================================
export const inkConfig: NetworkConfig = {
  name: 'Ink',
  rpcUrl: process.env.RPC_INK,
  explorer: 'https://explorer.inkonchain.com/',
  addressesNames: mergeAddressNames({
    '0x00C2B13eF4F70Bf1827179Fe6d8facF7cFf6AcD2': 'WhiteLabel Ink emergency-admin multisig',
    '0x2e8090716C5a25332cf963d454250B88bf04E6dC': 'WhiteLabel Ink super-admin multisig',
    '0x1bBcC6F0BB563067Ca45450023a13E34fa963Fa9': 'Aave Governance Guardian Ink',
    '0x81D251dA015A0C7bD882918Ca1ec6B7B8E094585': 'BGD',
    '0xDe6539018B095353A40753Dc54C91C68c9487D4E': 'Gho Direct Minter',
    '0xA5Ba213867E175A182a5dd6A9193C6158738105A': 'Gho Bucket Steward',

  }),
  pools: {
    [Pools.V3_WHITE_LABEL]: v3WhiteLabelPool,
    [Pools.V3]: v3Pool,
    [Pools.GHO]: ghoPool,
  },
};
