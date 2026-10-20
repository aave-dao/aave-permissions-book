/**
 * @file configs.ts
 * @description Re-exports all configuration from the modular config structure.
 *
 * This file now serves as a backward-compatible entry point that re-exports
 * from the new modular structure under helpers/configs/
 *
 * Structure:
 * - helpers/configs/constants.ts - Pools enum, role names
 * - helpers/configs/addresses/shared.ts - Common addresses across networks
 * - helpers/configs/poolBuilder.ts - Factory functions for creating pool configs
 * - helpers/configs/networks/*.ts - Individual network configurations
 */

export {
  networkConfigs,
  Pools,
  isV4Pool,
  ghoRoleNames,
  collectorRoleNames,
  clinicStewardRoleNames,
  ghoGSMRoleNames,
  protocolRoleNames,
  granularGuardianRoleNames,
  umbrellaRoleNames,
  umbrellaIncentivesRoleNames,
  getNetowkName,
} from './configs/index.js';
