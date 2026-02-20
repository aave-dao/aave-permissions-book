import {
  GovernanceV3Bob,
  MiscBob,
} from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import { createV3Pool } from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// V3 Pool (Governance only)
// ============================================================================
const v3Pool = createV3Pool({
  aclBlock: 0, // Not applicable - governance only
  crossChainControllerBlock: 18092370,
  granularGuardianBlock: 18092370,
  addressBook: {},
  governanceAddressBook: {
    ...GovernanceV3Bob,
    ...MiscBob,
  },
});

// ============================================================================
// Network Config Export
// ============================================================================
export const bobConfig: NetworkConfig = {
  name: 'Bob',
  rpcUrl: process.env.RPC_BOB,
  explorer: 'https://explorer.gobob.xyz/',
  addressesNames: mergeAddressNames({
    '0xEf323B194caD8e02D9E5D8F07B34f625f1c088f1': 'Aave Protocol Guardian Bob',
    '0xdc62E0e65b2251Dc66404ca717FD32dcC365Be3A': 'BGD',
    '0x60665b4F4FF7073C5fed2656852dCa271DfE2684': 'Aave Granular Guardian Bob',
    '0x19CE4363FEA478Aa04B9EA2937cc5A2cbcD44be6': 'Aave Governance Guardian Bob',
    '0xE71C189C7D8862EfDa0D9E031157199D2F3B4893': 'Risk Council',
  }),
  pools: {
    [Pools.V3]: v3Pool,
  },
};
