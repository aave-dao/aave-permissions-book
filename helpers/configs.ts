import dotenv from 'dotenv';

import {
  AaveSafetyModule,
  AaveV2Avalanche,
  AaveV2Ethereum,
  AaveV2EthereumAMM,
  UmbrellaEthereum,
  AaveV2Polygon,
  AaveV3Arbitrum,
  AaveV3Avalanche,
  AaveV3Ethereum,
  AaveV3EthereumLido,
  AaveV3EthereumEtherFi,
  AaveV3Optimism,
  AaveV3Polygon,
  AaveV3Metis,
  AaveV3Base,
  AaveV3Gnosis,
  GovernanceV3Ethereum,
  GovernanceV3Polygon,
  GovernanceV3Avalanche,
  GovernanceV3Optimism,
  GovernanceV3Arbitrum,
  GovernanceV3BNB,
  GovernanceV3Base,
  GovernanceV3Metis,
  GovernanceV3Gnosis,
  MiscEthereum,
  MiscGnosis,
  MiscArbitrum,
  MiscBase,
  MiscOptimism,
  MiscPolygon,
  MiscMetis,
  MiscAvalanche,
  AaveV3BNB,
  AaveV3Scroll,
  MiscScroll,
  GovernanceV3Scroll,
  MiscBNB,
  GovernanceV3ZkSync,
  MiscZkSync,
  AaveV3ZkSync,
  AaveV3Linea,
  MiscLinea,
  GovernanceV3Linea,
  MiscSonic,
  AaveV3Sonic,
  GovernanceV3Sonic,
  AaveV3Celo,
  MiscCelo,
  GovernanceV3Celo,
  GhoArbitrum,
  GhoEthereum,
  GhoBase,
  GovernanceV3Soneium,
  AaveV3Soneium,
  MiscSoneium,
  GovernanceV3InkWhitelabel,
  AaveV3InkWhitelabel,
  MiscInkWhitelabel,
  GovernanceV3Ink,
  MiscInk,
} from '@bgd-labs/aave-address-book';
import { NetworkConfigs } from './types.js';
import { ChainId } from '@bgd-labs/toolbox';
dotenv.config();

export enum Pools {
  V2 = 'V2',
  V3 = 'V3',
  V2_AMM = 'V2_AMM',
  V2_ARC = 'V2_ARC',
  V2_MISC = 'V2_MISC',
  V2_AMM_TENDERLY = 'V2_AMM_TENDERLY',
  V2_ARC_TENDERLY = 'V2_ARC_TENDERLY',
  V2_MISC_TENDERLY = 'V2_MISC_TENDERLY',
  GOV_V2 = 'GOV_V2',
  SAFETY_MODULE = 'SAFETY_MODULE',
  SAFETY_MODULE_TENDERLY = 'SAFETY_MODULE_TENDERLY',
  TENDERLY = 'TENDERLY',
  V2_TENDERLY = 'V2_TENDERLY',
  GHO = 'GHO',
  GHO_TENDERLY = 'GHO_TENDERLY',
  GOV_V2_TENDERLY = 'GOV_V2_TENDERLY',
  GHO_GSM = 'GHO_GSM',
  LIDO = 'LIDO',
  ETHERFI = 'ETHERFI',
  ETHERFI_TENDERLY = 'ETHERFI_TENDERLY',
  LIDO_TENDERLY = 'LIDO_TENDERLY',
  V3_WHITE_LABEL = 'V3_WHITE_LABEL',
}

export const ghoRoleNames = [
  'DEFAULT_ADMIN',
  'FACILITATOR_MANAGER_ROLE',
  'BUCKET_MANAGER_ROLE',
];

export const collectorRoleNames = [
  'DEFAULT_ADMIN',
  'FUNDS_ADMIN_ROLE',
];

export const clinicStewardRoleNames = [
  'DEFAULT_ADMIN',
  'CLEANUP_ROLE',
];

export const ghoGSMRoleNames = [
  'DEFAULT_ADMIN_ROLE',
  'CONFIGURATOR_ROLE',
  'TOKEN_RESCUER_ROLE',
  'SWAP_FREEZER_ROLE',
  'LIQUIDATOR_ROLE',
];

export const protocolRoleNames = [
  'ASSET_LISTING_ADMIN',
  'DEFAULT_ADMIN',
  'EMERGENCY_ADMIN',
  'FLASH_BORROWER',
  'POOL_ADMIN',
  'RISK_ADMIN',
];

export const granularGuardianRoleNames = [
  'DEFAULT_ADMIN',
  'RETRY_ROLE',
  'SOLVE_EMERGENCY_ROLE',
];

export const umbrellaRoleNames = [
  'DEFAULT_ADMIN',
  'COVERAGE_MANAGER_ROLE',
  'PAUSE_GUARDIAN_ROLE',
  'RESCUE_GUARDIAN_ROLE',

];

export const umbrellaIncentivesRoleNames = [
  'DEFAULT_ADMIN',
  'REWARDS_ADMIN_ROLE',
];

export const getNetowkName: Record<string | number, string> = {
  1: 'Eth',
  100: 'Gno',
  137: 'Pol',
  43114: 'Avax',
  42161: 'Arb',
  250: 'FTM',
  10: 'Opt',
  1088: 'Met',
  56: 'BNB',
  8453: 'Bas',
  324: 'ZkSync',
};

/**
 * @notice object that contains the configuration for each pool and network pairing.
 * depending on the arguments you add to the pools configurations it will generate different tables.
 * @dev if you want to have a specific name for a specific address yo should put it into the addressesNames object
 * @dev If you want to generate the tenderly table uncomment / add a thenderly pool object, with the blocknumber from which it will start. for the previous
 * blocknumbers it will copy the original pool you specify. this will override the original table so that the differences can more easly be seen. (do not merge tenderly
 * tables into main branch)
 */
export const networkConfigs: NetworkConfigs = {
  [ChainId.mainnet]: {
    name: 'Ethereum',
    rpcUrl: process.env.RPC_MAINNET,
    explorer: 'https://etherscan.io',
    addressesNames: {
      '0xCA76Ebd8617a03126B6FB84F9b1c1A0fB71C2633': 'Aave Guardian Ethereum', // Delete after aip execution
      '0x23c155C1c1ecB18a86921Da29802292f1d282c68': 'Aave Arc DAO',
      '0x33B09130b035d6D7e57d76fEa0873d9545FA7557': 'Aave Arc Guardian',
      '0xB9062896ec3A615a4e4444DF183F0531a77218AE': 'Legacy Emergency Admin',
      '0x36fEDC70feC3B77CAaf50E6C524FD7e5DFBD629A': 'ParaSwap',
      '0xEAF6183bAb3eFD3bF856Ac5C058431C8592394d6': 'Deployer',
      '0x00907f9921424583e7ffBfEdf84F92B7B2Be4977': 'GHO aToken',
      '0xb812d0944f8F581DfAA3a93Dda0d22EcEf51A9CF': 'BGD',
      '0x47c71dFEB55Ebaa431Ae3fbF99Ea50e0D3d30fA8': 'Risk Council',
      '0xF60BDDE9077Be3226Db8109432d78afD92a8A003': 'Mediator',
      '0xef6beCa8D9543eC007bceA835aF768B58F730C1f':
        'GSM_USDC_ORACLE_SWAP_FREEZER',
      '0x71381e6718b37C12155CB961Ca3D374A8BfFa0e5':
        'GSM_USDT_ORACLE_SWAP_FREEZER',
      '0x2CFe3ec4d5a6811f4B8067F0DE7e47DfA938Aa30':
        'Aave Protocol Guardian Ethereum',
      '0xCe52ab41C40575B072A18C9700091Ccbe4A06710':
        'Aave Governance Guardian Ethereum',
      '0xb9481a29f0f996BCAc759aB201FB3844c81866c4': 'GHO Steward v2',
      '0x98217A06721Ebf727f2C8d9aD7718ec28b7aAe34': 'Core GHO Aave Steward',
      '0xdeadD8aB03075b7FBA81864202a2f59EE25B312b': 'CleanUp Admin',
      '0x3Cbded22F878aFC8d39dCD744d3Fe62086B76193': 'ACI Automation',
      '0x7571F419F7Df2d0622C1A20154a0D4250B2265cC': 'Lido ClinicSteward',
      '0x9b24C168d6A76b5459B1d47071a54962a4df36c3': 'Old VotingPortal_Eth_Pol',
      '0x33aCEf7365809218485873B7d0d67FeE411B5D79': 'Old VotingPortal_Eth_Avax',
      '0xf23f7De3AC42F22eBDA17e64DC4f51FB66b8E21f': 'Old VotingPortal_Eth_Eth',
      '0x617332a777780F546261247F621051d0b98975Eb': 'Old VotingMachine',
      '0x8513e6F37dBc52De87b166980Fa3F50639694B60': 'Gho Risk Council',
      '0x22740deBa78d5a0c24C58C740e3715ec29de1bFa': 'Finance Risk Council',
      '0x6c1DC85f2aE71C3DAcd6E44Bb57DEeF61b540a5A': 'Deficit Offset Clinic Steward',
      '0xf721bE7AA57a987F3e4D05DAc6fcb5aBF9F7cE9A': 'Edge Risk Steward EMode',
      '0x9F76954f5b55B4908d178f31C07F9537AC8328E7': 'Edge Risk Steward Discount Rate',
      '0x593B09afc075B3c326CE2AD7750888645BA8943d': 'Gho Core Direct Minter',
      '0x46Aa1063e5265b43663E81329333B47c517A5409': 'Gho Bucket Steward',
      '0x29F8c924B7aB50649c9597B8811d08f9Ef0310c3': 'USDC Oracle Swap Freezer',
      '0xD1E856a947CdF56b4f000ee29d34F5808E0A6848': 'Gho Gsm Steward',
      '0x6439DA186BD3d37fE7Fd36036543b403e9FAbaE7': 'USDT Oracle Swap Freezer',
      '0x2cE01c87Fec1b71A9041c52CaED46Fc5f4807285': 'Gho Lido Direct Minter',
      '0x22aC12a6937BBBC0a301AF9154d08EaD95673122': 'Lido Pool Exposure Steward',
      '0x5C905d62B22e4DAa4967E517C4a047Ff6026C731': 'Lido Gho Aave Steward',
      '0x81aFd0F99c2Afa2f2DD7E387c2Ef9CD2a29b6E1A': 'Lido Edge Risk Steward',
      '0x1EBdbE77bbDDD284BdCE8D7981D7eD26D6af58cA': 'Etherfi Caps Plus Risk Steward',
    },
    pools: {
      [Pools.V3]: {
        collectorBlock: 21765718,
        permissionsJson: './statics/functionsPermissionsV3.json',
        crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
        governanceAddressBook: GovernanceV3Ethereum,
        ppcPermissionsJson: './statics/functionsPermissionsPpcV1.json',
        ppcAddressBook: { ...UmbrellaEthereum, ...MiscEthereum },
        aclBlock: 16291117,
        crossChainControllerBlock: 18090380,
        granularGuardianBlock: 20324867,
        umbrellaBlock: 22346140,
        umbrellaIncentivesBlock: 22346130,
        umbrellaAddressBook: UmbrellaEthereum,
        addressBook: { ...AaveV3Ethereum, ...MiscEthereum, ...GhoEthereum },
        addresses: {
          '0x2a323be63e08E08536Fc3b5d8C6f24825e68895e': 'LayerZeroAdapter',
          '0x6Abb61beb5848B476d026C4934E8a6415e2E75a8': 'HyperLaneAdapter',
        },
        clinicStewardBlock: 21967120,

      },
      [Pools.LIDO]: {
        collectorBlock: 21765718,
        permissionsJson: './statics/functionsPermissionsV3.json',
        aclBlock: 20262410,
        addressBook: {
          ...AaveV3EthereumLido,
          ...MiscEthereum,
          COLLECTOR: AaveV3Ethereum.COLLECTOR,
        },
        clinicStewardBlock: 21967120,
      },
      // [Pools.LIDO_TENDERLY]: {
      //   permissionsJson: './statics/functionsPermissionsV3.json',
      //   aclBlock: 20262410,
      //   addressBook: {
      //     ...AaveV3EthereumLido,
      //     ...MiscEthereum,
      //     COLLECTOR: AaveV3Ethereum.COLLECTOR,
      //   },
      //   tenderlyBasePool: Pools.LIDO,
      //   tenderlyBlock: 20983900,
      //   tenderlyRpcUrl:
      //     'https://rpc.tenderly.co/fork/2d5e3793-0b31-48ad-a1b0-c9e5d03b0607',
      // },
      [Pools.ETHERFI]: {
        collectorBlock: 21765718,
        permissionsJson: './statics/functionsPermissionsV3.json',
        aclBlock: 20625515,
        addressBook: {
          ...AaveV3EthereumEtherFi,
          ...MiscEthereum,
          COLLECTOR: AaveV3Ethereum.COLLECTOR,
        },
      },
      // [Pools.ETHERFI_TENDERLY]: {
      //   permissionsJson: './statics/functionsPermissionsV3.json',
      //   aclBlock: 20625515,
      //   addressBook: {
      //     ...AaveV3EthereumEtherFi,
      //     ...MiscEthereum,
      //     COLLECTOR: AaveV3Ethereum.COLLECTOR,
      //   },
      //   tenderlyBasePool: Pools.ETHERFI,
      //   tenderlyBlock: 20983900,
      //   tenderlyRpcUrl:
      //     'https://rpc.tenderly.co/fork/2d5e3793-0b31-48ad-a1b0-c9e5d03b0607',
      // },
      [Pools.GHO]: {
        permissionsJson: './statics/functionsPermissionsGHO.json',
        ghoBlock: 17698470,
        addressBook: { ...AaveV3Ethereum, ...MiscEthereum, ...GhoEthereum },
        gsmBlocks: {
          GSM_USDC: 19037420,
          GSM_USDT: 19037420,
        },
        addresses: {
          '0x593B09afc075B3c326CE2AD7750888645BA8943d': 'Gho Core Direct Minter',
          '0x2cE01c87Fec1b71A9041c52CaED46Fc5f4807285': 'Gho Lido Direct Minter',
        }
      },
      // [Pools.GHO_TENDERLY]: {
      //   permissionsJson: './statics/functionsPermissionsGHO.json',
      //   ghoBlock: 17698470,
      //   tenderlyBlock: 18714237,
      //   addressBook: AaveV3Ethereum,
      //   tenderlyBasePool: Pools.GHO,
      //   tenderlyRpcUrl:
      //     'https://rpc.tenderly.co/fork/247e153a-3814-4cef-8dfa-dc0648a813c6',
      // },
      [Pools.V2]: {
        collectorBlock: 21765718,
        permissionsJson: './statics/functionsPermissionsV2.json',
        addressBook: AaveV2Ethereum,
      },
      // [Pools.V2_TENDERLY]: {
      //   permissionsJson: './statics/functionsPermissionsV2.json',
      //   addressBook: AaveV2Ethereum,
      //   tenderlyBasePool: Pools.V2,
      //   tenderlyBlock: 20983900,
      //   tenderlyRpcUrl:
      //     'https://rpc.tenderly.co/fork/2d5e3793-0b31-48ad-a1b0-c9e5d03b0607',
      // },
      [Pools.V2_AMM]: {
        collectorBlock: 21765718,
        permissionsJson: './statics/functionsPermissionsV2AMM.json',
        addressBook: AaveV2EthereumAMM,
      },
      // [Pools.V2_AMM_TENDERLY]: {
      //   permissionsJson: './statics/functionsPermissionsV2AMM.json',
      //   addressBook: AaveV2EthereumAMM,
      //   tenderlyBasePool: Pools.V2_AMM,
      //   tenderlyBlock: 20983900,
      //   tenderlyRpcUrl:
      //     'https://rpc.tenderly.co/fork/2d5e3793-0b31-48ad-a1b0-c9e5d03b0607',
      // },
      [Pools.SAFETY_MODULE]: {
        permissionsJson: './statics/functionsPermissionsSafety.json',
        addressBook: AaveSafetyModule,
      },
      // [Pools.SAFETY_MODULE_TENDERLY]: {
      //   permissionsJson: './statics/functionsPermissionsSafety.json',
      //   addressBook: AaveSafetyModule,
      //   tenderlyBasePool: Pools.SAFETY_MODULE,
      //   tenderlyRpcUrl:
      //     'https://rpc.tenderly.co/fork/247e153a-3814-4cef-8dfa-dc0648a813c6',
      // },
      [Pools.V2_MISC]: {
        permissionsJson: './statics/functionsPermissionsV2Misc.json',
        addressBook: MiscEthereum,
        addresses: {
          LEND_TO_AAVE_MIGRATOR: '0x317625234562B1526Ea2FaC4030Ea499C5291de4',
          AAVE_MERKLE_DISTRIBUTOR: '0xa88c6D90eAe942291325f9ae3c66f3563B93FE10',
        },
      },
      // [Pools.V2_MISC_TENDERLY]: {
      //   permissionsJson: './statics/functionsPermissionsV2Misc.json',
      //   addressBook: {},
      //   addresses: {
      //     LEND_TO_AAVE_MIGRATOR: '0x317625234562B1526Ea2FaC4030Ea499C5291de4',
      //     AAVE_MERKLE_DISTRIBUTOR: '0xa88c6D90eAe942291325f9ae3c66f3563B93FE10',
      //   },
      //   tenderlyBasePool: Pools.V2_MISC_TENDERLY,
      //   tenderlyRpcUrl:
      //     'https://rpc.tenderly.co/fork/247e153a-3814-4cef-8dfa-dc0648a813c6',
      // },
      // [Pools.TENDERLY]: {
      //   permissionsJson: './statics/functionsPermissionsV3.json',
      //   crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
      //   governanceAddressBook: GovernanceV3Ethereum,
      //   granularGuardianBlock: 20324867,
      //   aclBlock: 16291117,
      //   crossChainControllerBlock: 17684650,
      //   addressBook: { ...AaveV3Ethereum, ...MiscEthereum },
      //   tenderlyBasePool: Pools.V3,
      //   tenderlyBlock: 20983900,
      //   tenderlyRpcUrl:
      //     'https://rpc.tenderly.co/fork/2d5e3793-0b31-48ad-a1b0-c9e5d03b0607',
      // },
    },
  },
  [ChainId.polygon]: {
    name: 'Polygon',
    rpcUrl: process.env.RPC_POLYGON,
    explorer: 'https://polygonscan.com',
    addressesNames: {
      '0x1450F2898D6bA2710C98BE9CAF3041330eD5ae58': 'Aave Guardian Polygon',
      '0x46DF4eb6f7A3B0AdF526f6955b15d3fE02c618b7': 'ParaSwap',
      '0x2bB25175d9B0F8965780209EB558Cc3b56cA6d32':
        'Polygon v2 incentives admin',
      '0xEAF6183bAb3eFD3bF856Ac5C058431C8592394d6': 'Deployer',
      '0xbCEB4f363f2666E2E8E430806F37e97C405c130b': 'BGD',
      '0x2C40FB1ACe63084fc0bB95F83C31B5854C6C4cB5': 'Risk Council',
      '0x1A0581dd5C7C3DA4Ba1CDa7e0BcA7286afc4973b':
        'Aave Governance Guardian Polygon',
      '0xCb45E82419baeBCC9bA8b1e5c7858e48A3B26Ea6':
        'Aave Protocol Guardian Polygon',
      '0xdeadD8aB03075b7FBA81864202a2f59EE25B312b': 'CleanUp Admin',
      '0x3Cbded22F878aFC8d39dCD744d3Fe62086B76193': 'ACI Automation',
      '0xc8a2ADC4261c6b669CdFf69E717E77C9cFeB420d': 'Old VotingMachine',
      '0x22740deBa78d5a0c24C58C740e3715ec29de1bFa': 'Finance Risk Council',
      '0x35B09a414F6003346cA2E2553b3ea91Cd3524af3': 'Edge Risk Steward Caps',
    },
    pools: {
      [Pools.V3]: {
        collectorBlock: 67485143,
        aclBlock: 25824416,
        crossChainControllerBlock: 45029910,
        granularGuardianBlock: 59461826,
        crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
        permissionsJson: './statics/functionsPermissionsV3.json',
        addressBook: { ...AaveV3Polygon, ...MiscPolygon },
        governanceAddressBook: GovernanceV3Polygon,
        addresses: {
          '0xDA4B6024aA06f7565BBcAaD9B8bE24C3c229AAb5': 'LayerZeroAdapter',
          '0x3c25b96fF62D21E90556869272a277eE2E229747': 'HyperLaneAdapter',
        },
        clinicStewardBlock: 68599710
      },
      [Pools.V2]: {
        collectorBlock: 67485143,
        permissionsJson: './statics/functionsPermissionsV2PoR.json',
        addressBook: AaveV2Polygon,
      },
      // [Pools.V2_TENDERLY]: {
      //   permissionsJson: './statics/functionsPermissionsV2PoR.json',
      //   addressBook: AaveV2Polygon,
      //   tenderlyBasePool: Pools.V2,
      //   tenderlyBlock: 63141275,
      //   tenderlyRpcUrl:
      //     'https://rpc.tenderly.co/fork/567780b8-9555-4c31-b084-ad573ea79609',
      // },
      // [Pools.TENDERLY]: {
      //   aclBlock: 25824416,
      //   crossChainControllerBlock: 45029910,
      //   granularGuardianBlock: 59461826,
      //   crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
      //   permissionsJson: './statics/functionsPermissionsV3.json',
      //   addressBook: { ...AaveV3Polygon, ...MiscPolygon },
      //   governanceAddressBook: GovernanceV3Polygon,
      //   tenderlyBasePool: Pools.V3,
      //   tenderlyBlock: 63141275,
      //   tenderlyRpcUrl:
      //     'https://rpc.tenderly.co/fork/567780b8-9555-4c31-b084-ad573ea79609',
      // },
    },
  },
  [ChainId.bnb]: {
    name: 'Binance',
    rpcUrl: process.env.RPC_BINANCE,
    explorer: 'https://bscscan.com',
    addressesNames: {
      '0xEAF6183bAb3eFD3bF856Ac5C058431C8592394d6': 'Deployer',
      '0xE8C5ab722d0b1B7316Cc4034f2BE91A5B1d29964': 'BGD',
      '0x25170e9Ed4077ABA7D3DD03cf4A9F45Dc6D0fcCD': 'Aave Guardian Binance',
      '0x126dc589cc75f17385dD95516F3F1788d862E7bc': 'Risk Council',
      '0x1A0581dd5C7C3DA4Ba1CDa7e0BcA7286afc4973b':
        'Aave Governance Guardian Binance',
      '0xCb45E82419baeBCC9bA8b1e5c7858e48A3B26Ea6':
        'Aave Protocol Guardian Binance',
      '0xdeadD8aB03075b7FBA81864202a2f59EE25B312b': 'CleanUp Admin',
      '0x3Cbded22F878aFC8d39dCD744d3Fe62086B76193': 'ACI Automation',
      '0x22740deBa78d5a0c24C58C740e3715ec29de1bFa': 'Finance Risk Council',
      '0x655252250f4A453854040A49E8280951A76f3033': 'Edge Risk Steward Caps'
    },
    pools: {
      [Pools.V3]: {
        collectorBlock: 46332799,
        aclBlock: 33571625,
        crossChainControllerBlock: 31558150,
        granularGuardianBlock: 40546332,
        crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
        permissionsJson: './statics/functionsPermissionsV3.json',
        addressBook: { ...AaveV3BNB, ...MiscBNB },
        governanceAddressBook: GovernanceV3BNB,
        addresses: {
          '0xFF1137243698CaA18EE364Cc966CF0e02A4e6327': 'LayerZeroAdapter',
          '0x118DFD5418890c0332042ab05173Db4A2C1d283c': 'HyperLaneAdapter',
        },
        clinicStewardBlock: 47144040,
      },
      // [Pools.TENDERLY]: {
      //   aclBlock: 33571625,
      //   crossChainControllerBlock: 31558150,
      //   granularGuardianBlock: 40546332,
      //   crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
      //   permissionsJson: './statics/functionsPermissionsV3.json',
      //   addressBook: { ...AaveV3BNB, ...MiscBNB },
      //   governanceAddressBook: GovernanceV3BNB,
      //   tenderlyBasePool: Pools.V3,
      //   tenderlyBlock: 43190502,
      //   tenderlyRpcUrl:
      //     'https://rpc.tenderly.co/fork/ccbe3961-5f66-44d8-bd72-98152e9bb0f4',
      // },
    },
  },
  [ChainId.avalanche]: {
    name: 'Avalanche',
    rpcUrl: process.env.RPC_AVALANCHE,
    explorer: 'https://snowscan.xyz',
    addressesNames: {
      '0xa35b76E4935449E33C56aB24b23fcd3246f13470': 'Aave Guardian Avalanche',
      '0x01244E7842254e3FD229CD263472076B1439D1Cd':
        'Aave Guardian Avalanche (legacy)',
      '0x5CfCd7E6D055Ba4f7B998914336254aDE3F69f26':
        'Avalanche v2 incentives admin',
      '0xEAF6183bAb3eFD3bF856Ac5C058431C8592394d6': 'Deployer',
      '0x3DBA1c4094BC0eE4772A05180B7E0c2F1cFD9c36': 'BGD',
      '0xCa66149425E7DC8f81276F6D80C4b486B9503D1a': 'Risk Council',
      '0x360c0a69Ed2912351227a0b745f890CB2eBDbcFe':
        'Aave Governance Guardian Avalanche',
      '0xB94e515615c244Ab25f7A6e592e3Cb7EE31E99F4':
        'Proof Of Reserve Executor V3',
      '0x56C1a4b54921DEA9A344967a8693C7E661D72968':
        'Aave Protocol Guardian Avalanche',
      '0xdeadD8aB03075b7FBA81864202a2f59EE25B312b': 'CleanUp Admin',
      '0x3Cbded22F878aFC8d39dCD744d3Fe62086B76193': 'ACI Automation',
      '0x9b6f5ef589A3DD08670Dd146C11C4Fb33E04494F': 'Old VotingMachine',
      '0x22740deBa78d5a0c24C58C740e3715ec29de1bFa': 'Finance Risk Council',
      '0x54714FAc85b0bf627288CC3a186dE81A42f1D635': 'Aave Steward Injector Caps',
      '0xA5Ba213867E175A182a5dd6A9193C6158738105A': 'Gho Aave Steward'
    },
    pools: {
      [Pools.V3]: {
        collectorBlock: 57114737,
        aclBlock: 11970456,
        crossChainControllerBlock: 32549880,
        granularGuardianBlock: 48074792,
        crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
        permissionsJson: './statics/functionsPermissionsV3.json',
        addressBook: { ...AaveV3Avalanche, ...MiscAvalanche },
        governanceAddressBook: GovernanceV3Avalanche,
        addresses: {
          '0x3F006299eC88985c18E6e885EeA29A49eC579882': 'CCIPAdapter',
          '0xf41193E25408F652AF878c47E4401A01B5E4B682': 'LayerZeroAdapter',
          '0xa198Fac58E02A5C5F8F7e877895d50cFa9ad1E04': 'HyperLaneAdapter',
        },
        clinicStewardBlock: 58156580,
      },
      // [Pools.GHO]: {
      //   permissionsJson: './statics/functionsPermissionsGHO.json',
      //   ghoBlock: 62012650,
      //   addressBook: { ...AaveV3Avalanche, ...MiscAvalanche, ...GhoAvalanche },
      // },
      [Pools.V2]: {
        collectorBlock: 57114737,
        permissionsJson: './statics/functionsPermissionsV2PoR.json',
        addressBook: AaveV2Avalanche,
      },
      // [Pools.V2_TENDERLY]: {
      //   permissionsJson: './statics/functionsPermissionsV2PoR.json',
      //   addressBook: AaveV2Avalanche,
      //   tenderlyBasePool: Pools.V2,
      //   tenderlyBlock: 51885151,
      //   tenderlyRpcUrl:
      //     'https://rpc.tenderly.co/fork/fd8c12b8-5ad9-454b-bde9-f7ea0e244ae5',
      // },
      // [Pools.TENDERLY]: {
      //   aclBlock: 11970456,
      //   crossChainControllerBlock: 32549880,
      //   granularGuardianBlock: 48074792,
      //   crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
      //   permissionsJson: './statics/functionsPermissionsV3.json',
      //   addressBook: { ...AaveV3Avalanche, ...MiscAvalanche },
      //   governanceAddressBook: GovernanceV3Avalanche,
      //   tenderlyBasePool: Pools.V3,
      //   tenderlyBlock: 51885151,
      //   tenderlyRpcUrl:
      //     'https://rpc.tenderly.co/fork/fd8c12b8-5ad9-454b-bde9-f7ea0e244ae5',
      // },
    },
  },
  [ChainId.optimism]: {
    name: 'Optimism',
    rpcUrl: process.env.RPC_OPTIMISM,
    explorer: 'https://optimistic.etherscan.io',
    addressesNames: {
      '0xE50c8C619d05ff98b22Adf991F17602C774F785c': 'Aave Guardian Optimism',
      '0xEAF6183bAb3eFD3bF856Ac5C058431C8592394d6': 'Deployer',
      '0x3A800fbDeAC82a4d9c68A9FA0a315e095129CDBF': 'BGD',
      '0xCb86256A994f0c505c5e15c75BF85fdFEa0F2a56': 'Risk Council',
      '0x360c0a69Ed2912351227a0b745f890CB2eBDbcFe':
        'Aave Governance Guardian Optimism',
      '0x56C1a4b54921DEA9A344967a8693C7E661D72968':
        'Aave Protocol Guardian Optimism',
      '0xdeadD8aB03075b7FBA81864202a2f59EE25B312b': 'CleanUp Admin',
      '0x3Cbded22F878aFC8d39dCD744d3Fe62086B76193': 'ACI Automation',
      '0x22740deBa78d5a0c24C58C740e3715ec29de1bFa': 'Finance Risk Council',
      '0x14a6801DBEBbd6CBE009c10eCFDA98C1c7B89012': 'Edge Risk Steward Caps',
    },
    pools: {
      [Pools.V3]: {
        collectorBlock: 131490051,
        aclBlock: 4365546,
        crossChainControllerBlock: 106996150,
        granularGuardianBlock: 122802392,
        crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
        permissionsJson: './statics/functionsPermissionsV3.json',
        addressBook: { ...AaveV3Optimism, ...MiscOptimism },
        governanceAddressBook: GovernanceV3Optimism,
        addresses: {
          '0x81d32B36380e6266e1BDd490eAC56cdB300afBe0': 'OpAdapter',
        },
        clinicStewardBlock: 132707080,
      },
      // [Pools.TENDERLY]: {
      //   aclBlock: 4365546,
      //   crossChainControllerBlock: 106996150,
      //   granularGuardianBlock: 122802392,
      //   crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
      //   permissionsJson: './statics/functionsPermissionsV3.json',
      //   addressBook: { ...AaveV3Optimism, ...MiscOptimism },
      //   governanceAddressBook: GovernanceV3Optimism,
      //   tenderlyBasePool: Pools.V3,
      //   tenderlyBlock: 126776311,
      //   tenderlyRpcUrl:
      //     'https://rpc.tenderly.co/fork/bcb61da5-0ef6-414a-bc11-6ec9baed81b3',
      // },
    },
  },
  [ChainId.arbitrum]: {
    name: 'Arbitrum',
    rpcUrl: process.env.RPC_ARBITRUM,
    explorer: 'https://arbiscan.io',
    addressesNames: {
      '0xbbd9f90699c1FA0D7A65870D241DD1f1217c96Eb': 'Aave Guardian Arbitrum',
      '0xEAF6183bAb3eFD3bF856Ac5C058431C8592394d6': 'Deployer',
      '0x1Fcd437D8a9a6ea68da858b78b6cf10E8E0bF959': 'BGD',
      '0x3Be327F22eB4BD8042e6944073b8826dCf357Aa2': 'Risk Council',
      '0x1A0581dd5C7C3DA4Ba1CDa7e0BcA7286afc4973b':
        'Aave Governance Guardian Arbitrum',
      '0xCb45E82419baeBCC9bA8b1e5c7858e48A3B26Ea6':
        'Aave Protocol Guardian Arbitrum',
      '0xdeadD8aB03075b7FBA81864202a2f59EE25B312b': 'CleanUp Admin',
      '0x3Cbded22F878aFC8d39dCD744d3Fe62086B76193': 'ACI Automation',
      '0x8513e6F37dBc52De87b166980Fa3F50639694B60': 'Gho Risk Council',
      '0x22740deBa78d5a0c24C58C740e3715ec29de1bFa': 'Finance Risk Council',
      '0x35d53dEB2F6f40Ea7af32B6F8BEd88eA966DF1D9': 'Aave Steward Injector Caps',
      '0xd2D586f849620ef042FE3aF52eAa10e9b78bf7De': 'Arbitrum Gho Aave Steward'
    },
    pools: {
      [Pools.V3]: {
        collectorBlock: 302176258,
        aclBlock: 7740502,
        crossChainControllerBlock: 112113800,
        granularGuardianBlock: 233088975,
        crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
        permissionsJson: './statics/functionsPermissionsV3.json',
        addressBook: { ...AaveV3Arbitrum, ...MiscArbitrum, ...GhoArbitrum },
        governanceAddressBook: GovernanceV3Arbitrum,
        addresses: {
          '0x3829943c53F2d00e20B58475aF19716724bF90Ba': 'ArbAdapter',
        },
        clinicStewardBlock: 311843330,
      },
      // [Pools.GHO]: {
      //   permissionsJson: './statics/functionsPermissionsGHO.json',
      //   ghoBlock: 224701170,
      //   addressBook: { ...AaveV3Arbitrum, ...MiscArbitrum, ...GhoArbitrum },
      // },
      // [Pools.TENDERLY]: {
      //   aclBlock: 7740502,
      //   crossChainControllerBlock: 112113800,
      //   granularGuardianBlock: 233088975,
      //   crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
      //   permissionsJson: './statics/functionsPermissionsV3.json',
      //   addressBook: { ...AaveV3Arbitrum, ...MiscArbitrum },
      //   governanceAddressBook: GovernanceV3Arbitrum,
      //   tenderlyBasePool: Pools.V3,
      //   tenderlyBlock: 264687509,
      //   tenderlyRpcUrl:
      //     'https://rpc.tenderly.co/fork/db3768c1-7d7e-4e11-88a4-0652e3bca2fb',
      // },
    },
  },
  [ChainId.metis]: {
    name: 'Metis',
    rpcUrl: process.env.RPC_METIS,
    explorer: 'https://andromeda-explorer.metis.io',
    addressesNames: {
      '0xF6Db48C5968A9eBCB935786435530f28e32Cc501': 'Aave Guardian Metis',
      '0xEAF6183bAb3eFD3bF856Ac5C058431C8592394d6': 'Deployer',
      '0x9853589F951D724D9f7c6724E0fD63F9d888C429': 'BGD',
      '0x0f547846920C34E70FBE4F3d87E46452a3FeAFfa': 'Risk Council',
      '0x360c0a69Ed2912351227a0b745f890CB2eBDbcFe':
        'Aave Governance Guardian Metis',
      '0x56C1a4b54921DEA9A344967a8693C7E661D72968':
        'Aave Protocol Guardian Metis',
      '0xdeadD8aB03075b7FBA81864202a2f59EE25B312b': 'CleanUp Admin',
      '0x3Cbded22F878aFC8d39dCD744d3Fe62086B76193': 'ACI Automation',
      '0x22740deBa78d5a0c24C58C740e3715ec29de1bFa': 'Finance Risk Council'
    },
    pools: {
      [Pools.V3]: {
        collectorBlock: 19689741,
        aclBlock: 5405900,
        crossChainControllerBlock: 8526247,
        granularGuardianBlock: 17700310,
        crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
        permissionsJson: './statics/functionsPermissionsV3.json',
        addressBook: { ...AaveV3Metis, ...MiscMetis },
        governanceAddressBook: GovernanceV3Metis,
        addresses: {
          '0x746c675dAB49Bcd5BB9Dc85161f2d7Eb435009bf': 'MetisAdapter',
        },
        clinicStewardBlock: 19835080,
      },
    },
  },
  [ChainId.base]: {
    name: 'Base',
    rpcUrl: process.env.RPC_BASE,
    explorer: 'https://basescan.org',
    addressesNames: {
      '0x9e10C0A1Eb8FF6a0AaA53a62C7a338f35D7D9a2A': 'Aave Guardian Base',
      '0xEAF6183bAb3eFD3bF856Ac5C058431C8592394d6': 'Deployer',
      '0x7FDA7C3528ad8f05e62148a700D456898b55f8d2': 'BGD',
      '0xfbeB4AcB31340bA4de9C87B11dfBf7e2bc8C0bF1': 'Risk Council',
      '0x360c0a69Ed2912351227a0b745f890CB2eBDbcFe':
        'Aave Governance Guardian Base',
      '0x56C1a4b54921DEA9A344967a8693C7E661D72968':
        'Aave Protocol Guardian Base',
      '0xdeadD8aB03075b7FBA81864202a2f59EE25B312b': 'CleanUp Admin',
      '0x3Cbded22F878aFC8d39dCD744d3Fe62086B76193': 'ACI Automation',
      '0x8513e6F37dBc52De87b166980Fa3F50639694B60': 'Gho Risk Council',
      '0x22740deBa78d5a0c24C58C740e3715ec29de1bFa': 'Finance Risk Council',
      '0x4f84A364B66Eb6280350da011829a6BD02B4712f': 'Aave Steward Injector Caps',
      '0xA9F30e6ED4098e9439B2ac8aEA2d3fc26BcEbb45': 'Bridge Executor',
      '0xC5BcC58BE6172769ca1a78B8A45752E3C5059c39': 'Base Gho Aave Steward'
    },
    pools: {
      [Pools.V3]: {
        collectorBlock: 25895171,
        aclBlock: 2357130,
        crossChainControllerBlock: 3686170,
        granularGuardianBlock: 17207502,
        crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
        permissionsJson: './statics/functionsPermissionsV3.json',
        addressBook: { ...AaveV3Base, ...MiscBase, ...GhoBase },
        governanceAddressBook: GovernanceV3Base,
        addresses: {
          '0x7b62461a3570c6AC8a9f8330421576e417B71EE7': 'CBaseAdapter',
        },
        clinicStewardBlock: 27111930,
      },
      // [Pools.GHO]: {
      //   permissionsJson: './statics/functionsPermissionsGHO.json',
      //   ghoBlock: 24786490,
      //   addressBook: { ...AaveV3Base, ...MiscBase, ...GhoBase },
      // },
      // [Pools.TENDERLY]: {
      //   aclBlock: 2357130,
      //   crossChainControllerBlock: 3686170,
      //   granularGuardianBlock: 17207502,
      //   crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
      //   permissionsJson: './statics/functionsPermissionsV3.json',
      //   addressBook: { ...AaveV3Base, ...MiscBase },
      //   governanceAddressBook: GovernanceV3Base,
      //   tenderlyBasePool: Pools.V3,
      //   tenderlyBlock: 21181024,
      //   tenderlyRpcUrl:
      //     'https://rpc.tenderly.co/fork/b225e6c7-118e-4f89-8e29-503b2e6e39a0',
      // },
    },
  },
  [ChainId.gnosis]: {
    name: 'Gnosis',
    rpcUrl: process.env.RPC_GNOSIS,
    explorer: 'https://gnosisscan.io/',
    addressesNames: {
      '0xF163b8698821cefbD33Cf449764d69Ea445cE23D': 'Aave Guardian Gnosis',
      '0xcb8a3E864D12190eD2b03cbA0833b15f2c314Ed8': 'BGD',
      '0xF221B08dD10e0C68D74F035764931Baa3b030481': 'Risk Council',
      '0x1A0581dd5C7C3DA4Ba1CDa7e0BcA7286afc4973b':
        'Aave Governance Guardian Gnosis',
      '0xCb45E82419baeBCC9bA8b1e5c7858e48A3B26Ea6':
        'Aave Protocol Guardian Gnosis',
      '0xdeadD8aB03075b7FBA81864202a2f59EE25B312b': 'CleanUp Admin',
      '0x3Cbded22F878aFC8d39dCD744d3Fe62086B76193': 'ACI Automation',
      '0x22740deBa78d5a0c24C58C740e3715ec29de1bFa': 'Finance Risk Council',
      '0x655252250f4A453854040A49E8280951A76f3033': 'Edge Risk Steward Caps',
      '0x6e637e1E48025E51315d50ab96d5b3be1971A715': 'Gnosis Gho Aave Steward'
    },
    pools: {
      [Pools.V3]: {
        collectorBlock: 38371783,
        aclBlock: 30293056,
        crossChainControllerBlock: 30373982,
        granularGuardianBlock: 35008853,
        crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
        permissionsJson: './statics/functionsPermissionsV3.json',
        addressBook: { ...AaveV3Gnosis, ...MiscGnosis },
        governanceAddressBook: GovernanceV3Gnosis,
        addresses: {
          '0x7b62461a3570c6AC8a9f8330421576e417B71EE7': 'LayerZeroAdapter',
          '0x4A4c73d563395ad827511F70097d4Ef82E653805': 'HyperLaneAdapter',
          '0x889c0cc3283DB588A34E89Ad1E8F25B0fc827b4b': 'GnosisChainAdapter',
        },
        clinicStewardBlock: 38845800,
      },
      // [Pools.TENDERLY]: {
      //   aclBlock: 30293056,
      //   crossChainControllerBlock: 30373982,
      //   granularGuardianBlock: 35008853,
      //   crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
      //   permissionsJson: './statics/functionsPermissionsV3.json',
      //   addressBook: { ...AaveV3Gnosis, ...MiscGnosis },
      //   tenderlyBasePool: Pools.V3,
      //   governanceAddressBook: GovernanceV3Gnosis,
      //   tenderlyBlock: 36547402,
      //   tenderlyRpcUrl:
      //     'https://rpc.tenderly.co/fork/a2aa1a32-d589-47b1-a7c7-9ee3381f093a',
      // },
    },
  },
  [ChainId.scroll]: {
    name: 'Scroll',
    rpcUrl: process.env.RPC_SCROLL,
    explorer: 'https://scrollscan.com/',
    addressesNames: {
      '0x63B20270b695E44Ac94Ad7592D5f81E3575b93e7': 'Aave Guardian Scroll',
      '0x4aAa03F0A61cf93eA252e987b585453578108358': 'BGD',
      '0xEAF6183bAb3eFD3bF856Ac5C058431C8592394d6': 'Deployer',
      '0x611439a74546888c3535B4dd119A5Cbb9f5332EA': 'Risk Council',
      '0x1A0581dd5C7C3DA4Ba1CDa7e0BcA7286afc4973b':
        'Aave Governance Guardian Scroll',
      '0xCb45E82419baeBCC9bA8b1e5c7858e48A3B26Ea6':
        'Aave Protocol Guardian Scroll',
      '0xdeadD8aB03075b7FBA81864202a2f59EE25B312b': 'CleanUp Admin',
      '0x3Cbded22F878aFC8d39dCD744d3Fe62086B76193': 'ACI Automation',
      '0x22740deBa78d5a0c24C58C740e3715ec29de1bFa': 'Finance Risk Council'
    },
    pools: {
      [Pools.V3]: {
        collectorBlock: 13165804,
        aclBlock: 2618760,
        crossChainControllerBlock: 2140900,
        granularGuardianBlock: 7517784,
        crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
        permissionsJson: './statics/functionsPermissionsV3.json',
        addressBook: { ...AaveV3Scroll, ...MiscScroll },
        governanceAddressBook: GovernanceV3Scroll,
        addresses: {
          '0x118DFD5418890c0332042ab05173Db4A2C1d283c': 'ScrollAdapter',
        },
        clinicStewardBlock: 13798480,
      },
    },
  },
  [ChainId.zksync]: {
    name: 'ZkSync',
    rpcUrl: process.env.RPC_ZKSYNC,
    explorer: 'https://era.zksync.network/',
    addressesNames: {
      '0xba845c27903F7dDB5c676e5b74728C871057E000': 'Aave Guardian ZkSync',
      '0x2451337aD5fE8b563bEB3b9c4A2B8789294879Ec': 'BGD',
      '0xEAF6183bAb3eFD3bF856Ac5C058431C8592394d6': 'Deployer',
      '0x4257bf0746D783f0D962913d7d8AFA408B62547E':
        'Aave Governance Guardian ZkSync',
      '0x77CC0A0582475bfD74CD838610e817d05c181E11': 'CleanUp Admin',
      '0x3Cbded22F878aFC8d39dCD744d3Fe62086B76193': 'ACI Automation',
      '0x22740deBa78d5a0c24C58C740e3715ec29de1bFa': 'Finance Risk Council',
      '0x5BF14aeaFe54A9dE94D0C4CeA73A9B4C46F94F2D': 'Risk Council'
    },
    pools: {
      [Pools.V3]: {
        collectorBlock: 55159191,
        aclBlock: 43709020,
        crossChainControllerBlock: 40068400,
        granularGuardianBlock: 40095020,
        crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
        permissionsJson: './statics/functionsPermissionsV3.json',
        addressBook: { ...AaveV3ZkSync, ...MiscZkSync },
        governanceAddressBook: GovernanceV3ZkSync,
        addresses: {
          '0x1BC5C10CAe378fDbd7D52ec4F9f34590a619c68E': 'ZkSyncAdapter',
        },
        clinicStewardBlock: 56964260,
      },
    },
  },
  [ChainId.linea]: {
    name: 'Linea',
    rpcUrl: process.env.RPC_LINEA,
    explorer: 'https://lineascan.build/',
    addressesNames: {
      '0x0BF186764D8333a938f35e5dD124a7b9b9dccDF9':
        'Aave Protocol Guardian Linea',
      '0xfD3a6E65e470a7D7D730FFD5D36a9354E8F9F4Ea': 'BGD',
      '0xEAF6183bAb3eFD3bF856Ac5C058431C8592394d6': 'Deployer',
      '0xc1cd6faF6e9138b4e6C21d438f9ebF2bd6F6cA16':
        'Aave Granular Guardian Linea',
      '0x056E4C4E80D1D14a637ccbD0412CDAAEc5B51F4E':
        'Aave Governance Guardian Linea',
      '0xF092A5aC5E284E7c433dAFE5b8B138bFcA53a4Ee': 'Risk Council',
      '0xdeadD8aB03075b7FBA81864202a2f59EE25B312b': 'CleanUp Admin',
      '0x3Cbded22F878aFC8d39dCD744d3Fe62086B76193': 'ACI Automation',
      '0x22740deBa78d5a0c24C58C740e3715ec29de1bFa': 'Finance Risk Council'
    },
    pools: {
      [Pools.V3]: {
        clinicStewardBlock: 16499170,
        aclBlock: 12430800,
        collectorBlock: 15376154,
        crossChainControllerBlock: 13185200,
        granularGuardianBlock: 13223700,
        crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
        permissionsJson: './statics/functionsPermissionsV3.json',
        addressBook: {
          ...AaveV3Linea,
          ...MiscLinea,
          COLLECTOR: '0x86E2938daE289763D4e09a7e42c5cCcA62Cf9809', // TODO: REMOVE ONCE ADDED ON ADDRESS BOOK
        },
        governanceAddressBook: GovernanceV3Linea,
        addresses: {
          '0xB3332d31ECFC3ef3BF6Cda79833D11d1A53f5cE6': 'LineaAdapter',
        },
      },
    },
  },
  [ChainId.celo]: {
    name: 'Celo',
    rpcUrl: process.env.RPC_CELO,
    explorer: 'https://celoscan.io/',
    addressesNames: {
      '0x88E7aB6ee481Cf92e548c0e1169F824F99142c85':
        'Aave Protocol Guardian Celo',
      '0xfD3a6E65e470a7D7D730FFD5D36a9354E8F9F4Ea': 'BGD',
      '0xEAF6183bAb3eFD3bF856Ac5C058431C8592394d6': 'Deployer',
      '0xbE815420A63A413BB8D508d8022C0FF150Ea7C39':
        'Aave Granular Guardian Celo',
      '0x056E4C4E80D1D14a637ccbD0412CDAAEc5B51F4E':
        'Aave Governance Guardian Celo',
      '0xd85786B5FC61E2A0c0a3144a33A0fC70646a99f6': 'Risk Council',
      '0x22740deBa78d5a0c24C58C740e3715ec29de1bFa': 'Finance Risk Council'
    },
    pools: {
      [Pools.V3]: {
        aclBlock: 30390000,
        collectorBlock: 30390060,
        crossChainControllerBlock: 29733820,
        granularGuardianBlock: 29750070,
        crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
        permissionsJson: './statics/functionsPermissionsV3.json',
        addressBook: {
          ...AaveV3Celo,
          ...MiscCelo,
        },
        governanceAddressBook: {
          ...GovernanceV3Celo,
          ...MiscCelo,
        },
        addresses: {
          '0x3d534E8964e7aAcfc702751cc9A2BB6A9fe7d928': 'CCIPAdapter',
          '0x7b065E68E70f346B18636Ab86779980287ec73e0': 'HyperLaneAdapter',
          '0x83BC62fbeA15B7Bfe11e8eEE57997afA5451f38C': 'LayerZeroAdapter'
        },
      },
    },
  },
  [ChainId.sonic]: {
    name: 'Sonic',
    rpcUrl: process.env.RPC_SONIC,
    explorer: 'https://sonicscan.org/',
    addressesNames: {
      '0xA4aF5175ed38e791362F01c67a487DbA4aE07dFe':
        'Aave Protocol Guardian Sonic',
      '0x7837d7a167732aE41627A3B829871d9e32e2e7f2': 'BGD',
      '0xEAF6183bAb3eFD3bF856Ac5C058431C8592394d6': 'Deployer',
      '0x10078c1D8E46dd1ed5D8df2C42d5ABb969b11566':
        'Aave Granular Guardian Sonic',
      '0x63C4422D6cc849549daeb600B7EcE52bD18fAd7f':
        'Aave Governance Guardian Sonic',
      '0x1dE39A17a9Fa8c76899fff37488482EEb7835d04': 'Risk Council',
      '0x22740deBa78d5a0c24C58C740e3715ec29de1bFa': 'Finance Risk Council'
    },
    pools: {
      [Pools.V3]: {
        aclBlock: 7408201,
        collectorBlock: 7408280,
        crossChainControllerBlock: 7277160,
        granularGuardianBlock: 7281310,
        crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
        permissionsJson: './statics/functionsPermissionsV3.json',
        addressBook: {
          ...AaveV3Sonic,
          ...MiscSonic,
        },
        governanceAddressBook: {
          ...GovernanceV3Sonic,
          ...MiscSonic
        },
        addresses: {
          '0x1905fCdDa41241C0871A5eC3f9dcC3E8d247261D': 'CCIPAdapter',
          '0x7B8FaC105A7a85f02C3f31559d2ee7313BDC5d7f': 'LayerZeroAdapter',
          '0x1098F187F5f444Bc1c77cD9beE99e8d460347F5F': 'HyperLaneAdapter',
        },
      },
      // [Pools.TENDERLY]: {
      //   aclBlock: 7408201,
      //   collectorBlock: 7408280,
      //   crossChainControllerBlock: 7277160,
      //   granularGuardianBlock: 7281310,
      //   crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
      //   permissionsJson: './statics/functionsPermissionsV3.json',
      //   addressBook: {
      //     ...AaveV3Sonic,
      //     ...MiscSonic,
      //   },
      //   governanceAddressBook: {
      //     ...GovernanceV3Sonic, 
      //     ...MiscSonic
      //   },
      //   tenderlyBasePool: Pools.V3,
      //   tenderlyBlock: 9104420,
      //   tenderlyRpcUrl:
      //     'https://rpc.tenderly.co/fork/eaf1f612-3b0b-4925-b619-4e02d1bbc127',
      // },
    },
  },
  [ChainId.soneium]: {
    name: 'Soneium',
    rpcUrl: process.env.RPC_SONEIUM,
    explorer: 'https://sonicscan.org/',
    addressesNames: {
      '0xEf323B194caD8e02D9E5D8F07B34f625f1c088f1':
        'Aave Protocol Guardian Soneium',
      '0xdc62E0e65b2251Dc66404ca717FD32dcC365Be3A': 'BGD',
      '0xEAF6183bAb3eFD3bF856Ac5C058431C8592394d6': 'Deployer',
      '0xD8E6956718784B914740267b7A50B952fb516656':
        'Aave Granular Guardian Soneium',
      '0x19CE4363FEA478Aa04B9EA2937cc5A2cbcD44be6':
        'Aave Governance Guardian Soneium',
      '0x45cCB319C57A6Ae0d53C4dB1a151dF75015103b1': 'Risk Council',
      '': 'Finance Risk Council'
    },
    pools: {
      [Pools.V3]: {
        aclBlock: 6402340,
        collectorBlock: 7004610,
        crossChainControllerBlock: 6442410,
        granularGuardianBlock: 6448120,
        crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
        permissionsJson: './statics/functionsPermissionsV3.json',
        addressBook: {
          ...AaveV3Soneium,
          ...MiscSoneium,
        },
        governanceAddressBook: {
          ...GovernanceV3Soneium,
          ...MiscSoneium
        },
        addresses: {
        },
      },
    },
  },
  [ChainId.ink]: {
    name: 'Ink',
    rpcUrl: process.env.RPC_INK,
    explorer: 'https://explorer.inkonchain.com/',
    addressesNames: {
      '0x00C2B13eF4F70Bf1827179Fe6d8facF7cFf6AcD2':
        'WhiteLabel Ink emergency-admin multisig',
      '0x2e8090716C5a25332cf963d454250B88bf04E6dC':
        'WhiteLabel Ink super-admin multisig',
      '0x1bBcC6F0BB563067Ca45450023a13E34fa963Fa9': 'Aave Governance Guardian Ink',
      '0x81D251dA015A0C7bD882918Ca1ec6B7B8E094585': 'BGD',
      '0xEAF6183bAb3eFD3bF856Ac5C058431C8592394d6': 'Deployer',
    },
    pools: {
      [Pools.V3_WHITE_LABEL]: {
        aclBlock: 19948732,
        collectorBlock: 19948732,
        permissionsJson: './statics/functionsPermissionsV3.json',
        addressBook: {
          ...AaveV3InkWhitelabel,
          ...MiscInkWhitelabel,
        },
        ppcPermissionsJson: './statics/functionsPermissionsPpcV2.json',
        ppcAddressBook: {
          ...GovernanceV3InkWhitelabel,
          ...MiscInkWhitelabel
        },
      },
      [Pools.V3]: {
        granularGuardianBlock: 9343700,
        crossChainControllerBlock: 9342650,
        permissionsJson: './statics/functionsPermissionsV3.json',
        crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
        governanceAddressBook: {
          ...GovernanceV3Ink,
          ...MiscInk,
        },
        addressBook: {
          ...MiscInk,
        }
      }
    },
  },
};
