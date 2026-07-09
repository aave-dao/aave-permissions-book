import {
  AaveV2Avalanche,
  AaveV3Avalanche,
  AaveV4Avalanche,
  GovernanceV3Avalanche,
  MiscAvalanche,
} from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import {
  createV3Pool,
  createV2PoRPool,
  createV4,
  deduplicateByAddress,
} from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// V3 Pool
// ============================================================================
const v3Pool = createV3Pool({
  aclBlock: 11970456,
  emissionManagerBlock: 11970456,
  collectorBlock: 57114737,
  crossChainControllerBlock: 32549880,
  granularGuardianBlock: 48074792,
  clinicStewardBlock: 58156580,
  addressBook: { ...AaveV3Avalanche, ...MiscAvalanche },
  governanceAddressBook: GovernanceV3Avalanche,
  addresses: {
    '0x3F006299eC88985c18E6e885EeA29A49eC579882': 'CCIPAdapter',
    '0xf41193E25408F652AF878c47E4401A01B5E4B682': 'LayerZeroAdapter',
    '0xa198Fac58E02A5C5F8F7e877895d50cFa9ad1E04': 'HyperLaneAdapter',
  },
});

// ============================================================================
// Aave V4
// ============================================================================
const deduplicatedV4Addresses = deduplicateByAddress(
  AaveV4Avalanche.HUBS as Record<string, string>,
  AaveV4Avalanche.SPOKES as Record<string, string>,
  AaveV4Avalanche.TOKENIZATION_SPOKES as Record<string, string>,
);

const tokenizationSpokeKeys = new Set(
  Object.keys(AaveV4Avalanche.TOKENIZATION_SPOKES),
);
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
  accessManagerBlock: 89721317,
  tokenizationSpokesAddressBook: v4TokenizationSpokesAddressBook,
  addressBook: {
    ACCESS_MANAGER: AaveV4Avalanche.ACCESS_MANAGER,
    HUB_CONFIGURATOR: AaveV4Avalanche.HUB_CONFIGURATOR,
    SPOKE_CONFIGURATOR: AaveV4Avalanche.SPOKE_CONFIGURATOR,
    ...v4MainAddressBook,
    ...(AaveV4Avalanche.POSITION_MANAGERS as Record<string, string>),
  },
});

// ============================================================================
// V2 Pool (Proof of Reserve)
// ============================================================================
const v2Pool = createV2PoRPool({
  addressBook: AaveV2Avalanche,
  collectorBlock: 57114737,
});

// ============================================================================
// Network Config Export
// ============================================================================
export const avalancheConfig: NetworkConfig = {
  name: 'Avalanche',
  rpcUrl: process.env.RPC_AVALANCHE,
  explorer: 'https://snowscan.xyz',
  addressesNames: mergeAddressNames({
    '0xa35b76E4935449E33C56aB24b23fcd3246f13470': 'Aave Guardian Avalanche',
    '0x01244E7842254e3FD229CD263472076B1439D1Cd':
      'Aave Guardian Avalanche (legacy)',
    '0x5CfCd7E6D055Ba4f7B998914336254aDE3F69f26':
      'Avalanche v2 incentives admin',
    '0x3DBA1c4094BC0eE4772A05180B7E0c2F1cFD9c36': 'BGD',
    '0xCa66149425E7DC8f81276F6D80C4b486B9503D1a': 'Risk Council',
    '0x360c0a69Ed2912351227a0b745f890CB2eBDbcFe':
      'Aave Governance Guardian Avalanche',
    '0xB94e515615c244Ab25f7A6e592e3Cb7EE31E99F4':
      'Proof Of Reserve Executor V3',
    '0x56C1a4b54921DEA9A344967a8693C7E661D72968':
      'Aave Protocol Guardian Avalanche',
    '0x9b6f5ef589A3DD08670Dd146C11C4Fb33E04494F': 'Old VotingMachine',
    '0xA5Ba213867E175A182a5dd6A9193C6158738105A': 'Gho Aave Steward',
    '0xD68c00a1A4a33876C5EC71A2Bf7bBd8676d72BF6':
      'BGD Steward Injector Guardian',
    '0xA28820b8af102fAABAAAdaf94224353Dc772DC99': 'ClinicStewardV2',
    '0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9': 'V4 Security Council',
    '0xb619fA61e795D47f517702e63ce50292370561F1':
      'V4 Security Council Executor',
  }),
  pools: {
    [Pools.V3]: v3Pool,
    [Pools.V2]: v2Pool,
    [Pools.V4]: aaveV4,
  },
};
