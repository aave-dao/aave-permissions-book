import { AddressInfo } from "./types.js";

export const uniqueAddresses = (addressesInfo: AddressInfo[]): AddressInfo[] => {
  const cleanAddresses: AddressInfo[] = [];

  addressesInfo.forEach((addressInfo) => {
    const found = cleanAddresses.find(
      (cleanAddressInfo) => cleanAddressInfo.address === addressInfo.address,
    );
    if (!found) {
      cleanAddresses.push(addressInfo);
    }
  });

  return cleanAddresses;
};