import { generateRoles } from '../helpers/jsonParsers.js';
import { getProxyAdmin } from '../helpers/proxyAdmin.js';
import { onlyOwnerAbi } from '../abis/onlyOwnerAbi.js';
import { AddressBook, Contracts, PermissionsJson } from '../helpers/types.js';
import { MiscEthereum } from '@aave-dao/aave-address-book';
import { erABI } from '../abis/EcosystemReserve.js';
import { Address, Client, getAddress, getContract } from 'viem';
import { createOwnerResolver } from '../helpers/ownerResolver.js';

export const resolveV2MiscModifiers = async (
  addressBook: AddressBook,
  addresses: Record<string, string>,
  provider: Client,
  permissionsObject: PermissionsJson,
): Promise<Contracts> => {
  const obj: Contracts = {};
  const roles = generateRoles(permissionsObject);

  // Create owner resolver with caching for this network
  const ownerResolver = createOwnerResolver(provider);

  obj['LendToAaveMigrator'] = {
    address: addresses.LEND_TO_AAVE_MIGRATOR,
    modifiers: [],
  };

  const ecosystemReserveContract = getContract({ address: getAddress(MiscEthereum.ECOSYSTEM_RESERVE), abi: erABI, client: provider });
  const erFundsAdmin = await ecosystemReserveContract.read.getFundsAdmin() as Address;
  const erFundsAdminInfo = await ownerResolver.resolve(erFundsAdmin);

  obj['EcosystemReserve'] = {
    address: MiscEthereum.ECOSYSTEM_RESERVE,
    modifiers: [
      {
        modifier: 'onlyFundsAdmin',
        addresses: [
          {
            address: erFundsAdmin,
            owners: erFundsAdminInfo.owners,
            signersThreshold: erFundsAdminInfo.threshold,
          },
        ],
        functions: roles['EcosystemReserve']['onlyFundsAdmin'],
      },
      {
        modifier: 'onlyAdminOrRecipient',
        addresses: [
          {
            address: erFundsAdmin,
            owners: erFundsAdminInfo.owners,
            signersThreshold: erFundsAdminInfo.threshold,
          },
        ],
        functions: roles['EcosystemReserve']['onlyAdminOrRecipient'],
      },
    ],
  };

  const ecosystemReserveControllerContract = getContract({ address: getAddress(MiscEthereum.AAVE_ECOSYSTEM_RESERVE_CONTROLLER), abi: onlyOwnerAbi, client: provider });
  const erControllerOwner = await ecosystemReserveControllerContract.read.owner() as Address;
  const erControllerOwnerInfo = await ownerResolver.resolve(erControllerOwner);

  obj['EcosystemReserveController'] = {
    address: MiscEthereum.AAVE_ECOSYSTEM_RESERVE_CONTROLLER,
    modifiers: [
      {
        modifier: 'onlyOwner',
        addresses: [
          {
            address: erControllerOwner,
            owners: erControllerOwnerInfo.owners,
            signersThreshold: erControllerOwnerInfo.threshold,
          },
        ],
        functions: roles['EcosystemReserveController']['onlyOwner'],
      },
    ],
  };

  // add proxy admins
  const proxyAdminContracts: string[] = permissionsObject
    .filter((contract) => contract.proxyAdmin)
    .map((contract) => contract.contract);
  for (let i = 0; i < proxyAdminContracts.length; i++) {
    obj[proxyAdminContracts[i]]['proxyAdmin'] = await getProxyAdmin(
      obj[proxyAdminContracts[i]].address,
      provider,
    );
  }

  return obj;
};
