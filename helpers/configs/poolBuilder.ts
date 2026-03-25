import { AddressBook, PoolConfigs } from '../types.js';

// ============================================================================
// V4 Pool Config Type
// ============================================================================

/**
 * Configuration for Aave V4 using OZ AccessManager.
 */
export interface V4PoolConfig {
  accessManagerBlock: number;
  addressBook: AddressBook;
  roleLabels?: Record<string, string>;
}

// ============================================================================
// Pool Config Types
// ============================================================================

/**
 * Base configuration shared by all V3 pools.
 */
export interface V3PoolConfig {
  aclBlock: number;
  addressBook: AddressBook;
  collectorBlock?: number;
  clinicStewardBlock?: number;
  crossChainControllerBlock?: number;
  granularGuardianBlock?: number;
  governanceAddressBook?: AddressBook;
  umbrellaBlock?: number;
  umbrellaIncentivesBlock?: number;
  umbrellaAddressBook?: AddressBook;
  ppcPermissionsJson?: string;
  ppcAddressBook?: AddressBook;
  functionsPermissionsAgentHubJson?: string;
  addresses?: Record<string, string>;
}

/**
 * Configuration for V2 pools.
 */
export interface V2PoolConfig {
  addressBook: AddressBook;
  collectorBlock?: number;
  permissionsJson?: string;
}

/**
 * Configuration for GHO pools.
 */
export interface GhoPoolConfig {
  addressBook: AddressBook;
  ghoBlock: number;
  gsmBlocks?: Record<string, number>;
  addresses?: Record<string, string>;
}

// ============================================================================
// Pool Builders
// ============================================================================

/**
 * Creates a V3 pool configuration with standard defaults.
 */
export const createV3Pool = (config: V3PoolConfig): PoolConfigs => ({
  permissionsJson: './statics/functionsPermissionsV3.json',
  crossChainPermissionsJson: './statics/functionsPermissionsGovV3.json',
  functionsPermissionsAgentHubJson: config.functionsPermissionsAgentHubJson ?? './statics/functionsPermissionsAgentHub.json',
  ...config,
});

/**
 * Creates a V2 pool configuration with standard defaults.
 */
export const createV2Pool = (config: V2PoolConfig): PoolConfigs => ({
  permissionsJson: config.permissionsJson ?? './statics/functionsPermissionsV2.json',
  addressBook: config.addressBook,
  collectorBlock: config.collectorBlock,
});

/**
 * Creates a V2 Proof of Reserve pool configuration.
 */
export const createV2PoRPool = (config: V2PoolConfig): PoolConfigs => ({
  permissionsJson: './statics/functionsPermissionsV2PoR.json',
  addressBook: config.addressBook,
  collectorBlock: config.collectorBlock,
});

/**
 * Creates a V2 AMM pool configuration.
 */
export const createV2AmmPool = (config: V2PoolConfig): PoolConfigs => ({
  permissionsJson: './statics/functionsPermissionsV2AMM.json',
  addressBook: config.addressBook,
  collectorBlock: config.collectorBlock,
});

/**
 * Creates a GHO pool configuration.
 */
export const createGhoPool = (config: GhoPoolConfig): PoolConfigs => ({
  permissionsJson: './statics/functionsPermissionsGHO.json',
  addressBook: config.addressBook,
  ghoBlock: config.ghoBlock,
  gsmBlocks: config.gsmBlocks,
  addresses: config.addresses,
});

/**
 * Creates a Safety Module pool configuration.
 */
export const createSafetyPool = (addressBook: AddressBook): PoolConfigs => ({
  permissionsJson: './statics/functionsPermissionsSafety.json',
  addressBook,
});

/**
 * Creates an Aave V4 configuration using OZ AccessManager.
 */
export const createV4Pool = (config: V4PoolConfig): PoolConfigs => ({
  permissionsJson: './statics/functionsPermissionsV4.json',
  ...config,
});

