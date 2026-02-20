import {
  AaveV3ZkSync,
  GovernanceV3ZkSync,
  MiscZkSync,
} from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import { createV3Pool } from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// V3 Pool
// ============================================================================
const v3Pool = createV3Pool({
  aclBlock: 43709020,
  collectorBlock: 55159191,
  crossChainControllerBlock: 40068400,
  granularGuardianBlock: 40095020,
  clinicStewardBlock: 56964260,
  addressBook: { ...AaveV3ZkSync, ...MiscZkSync },
  governanceAddressBook: GovernanceV3ZkSync,
  addresses: {
    '0x1BC5C10CAe378fDbd7D52ec4F9f34590a619c68E': 'ZkSyncAdapter',
  },
});

// ============================================================================
// Network Config Export
// ============================================================================
export const zksyncConfig: NetworkConfig = {
  name: 'ZkSync',
  rpcUrl: process.env.RPC_ZKSYNC,
  explorer: 'https://era.zksync.network/',
  addressesNames: mergeAddressNames({
    '0xba845c27903F7dDB5c676e5b74728C871057E000': 'Aave Guardian ZkSync',
    '0x2451337aD5fE8b563bEB3b9c4A2B8789294879Ec': 'BGD',
    '0x4257bf0746D783f0D962913d7d8AFA408B62547E': 'Aave Governance Guardian ZkSync',
    '0x77CC0A0582475bfD74CD838610e817d05c181E11': 'CleanUp Admin',
    '0x5BF14aeaFe54A9dE94D0C4CeA73A9B4C46F94F2D': 'Risk Council',
  }),
  pools: {
    [Pools.V3]: v3Pool,
  },
};
