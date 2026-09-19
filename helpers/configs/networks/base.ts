import {
  AaveV3Base,
  GovernanceV3Base,
  MiscBase,
  GhoBase,
} from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import {
  createV3Pool,
  createGhoPool,
  createV4,
  deduplicateByAddress,
} from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// TODO: replace with `AaveV4Base` / `MiscBase.V4_SECURITY_COUNCIL*` from
// @aave-dao/aave-address-book once aave-dao/aave-address-book#1569 is released.
const AaveV4Base = {
  ACCESS_MANAGER: '0x4010C94698EDE9d895814502B6EB122D764a1Cc6',
  HUB_CONFIGURATOR: '0x2Cd40DFF9f2F74e8765dA148102b6668A5e9778A',
  SPOKE_CONFIGURATOR: '0x0191B1Aa743c6B3C545119B5D56a0577D7f3a57F',
  TREASURY_SPOKE: '0x5F8d0102F5B51Fae6DE9d2F2561bda63Fb5Db674',
  CONFIG_ENGINE: '0x8753d579B592f3F45902b4Dc13B547B8E8BD03c4',
  HUBS: {
    EQUITIES_HUB: '0xa4d5947Eb727A052bae69C593FfC84247EC9864E',
  },
  SPOKES: {
    TREASURY_SPOKE: '0x5F8d0102F5B51Fae6DE9d2F2561bda63Fb5Db674',
    MAG7_SPOKE: '0x17905Db0e4A3514467539956c084180616AE7B8D',
    MAG7_SPOKE_ORACLE: '0xaBaf048fD7675Ea34a84332371ffd5D55E322A47',
  },
  TOKENIZATION_SPOKES: {
    EQUITIES_USDC_TOKENIZATION_SPOKE: '0x7081CE7EB1282c53CF38EA9B622f6269cb8FeFDc',
  },
  POSITION_MANAGERS: {
    GIVER_POSITION_MANAGER: '0x9E81c2fDE4E34CAB3AB1667ca3c932dBAED95F08',
    TAKER_POSITION_MANAGER: '0x8481204E528735aF2F3391AD98f36E757A56D695',
    CONFIG_POSITION_MANAGER: '0xe90F830bEe4b190B4910e146908437075b0BDaaF',
    NATIVE_TOKEN_GATEWAY: '0xdFC11f7037Ba11D9cC29A822844f5dC19C42B70d',
    SIGNATURE_GATEWAY: '0x5d488d3EAAa86DDb6D4f834FC34938054eC505A7',
  },
  EXTERNAL_LIBRARIES: {
    LIQUIDATION_LOGIC: '0x88dF535473C5adf1f57789734A05E555F7Deb8DB',
  },
};
const V4_SECURITY_COUNCIL = '0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9';
const V4_SECURITY_COUNCIL_EXECUTOR = '0xA9D9923A1ADC1200771aaaA38CFeD6A5b8483d70';

// ============================================================================
// V3 Pool
// ============================================================================
const v3Pool = createV3Pool({
  aclBlock: 2357130,
  emissionManagerBlock: 2357130,
  collectorBlock: 25895171,
  crossChainControllerBlock: 3686170,
  granularGuardianBlock: 17207502,
  clinicStewardBlock: 27111930,
  addressBook: { ...AaveV3Base, ...MiscBase, ...GhoBase },
  governanceAddressBook: GovernanceV3Base,
  addresses: {
    '0x7b62461a3570c6AC8a9f8330421576e417B71EE7': 'CBaseAdapter',
  },
});

// ============================================================================
// GHO Pool
// ============================================================================
const ghoPool = createGhoPool({
  ghoBlock: 24786494,
  addressBook: { ...AaveV3Base, ...MiscBase, ...GhoBase },
  gsmBlocks: {
  },
  addresses: {
  },
});

// ============================================================================
// Aave V4
// ============================================================================
const deduplicatedV4Addresses = deduplicateByAddress(
  AaveV4Base.HUBS as Record<string, string>,
  AaveV4Base.SPOKES as Record<string, string>,
  AaveV4Base.TOKENIZATION_SPOKES as Record<string, string>,
);

const tokenizationSpokeKeys = new Set(Object.keys(AaveV4Base.TOKENIZATION_SPOKES));
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
  accessManagerBlock: 51478811,
  tokenizationSpokesAddressBook: v4TokenizationSpokesAddressBook,
  addressBook: {
    ACCESS_MANAGER: AaveV4Base.ACCESS_MANAGER,
    HUB_CONFIGURATOR: AaveV4Base.HUB_CONFIGURATOR,
    SPOKE_CONFIGURATOR: AaveV4Base.SPOKE_CONFIGURATOR,
    ...v4MainAddressBook,
    ...(AaveV4Base.POSITION_MANAGERS as Record<string, string>),
  },
});

// ============================================================================
// Network Config Export
// ============================================================================
export const baseConfig: NetworkConfig = {
  name: 'Base',
  rpcUrl: process.env.RPC_BASE,
  explorer: 'https://basescan.org',
  addressesNames: mergeAddressNames({
    '0x9e10C0A1Eb8FF6a0AaA53a62C7a338f35D7D9a2A': 'Aave Guardian Base',
    '0x7FDA7C3528ad8f05e62148a700D456898b55f8d2': 'BGD',
    [AaveV3Base.RISK_COUNCIL]: 'Risk Council',
    '0x360c0a69Ed2912351227a0b745f890CB2eBDbcFe': 'Aave Governance Guardian Base',
    '0x56C1a4b54921DEA9A344967a8693C7E661D72968': 'Aave Protocol Guardian Base',
    '0x8513e6F37dBc52De87b166980Fa3F50639694B60': 'Gho Risk Council',
    '0xA9F30e6ED4098e9439B2ac8aEA2d3fc26BcEbb45': 'Bridge Executor',
    '0xC5BcC58BE6172769ca1a78B8A45752E3C5059c39': 'Base Gho Aave Steward',
    '0x1B7e7b282Dff5661704E32838CAE4677FEB4C1F2': 'BGD Steward Injector Guardian',
    '0x98217A06721Ebf727f2C8d9aD7718ec28b7aAe34': 'Gho Direct Minter',
    '0x3c47237479e7569653eF9beC4a7Cd2ee3F78b396': 'Gho Bucket Steward',
    [V4_SECURITY_COUNCIL]: 'V4 Security Council',
    [V4_SECURITY_COUNCIL_EXECUTOR]: 'V4 Security Council Executor',
  }),
  pools: {
    [Pools.V3]: v3Pool,
    [Pools.GHO]: ghoPool,
    [Pools.V4]: aaveV4,
  },
};
