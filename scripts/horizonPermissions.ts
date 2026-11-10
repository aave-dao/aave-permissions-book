import {
  Address,
  Client,
  getAddress,
  getContract,
  Hex,
  zeroAddress,
} from 'viem';
import {
  AddressBook,
  AddressInfo,
  Contracts,
  PermissionsJson,
} from '../helpers/types.js';
import { generateRoles } from '../helpers/jsonParsers.js';
import { isUnknownRoleKey } from '../helpers/adminRoles.js';
import { uniqueAddresses } from '../helpers/addressUtils.js';
import { createOwnerResolver } from '../helpers/ownerResolver.js';
import {
  resolveAllRoleOwners,
  mapRoleAddresses,
} from '../helpers/contractResolvers.js';
import {
  ERC20_SYMBOL_ABI,
  RWA_A_TOKEN_MANAGER_ABI,
  RWA_ORACLE_PARAMETER_REGISTRY_ABI,
  RWA_POOL_ABI,
} from '../abis/horizon.js';

const AUTHORIZED_TRANSFER_PREFIX = 'AUTHORIZED_TRANSFER_';

/**
 * Maps the RwaATokenManager's per-aToken transfer roles, read from getAuthorizedTransferRole, to a readable
 * name per reserve, e.g. AUTHORIZED_TRANSFER_USTB. Built from the pool's reserves on every
 * run, so new listings are picked up without a config change.
 */
export const getRwaAuthorizedTransferRoleCodes = async (
  addressBook: AddressBook,
  provider: Client,
): Promise<Record<string, string>> => {
  const pool = getContract({
    address: getAddress(addressBook.POOL as string),
    abi: RWA_POOL_ABI,
    client: provider,
  });
  const manager = getContract({
    address: getAddress(addressBook.RWA_A_TOKEN_MANAGER as string),
    abi: RWA_A_TOKEN_MANAGER_ABI,
    client: provider,
  });
  const reserves = (await pool.read.getReservesList()) as Address[];

  const roleCodes: Record<string, string> = {};
  for (const reserve of reserves) {
    const aToken = (await pool.read.getReserveAToken([reserve])) as Address;
    const symbol = (await getContract({
      address: reserve,
      abi: ERC20_SYMBOL_ABI,
      client: provider,
    }).read.symbol()) as string;
    const roleCode = (await manager.read.getAuthorizedTransferRole([
      aToken,
    ])) as Hex;
    roleCodes[roleCode] = `${AUTHORIZED_TRANSFER_PREFIX}${symbol}`;
  }
  return roleCodes;
};

/**
 * Resolves the permissions of the Horizon-only contracts: the RwaATokenManager, whose admin grants
 * per-aToken rights to move users' RWA aTokens, and the LlamaRisk parameter registry bounding the NAV
 * price feeds.
 */
export const resolveHorizonModifiers = async (
  addressBook: AddressBook,
  provider: Client,
  permissionsObject: PermissionsJson,
  rwaATokenManagerRoles: Record<string, string[]>,
): Promise<{ horizonPermissions: Contracts }> => {
  const obj: Contracts = {};
  const roles = generateRoles(permissionsObject);
  const ownerResolver = createOwnerResolver(provider);

  if (addressBook.RWA_A_TOKEN_MANAGER) {
    const owners = await resolveAllRoleOwners(
      rwaATokenManagerRoles,
      ownerResolver,
    );

    // Every role other than the default admin gates transferRwaAToken for the aToken it was derived from,
    // including roles whose aToken is not a current reserve
    const authorizedTransferModifiers = Object.keys(rwaATokenManagerRoles)
      .filter((roleName) => roleName !== 'DEFAULT_ADMIN')
      .filter((roleName) => rwaATokenManagerRoles[roleName].length > 0)
      .sort()
      .map((roleName) => ({
        modifier: isUnknownRoleKey(roleName)
          ? `onlyAuthorizedTransfer(unknown aToken, role ${roleName})`
          : `onlyAuthorizedTransfer(${roleName.slice(AUTHORIZED_TRANSFER_PREFIX.length)})`,
        addresses: uniqueAddresses(
          mapRoleAddresses(roleName, rwaATokenManagerRoles, owners),
        ),
        functions: roles['RwaATokenManager']['onlyAuthorizedTransfer'],
      }));

    obj['RwaATokenManager'] = {
      address: addressBook.RWA_A_TOKEN_MANAGER as string,
      modifiers: [
        {
          modifier: 'onlyDefaultAdmin',
          addresses: uniqueAddresses(
            mapRoleAddresses('DEFAULT_ADMIN', rwaATokenManagerRoles, owners),
          ),
          functions: roles['RwaATokenManager']['onlyDefaultAdmin'],
        },
        ...authorizedTransferModifiers,
      ],
    };
  }

  if (addressBook.RWA_ORACLE_PARAMS_REGISTRY) {
    const registry = getContract({
      address: getAddress(addressBook.RWA_ORACLE_PARAMS_REGISTRY as string),
      abi: RWA_ORACLE_PARAMETER_REGISTRY_ABI,
      client: provider,
    });
    const owner = (await registry.read.owner()) as Address;
    const pendingOwner = (await registry.read.pendingOwner()) as Address;
    const updater = (await registry.read.updater()) as Address;

    const toAddressInfo = async (address: Address): Promise<AddressInfo> => {
      const info = await ownerResolver.resolve(address);
      return { address, owners: info.owners, signersThreshold: info.threshold };
    };

    const modifiers = [
      {
        modifier: 'onlyOwner',
        addresses: [await toAddressInfo(owner)],
        functions: roles['RwaOracleParameterRegistry']['onlyOwner'],
      },
      {
        modifier: 'onlyUpdater',
        addresses: [await toAddressInfo(updater)],
        functions: roles['RwaOracleParameterRegistry']['onlyUpdater'],
      },
    ];

    // Two-step ownership: listed only while a transfer is pending
    if (pendingOwner !== zeroAddress) {
      modifiers.push({
        modifier: 'onlyPendingOwner',
        addresses: [await toAddressInfo(pendingOwner)],
        functions: roles['RwaOracleParameterRegistry']['onlyPendingOwner'],
      });
    }

    obj['RwaOracleParameterRegistry'] = {
      address: addressBook.RWA_ORACLE_PARAMS_REGISTRY as string,
      modifiers,
    };
  }

  return { horizonPermissions: obj };
};
