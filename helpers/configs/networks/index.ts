import { ChainId } from '@bgd-labs/toolbox';
import { NetworkConfigs } from '../../types.js';

import { mainnetConfig } from './mainnet.js';
import { polygonConfig } from './polygon.js';
import { bnbConfig } from './bnb.js';
import { avalancheConfig } from './avalanche.js';
import { optimismConfig } from './optimism.js';
import { arbitrumConfig } from './arbitrum.js';
import { metisConfig } from './metis.js';
import { baseConfig } from './base.js';
import { gnosisConfig } from './gnosis.js';
import { scrollConfig } from './scroll.js';
import { zksyncConfig } from './zksync.js';
import { lineaConfig } from './linea.js';
import { celoConfig } from './celo.js';
import { sonicConfig } from './sonic.js';
import { soneiumConfig } from './soneium.js';
import { inkConfig } from './ink.js';
import { plasmaConfig } from './plasma.js';
import { bobConfig } from './bob.js';
import { mantleConfig } from './mantle.js';
import { megaethConfig } from './megaeth.js';
import { xLayerConfig } from './xlayer.js';

/**
 * @notice object that contains the configuration for each pool and network pairing.
 * depending on the arguments you add to the pools configurations it will generate different tables.
 * @dev if you want to have a specific name for a specific address yo should put it into the addressesNames object
 * @dev To simulate a governance payload, use --fork --payload <address> --network <chainId> --pool <poolKey>
 */
export const networkConfigs: NetworkConfigs = {
  [ChainId.mainnet]: mainnetConfig,
  [ChainId.polygon]: polygonConfig,
  [ChainId.bnb]: bnbConfig,
  [ChainId.avalanche]: avalancheConfig,
  [ChainId.optimism]: optimismConfig,
  [ChainId.arbitrum]: arbitrumConfig,
  [ChainId.metis]: metisConfig,
  [ChainId.base]: baseConfig,
  [ChainId.gnosis]: gnosisConfig,
  [ChainId.scroll]: scrollConfig,
  [ChainId.zksync]: zksyncConfig,
  [ChainId.linea]: lineaConfig,
  [ChainId.celo]: celoConfig,
  [ChainId.sonic]: sonicConfig,
  [ChainId.soneium]: soneiumConfig,
  [ChainId.ink]: inkConfig,
  [ChainId.plasma]: plasmaConfig,
  [ChainId.bob]: bobConfig,
  [ChainId.mantle]: mantleConfig,
  [ChainId.megaeth]: megaethConfig,
  [ChainId.xLayer]: xLayerConfig,
};
