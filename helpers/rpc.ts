import { getClient, getLogsRecursive } from "@bgd-labs/toolbox";
import { env } from "process";
import { Abi, AbiEvent, AbiItem, Client, creagetAbiItem, teClient, http, getAbiItem, getAddress, Log, createClient } from "viem";
import { getLimit } from "./limits.js";
import { aclManagerAbi } from "../abis/aclManager.js";
import { getBlockNumber } from "viem/actions";
import { crossChainControllerAbi } from "../abis/crossChainControllerAbi.js";

const getHttpConfig = () => {
  return {
    timeout: 30_000,
    batch: {
      batchSize: 50,
      wait: 100,
    },
  } as const;
};


export const getRPCClient = (chainId: number): Client => {
  return getClient(chainId, {
    httpConfig: getHttpConfig(),
    clientConfig: {
      batch: {
        multicall: true,
      },
    },
    providerConfig: {
      alchemyKey: env.ALCHEMY_KEY,
      quicknodeEndpointName: env.QUICKNODE_ENDPOINT_NAME,
      quicknodeToken: env.QUICKNODE_TOKEN,
    }
  });
};

export const getRpcClientFromUrl = (url: string): Client => {
  return createClient({
    transport: http(url),
  });
};

const abiByEventType: Record<string, any> = {
  'RoleGranted': aclManagerAbi,
  'RoleRevoked': aclManagerAbi,
  'SenderUpdated': crossChainControllerAbi,
};

const getEventTypeAbi = (event: string): AbiEvent => {
  const abi = abiByEventType[event];
  return getAbiItem({
    abi,
    name: event,
  }) as AbiEvent;
};

export const getEvents = async ({
  client,
  fromBlock,
  contract,
  eventTypes,
  limit,
  maxBlock,
}: {
  client: Client,
  fromBlock: number,
  contract: string,
  eventTypes: string[],
  limit: number,
  maxBlock?: number,
}) => {
  const currentBlock = maxBlock ?? await getBlockNumber(client);


  const eventsAbis = eventTypes.map(getEventTypeAbi);

  const logs: Log[] = [];
  for (let startBlock = fromBlock; startBlock < currentBlock; startBlock += limit) {
    const intervalLogs = await getLogsRecursive({
      client,
      address: getAddress(contract),
      fromBlock: BigInt(startBlock),
      toBlock: BigInt(currentBlock),
      events: eventsAbis
    })
    console.log(`chainId: ${client.chain?.id}, startBlock: ${startBlock}, toBlock: ${currentBlock}, maxBlock: ${maxBlock ?? 'null'}, intervalLogs: ${intervalLogs.length}`);

    logs.push(...intervalLogs);
  }

  return { logs, currentBlock: Number(currentBlock) };
}