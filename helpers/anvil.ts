import { spawn, execSync, type ChildProcess } from 'child_process';
import { createServer } from 'net';
import {
  createTestClient,
  http,
  publicActions,
  walletActions,
  getContract,
  encodePacked,
  type Address,
} from 'viem';
import { getSolidityStorageSlotUint } from '@bgd-labs/toolbox';
import { PayloadsController_ABI } from '../abis/payloadsController.js';

// ============================================================================
// Types
// ============================================================================

export interface AnvilFork {
  rpcUrl: string;
  forkBlockNumber: number;
  stop: () => Promise<void>;
}

// ============================================================================
// Public API
// ============================================================================

/**
 * Checks that Anvil binary is available.
 * Throws with install instructions if missing.
 */
export async function checkAnvilInstalled(): Promise<void> {
  try {
    execSync('anvil --version', { stdio: 'ignore' });
  } catch {
    throw new Error(
      'Anvil is not installed. Install it with: npm install -D @foundry-rs/anvil\n' +
        'Or install Foundry: curl -L https://foundry.paradigm.xyz | bash && foundryup',
    );
  }
}

/**
 * Starts an Anvil fork at a specific block.
 */
export async function startAnvilFork(
  chainRpcUrl: string,
  forkBlockNumber: number,
): Promise<AnvilFork> {
  const port = await getAvailablePort();

  const child = spawn('anvil', [
    '--fork-url', chainRpcUrl,
    '--fork-block-number', String(forkBlockNumber),
    '--port', String(port),
  ], {
    stdio: 'ignore',
    detached: false,
  });

  // Kill Anvil if the parent process exits unexpectedly
  const exitHandler = () => {
    try { child.kill('SIGTERM'); } catch {}
  };
  process.on('exit', exitHandler);

  const rpcUrl = `http://127.0.0.1:${port}`;

  try {
    await waitForAnvilReady(rpcUrl, 30_000);
  } catch (err) {
    child.kill('SIGTERM');
    process.removeListener('exit', exitHandler);
    throw err;
  }

  const stop = async () => {
    child.kill('SIGTERM');
    process.removeListener('exit', exitHandler);
    // Wait for process to exit
    await new Promise<void>((resolve) => {
      child.on('close', () => resolve());
      // If already dead, resolve immediately
      if (child.killed) resolve();
    });
  };

  return { rpcUrl, forkBlockNumber, stop };
}

// PayloadState enum from the PayloadsController contract
const PayloadState = {
  None: 0,
  Created: 1,
  Queued: 2,
  Executed: 3,
  Cancelled: 4,
  Expired: 5,
} as const;

const PAYLOAD_STATE_NAMES: Record<number, string> = {
  [PayloadState.None]: 'None',
  [PayloadState.Created]: 'Created',
  [PayloadState.Queued]: 'Queued',
  [PayloadState.Executed]: 'Executed',
  [PayloadState.Cancelled]: 'Cancelled',
  [PayloadState.Expired]: 'Expired',
};

/**
 * Executes a payload on a running Anvil fork.
 *
 * Handles all possible payload states:
 * - Not registered: creates, queues, advances time, executes
 * - Created: queues, advances time, executes
 * - Queued: advances time, executes
 * - Executed: throws (fork not needed)
 * - Cancelled/Expired: throws (payload cannot be executed)
 */
export async function executePayloadOnFork(
  anvilRpcUrl: string,
  payloadsControllerAddress: string,
  payloadAddress: string,
  accessLevel: number = 1,
): Promise<void> {
  const client = createTestClient({
    mode: 'anvil',
    transport: http(anvilRpcUrl, { timeout: 120_000 }),
  })
    .extend(publicActions)
    .extend(walletActions);

  const pcAddress = payloadsControllerAddress as Address;
  const defaultAccount = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' as Address; // Anvil default funded account

  const payloadsController = getContract({
    address: pcAddress,
    abi: PayloadsController_ABI,
    client,
  });

  // Find if this payload address is already registered
  const { payloadId, state: currentState } = await findPayload(
    payloadsController,
    payloadAddress,
  );

  let id = payloadId;
  let state = currentState;

  // Handle based on current state
  if (state === PayloadState.Executed) {
    throw new Error(
      `Payload ${payloadAddress} (id: ${id}) is already executed. Fork is not needed.`,
    );
  }

  if (state === PayloadState.Cancelled || state === PayloadState.Expired) {
    throw new Error(
      `Payload ${payloadAddress} (id: ${id}) is ${PAYLOAD_STATE_NAMES[state]}. Cannot execute.`,
    );
  }

  // Helper to send a tx and verify it succeeded
  const sendTx = async (txHash: `0x${string}`, label: string) => {
    const receipt = await client.waitForTransactionReceipt({ hash: txHash });
    if (receipt.status === 'reverted') {
      throw new Error(`${label} transaction reverted (tx: ${txHash})`);
    }
  };

  // Step 1: Create payload if not registered
  if (state === PayloadState.None) {
    console.log(`Payload not registered, creating...`);
    const hash = await client.writeContract({
      chain: null,
      account: defaultAccount,
      address: pcAddress,
      abi: PayloadsController_ABI,
      functionName: 'createPayload',
      args: [
        [{
          target: payloadAddress as Address,
          withDelegateCall: true,
          accessLevel,
          value: 0n,
          signature: 'execute()',
          callData: '0x' as `0x${string}`,
        }],
      ],
    });
    await sendTx(hash, 'createPayload');

    const payloadsCount = await payloadsController.read.getPayloadsCount() as number;
    id = payloadsCount - 1;
    state = PayloadState.Created;
    console.log(`Payload created with id: ${id}`);
  }

  // Step 2: Queue via storage override if Created
  // The PayloadsController's receiveCrossChainMessage has auth checks that are
  // difficult to satisfy on a fork. Instead, directly set the payload's storage
  // slot to Queued state with timestamps that make it immediately executable.
  // This mirrors @bgd-labs/toolbox's makePayloadExecutableOnTestClient approach.
  if (state === PayloadState.Created) {
    console.log(`Payload ${id} is Created, setting to Queued via storage override...`);

    const payload = await payloadsController.read.getPayloadById([id]) as {
      creator: Address;
      maximumAccessLevelRequired: number;
      createdAt: number;
      delay: number;
    };

    const currentBlock = await client.getBlock();
    const queuedAt = Number(currentBlock.timestamp) - Number(payload.delay) - 1 - 240;

    // Payload storage layout (slot 3 + payloadId): packed as
    // [queuedAt:uint40][createdAt:uint40][state:uint8][maxAccessLevel:uint8][creator:address]
    const slot = getSolidityStorageSlotUint(3n, BigInt(id));
    const value = encodePacked(
      ['uint40', 'uint40', 'uint8', 'uint8', 'address'],
      [queuedAt, payload.createdAt, PayloadState.Queued, payload.maximumAccessLevelRequired, payload.creator],
    );

    await client.setStorageAt({
      address: pcAddress,
      index: slot,
      value,
    });

    state = PayloadState.Queued;
    console.log(`Payload ${id} queued (storage override)`);
  }

  // Step 3: Execute if Queued
  if (state === PayloadState.Queued) {
    console.log(`Payload ${id} is Queued, executing...`);

    // Read payload to determine delay, then warp time past it
    const queuedPayload = await payloadsController.read.getPayloadById([id]) as {
      creator: Address;
      maximumAccessLevelRequired: number;
      createdAt: number;
      queuedAt: number;
      delay: number;
    };

    const currentBlock = await client.getBlock();
    const executeableAt = Number(queuedPayload.queuedAt) + Number(queuedPayload.delay);
    const timeToWarp = executeableAt - Number(currentBlock.timestamp) + 1;

    if (timeToWarp > 0) {
      console.log(`Warping time forward by ${timeToWarp}s to pass execution delay...`);
      await client.increaseTime({ seconds: timeToWarp });
    }

    // Mine a block to ensure timestamp is past the delay
    await client.mine({ blocks: 1 });

    const execHash = await client.writeContract({
      chain: null,
      account: defaultAccount,
      address: pcAddress,
      abi: PayloadsController_ABI,
      functionName: 'executePayload',
      args: [id],
    });
    await sendTx(execHash, 'executePayload');
  }

  // Step 5: Validate execution succeeded
  const finalState = await payloadsController.read.getPayloadState([id]) as number;
  if (Number(finalState) !== PayloadState.Executed) {
    throw new Error(
      `Payload execution failed: expected state Executed (3), got ${finalState} (${PAYLOAD_STATE_NAMES[finalState] ?? 'Unknown'})`,
    );
  }

  console.log(`Payload ${payloadAddress} executed successfully (id: ${id})`);
}

/**
 * Executes raw calldata on a running Anvil fork by impersonating the caller.
 *
 * This is an alternative to executePayloadOnFork for cases where we have
 * calldata to execute directly (e.g., a multisig transaction) rather than
 * an Aave payload to go through PayloadsController.
 */
export async function executeCalldataOnFork(
  anvilRpcUrl: string,
  caller: string,
  target: string,
  calldata: string,
): Promise<void> {
  const client = createTestClient({
    mode: 'anvil',
    transport: http(anvilRpcUrl, { timeout: 120_000 }),
  })
    .extend(publicActions)
    .extend(walletActions);

  const callerAddress = caller as Address;
  const targetAddress = target as Address;

  // Impersonate the caller (works for EOAs and contracts like multisigs)
  await client.impersonateAccount({ address: callerAddress });

  // Set native token balance on the caller so it can pay for gas
  await client.setBalance({
    address: callerAddress,
    value: 1000000000000000000n, // 1 native token
  });

  console.log(`Executing calldata on fork: caller=${caller}, target=${target}`);

  try {
    const hash = await client.sendTransaction({
      chain: null,
      account: callerAddress,
      to: targetAddress,
      data: calldata as `0x${string}`,
    });

    const receipt = await client.waitForTransactionReceipt({ hash });
    if (receipt.status === 'reverted') {
      throw new Error(`Calldata execution reverted (tx: ${hash})`);
    }

    console.log(`Calldata executed successfully (tx: ${hash})`);
  } finally {
    await client.stopImpersonatingAccount({ address: callerAddress });
  }
}

/**
 * Searches existing payloads in the PayloadsController for one that contains
 * the given payload address as a target action.
 *
 * Returns the payloadId and state if found, or { payloadId: -1, state: None } if not.
 */
async function findPayload(
  payloadsController: ReturnType<typeof getContract>,
  payloadAddress: string,
): Promise<{ payloadId: number; state: number }> {
  const count = await payloadsController.read.getPayloadsCount() as number;
  const normalizedTarget = payloadAddress.toLowerCase();

  // Search backwards (most recent first) for efficiency
  for (let i = count - 1; i >= 0; i--) {
    const payload = await payloadsController.read.getPayloadById([i]) as {
      state: number;
      actions: Array<{ target: string }>;
    };

    const hasTarget = payload.actions.some(
      (action) => action.target.toLowerCase() === normalizedTarget,
    );

    if (hasTarget) {
      return { payloadId: i, state: Number(payload.state) };
    }
  }

  return { payloadId: -1, state: PayloadState.None };
}

// ============================================================================
// Internal helpers
// ============================================================================

function getAvailablePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.listen(0, () => {
      const address = server.address();
      if (address && typeof address === 'object') {
        const port = address.port;
        server.close(() => resolve(port));
      } else {
        server.close(() => reject(new Error('Could not get available port')));
      }
    });
    server.on('error', reject);
  });
}

async function waitForAnvilReady(url: string, timeoutMs: number): Promise<void> {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_chainId',
          params: [],
          id: 1,
        }),
      });

      if (response.ok) {
        return;
      }
    } catch {
      // Not ready yet
    }

    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  throw new Error(`Anvil did not start within ${timeoutMs}ms`);
}
