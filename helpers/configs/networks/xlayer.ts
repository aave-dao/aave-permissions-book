import {
  AaveV3XLayer,
  GovernanceV3XLayer,
  MiscXLayer,
  GhoXLayer,
} from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import { createGhoPool,
createV3Pool } from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// V3 Pool
// ============================================================================
const v3Pool = createV3Pool({
  aclBlock: 42872540,
  collectorBlock: 54023245,
  crossChainControllerBlock: 43479400,
  granularGuardianBlock: 43481310,
  emissionManagerBlock: 42872540,
  addressBook: {
    ...AaveV3XLayer,
    ...MiscXLayer,
    // Until the aave-address-book release with the X Layer AgentHub and LlamaRisk entries ships.
    AGENT_HUB: '0x7532F38Be8AB746DD6c1B686A9aAED3400eD35a0',
    LLAMARISK_RISK_ORACLE: '0x3e0C920C2bdDF6DF87f9A39Ea4db9CF65Cec1EDE',
    LLAMARISK_PT_PARAMETER_REGISTRY: '0x101D7eA4D0F8Ab848D3CC24e7b391F19DaaF6a2d',
    LLAMARISK_RISK_ORACLE_ROUTER: '0xfC354324B152E2A358A17182d2AF0d3f882c27D2',
  },
  functionsPermissionsLlamaRiskJson: './statics/functionsPermissionsLlamaRisk.json',
  governanceAddressBook: { ...GovernanceV3XLayer, ...MiscXLayer, TRANSPARENT_PROXY_FACTORY: '0xEB0682d148e874553008730f0686ea89db7DA412' },
  addresses: {
  },
});


// ============================================================================
// GHO Pool
// ============================================================================
const ghoPool = createGhoPool({
  ghoBlock: 50885770,
  addressBook: { ...AaveV3XLayer, ...MiscXLayer, ...GhoXLayer },
  gsmBlocks: {
  },
  addresses: {
  },
});

// ============================================================================
// Network Config Export
// ============================================================================
export const xLayerConfig: NetworkConfig = {
  name: 'XLayer',
  rpcUrl: process.env.RPC_XLAYER,
  explorer: 'https://www.oklink.com/x-layer',
  addressesNames: mergeAddressNames({
    '0x734c3fF8DE95c3745770df69053A31FDC92F2526': 'BGD',
    [AaveV3XLayer.RISK_COUNCIL]: 'Risk Council',
    '0xeB55A63bf9993d80c86D47f819B5eC958c7C127B': 'Aave Governance Guardian XLayer',
    '0xD0D1CcB0391aADF1EaD96814ce7ab4008Ebdb336': 'Aave Protocol Guardian XLayer',
    '0xA5Ba213867E175A182a5dd6A9193C6158738105A': 'Gho Direct Minter',
    '0x8513e6F37dBc52De87b166980Fa3F50639694B60': 'Gho Risk Council',
    '0x20fd5f3FCac8883a3A0A2bBcD658A2d2c6EFa6B6': 'Gho Bucket Steward',
  }),
  pools: {
    [Pools.V3]: v3Pool,
    [Pools.GHO]: ghoPool,
  },
};
