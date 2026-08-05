import { networkConfigs } from './configs.js';

export interface CliArgs {
  networks: number[];
  pools: string[];
  fork: boolean;
  payload?: string;
  calldata?: string;
  caller?: string;
  target?: string;
  safeJson?: string;
}

/**
 * Parses CLI arguments for network, pool, and fork filtering.
 *
 * Supports:
 *   --network <chainId>  or  -n <chainId>  (repeatable)
 *   --pool <poolKey>     or  -p <poolKey>  (repeatable)
 *   --fork               or  -f            (flag)
 *   --payload <address>                    (requires --fork)
 *   --calldata <hex>                       (requires --fork, mutually exclusive with --payload)
 *   --caller <address>                     (requires --calldata)
 *   --target <address>                     (requires --calldata)
 *   --safe-json <file>                     (requires --fork, mutually exclusive with --payload/--calldata)
 */
export const parseCliArgs = (): CliArgs => {
  const args = process.argv.slice(2);
  const result: CliArgs = { networks: [], pools: [], fork: false };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const nextArg = args[i + 1];

    if ((arg === '--network' || arg === '-n') && nextArg && !nextArg.startsWith('-')) {
      result.networks.push(Number(nextArg));
      i++;
    } else if ((arg === '--pool' || arg === '-p') && nextArg && !nextArg.startsWith('-')) {
      result.pools.push(nextArg.toUpperCase());
      i++;
    } else if (arg === '--fork' || arg === '-f') {
      result.fork = true;
    } else if (arg === '--payload' && nextArg && !nextArg.startsWith('-')) {
      result.payload = nextArg;
      i++;
    } else if (arg === '--calldata' && nextArg && !nextArg.startsWith('-')) {
      result.calldata = nextArg;
      i++;
    } else if (arg === '--caller' && nextArg && !nextArg.startsWith('-')) {
      result.caller = nextArg;
      i++;
    } else if (arg === '--target' && nextArg && !nextArg.startsWith('-')) {
      result.target = nextArg;
      i++;
    } else if (arg === '--safe-json' && nextArg && !nextArg.startsWith('-')) {
      result.safeJson = nextArg;
      i++;
    }
  }

  // Validate fork mode requires (payload), (calldata+caller+target) or (safe-json), plus network+pool
  if (result.fork) {
    if ([result.payload, result.calldata, result.safeJson].filter(Boolean).length > 1) {
      console.error('--payload, --calldata and --safe-json are mutually exclusive');
      process.exit(1);
    }
    if (!result.payload && !result.calldata && !result.safeJson) {
      console.error('--fork requires either --payload <address>, --calldata <hex> --caller <address> --target <address>, or --safe-json <file>');
      process.exit(1);
    }
    if (result.calldata) {
      if (!result.caller) {
        console.error('--calldata requires --caller <address>');
        process.exit(1);
      }
      if (!result.target) {
        console.error('--calldata requires --target <address>');
        process.exit(1);
      }
    }
    if (result.networks.length === 0) {
      console.error('--fork requires --network to be specified');
      process.exit(1);
    }
    if (result.pools.length === 0) {
      console.error('--fork requires --pool to be specified');
      process.exit(1);
    }
  }

  // Validate networks
  for (const network of result.networks) {
    if (!networkConfigs[network]) {
      console.error(`Unknown network: ${network}`);
      console.error(`Available networks: ${Object.keys(networkConfigs).join(', ')}`);
      process.exit(1);
    }
  }

  // Validate pools require network
  if (result.pools.length > 0 && result.networks.length === 0) {
    console.error('--pool requires --network to be specified');
    process.exit(1);
  }

  // Validate pools exist in specified networks
  if (result.pools.length > 0) {
    for (const network of result.networks) {
      const networkPools = networkConfigs[network].pools;
      for (const pool of result.pools) {
        if (!networkPools[pool]) {
          console.error(`Unknown pool: ${pool} for network ${network}`);
          console.error(`Available pools: ${Object.keys(networkPools).join(', ')}`);
          process.exit(1);
        }
      }
    }
  }

  return result;
};

/**
 * Gets the list of networks to process based on CLI args.
 */
export const getNetworksToProcess = (args: CliArgs): number[] => {
  if (args.networks.length > 0) {
    return args.networks;
  }
  return Object.keys(networkConfigs).map(Number);
};

/**
 * Gets the list of pools to process for a network based on CLI args.
 */
export const getPoolsToProcess = (network: number, args: CliArgs): string[] => {
  const allPools = Object.keys(networkConfigs[network].pools);

  if (args.pools.length > 0) {
    return allPools.filter(p => args.pools.includes(p));
  }

  return allPools;
};

/**
 * Logs the current execution configuration.
 */
export const logExecutionConfig = (args: CliArgs): void => {
  const mode = args.fork ? 'FORK' : 'REGULAR';
  const networks = args.networks.length > 0
    ? args.networks.join(', ')
    : 'ALL';
  const pools = args.pools.length > 0
    ? args.pools.join(', ')
    : 'ALL';

  const forkDetail = args.payload
    ? `\n  Payload: ${args.payload}`
    : args.calldata
      ? `\n  Calldata: ${args.calldata}\n  Caller: ${args.caller}\n  Target: ${args.target}`
      : args.safeJson
        ? `\n  Safe json: ${args.safeJson}`
        : '';

  console.log(`
========================================
  Mode: ${mode}
  Networks: ${networks}
  Pools: ${pools}${forkDetail}
========================================
`);
};
