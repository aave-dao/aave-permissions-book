import { Roles } from './types.js';
import { networkConfigs, Pools } from './configs.js';
import { getLimit } from './limits.js';
import { Client, Log, keccak256, encodePacked } from 'viem';
import { getEvents, getRpcClientFromUrl } from './rpc.js';



export const defaultRolesAdmin =
  '0x0000000000000000000000000000000000000000000000000000000000000000';

const initializeRoleCodeMap = (roleNames: string[], collector?: boolean): Map<string, string> => {
  const roleCodeMap = new Map<string, string>([
    [
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      'DEFAULT_ADMIN',
    ],
  ]);

  for (const roleName of roleNames) {
    const code = keccak256(encodePacked(['string'], [roleName]));
    roleCodeMap.set(code, roleName);
  }

  if (collector) {
    roleCodeMap.set(
      '0x46554e44535f41444d494e000000000000000000000000000000000000000000',
      'FUNDS_ADMIN_ROLE',
    );
  }

  return roleCodeMap;
}



export const getRoleAdmins = ({
  oldRoles,
  roleNames,
  collector,
  eventLogs,
}: {
  oldRoles: Record<string, string[]>,
  roleNames: string[],
  collector?: boolean,
  eventLogs: Log[],
}) => {
  const roleHexToNameMap = initializeRoleCodeMap(roleNames, collector);
  const roles: Record<string, string[]> = { ...oldRoles };

  eventLogs.forEach((eventLog) => {
    const role = eventLog.args.role;
    const account = eventLog.args.account;
    const roleName = roleHexToNameMap.get(role);

    if (eventLog.eventName === 'RoleGranted') {
      // console.log(`role granted
      //   address: ${account}
      //   rawRole: ${role}
      //   role: ${roleName}
      // `);
      if (roleName && !roles[roleName]) {
        roles[roleName] = [];
      }

      if (roleName && roles[roleName]) {
        const accountFound = roles[roleName].find(
          (roleAddress) => roleAddress === account,
        );
        if (!accountFound) {
          roles[roleName].push(account);
        }
      }
    } else if (eventLog.eventName === 'RoleRevoked') {
      // console.log(`role revoked
      //   address: ${account}
      //   rawRole: ${role}
      //   role: ${roleName}
      // `);
      if (roleName) {
        roles[roleName] = roles[roleName].filter((role) => role !== account);
      }
    }
  })

  roleNames.forEach((roleName) => {
    if (!roles[roleName]) roles[roleName] = [];
  });
  // console.log('roes: ', roles);
  // console.log('-------------------------------');
  return roles;
};



export const getCurrentRoleAdmins = async (
  client: Client,
  oldRoles: Record<string, string[]>,
  fromBlock: number,
  chainId: string,
  pool: Pools,
  roleNames: string[],
  contract: string,
  collector?: boolean,
): Promise<Roles> => {
  let limit = getLimit(chainId) ?? 0;

  let events: Log[] = [];
  let latestBlockNumber = 0;
  if (
    pool === Pools.TENDERLY ||
    pool === Pools.GHO_TENDERLY ||
    pool == Pools.ETHERFI_TENDERLY ||
    pool == Pools.LIDO_TENDERLY
  ) {
    const { logs: preTenderlyForkEvents, currentBlock: preTenderlyForkCurrentBlock } = await getEvents({
      client,
      fromBlock,
      contract,
      eventTypes: ['RoleGranted', 'RoleRevoked'],
      maxBlock: networkConfigs[Number(chainId)].pools[pool].tenderlyBlock!,
      limit
    });

    const tenderlyProvider = getRpcClientFromUrl(
      networkConfigs[Number(chainId)].pools[pool].tenderlyRpcUrl!,
    );


    const { logs: tenderlyForkEvents } = await getEvents({
      client: tenderlyProvider,
      fromBlock: networkConfigs[Number(chainId)].pools[pool].tenderlyBlock!,
      contract,
      eventTypes: ['RoleGranted', 'RoleRevoked'],
      limit: 999
    });
    events = [...preTenderlyForkEvents, ...tenderlyForkEvents];

    latestBlockNumber = preTenderlyForkCurrentBlock;
  } else {
    console.log
    const { logs: networkEvents, currentBlock: eventsCurrentBlock } = await getEvents({
      client,
      fromBlock,
      contract,
      eventTypes: ['RoleGranted', 'RoleRevoked'],
      limit
    });

    events = networkEvents;
    latestBlockNumber = eventsCurrentBlock;
  }
  const roles = getRoleAdmins({
    oldRoles,
    roleNames,
    collector,
    eventLogs: events,
  });

  // console.log('roes: ', roles);
  // console.log('-------------------------------');
  return { role: roles, latestBlockNumber };
};
