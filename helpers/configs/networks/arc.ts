import { AaveV4Arc, MiscArc } from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import { createV4, deduplicateByAddress } from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// Aave V4
// ============================================================================
const deduplicatedV4Addresses = deduplicateByAddress(
  AaveV4Arc.HUBS as Record<string, string>,
  AaveV4Arc.SPOKES as Record<string, string>,
  AaveV4Arc.TOKENIZATION_SPOKES as Record<string, string>,
);

const tokenizationSpokeKeys = new Set(Object.keys(AaveV4Arc.TOKENIZATION_SPOKES));
const v4TokenizationSpokesAddressBook: Record<string, string> = {};
const v4MainAddressBook: Record<string, string> = {};
for (const [key, address] of Object.entries(deduplicatedV4Addresses)) {
  if (tokenizationSpokeKeys.has(key)) {
    v4TokenizationSpokesAddressBook[key] = address;
  } else {
    v4MainAddressBook[key] = address;
  }
}

const aaveV4 = createV4({
  accessManagerBlock: 18791458,
  aclBlock: 17408596,
  tokenizationSpokesAddressBook: v4TokenizationSpokesAddressBook,
  addressBook: {
    ACCESS_MANAGER: AaveV4Arc.ACCESS_MANAGER,
    HUB_CONFIGURATOR: AaveV4Arc.HUB_CONFIGURATOR,
    SPOKE_CONFIGURATOR: AaveV4Arc.SPOKE_CONFIGURATOR,
    POOL_ADDRESSES_PROVIDER: MiscArc.POOL_ADDRESSES_PROVIDER,
    ACL_MANAGER: MiscArc.ACL_MANAGER,
    ...v4MainAddressBook,
    ...(AaveV4Arc.POSITION_MANAGERS as Record<string, string>),
  },
});

// ============================================================================
// Network Config Export
// ============================================================================
export const arcConfig: NetworkConfig = {
  name: 'Arc',
  rpcUrl: process.env.RPC_ARC,
  explorer: 'https://explorer.arc.io',
  addressesNames: mergeAddressNames({
    [MiscArc.V4_SECURITY_COUNCIL]: 'V4 Security Council',
    [MiscArc.V4_SECURITY_COUNCIL_EXECUTOR]: 'V4 Security Council Executor',
  }),
  pools: {
    [Pools.V4]: aaveV4,
  },
};
