import {
  AaveV3XLayer,
  GovernanceV3XLayer,
  MiscXLayer,
} from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import { createV3Pool } from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// V3 Pool
// ============================================================================
const v3Pool = createV3Pool({
  aclBlock: 42872540,
  collectorBlock: 54023245,
  crossChainControllerBlock: 43479400,
  granularGuardianBlock: 43481310,
  addressBook: { ...AaveV3XLayer, ...MiscXLayer },
  governanceAddressBook: { ...GovernanceV3XLayer, ...MiscXLayer, TRANSPARENT_PROXY_FACTORY: '0xEB0682d148e874553008730f0686ea89db7DA412' },
  addresses: {
  },
});

// ============================================================================
// Network Config Export
// ============================================================================
export const xLayerConfig: NetworkConfig = {
  name: 'XLayer',
  rpcUrl: process.env.RPC_XLAYER,
  explorer: 'https://www.oklink.com/x-layer/',
  addressesNames: mergeAddressNames({
    '0x734c3fF8DE95c3745770df69053A31FDC92F2526': 'BGD',
    '0xa43F8eDf0a0aE07e951bca11162625e77e7609A1': 'Risk Council',
    '0xeB55A63bf9993d80c86D47f819B5eC958c7C127B': 'Aave Governance Guardian XLayer',
    '0xD0D1CcB0391aADF1EaD96814ce7ab4008Ebdb336': 'Aave Protocol Guardian XLayer',
  }),
  pools: {
    [Pools.V3]: v3Pool,
  },
};
