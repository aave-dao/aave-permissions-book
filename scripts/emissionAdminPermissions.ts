import { Address, Client, getAddress, getContract, Log, decodeEventLog } from "viem";
import { EMISSION_MANAGER_ABI } from "../abis/emissionManager.js";
import { UI_POOL_DATA_PROVIDER_ABI } from "../abis/uiPoolDataProvider.js";
import { AggregatedReserveData, EmissionAdminsByToken } from "../helpers/types.js";
import { ghoABI } from "../abis/ghoABI.js";

// MKR returns bytes32 instead of string for symbol(), which breaks viem decoding
const NON_STANDARD_SYMBOLS: Record<string, string> = {
  '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2': 'MKR',
};

/**
 * Safely reads a token's symbol, with a hardcoded fallback for non-standard tokens.
 */
const getTokenSymbol = async (token: Address, provider: Client): Promise<string> => {
  const hardcoded = NON_STANDARD_SYMBOLS[getAddress(token)] ?? NON_STANDARD_SYMBOLS[token];
  if (hardcoded) return hardcoded;

  try {
    const tokenContract = getContract({ address: token, abi: ghoABI, client: provider });
    return await tokenContract.read.symbol() as string;
  } catch {
    return token; // Last resort: use address as symbol
  }
};

/**
 * Fetches all emission admins from scratch by querying the EmissionManager
 * for every pool token (aToken, variableDebtToken, underlying).
 * Used on first run when no existing emission admin data exists.
 */
export const getEmissionAdminsFromScratch = async (addressBook: any, provider: Client): Promise<EmissionAdminsByToken> => {
  const emissionAdminsByToken: EmissionAdminsByToken = {};
  if (addressBook.UI_POOL_DATA_PROVIDER && addressBook.POOL_ADDRESSES_PROVIDER && addressBook.EMISSION_MANAGER) {
    const uiPoolDataProvider = getContract({ address: getAddress(addressBook.UI_POOL_DATA_PROVIDER), abi: UI_POOL_DATA_PROVIDER_ABI, client: provider });
    const [reservesData] = await uiPoolDataProvider.read.getReservesData([addressBook.POOL_ADDRESSES_PROVIDER]) as [AggregatedReserveData[], unknown];

    const poolTokens = new Set<Address>();
    reservesData.forEach((reserve: AggregatedReserveData) => {
      poolTokens.add(reserve.aTokenAddress);
      poolTokens.add(reserve.variableDebtTokenAddress);
      poolTokens.add(reserve.underlyingAsset);
    });

    const emissionManager = getContract({ address: getAddress(addressBook.EMISSION_MANAGER), abi: EMISSION_MANAGER_ABI, client: provider });

    for (const token of Array.from(poolTokens)) {
      const symbol = await getTokenSymbol(token, provider);
      const emissionAdmin = await emissionManager.read.getEmissionAdmin([token]) as Address;
      emissionAdminsByToken[token] = { symbol, emissionAdmin };
    }
  }
  return emissionAdminsByToken;
};

/**
 * Updates emission admins incrementally from EmissionAdminUpdated events.
 * For tokens we haven't seen before (new token added to pool), we fetch
 * the symbol on-chain. For known tokens, we just update the admin.
 */
export const updateEmissionAdmins = async (
  existing: EmissionAdminsByToken,
  events: Log[],
  provider: Client,
): Promise<EmissionAdminsByToken> => {
  const updated = { ...existing };

  for (const event of events) {
    try {
      const decoded = decodeEventLog({
        abi: EMISSION_MANAGER_ABI,
        data: event.data,
        topics: event.topics,
      });

      if (decoded.eventName === 'EmissionAdminUpdated') {
        const { reward, newAdmin } = decoded.args as unknown as { reward: Address; oldAdmin: Address; newAdmin: Address };
        const tokenAddress = getAddress(reward);
        const adminAddress = getAddress(newAdmin);

        if (updated[tokenAddress]) {
          // Known token — just update the admin
          updated[tokenAddress] = { ...updated[tokenAddress], emissionAdmin: adminAddress };
        } else {
          // New token — fetch symbol on-chain (handles bytes32 tokens like MKR)
          const symbol = await getTokenSymbol(tokenAddress, provider);
          updated[tokenAddress] = { symbol, emissionAdmin: adminAddress };
        }
      }
    } catch {
      // Skip events that can't be decoded
    }
  }

  return updated;
};

/**
 * Extracts unique emission admin addresses from the emission admins map.
 * Filters out zero address (no admin set).
 */
export const getUniqueEmissionAdmins = (emissionAdmins: EmissionAdminsByToken): Address[] => {
  const admins = new Set<Address>();
  for (const entry of Object.values(emissionAdmins)) {
    if (entry.emissionAdmin && entry.emissionAdmin !== '0x0000000000000000000000000000000000000000') {
      admins.add(getAddress(entry.emissionAdmin));
    }
  }
  return Array.from(admins);
};
