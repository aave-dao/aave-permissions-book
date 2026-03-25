import {
  AaveSafetyModule,
  AaveV2Ethereum,
  AaveV2EthereumAMM,
  AaveV3Ethereum,
  AaveV3EthereumLido,
  AaveV3EthereumEtherFi,
  GovernanceV3Ethereum,
  MiscEthereum,
  GhoEthereum,
  UmbrellaEthereum,
} from '@aave-dao/aave-address-book';
import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import {
  createV3Pool,
  createV2Pool,
  createV2AmmPool,
  createGhoPool,
  createSafetyPool,
  createV4Pool,
} from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// V3 Main Pool
// ============================================================================
const v3Pool = createV3Pool({
  aclBlock: 16291117,
  collectorBlock: 21765718,
  crossChainControllerBlock: 18090380,
  granularGuardianBlock: 20324867,
  umbrellaBlock: 22346140,
  umbrellaIncentivesBlock: 22346130,
  clinicStewardBlock: 21967120,
  addressBook: { ...AaveV3Ethereum, ...MiscEthereum, ...GhoEthereum },
  governanceAddressBook: GovernanceV3Ethereum,
  umbrellaAddressBook: UmbrellaEthereum,
  ppcPermissionsJson: './statics/functionsPermissionsPpcV1.json',
  ppcAddressBook: { ...UmbrellaEthereum, ...MiscEthereum },
  addresses: {
    '0x2a323be63e08E08536Fc3b5d8C6f24825e68895e': 'LayerZeroAdapter',
    '0x6Abb61beb5848B476d026C4934E8a6415e2E75a8': 'HyperLaneAdapter',
  },
});

// ============================================================================
// Lido Pool
// ============================================================================
const lidoPool = createV3Pool({
  aclBlock: 20262410,
  collectorBlock: 21765718,
  clinicStewardBlock: 21967120,
  addressBook: {
    ...AaveV3EthereumLido,
    ...MiscEthereum,
    COLLECTOR: AaveV3Ethereum.COLLECTOR,
  },
});

// ============================================================================
// EtherFi Pool
// ============================================================================
const etherFiPool = createV3Pool({
  aclBlock: 20625515,
  collectorBlock: 21765718,
  addressBook: {
    ...AaveV3EthereumEtherFi,
    ...MiscEthereum,
    COLLECTOR: AaveV3Ethereum.COLLECTOR,
  },
});

// ============================================================================
// GHO Pool
// ============================================================================
const ghoPool = createGhoPool({
  ghoBlock: 17698470,
  addressBook: { ...AaveV3Ethereum, ...MiscEthereum, ...GhoEthereum },
  gsmBlocks: {
    GSM_USDC: 23678520,
    GSM_USDT: 23678520,
  },
  addresses: {
    '0x5513224daaEABCa31af5280727878d52097afA05': 'Gho Core Direct Minter',
    '0x2cE01c87Fec1b71A9041c52CaED46Fc5f4807285': 'Gho Lido Direct Minter',
  },
});

// ============================================================================
// V2 Pools
// ============================================================================
const v2Pool = createV2Pool({
  addressBook: AaveV2Ethereum,
  collectorBlock: 21765718,
});

const v2AmmPool = createV2AmmPool({
  addressBook: AaveV2EthereumAMM,
  collectorBlock: 21765718,
});

const v2MiscPool = {
  permissionsJson: './statics/functionsPermissionsV2Misc.json',
  addressBook: MiscEthereum,
  addresses: {
    LEND_TO_AAVE_MIGRATOR: '0x317625234562B1526Ea2FaC4030Ea499C5291de4',
    AAVE_MERKLE_DISTRIBUTOR: '0xa88c6D90eAe942291325f9ae3c66f3563B93FE10',
  },
};

// ============================================================================
// Aave V4
// ============================================================================
const aaveV4 = createV4Pool({
  accessManagerBlock: 24720870,
  addressBook: {
    ACCESS_MANAGER: '0x08aE3BE30958cDd1847ec58fFfd4C451a87fDF01',
    CORE_HUB: '0xCca852Bc40e560adC3b1Cc58CA5b55638ce826c9',
    PLUS_HUB: '0x06002e9c4412CB7814a791eA3666D905871E536A',
    PRIME_HUB: '0x943827DCA022D0F354a8a8c332dA1e5Eb9f9F931',
    HUB_CONFIGURATOR: '0x1F0753480bB03EaA00863224602267B7E0525C3d',
    SPOKE_CONFIGURATOR: '0x9BFFf48BFb5A7AE70c348d4d4cb97E8DEFa5389a',
    BLUECHIP_SPOKE: '0x973a023A77420ba610f06b3858aD991Df6d85A08',
    ETHENA_CORRELATED_SPOKE: '0x58131E79531caB1d52301228d1f7b842F26B9649',
    ETHENA_ECOSYSTEM_SPOKE: '0xba1B3D55D249692b669A164024A838309B7508AF',
    ETHERFI_ESPOKE: '0xbF10BDfE177dE0336aFD7fcCF80A904E15386219',
    FOREX_SPOKE: '0xD8B93635b8C6d0fF98CbE90b5988E3F2d1Cd9da1',
    GOLD_SPOKE: '0x65407b940966954b23dfA3caA5C0702bB42984DC',
    KELP_ESPOKE: '0x3131FE68C4722e726fe6B2819ED68e514395B9a4',
    LIDO_ESPOKE: '0xe1900480ac69f0B296841Cd01cC37546d92F35Cd',
    LOMBARD_BTC_SPOKE: '0x7EC68b5695e803e98a21a9A05d744F28b0a7753D',
    MAIN_SPOKE: '0x94e7A5dCbE816e498b89aB752661904E2F56c485',
    TREASURY_SPOKE: '0xB9B0b8616f6Bf6841972a52058132BE08d723155',
    CONFIG_POSITION_MANAGER: '0x51305839CE822a7b4b12AA7D86eA7005052d575c',
    GIVER_POSITION_MANAGER: '0x17A54b8d6D9C68e7fa1C7112AC998EA1BA51d11e',
    TAKER_POSITION_MANAGER: '0x6c044c0D3801499bCAbfAd458B70880bc518e9F7',
    NATIVE_TOKEN_GATEWAY: '0xe68ab4F90Fe026B9873F5F276eD2d7efBbbE42Be',
    SIGNATURE_GATEWAY: '0xfbC184337Dc6595D8bf62968Bda46e7De7AF9c3d',
  },
});

// ============================================================================
// Safety Module
// ============================================================================
const safetyPool = createSafetyPool(AaveSafetyModule);

// ============================================================================
// Network Config Export
// ============================================================================
export const mainnetConfig: NetworkConfig = {
  name: 'Ethereum',
  rpcUrl: process.env.RPC_MAINNET,
  explorer: 'https://etherscan.io',
  addressesNames: mergeAddressNames({
    '0xCA76Ebd8617a03126B6FB84F9b1c1A0fB71C2633': 'Aave Guardian Ethereum',
    '0x23c155C1c1ecB18a86921Da29802292f1d282c68': 'Aave Arc DAO',
    '0x33B09130b035d6D7e57d76fEa0873d9545FA7557': 'Aave Arc Guardian',
    '0xB9062896ec3A615a4e4444DF183F0531a77218AE': 'Legacy Emergency Admin',
    '0x36fEDC70feC3B77CAaf50E6C524FD7e5DFBD629A': 'ParaSwap',
    '0x00907f9921424583e7ffBfEdf84F92B7B2Be4977': 'GHO aToken',
    '0xb812d0944f8F581DfAA3a93Dda0d22EcEf51A9CF': 'BGD',
    '0x47c71dFEB55Ebaa431Ae3fbF99Ea50e0D3d30fA8': 'Risk Council',
    '0xF60BDDE9077Be3226Db8109432d78afD92a8A003': 'Mediator',
    '0xef6beCa8D9543eC007bceA835aF768B58F730C1f': 'GSM_USDC_ORACLE_SWAP_FREEZER',
    '0x71381e6718b37C12155CB961Ca3D374A8BfFa0e5': 'GSM_USDT_ORACLE_SWAP_FREEZER',
    '0x2CFe3ec4d5a6811f4B8067F0DE7e47DfA938Aa30': 'Aave Protocol Guardian Ethereum',
    '0xCe52ab41C40575B072A18C9700091Ccbe4A06710': 'Aave Governance Guardian Ethereum',
    '0xb9481a29f0f996BCAc759aB201FB3844c81866c4': 'GHO Steward v2',
    '0x98217A06721Ebf727f2C8d9aD7718ec28b7aAe34': 'Core GHO Aave Steward',
    '0x7571F419F7Df2d0622C1A20154a0D4250B2265cC': 'Lido ClinicSteward',
    '0x9b24C168d6A76b5459B1d47071a54962a4df36c3': 'Old VotingPortal_Eth_Pol',
    '0x33aCEf7365809218485873B7d0d67FeE411B5D79': 'Old VotingPortal_Eth_Avax',
    '0xf23f7De3AC42F22eBDA17e64DC4f51FB66b8E21f': 'Old VotingPortal_Eth_Eth',
    '0x617332a777780F546261247F621051d0b98975Eb': 'Old VotingMachine',
    '0x8513e6F37dBc52De87b166980Fa3F50639694B60': 'Gho Risk Council',
    '0x6c1DC85f2aE71C3DAcd6E44Bb57DEeF61b540a5A': 'Deficit Offset Clinic Steward',
    '0x5513224daaEABCa31af5280727878d52097afA05': 'Gho Core Direct Minter',
    '0x46Aa1063e5265b43663E81329333B47c517A5409': 'Gho Bucket Steward',
    '0x29F8c924B7aB50649c9597B8811d08f9Ef0310c3': 'USDC Oracle Swap Freezer',
    '0xD1E856a947CdF56b4f000ee29d34F5808E0A6848': 'Gho Gsm Steward',
    '0x6439DA186BD3d37fE7Fd36036543b403e9FAbaE7': 'USDT Oracle Swap Freezer',
    '0x2cE01c87Fec1b71A9041c52CaED46Fc5f4807285': 'Gho Lido Direct Minter',
    '0x5C905d62B22e4DAa4967E517C4a047Ff6026C731': 'Lido Gho Aave Steward',
    '0x1EBdbE77bbDDD284BdCE8D7981D7eD26D6af58cA': 'Etherfi Caps Plus Risk Steward',
    '0x834a5aC6e9D05b92F599A031941262F761c34859': 'Lido Aave Steward Injector',
    '0x15885A83936EB943e98EeFFb91e9A49040d93993': 'AaveStewardInjectorDiscountRate',
    '0x83ab600cE8a61b43e1757b89C0589928f765c1C4': 'AaveStewardInjectorEMode',
    '0x6A14eBe9A934c8EFE15C3811a999149472876b56': 'ClinicStewardV2',
    '0xE1e62c3ee0c581F715fBb0e23CDA536Fc29eeB2c': 'ClinicStewardV2 AMM',
    '0xff37939808EcF199A2D599ef91D699Fb13dab7F7': 'BGD Injector Guardian',
    '0xb7D402138Cb01BfE97d95181C849379d6AD14d19': 'SwapSteward',
    '0x6e51936e0ED4256f9dA4794B536B619c88Ff0047': 'USDC Chainlink Oracle Swap Freezer',
    '0x733AB16005c39d07FD3D9d1A350AA6768D10125b': 'USDT Chainlink Oracle Swap Freezer',
    '0x2bd010Ab5393AB51b601B99C4B33ba148d9466e9': 'Gho direct facilitator plasma',
    '0xE9ac5231fAecb633dA0Fe85Fcb2785b8363427d2': 'Gho direct facilitator mainnet',
    '0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9': 'SECURITY_COUNCIL',
    '0x5300A1a15135EA4dc7aD5a167152C01EFc9b192A': 'EXECUTOR',
  }),
  pools: {
    [Pools.V3]: v3Pool,
    [Pools.LIDO]: lidoPool,
    [Pools.ETHERFI]: etherFiPool,
    [Pools.GHO]: ghoPool,
    [Pools.V2]: v2Pool,
    [Pools.V2_AMM]: v2AmmPool,
    [Pools.SAFETY_MODULE]: safetyPool,
    [Pools.V2_MISC]: v2MiscPool,
    [Pools.V4]: aaveV4,
  },
};
