import { Client, getAddress, Log } from "viem";
import { AgentHubRiskOracleInfo } from "./types.js";
import { getLimit } from "./limits.js";
import { getEvents, getRpcClientFromUrl } from "./rpc.js";
import { networkConfigs, Pools } from "./configs.js";


type Input = {
  oldAgentHubRiskOracleInfo: AgentHubRiskOracleInfo;
  eventLogs: Log[]; // decoded logs with eventName + args.sender
};

export function getAuthorizedSenderAddresses({
  oldAgentHubRiskOracleInfo,
  eventLogs,
}: Input): string[] {
  // Normalize the starting set (lowercased key for map/set, checksummed value for output)
  const startSet = new Set<string>(
    oldAgentHubRiskOracleInfo.authorizedSenders.map((a: string) => getAddress(a)),
  );
  const startKeySet = new Set<string>([...startSet].map((a) => a.toLowerCase()));

  // Aggregate deltas per address (order-independent)
  const deltas = new Map<string, number>(); // key: lowercased address -> net +/-
  for (const log of eventLogs) {
    // Expect decoded logs: eventName in {'AuthorizedSenderAdded','AuthorizedSenderRemoved'}
    // and args: { sender: string }
    const eventName = (log as any).eventName as string | undefined;
    const senderRaw = (log as any).args?.sender as string | undefined;
    if (!eventName || !senderRaw) continue;

    const key = senderRaw.toLowerCase();
    const prev = deltas.get(key) ?? 0;
    if (eventName === 'AuthorizedSenderAdded') {
      deltas.set(key, prev + 1);
    } else if (eventName === 'AuthorizedSenderRemoved') {
      deltas.set(key, prev - 1);
    }
  }

  // Compute final membership: start(0/1) + netDelta > 0
  const finalSet = new Set<string>();

  // Consider all addresses that appear either in the start list or in deltas
  const allKeys = new Set<string>([...startKeySet, ...deltas.keys()]);
  for (const key of allKeys) {
    const start = startKeySet.has(key) ? 1 : 0;
    const net = deltas.get(key) ?? 0;
    const total = start + net;

    if (total > 0) {
      // Use checksummed form in the output
      finalSet.add(getAddress(key));
    }
  }

  return [...finalSet];
}

export const getAuthorizedSenders = async (client: Client, oldAgentHubRiskOracleInfo: AgentHubRiskOracleInfo, chainId: number, tenderlyBlock?: number) => {
  let fromBlock = oldAgentHubRiskOracleInfo.latestBlockNumber;
  if (tenderlyBlock) {
    fromBlock = tenderlyBlock;
  }
  const contract = oldAgentHubRiskOracleInfo.address;

  let limit = getLimit(chainId.toString()) ?? 0;

  let events: Log[] = [];
  let latestBlockNumber = 0;
  if (
    tenderlyBlock
  ) {
    const { logs: preTenderlyForkEvents, currentBlock: preTenderlyForkCurrentBlock } = await getEvents({
      client,
      fromBlock,
      contract,
      eventTypes: ['AuthorizedSenderAdded', 'AuthorizedSenderRemoved'],
      maxBlock: tenderlyBlock,
      limit
    });

    const tenderlyProvider = getRpcClientFromUrl(
      networkConfigs[Number(chainId)].pools[Pools.TENDERLY].tenderlyRpcUrl!,
    );


    const { logs: tenderlyForkEvents } = await getEvents({
      client: tenderlyProvider,
      fromBlock: tenderlyBlock,
      contract,
      eventTypes: ['AuthorizedSenderAdded', 'AuthorizedSenderRemoved'],
      limit: 999
    });
    events = [...preTenderlyForkEvents, ...tenderlyForkEvents];

    latestBlockNumber = preTenderlyForkCurrentBlock;
  } else {
    const { logs: networkEvents, currentBlock: eventsCurrentBlock } = await getEvents({
      client,
      fromBlock,
      contract,
      eventTypes: ['AuthorizedSenderAdded', 'AuthorizedSenderRemoved'],
      limit
    });

    events = networkEvents;
    latestBlockNumber = eventsCurrentBlock;
  }

  const authorizedSenders = getAuthorizedSenderAddresses({
    oldAgentHubRiskOracleInfo,
    eventLogs: events,
  });

  return { authorizedSenders, latestBlockNumber };
};