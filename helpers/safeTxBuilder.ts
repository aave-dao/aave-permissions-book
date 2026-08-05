import { readFileSync } from 'fs';
import {
  encodeFunctionData,
  getAddress,
  type AbiFunction,
  type AbiParameter,
  type Address,
  type Hex,
} from 'viem';

/**
 * A single transaction as exported by the Safe transaction builder app.
 * Either `data` is set (raw calldata) or `contractMethod` + `contractInputsValues`
 * describe the call to be encoded.
 */
export interface SafeTxBuilderTransaction {
  to: Address;
  value: string;
  data: Hex | null;
  contractMethod: {
    inputs: AbiParameter[];
    name: string;
    payable: boolean;
  } | null;
  contractInputsValues: Record<string, string> | null;
}

/**
 * The json format exported by the Safe transaction builder app.
 */
export interface SafeTxBuilderBatch {
  version: string;
  chainId: string;
  createdAt: number;
  meta: {
    name: string;
    description: string;
    txBuilderVersion?: string;
    createdFromSafeAddress: string;
    createdFromOwnerAddress?: string;
    checksum?: string;
  };
  transactions: SafeTxBuilderTransaction[];
}

/**
 * Reads and validates a Safe transaction builder json file.
 */
export function parseSafeTxBuilderFile(filePath: string): SafeTxBuilderBatch {
  const batch = JSON.parse(
    readFileSync(filePath, 'utf8'),
  ) as SafeTxBuilderBatch;
  if (!batch.chainId) {
    throw new Error(`${filePath} is missing chainId`);
  }
  if (!batch.transactions || batch.transactions.length === 0) {
    throw new Error(`${filePath} contains no transactions`);
  }
  if (!batch.meta?.createdFromSafeAddress) {
    throw new Error(`${filePath} is missing meta.createdFromSafeAddress`);
  }
  // Normalize / checksum-validate addresses
  batch.meta.createdFromSafeAddress = getAddress(
    batch.meta.createdFromSafeAddress,
  );
  batch.transactions = batch.transactions.map((tx) => ({
    ...tx,
    to: getAddress(tx.to),
  }));
  return batch;
}

/**
 * Parses a stringified tx-builder value into json, quoting bare integer
 * literals first so values above Number.MAX_SAFE_INTEGER keep full precision.
 */
function parseJsonValue(value: string): unknown {
  const quoted = value.replace(
    /-?\d+(?=(?:[^"]*"[^"]*")*[^"]*$)/g,
    (match) => `"${match}"`,
  );
  return JSON.parse(quoted);
}

/**
 * Converts a tx-builder input value (string encoded) into the shape viem
 * expects for the given abi parameter.
 */
function parseInputValue(param: AbiParameter, value: unknown): unknown {
  if (value === undefined || value === null) {
    throw new Error(
      `missing value for parameter ${param.name} (${param.type})`,
    );
  }
  if (param.type.endsWith(']')) {
    const elementType = param.type.slice(0, param.type.lastIndexOf('['));
    const values = typeof value === 'string' ? parseJsonValue(value) : value;
    if (!Array.isArray(values)) {
      throw new Error(
        `expected array for parameter ${param.name} (${param.type})`,
      );
    }
    return values.map((v) =>
      parseInputValue({ ...param, type: elementType }, v),
    );
  }
  if (param.type === 'tuple') {
    const components = (param as { components?: AbiParameter[] }).components;
    if (!components) {
      throw new Error(`missing components for tuple parameter ${param.name}`);
    }
    const values = typeof value === 'string' ? parseJsonValue(value) : value;
    if (!Array.isArray(values) || values.length !== components.length) {
      throw new Error(
        `expected ${components.length} values for tuple parameter ${param.name}`,
      );
    }
    return components.map((component, i) =>
      parseInputValue(component, values[i]),
    );
  }
  if (param.type.startsWith('uint') || param.type.startsWith('int')) {
    return BigInt(value as string | number);
  }
  if (param.type === 'bool') {
    return typeof value === 'boolean' ? value : value === 'true';
  }
  return value;
}

/**
 * Returns the calldata of a single tx-builder transaction.
 */
export function encodeSafeTxBuilderTransaction(
  tx: SafeTxBuilderTransaction,
): Hex {
  if (tx.data) return tx.data;
  if (!tx.contractMethod) {
    throw new Error(
      `transaction to ${tx.to} has neither data nor contractMethod`,
    );
  }
  const abiFunction: AbiFunction = {
    type: 'function',
    name: tx.contractMethod.name,
    inputs: tx.contractMethod.inputs,
    outputs: [],
    stateMutability: tx.contractMethod.payable ? 'payable' : 'nonpayable',
  };
  const args = tx.contractMethod.inputs.map((input) =>
    parseInputValue(input, tx.contractInputsValues?.[input.name!]),
  );
  return encodeFunctionData({ abi: [abiFunction], args });
}
