import { isAddress } from 'viem';
import { networkConfigs } from './configs.js';
import { ChainId } from '@aave-dao/toolbox';

export const explorerAddressUrlComposer = (
  address: string,
  chainId: string | number,
): string | null => {
  if (isAddress(address)) {
    return `${networkConfigs[Number(chainId)].explorer}/address/${address}`;
  }

  return null;
};

export const explorerTxUrlComposer = (
  transaction: string,
  chainId: string | number,
): string => {
  return `${networkConfigs[Number(chainId)].explorer}/tx/${transaction}`;
};
