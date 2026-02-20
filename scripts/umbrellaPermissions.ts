import { generateRoles } from '../helpers/jsonParsers.js';
import { AddressBook, Contracts, PermissionsJson } from '../helpers/types.js';
import { getProxyAdmin } from '../helpers/proxyAdmin.js';
import { onlyOwnerAbi } from '../abis/onlyOwnerAbi.js';
import { PERMISSIONED_PAYLOADS_CONTROLLER_ABI } from '../abis/permissionedPayloadsController.js';
import { Address, Client, getAddress, getContract, zeroAddress } from 'viem';
import { uniqueAddresses } from '../helpers/addressUtils.js';
import { createOwnerResolver } from '../helpers/ownerResolver.js';
import { resolveAllRoleOwners, mapRoleAddresses } from '../helpers/contractResolvers.js';

export const resolveUmbrellaModifiers = async (
  addressBook: AddressBook,
  provider: Client,
  permissionsObject: PermissionsJson,
  umbrellaRoles: Record<string, string[]>,
  umbrellaIncentivesRoles: Record<string, string[]>,
): Promise<Contracts> => {
  const obj: Contracts = {};
  const roles = generateRoles(permissionsObject);

  // Create owner resolver with caching for this network
  const ownerResolver = createOwnerResolver(provider);

  // Resolve all role owners (with caching to avoid redundant RPC calls)
  const umbrellaOwners = await resolveAllRoleOwners(umbrellaRoles, ownerResolver);
  const umbrellaIncentivesOwners = await resolveAllRoleOwners(umbrellaIncentivesRoles, ownerResolver);

  if (addressBook.UMBRELLA) {
    const umbrellaProxyAdmin = await getProxyAdmin(addressBook.UMBRELLA, provider);
    const proxyAdminContract = getContract({ address: getAddress(umbrellaProxyAdmin), abi: onlyOwnerAbi, client: provider });
    if (umbrellaProxyAdmin !== zeroAddress) {
      const proxyAdminOwner = await proxyAdminContract.read.owner() as Address;
      const ownerInfo = await ownerResolver.resolve(proxyAdminOwner);

      obj['UmbrellaProxyAdmin'] = {
        address: umbrellaProxyAdmin,
        modifiers: [
          {
            modifier: 'onlyOwner',
            addresses: [{ address: proxyAdminOwner, owners: ownerInfo.owners, signersThreshold: ownerInfo.threshold }],
            functions: roles['ProxyAdmin']['onlyOwner'],
          },
        ],
      };
    }
    obj['Umbrella'] = {
      address: addressBook.UMBRELLA,
      proxyAdmin: umbrellaProxyAdmin,
      modifiers: [
        {
          modifier: 'onlyCoverageManager',
          addresses: uniqueAddresses(mapRoleAddresses('COVERAGE_MANAGER_ROLE', umbrellaRoles, umbrellaOwners)),
          functions: roles['Umbrella']['onlyCoverageManager'],
        },
        {
          modifier: 'onlyAdmin',
          addresses: uniqueAddresses(mapRoleAddresses('DEFAULT_ADMIN', umbrellaRoles, umbrellaOwners)),
          functions: roles['Umbrella']['onlyAdmin'],
        },
        {
          modifier: 'onlyRescueGuardian',
          addresses: uniqueAddresses(mapRoleAddresses('RESCUE_GUARDIAN_ROLE', umbrellaRoles, umbrellaOwners)),
          functions: roles['Umbrella']['onlyRescueGuardian'],
        },
        {
          modifier: 'onlyPauseGuardian',
          addresses: uniqueAddresses(mapRoleAddresses('PAUSE_GUARDIAN_ROLE', umbrellaRoles, umbrellaOwners)),
          functions: roles['Umbrella']['onlyPauseGuardian'],
        },
      ],
    };
  }

  if (addressBook.UMBRELLA_INCENTIVES_CONTROLLER) {
    const umbrellaICProxyAdmin = await getProxyAdmin(addressBook.UMBRELLA_INCENTIVES_CONTROLLER, provider);
    const proxyAdminContract = getContract({ address: getAddress(umbrellaICProxyAdmin), abi: onlyOwnerAbi, client: provider });
    if (umbrellaICProxyAdmin !== zeroAddress) {
      const proxyAdminOwner = await proxyAdminContract.read.owner() as Address;
      const ownerInfo = await ownerResolver.resolve(proxyAdminOwner);

      obj['UmbrellaIncentivesControllerProxyAdmin'] = {
        address: umbrellaICProxyAdmin,
        modifiers: [
          {
            modifier: 'onlyOwner',
            addresses: [{ address: proxyAdminOwner, owners: ownerInfo.owners, signersThreshold: ownerInfo.threshold }],
            functions: roles['ProxyAdmin']['onlyOwner'],
          },
        ],
      };
    }

    obj['UmbrellaIncentivesController'] = {
      address: addressBook.UMBRELLA_INCENTIVES_CONTROLLER,
      proxyAdmin: umbrellaICProxyAdmin,
      modifiers: [
        {
          modifier: 'onlyRewardsAdmin',
          addresses: uniqueAddresses(mapRoleAddresses('REWARDS_ADMIN_ROLE', umbrellaIncentivesRoles, umbrellaIncentivesOwners)),
          functions: roles['UmbrellaRewardsController']['onlyRewardsAdmin'],
        },
        {
          modifier: 'onlyAdmin',
          addresses: uniqueAddresses(mapRoleAddresses('DEFAULT_ADMIN', umbrellaIncentivesRoles, umbrellaIncentivesOwners)),
          functions: roles['UmbrellaRewardsController']['onlyAdmin'],
        },
      ],
    };
  }

  if (
    addressBook.PERMISSIONED_PAYLOADS_CONTROLLER &&
    addressBook.PERMISSIONED_PAYLOADS_CONTROLLER !== zeroAddress
  ) {
    const ppcProxyAdmin = await getProxyAdmin(addressBook.PERMISSIONED_PAYLOADS_CONTROLLER, provider);
    const proxyAdminContract = getContract({ address: getAddress(ppcProxyAdmin), abi: onlyOwnerAbi, client: provider });
    if (ppcProxyAdmin !== zeroAddress) {
      const proxyAdminOwner = await proxyAdminContract.read.owner() as Address;
      const ownerInfo = await ownerResolver.resolve(proxyAdminOwner);

      obj['PermissionedPayloadsControllerProxyAdmin'] = {
        address: ppcProxyAdmin,
        modifiers: [
          {
            modifier: 'onlyOwner',
            addresses: [{ address: proxyAdminOwner, owners: ownerInfo.owners, signersThreshold: ownerInfo.threshold }],
            functions: roles['ProxyAdmin']['onlyOwner'],
          },
        ],
      };
    }

    const ppcContract = getContract({ address: getAddress(addressBook.PERMISSIONED_PAYLOADS_CONTROLLER), abi: PERMISSIONED_PAYLOADS_CONTROLLER_ABI, client: provider });
    const pcGuardian = await ppcContract.read.guardian() as Address;
    const pcOwner = await ppcContract.read.owner() as Address;
    const rescuer = await ppcContract.read.whoCanRescue() as Address;
    const payloadsManager = await ppcContract.read.payloadsManager() as Address;

    // Resolve all needed addresses using cache
    const guardianInfo = await ownerResolver.resolve(pcGuardian);
    const pcOwnerInfo = await ownerResolver.resolve(pcOwner);
    const rescuerInfo = await ownerResolver.resolve(rescuer);
    const payloadsManagerInfo = await ownerResolver.resolve(payloadsManager);

    obj['PermissionedPayloadsController'] = {
      address: addressBook.PERMISSIONED_PAYLOADS_CONTROLLER,
      proxyAdmin: ppcProxyAdmin,
      modifiers: [
        {
          modifier: 'onlyGuardian',
          addresses: [{ address: pcGuardian, owners: guardianInfo.owners, signersThreshold: guardianInfo.threshold }],
          functions: roles['PermissionedPayloadsController']['onlyGuardian'],
        },
        {
          modifier: 'onlyOwnerOrGuardian',
          addresses: [
            { address: pcGuardian, owners: guardianInfo.owners, signersThreshold: guardianInfo.threshold },
            { address: pcOwner, owners: pcOwnerInfo.owners, signersThreshold: pcOwnerInfo.threshold },
          ],
          functions: roles['PermissionedPayloadsController']['onlyOwnerOrGuardian'],
        },
        {
          modifier: 'onlyRescueGuardian',
          addresses: [{ address: rescuer, owners: rescuerInfo.owners, signersThreshold: rescuerInfo.threshold }],
          functions: roles['PermissionedPayloadsController']['onlyRescueGuardian'],
        },
        {
          modifier: 'onlyPayloadsManagerOrGuardian',
          addresses: [
            { address: pcGuardian, owners: guardianInfo.owners, signersThreshold: guardianInfo.threshold },
            { address: payloadsManager, owners: payloadsManagerInfo.owners, signersThreshold: payloadsManagerInfo.threshold },
          ],
          functions: roles['PermissionedPayloadsController']['onlyPayloadsManagerOrGuardian'],
        },
        {
          modifier: 'onlyPayloadsManager',
          addresses: [{ address: payloadsManager, owners: payloadsManagerInfo.owners, signersThreshold: payloadsManagerInfo.threshold }],
          functions: roles['PermissionedPayloadsController']['onlyPayloadsManager'],
        },
      ],
    };
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
          addresses: [{ address: owner, owners: ownerInfo.owners, signersThreshold: ownerInfo.threshold }],
          functions: roles['Executor']['onlyOwner'],
        },
      ],
    };
  }

  return obj;
};
