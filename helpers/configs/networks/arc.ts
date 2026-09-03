import { Pools } from '../constants.js';
import { NetworkConfig } from '../../types.js';
import { createV4 } from '../poolBuilder.js';
import { mergeAddressNames } from '../addresses/index.js';

// ============================================================================
// Aave V4
// ============================================================================
// Arc addresses are inlined until @aave-dao/aave-address-book publishes
// AaveV4Arc and MiscArc. Once released, swap these for the address book
// imports, as the other V4 networks do.
const V4_SECURITY_COUNCIL = '0x187AAE17d4931310B3fc75743e7F16Bdc9eD77e9';
const V4_SECURITY_COUNCIL_EXECUTOR =
  '0x8e79b0541122d3822eC93082cEB1ab03EDBc1Fd5';

const v4TokenizationSpokesAddressBook: Record<string, string> = {
  CORE_USDC_TOKENIZATION_SPOKE: '0x42EAB64310E1D1c66b4d8aF7C9C4ce253885eB83',
  CORE_EURC_TOKENIZATION_SPOKE: '0x5A10b1533C0f1f181DC8a428BF5Eb58B08fc8d2c',
  CORE_cirBTC_TOKENIZATION_SPOKE: '0x83D364DbAf4e7018E0b87dB3FaB3d1d8535a6F13',
  CORE_WETH_TOKENIZATION_SPOKE: '0xe8B890fea6e1E3915A337eD3136487F2f4f7e59D',
};

const aaveV4 = createV4({
  accessManagerBlock: 18791458,
  tokenizationSpokesAddressBook: v4TokenizationSpokesAddressBook,
  addressBook: {
    ACCESS_MANAGER: '0x24761DB265998ba1D38E8a29031cF72C2CeF3A7D',
    HUB_CONFIGURATOR: '0x419cF771E08d927b23F2F1691968C5135Ad8B659',
    SPOKE_CONFIGURATOR: '0x102610d2A7Fd87A85ad8fdCfC78879be8Fd40576',
    CORE_HUB: '0x17288dfc86205301064577b98B02b81017e6F79C',
    TREASURY_SPOKE: '0xcbd466CB8709D9f6dd8312668B4dbef394cE0e15',
    MAIN_SPOKE: '0xB843bdC3a87A05E77E07Df9FE48928b3A34b134d',
    FOREX_SPOKE: '0x4164EBCAF74670aa74C8D4F59de6157c0780F1bB',
    GIVER_POSITION_MANAGER: '0x01Da80Eef3004ebbF90b7637B1De7fF30fBc7cf1',
    TAKER_POSITION_MANAGER: '0xe9fae1C386c6f45B1fb3C3Ef01aDE424DAd4bCcF',
    CONFIG_POSITION_MANAGER: '0xa5Aa65Ae1c830d2ae10853CeEa42AE653adB3312',
    SIGNATURE_GATEWAY: '0x0d36A4a21119BBBDe559d59002254171D976289f',
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
    [V4_SECURITY_COUNCIL]: 'V4 Security Council',
    [V4_SECURITY_COUNCIL_EXECUTOR]: 'V4 Security Council Executor',
  }),
  pools: {
    [Pools.V4]: aaveV4,
  },
};
