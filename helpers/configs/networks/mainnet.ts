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
  createTenderlyPool,
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
    GSM_USDC: 19037420,
    GSM_USDT: 19037420,
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
  }),
  pools: {
    [Pools.V3]: v3Pool,
    [Pools.LIDO]: lidoPool,
    [Pools.LIDO_TENDERLY]: createTenderlyPool(lidoPool, Pools.LIDO, {
      tenderlyBlock: 24167154,
      tenderlyRpcUrl:
        'https://virtual.mainnet.eu.rpc.tenderly.co/17759365-976e-4b05-bc7a-04eb23d585e6',
    }),
    [Pools.ETHERFI]: etherFiPool,
    [Pools.GHO]: ghoPool,
    [Pools.V2]: v2Pool,
    [Pools.V2_AMM]: v2AmmPool,
    [Pools.SAFETY_MODULE]: safetyPool,
    [Pools.V2_MISC]: v2MiscPool,
    [Pools.TENDERLY]: createTenderlyPool(v3Pool, Pools.V3, {
      tenderlyBlock: 24167154,
      tenderlyRpcUrl:
        'https://virtual.mainnet.eu.rpc.tenderly.co/17759365-976e-4b05-bc7a-04eb23d585e6',
    }),
  },
};
