import { ChainId } from "@bgd-labs/toolbox";


export const getLimit = (chainId: string) => {
  let limit = undefined;

  // if (chainId === ChainId.avalanche) {
  //   limit = 3000;
  // }
  if (Number(chainId) === Number(ChainId.sonic)) {
    limit = 9999;
  } else if (Number(chainId) === Number(ChainId.celo)) {
    limit = 9999;
  } else if (Number(chainId) === Number(ChainId.linea)) {
    limit = 9999;
  } else if (Number(chainId) === Number(ChainId.scroll)) {
    limit = 9999;
  } else if (Number(chainId) === Number(ChainId.gnosis)) {
    limit = 9999;
  } else if (Number(chainId) === Number(ChainId.metis)) {
    limit = 9999;
  } else if (Number(chainId) === Number(ChainId.avalanche)) {
    limit = 9999;
  } else if (Number(chainId) === Number(ChainId.bnb)) {
    limit = 9999;
  } else if (Number(chainId) === Number(ChainId.soneium)) {
    limit = 9999;
  } else if (Number(chainId) === Number(ChainId.megaeth)) {
    limit = 9999;
  }
  else {
    limit = 9999; // @TODO: for now we have this limit for everything
  }


  return limit;
};
