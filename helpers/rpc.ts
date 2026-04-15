import { ChainId, getClient, getLogsRecursive, getRPCUrl } from "@bgd-labs/toolbox";
import { env } from "process";
import { Abi, AbiEvent, Client, http, getAbiItem, getAddress, Log, createClient, createPublicClient } from "viem";
import { aclManagerAbi } from "../abis/aclManager.js";
import { accessManagerAbi } from "../abis/accessManagerAbi.js";
import { getBlockNumber } from "viem/actions";
import { crossChainControllerAbi } from "../abis/crossChainControllerAbi.js";
import { EMISSION_MANAGER_ABI } from "../abis/emissionManager.js";

const alchemyKey = env.ALCHEMY_KEY ?? env.ALCHEMY_API_KEY;

const getHttpConfig = () => {
  return {
    timeout: 30_000,
  } as const;
};

/**
 * Creates a raw viem Client for a custom RPC URL (used for Anvil forks).
 */
export const getRpcClientFromUrl = (url: string): Client => {
  return createClient({
    transport: http(url),
  });
};

/**
 * Resolves the RPC URL string for a given chain, using the same provider
 * resolution logic as getRPCClient. Used by fork mode to get the URL for Anvil.
 */
export const getForkRpcUrl = (chainId: number): string | undefined => {
  if (chainId === ChainId.avalanche) {
    if (env.QUICKNODE_ENDPOINT_NAME && env.QUICKNODE_TOKEN) {
      return `https://${env.QUICKNODE_ENDPOINT_NAME}.avalanche-mainnet.quiknode.pro/${env.QUICKNODE_TOKEN}/ext/bc/C/rpc`;
    }
  } else if (chainId === ChainId.megaeth) {
    if (env.RPC_MEGAETH) {
      return env.RPC_MEGAETH;
    }
  }

  return getRPCUrl(chainId as any, {
    alchemyKey: alchemyKey,
    quicknodeEndpointName: env.QUICKNODE_ENDPOINT_NAME,
    quicknodeToken: env.QUICKNODE_TOKEN,
  });
};

/**
 * Creates the default RPC client for a given chain.
 * Uses @bgd-labs/toolbox's getClient which resolves the RPC URL from env vars
 * (ALCHEMY_KEY, QUICKNODE_ENDPOINT_NAME, QUICKNODE_TOKEN).
 *
 * Avalanche uses a direct QuickNode URL because the toolbox's default
 * Avalanche RPC configuration requires the C-Chain specific path.
 */
export const getRPCClient = (chainId: number): Client => {
  if (chainId === ChainId.avalanche) {
    if (env.QUICKNODE_ENDPOINT_NAME && env.QUICKNODE_TOKEN) {
      return getRpcClientFromUrl(`https://${env.QUICKNODE_ENDPOINT_NAME}.avalanche-mainnet.quiknode.pro/${env.QUICKNODE_TOKEN}/ext/bc/C/rpc`);
    }
  } else if (chainId === ChainId.megaeth) {
    if (env.RPC_MEGAETH) {
      return getRpcClientFromUrl(env.RPC_MEGAETH);
    }
  }


  return getClient(chainId, {
    httpConfig: getHttpConfig(),
    clientConfig: {
      batch: {
        multicall: true,
      },
    },
    providerConfig: {
      alchemyKey: alchemyKey,
      quicknodeEndpointName: env.QUICKNODE_ENDPOINT_NAME,
      quicknodeToken: env.QUICKNODE_TOKEN,
    }
  });
};

/**
 * Maps event type keys to the ABI that defines them.
 * Keys suffixed with 'AM' (e.g. 'RoleGrantedAM') reference the OZ AccessManager ABI
 * while keeping distinct keys to avoid collision with V3's RoleGranted(bytes32,...).
 */
const abiByEventType: Record<string, any> = {
  'RoleGranted': aclManagerAbi,
  'RoleRevoked': aclManagerAbi,
  'SenderUpdated': crossChainControllerAbi,
  'RoleGrantedAM': accessManagerAbi,
  'RoleRevokedAM': accessManagerAbi,
  'TargetFunctionRoleUpdated': accessManagerAbi,
  'EmissionAdminUpdated': EMISSION_MANAGER_ABI,
};

/**
 * Maps event type keys to their actual ABI event name.
 * Needed because AM-suffixed keys (e.g. 'RoleGrantedAM') map to 'RoleGranted' in the ABI.
 */
const eventKeyToAbiName: Record<string, string> = {
  'RoleGrantedAM': 'RoleGranted',
  'RoleRevokedAM': 'RoleRevoked',
};

/**
 * Extracts the ABI event definition for a given event key.
 */
const getEventTypeAbi = (event: string): AbiEvent => {
  const abi = abiByEventType[event];
  const abiName = eventKeyToAbiName[event] || event;
  return getAbiItem({
    abi,
    name: abiName,
  }) as AbiEvent;
};


/**
 * Fetches events from multiple contracts in a single pass.
 * Groups logs by contract address for easy distribution to processors.
 *
 * @param contracts - Array of contract addresses to fetch events from
 * @param eventTypes - Event types to fetch (e.g., ['RoleGranted', 'RoleRevoked'])
 * @returns Map of contract address (lowercase) to its logs, plus the current block number
 */
export const getEventsMultiContract = async ({
  client,
  fromBlock,
  contracts,
  eventTypes,
  limit,
  maxBlock,
}: {
  client: Client,
  fromBlock: number,
  contracts: string[],
  eventTypes: string[],
  limit: number,
  maxBlock?: number,
}): Promise<{ logsByContract: Map<string, Log[]>, currentBlock: number }> => {
  const currentBlock = maxBlock ?? Number(await getBlockNumber(client));
  const eventsAbis = eventTypes.map(getEventTypeAbi);

  // Initialize map with empty arrays for each contract
  const logsByContract = new Map<string, Log[]>();
  for (const contract of contracts) {
    logsByContract.set(contract.toLowerCase(), []);
  }

  // Fetch logs for all contracts
  const contractAddresses = contracts.map(c => getAddress(c));

  for (let startBlock = fromBlock; startBlock < currentBlock; startBlock += limit) {
    const intervalLogs = await getLogsRecursive({
      client,
      address: contractAddresses,
      fromBlock: BigInt(startBlock),
      toBlock: BigInt(Math.min(startBlock + limit, currentBlock)),
      events: eventsAbis
    });

    console.log(`chainId: ${client.chain?.id}, startBlock: ${startBlock}, toBlock: ${currentBlock}, maxBlock: ${maxBlock ?? 'null'}, limit: ${limit}, | events: ${eventTypes.join(', ')}, contracts: ${contracts.length}, intervalLogs: ${intervalLogs.length}`);

    // Distribute logs to their respective contracts
    for (const log of intervalLogs) {
      const contractAddr = log.address.toLowerCase();
      const contractLogs = logsByContract.get(contractAddr);
      if (contractLogs) {
        contractLogs.push(log);
      }
    }
  }

  return { logsByContract, currentBlock };
}