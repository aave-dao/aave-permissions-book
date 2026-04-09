/**
 * File system operations for reading/writing permission snapshots.
 *
 * Data flow:
 * 1. modifiersCalculator writes per-network JSON: out/permissions/{chainId}-permissions.json
 * 2. createTables reads those JSON files to generate markdown tables
 * 3. Metadata files track indexing progress: out/permissions/metadata/{chainId}-metadata.json
 *
 * Read functions return empty objects/arrays on failure (not undefined) so callers
 * can safely destructure without null checks. This is intentional - a missing file
 * simply means no prior state exists (first run, new network, etc.).
 */
import * as fs from 'fs';
import { EmissionAdminsByToken, FullPermissions, PermissionsJson, Pool } from './types.js';
import { NetworkMetadata, PoolMetadata } from './eventIndexer.js';

const METADATA_DIR = 'out/permissions/metadata';
const EMISSION_ADMINS_DIR = 'out/permissions/emission-admins';

export const saveJson = (filePath: string, stringifiedJson: string) => {
  fs.writeFileSync(filePath, stringifiedJson);
};

/**
 * Reads the aggregated permissions list (all networks).
 * Returns empty object on first run when the file doesn't exist yet.
 */
export const getAllPermissionsJson = (): FullPermissions => {
  try {
    const file = fs.readFileSync('out/aavePermissionList.json');
    return JSON.parse(file.toString()) as FullPermissions;
  } catch (error) {
    return {};
  }
};

/**
 * Reads the permissions JSON for a single network.
 * Returns empty object on first run or if the network hasn't been processed yet.
 * This is read frequently during processing - each pool reads it to get the
 * current accumulated state and writes back after adding its own data.
 */
export const getPermissionsByNetwork = (network: string | number): Pool => {
  try {
    const file = fs.readFileSync(`out/permissions/${network}-permissions.json`);
    return JSON.parse(file.toString()) as Pool;
  } catch (error) {
    return {};
  }
};

/**
 * Reads a static permissions JSON file (the predefined function-to-role mappings).
 * These files define which roles are needed to call each contract function.
 * Unlike the other read functions, this logs an error on failure since these
 * files are expected to exist (they're committed to the repo).
 */
export const getStaticPermissionsJson = (path: string): PermissionsJson => {
  try {
    const file = fs.readFileSync(path);
    return JSON.parse(file.toString()) as PermissionsJson;
  } catch (error) {
    console.error(new Error(`unable to fetch ${path} with error: ${error}`));
    return [];
  }
};

// ============================================================================
// Metadata File Functions
// ============================================================================

/**
 * Ensures the metadata directory exists.
 */
export const ensureMetadataDir = (): void => {
  if (!fs.existsSync(METADATA_DIR)) {
    fs.mkdirSync(METADATA_DIR, { recursive: true });
  }
};

/**
 * Gets the metadata for a network.
 * Returns an empty object if the file doesn't exist.
 */
export const getMetadataByNetwork = (network: string | number): NetworkMetadata => {
  try {
    const file = fs.readFileSync(`${METADATA_DIR}/${network}-metadata.json`);
    return JSON.parse(file.toString()) as NetworkMetadata;
  } catch (error) {
    return {};
  }
};

/**
 * Gets the metadata for a specific pool in a network.
 * Returns undefined if not found.
 */
export const getPoolMetadata = (
  network: string | number,
  poolKey: string,
): PoolMetadata | undefined => {
  const networkMetadata = getMetadataByNetwork(network);
  return networkMetadata[poolKey];
};

/**
 * Saves the metadata for a network.
 */
export const saveMetadata = (
  network: string | number,
  metadata: NetworkMetadata,
): void => {
  ensureMetadataDir();
  const path = `${METADATA_DIR}/${network}-metadata.json`;
  fs.writeFileSync(path, JSON.stringify(metadata, null, 2));
};

/**
 * Updates the metadata for a specific pool in a network.
 * Merges with existing metadata.
 */
export const updatePoolMetadata = (
  network: string | number,
  poolKey: string,
  poolMetadata: PoolMetadata,
): void => {
  const networkMetadata = getMetadataByNetwork(network);
  networkMetadata[poolKey] = poolMetadata;
  saveMetadata(network, networkMetadata);
};

// ============================================================================
// Emission Admin Functions
// ============================================================================

/**
 * Ensures the emission admins directory exists.
 */
const ensureEmissionAdminsDir = (): void => {
  if (!fs.existsSync(EMISSION_ADMINS_DIR)) {
    fs.mkdirSync(EMISSION_ADMINS_DIR, { recursive: true });
  }
};

/**
 * Gets the emission admins data for a specific pool.
 * Returns empty object if not found.
 */
export const getEmissionAdminsByPool = (
  network: string | number,
  poolKey: string,
): EmissionAdminsByToken => {
  try {
    const file = fs.readFileSync(`${EMISSION_ADMINS_DIR}/${network}-${poolKey}-emission-admins.json`);
    return JSON.parse(file.toString()) as EmissionAdminsByToken;
  } catch (error) {
    return {};
  }
};

/**
 * Saves the emission admins data for a specific pool.
 */
export const saveEmissionAdminsByPool = (
  network: string | number,
  poolKey: string,
  data: EmissionAdminsByToken,
): void => {
  ensureEmissionAdminsDir();
  const path = `${EMISSION_ADMINS_DIR}/${network}-${poolKey}-emission-admins.json`;
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
};
