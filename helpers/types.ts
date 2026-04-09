import { Address } from 'viem';
import { Pools } from './configs.js';

/**
 * Generic AddressBook type for pool/governance address books.
 * Properties can be:
 * - string: address values like POOL, ACL_MANAGER, etc.
 * - number: like CHAIN_ID
 * - nested objects: like ASSETS containing asset metadata
 * - undefined: for optional addresses
 * The code already checks for undefined before using properties.
 */
export type AddressBook = Record<string, string | number | Record<string, unknown> | undefined>;

export type ContractsByAddress = Record<string, string>;
export type Guardian = { owners: string[]; threshold: number | undefined };
export type PoolGuardians = Record<string, Guardian>;

export type Modifier = {
  modifier: string;
  addresses: AddressInfo[];
  functions: string[];
};

export type ContractInfo = {
  address: string;
  modifiers: Modifier[];
  proxyAdmin?: string;
};

export type Contracts = Record<string, ContractInfo>;
export type GovV3 = {
  contracts: Contracts;
  senders: string[];
  ggRoles?: Roles;
  // bridgeAdapters: string[];
};
export type Ppc = {
  contracts: Contracts;
};

export type Collector = {
  contracts: Contracts;
  cRoles: Roles;
};
export type ClinicSteward = {
  contracts: Contracts;
  clinicStewardRoles: Roles;
};
export type Umbrella = {
  contracts: Contracts;
  umbrellaRoles: Roles;
  umbrellaIncentivesRoles: Roles;
};
export type AddressInfo = {
  address: string;
  owners: string[];
  signersThreshold?: number;
  chain?: string;
};
export type Roles = {
  role: Record<string, string[]>;
};

export type AgentHub = {
  contracts: Contracts;
};

export type V4AccessManager = {
  roles: Record<string, string[]>;
  functionRoles: Record<string, Record<string, string>>;
  roleLabels: Record<string, string>;
};

export type EmissionAdminsByToken = Record<string, { symbol: string; emissionAdmin: string }>;

export type PoolInfo = {
  roles?: Roles;
  gsmRoles?: Record<string, Roles>;
  contracts: Contracts;
  govV3?: GovV3;
  collector?: Collector;
  clinicSteward?: ClinicSteward;
  umbrella?: Umbrella;
  ppc?: Ppc;
  agentHub?: AgentHub;
  v4AccessManager?: V4AccessManager;
};

export type Pool = Record<string, PoolInfo>;

export type FullPermissions = Record<string, Pool>;

export type PoolConfigs = {
  permissionsJson: string;
  crossChainPermissionsJson?: string;
  addressBook: AddressBook;
  aclBlock?: number;
  crossChainControllerBlock?: number;
  granularGuardianBlock?: number;
  governanceAddressBook?: AddressBook;

  ghoBlock?: number;

  addresses?: Record<string, string>;

  gsmBlocks?: Record<string, number>;
  collectorBlock?: number;
  clinicStewardBlock?: number;

  umbrellaBlock?: number;
  umbrellaIncentivesBlock?: number;
  umbrellaAddressBook?: AddressBook;

  ppcPermissionsJson?: string;
  ppcAddressBook?: AddressBook;

  functionsPermissionsAgentHubJson?: string;

  accessManagerBlock?: number;
  roleLabels?: Record<string, string>;

  emissionManagerBlock?: number;
};
export type Network = {
  name: string;
  rpcUrl: string | undefined;
  explorer: string;
  pools: Record<string, PoolConfigs>;
  addressesNames?: Record<string, string>;
};

export type NetworkConfig = Network;
export type NetworkConfigs = Record<string, Network>;

export type Function = {
  name: string;
  roles: string[];
  selector?: string;
};

export type PermissionsJson = {
  contract: string;
  proxyAdmin?: boolean;
  functions: Function[];
}[];

export type AggregatedReserveData = {
  aTokenAddress: Address;
  variableDebtTokenAddress: Address;
  underlyingAsset: Address;
};