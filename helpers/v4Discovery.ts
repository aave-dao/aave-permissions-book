import { Address, Client, getAddress } from 'viem';
import { multicall, readContract } from 'viem/actions';
import { v4HubAbi } from '../abis/v4HubAbi.js';
import { v4SpokeAbi } from '../abis/v4SpokeAbi.js';

const MULTICALL3_ADDRESS = '0xcA11bde05977b3631167028862bE2a173976CA11';

export type V4ContractType =
  | 'Hub'
  | 'Spoke'
  | 'TokenizationSpoke'
  | 'TreasurySpoke'
  | 'PositionManager'
  | 'Unknown';

/** Why an address showed up on-chain while being absent from the rendered contracts. */
export type UntrackedSource =
  | 'hubSpokeList'
  | 'spokeReserve'
  | 'accessManagerTarget'
  | 'spokePositionManager';

export type UntrackedV4Contracts = Record<
  string,
  {
    name: string;
    type: V4ContractType;
    hubs: string[];
    sources: UntrackedSource[];
  }
>;

export interface V4Topology {
  /** hub address -> spoke addresses registered on any of its assets */
  spokesByHub: Record<string, string[]>;
  /** spoke address -> hub addresses it is registered on or holds reserves against */
  hubsBySpoke: Record<string, string[]>;
}

interface BatchCall {
  address: Address;
  abi: readonly unknown[];
  functionName: string;
  args?: unknown[];
}

/**
 * Batches read calls through Multicall3, falling back to individual calls on
 * chains where it is not deployed. Failed calls resolve to null so unknown
 * addresses can be probed without aborting the batch.
 */
const batchRead = async (client: Client, calls: BatchCall[]): Promise<any[]> => {
  if (calls.length === 0) return [];

  try {
    const results = await multicall(client, {
      contracts: calls as any,
      allowFailure: true,
      multicallAddress: MULTICALL3_ADDRESS,
    });
    return results.map((result) => (result.status === 'success' ? result.result : null));
  } catch {
    return Promise.all(
      calls.map((call) => (readContract(client, call as any) as Promise<any>).catch(() => null)),
    );
  }
};

const toKey = (address: string): string => address.toLowerCase();

const addTo = (map: Record<string, string[]>, key: string, value: string) => {
  if (!map[key]) map[key] = [];
  if (!map[key].includes(value)) map[key].push(value);
};

/**
 * Walks the on-chain hub/spoke graph: hubs expose their spokes per asset, and
 * every spoke reserve points back at the hub it draws liquidity from. Both
 * directions are needed since a spoke can be wired to a hub that is not in the
 * address book, and vice versa.
 */
export const discoverV4Topology = async (
  provider: Client,
  knownHubs: string[],
  knownSpokes: string[],
): Promise<V4Topology> => {
  const spokesByHub: Record<string, string[]> = {};
  const hubsBySpoke: Record<string, string[]> = {};

  const hubs = [...new Set(knownHubs.map(toKey))];
  const assetCounts = await batchRead(
    provider,
    hubs.map((hub) => ({ address: getAddress(hub), abi: v4HubAbi, functionName: 'getAssetCount' })),
  );

  const spokeCountCalls: BatchCall[] = [];
  const spokeCountKeys: Array<{ hub: string; assetId: bigint }> = [];
  hubs.forEach((hub, index) => {
    const assetCount = assetCounts[index];
    if (assetCount === null) return;
    for (let assetId = 0n; assetId < BigInt(assetCount); assetId++) {
      spokeCountCalls.push({
        address: getAddress(hub),
        abi: v4HubAbi,
        functionName: 'getSpokeCount',
        args: [assetId],
      });
      spokeCountKeys.push({ hub, assetId });
    }
  });

  const spokeCounts = await batchRead(provider, spokeCountCalls);

  const spokeAddressCalls: BatchCall[] = [];
  const spokeAddressKeys: Array<{ hub: string; assetId: bigint }> = [];
  spokeCountKeys.forEach(({ hub, assetId }, index) => {
    const spokeCount = spokeCounts[index];
    if (spokeCount === null) return;
    for (let i = 0n; i < BigInt(spokeCount); i++) {
      spokeAddressCalls.push({
        address: getAddress(hub),
        abi: v4HubAbi,
        functionName: 'getSpokeAddress',
        args: [assetId, i],
      });
      spokeAddressKeys.push({ hub, assetId });
    }
  });

  const spokeAddresses = await batchRead(provider, spokeAddressCalls);

  // Deactivating a spoke leaves it in the hub's spoke list, so the active flag is
  // what separates a live spoke from a superseded one.
  const spokeConfigCalls: BatchCall[] = [];
  const spokeConfigKeys: Array<{ hub: string; spoke: string }> = [];
  spokeAddresses.forEach((spoke, index) => {
    if (!spoke) return;
    const { hub, assetId } = spokeAddressKeys[index];
    spokeConfigCalls.push({
      address: getAddress(hub),
      abi: v4HubAbi,
      functionName: 'getSpokeConfig',
      args: [assetId, getAddress(spoke)],
    });
    spokeConfigKeys.push({ hub, spoke });
  });

  const spokeConfigs = await batchRead(provider, spokeConfigCalls);
  spokeConfigKeys.forEach(({ hub, spoke }, index) => {
    // Only an explicit false drops the spoke, so a failed read cannot silently
    // remove it from the tables.
    if (spokeConfigs[index]?.active === false) return;
    addTo(spokesByHub, hub, toKey(spoke));
    addTo(hubsBySpoke, toKey(spoke), hub);
  });

  const spokes = [...new Set([...knownSpokes.map(toKey), ...Object.keys(hubsBySpoke)])];
  const reserveCounts = await batchRead(
    provider,
    spokes.map((spoke) => ({
      address: getAddress(spoke),
      abi: v4SpokeAbi,
      functionName: 'getReserveCount',
    })),
  );

  const reserveCalls: BatchCall[] = [];
  const reserveKeys: string[] = [];
  spokes.forEach((spoke, index) => {
    const reserveCount = reserveCounts[index];
    if (reserveCount === null) return;
    for (let reserveId = 0n; reserveId < BigInt(reserveCount); reserveId++) {
      reserveCalls.push({
        address: getAddress(spoke),
        abi: v4SpokeAbi,
        functionName: 'getReserve',
        args: [reserveId],
      });
      reserveKeys.push(spoke);
    }
  });

  const reserves = await batchRead(provider, reserveCalls);
  reserves.forEach((reserve, index) => {
    if (!reserve?.hub) return;
    const spoke = reserveKeys[index];
    addTo(hubsBySpoke, spoke, toKey(reserve.hub));
    addTo(spokesByHub, toKey(reserve.hub), spoke);
  });

  return { spokesByHub, hubsBySpoke };
};

/**
 * Position managers are only observable through `UpdatePositionManager` logs,
 * as spokes expose no enumeration getter. The logs supply candidates and the
 * on-chain flag decides which of them are currently active.
 */
export const resolveActivePositionManagers = async (
  provider: Client,
  spokes: string[],
  candidates: string[],
): Promise<Record<string, string[]>> => {
  const activeBySpoke: Record<string, string[]> = {};
  if (candidates.length === 0) return activeBySpoke;

  const calls: BatchCall[] = [];
  const keys: Array<{ spoke: string; positionManager: string }> = [];
  for (const spoke of spokes) {
    for (const positionManager of candidates) {
      calls.push({
        address: getAddress(spoke),
        abi: v4SpokeAbi,
        functionName: 'isPositionManagerActive',
        args: [getAddress(positionManager)],
      });
      keys.push({ spoke: toKey(spoke), positionManager: toKey(positionManager) });
    }
  }

  const results = await batchRead(provider, calls);
  results.forEach((isActive, index) => {
    if (isActive !== true) return;
    const { spoke, positionManager } = keys[index];
    addTo(activeBySpoke, spoke, positionManager);
  });

  return activeBySpoke;
};

interface ClassifiedContract {
  type: V4ContractType;
  symbol?: string;
}

const PROBES = [
  { abi: v4HubAbi, functionName: 'getAssetCount' },
  { abi: v4SpokeAbi, functionName: 'getReserveCount' },
  { abi: v4SpokeAbi, functionName: 'ORACLE' },
  { abi: v4SpokeAbi, functionName: 'hub' },
  { abi: v4SpokeAbi, functionName: 'assetId' },
  { abi: v4SpokeAbi, functionName: 'symbol' },
  { abi: v4SpokeAbi, functionName: 'authority' },
  { abi: v4SpokeAbi, functionName: 'owner' },
] as const;

/**
 * Identifies unknown addresses from their read surface: Spoke and Hub are
 * AccessManaged and expose reserves resp. assets, TokenizationSpoke is an ERC20
 * bound to a single hub asset, TreasurySpoke is Ownable.
 */
export const classifyV4Contracts = async (
  provider: Client,
  addresses: string[],
): Promise<Record<string, ClassifiedContract>> => {
  const classified: Record<string, ClassifiedContract> = {};
  if (addresses.length === 0) return classified;

  const calls: BatchCall[] = [];
  for (const address of addresses) {
    for (const probe of PROBES) {
      calls.push({ address: getAddress(address), abi: probe.abi, functionName: probe.functionName });
    }
  }

  const results = await batchRead(provider, calls);
  addresses.forEach((address, index) => {
    const [assetCount, reserveCount, oracle, hub, assetId, symbol, authority, owner] = results.slice(
      index * PROBES.length,
      (index + 1) * PROBES.length,
    );

    let type: V4ContractType = 'Unknown';
    if (reserveCount !== null && oracle) {
      type = 'Spoke';
    } else if (hub && assetId !== null && symbol) {
      type = 'TokenizationSpoke';
    } else if (assetCount !== null && authority) {
      type = 'Hub';
    } else if (owner) {
      type = 'TreasurySpoke';
    }

    classified[toKey(address)] = { type, symbol: symbol || undefined };
  });

  return classified;
};

const shortAddress = (address: string): string => `${address.slice(0, 8)}…`;

/**
 * Builds the display name for a contract that has no address book key, using
 * on-chain context (ERC20 symbol, hub membership) with the address as suffix.
 */
export const buildUntrackedName = (
  address: string,
  type: V4ContractType,
  hubNames: string[],
  symbol?: string,
): string => {
  const suffix = `(${shortAddress(address)})`;

  if (type === 'TokenizationSpoke' && symbol) {
    return `${symbol} TokenizationSpoke ${suffix}`;
  }

  if (type === 'Spoke' && hubNames.length > 0) {
    return `Untracked Spoke @ ${hubNames.join(' + ')} ${suffix}`;
  }

  if (type === 'Unknown') {
    return `Untracked AccessManager target ${suffix}`;
  }

  return `Untracked ${type} ${suffix}`;
};
