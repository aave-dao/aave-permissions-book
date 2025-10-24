import { Pools } from './configs.js';

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
  latestCCCBlockNumber: number;
  contracts: Contracts;
  senders: string[];
  ggRoles?: Roles;
  // bridgeAdapters: string[];
};
export type Ppc = {
  contracts: Contracts;
};

export type Collector = {
  latestBlockNumber: number;
  contracts: Contracts;
  cRoles: Roles;
};
export type ClinicSteward = {
  latestBlockNumber: number;
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
  latestBlockNumber: number;
  role: Record<string, string[]>;
};

export type AgentHubRiskOracleInfo = {
  address: string;
  authorizedSenders: string[];
  latestBlockNumber: number;
};

export type AgentHub = {
  contracts: Contracts;
  agentHubRiskOracleInfo: Record<string, AgentHubRiskOracleInfo>;
};

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
};

export type Pool = Record<string, PoolInfo>;

export type FullPermissions = Record<string, Pool>;

export type PoolConfigs = {
  permissionsJson: string;
  crossChainPermissionsJson?: string;
  addressBook: any;
  aclBlock?: number;
  crossChainControllerBlock?: number;
  granularGuardianBlock?: number;
  governanceAddressBook?: any;

  tenderlyBlock?: number;
  tenderlyRpcUrl?: string;
  tenderlyBasePool?: string;

  ghoBlock?: number;

  addresses?: Record<string, string>;

  gsmBlocks?: Record<string, number>;
  collectorBlock?: number;
  clinicStewardBlock?: number;

  umbrellaBlock?: number;
  umbrellaIncentivesBlock?: number;
  umbrellaAddressBook?: any;

  ppcPermissionsJson?: string;
  ppcAddressBook?: any;

  agentHubAddressBook?: any;
  agentHubBlock?: number;
};
export type Network = {
  name: string;
  rpcUrl: string | undefined;
  explorer: string;
  pools: Record<string, PoolConfigs>;
  addressesNames?: Record<string, string>;
};

export type NetworkConfigs = Record<string, Network>;

export type Function = {
  name: string;
  roles: string[];
};

export type PermissionsJson = {
  contract: string;
  proxyAdmin?: boolean;
  functions: Function[];
}[];
