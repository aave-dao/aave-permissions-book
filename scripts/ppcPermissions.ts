import {
  AddressBook,
  Contracts,
  PermissionsJson,
} from '../helpers/types.js';
import { ChainId } from '@bgd-labs/toolbox';
import { getProxyAdmin } from '../helpers/proxyAdmin.js';
import { generateRoles } from '../helpers/jsonParsers.js';
import { onlyOwnerAbi } from '../abis/onlyOwnerAbi.js';
import { PERMISSIONED_PAYLOADS_CONTROLLER_ABI } from '../abis/permissionedPayloadsController.js';
import { Address, Client, getAddress, getContract, zeroAddress } from 'viem';
import { createOwnerResolver } from '../helpers/ownerResolver.js';

export const resolvePpcModifiers = async (
  addressBook: AddressBook,
  provider: Client,
  permissionsObject: PermissionsJson,
  chainId: typeof ChainId | number,
) => {
  const obj: Contracts = {};
  const roles = generateRoles(permissionsObject);

  // Create owner resolver with caching for this network
  const ownerResolver = createOwnerResolver(provider);

  if (
    addressBook.PERMISSIONED_PAYLOADS_CONTROLLER &&
    addressBook.PERMISSIONED_PAYLOADS_CONTROLLER !== zeroAddress
  ) {
    const ppcProxyAdmin = await getProxyAdmin(
      addressBook.PERMISSIONED_PAYLOADS_CONTROLLER,
      provider,
    );
    const proxyAdminContract = getContract({ address: getAddress(ppcProxyAdmin), abi: onlyOwnerAbi, client: provider });

    if (ppcProxyAdmin !== zeroAddress) {
      const proxyAdminOwner = await proxyAdminContract.read.owner() as Address;
      const proxyAdminOwnerInfo = await ownerResolver.resolve(proxyAdminOwner);

      obj['PermissionedPayloadsControllerProxyAdmin'] = {
        address: ppcProxyAdmin,
        modifiers: [
          {
            modifier: 'onlyOwner',
            addresses: [
              {
                address: proxyAdminOwner,
                owners: proxyAdminOwnerInfo.owners,
                signersThreshold: proxyAdminOwnerInfo.threshold,
              },
            ],
            functions: roles['ProxyAdmin']['onlyOwner'],
          },
        ],
      };
    }

    const ppcContract = getContract({
      address: getAddress(addressBook.PERMISSIONED_PAYLOADS_CONTROLLER),
      abi: PERMISSIONED_PAYLOADS_CONTROLLER_ABI,
      client: provider
    });
    const pcGuardian = await ppcContract.read.guardian() as Address;
    const pcOwner = await ppcContract.read.owner() as Address;
    const rescuer = await ppcContract.read.whoCanRescue() as Address;
    const payloadsManager = await ppcContract.read.payloadsManager() as Address;

    // Resolve all addresses using cache
    const guardianInfo = await ownerResolver.resolve(pcGuardian);
    const pcOwnerInfo = await ownerResolver.resolve(pcOwner);
    const rescuerInfo = await ownerResolver.resolve(rescuer);
    const payloadsManagerInfo = await ownerResolver.resolve(payloadsManager);

    obj['PermissionedPayloadsController'] = {
      address: addressBook.PERMISSIONED_PAYLOADS_CONTROLLER,
      proxyAdmin: ppcProxyAdmin,
      modifiers: [
        {
          modifier: 'onlyOwnerOrGuardian',
          addresses: [
            {
              address: pcGuardian,
              owners: guardianInfo.owners,
              signersThreshold: guardianInfo.threshold,
            },
            {
              address: pcOwner,
              owners: pcOwnerInfo.owners,
              signersThreshold: pcOwnerInfo.threshold,
            },
          ],
          functions: roles['PermissionedPayloadsController']['onlyOwnerOrGuardian'],
        },
        {
          modifier: 'onlyRescueGuardian',
          addresses: [
            {
              address: rescuer,
              owners: rescuerInfo.owners,
              signersThreshold: rescuerInfo.threshold,
            },
          ],
          functions: roles['PermissionedPayloadsController']['onlyRescueGuardian'],
        },
        {
          modifier: 'onlyPayloadsManagerOrGuardian',
          addresses: [
            {
              address: pcGuardian,
              owners: guardianInfo.owners,
              signersThreshold: guardianInfo.threshold,
            },
            {
              address: payloadsManager,
              owners: payloadsManagerInfo.owners,
              signersThreshold: payloadsManagerInfo.threshold,
            },
          ],
          functions: roles['PermissionedPayloadsController']['onlyPayloadsManagerOrGuardian'],
        },
        {
          modifier: 'onlyPayloadsManager',
          addresses: [
            {
              address: payloadsManager,
              owners: payloadsManagerInfo.owners,
              signersThreshold: payloadsManagerInfo.threshold,
            },
          ],
          functions: roles['PermissionedPayloadsController']['onlyPayloadsManager'],
        },
      ],
    };

    if (chainId === ChainId.mainnet) {
      obj['PermissionedPayloadsController'].modifiers.push(
        {
          modifier: 'onlyGuardian',
          addresses: [
            {
              address: pcGuardian,
              owners: guardianInfo.owners,
              signersThreshold: guardianInfo.threshold,
            },
          ],
          functions: roles['PermissionedPayloadsController']['onlyGuardian'],
        },
      );
    }
  }

  if (
    addressBook.PERMISSIONED_PAYLOADS_CONTROLLER_EXECUTOR &&
    addressBook.PERMISSIONED_PAYLOADS_CONTROLLER_EXECUTOR !== zeroAddress
  ) {
    const executorContract = getContract({ address: getAddress(addressBook.PERMISSIONED_PAYLOADS_CONTROLLER_EXECUTOR), abi: onlyOwnerAbi, client: provider });
    const owner = await executorContract.read.owner() as Address;
    const ownerInfo = await ownerResolver.resolve(owner);

    obj['PermissionedExecutor'] = {
      address: addressBook.PERMISSIONED_PAYLOADS_CONTROLLER_EXECUTOR,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: owner,
              owners: ownerInfo.owners,
              signersThreshold: ownerInfo.threshold,
            },
          ],
          functions: roles['PermissionedExecutor']['onlyOwner'],
        },
      ],
    };
  }

  // add proxy admins
  const proxyAdminContracts: string[] = permissionsObject
    .filter((contract) => contract.proxyAdmin)
    .map((contract) => contract.contract);
  for (let i = 0; i < proxyAdminContracts.length; i++) {
    if (obj[proxyAdminContracts[i]]) {
      obj[proxyAdminContracts[i]]['proxyAdmin'] = await getProxyAdmin(
        obj[proxyAdminContracts[i]].address,
        provider,
      );
    }
  }

  return obj;
};
