import { AddressBook, Contracts, PermissionsJson } from '../helpers/types.js';
import { ChainId } from '@bgd-labs/toolbox';
import { getProxyAdmin } from '../helpers/proxyAdmin.js';
import { generateRoles } from '../helpers/jsonParsers.js';
import { IWithGuardian_ABI } from '@aave-dao/aave-address-book/abis';
import { baseAdapter } from '../abis/BaseAdapter.js';
import { onlyOwnerAbi } from '../abis/onlyOwnerAbi.js';
import { PayloadsController_ABI } from '../abis/payloadsController.js';
import { ICrossChainController_ABI } from '../abis/crossChainController.js';
import { Address, Client, getAddress, getContract, zeroAddress } from 'viem';
import { createOwnerResolver } from '../helpers/ownerResolver.js';
import { resolveAllRoleOwners, mapRoleAddresses } from '../helpers/contractResolvers.js';

export const resolveGovV3Modifiers = async (
  addressBook: AddressBook,
  provider: Client,
  permissionsObject: PermissionsJson,
  chainId: typeof ChainId | number,
  senders: string[],
  tenderly: boolean,
  ggAdminRoles: Record<string, string[]>,
  addressNames?: Record<string, string>,
) => {
  const obj: Contracts = {};
  const roles = generateRoles(permissionsObject);

  // Create owner resolver with caching for this network
  const ownerResolver = createOwnerResolver(provider);

  // Resolve all role owners (with caching to avoid redundant RPC calls)
  const owners = await resolveAllRoleOwners(ggAdminRoles, ownerResolver);

  if (addressBook.GRANULAR_GUARDIAN && addressBook.GRANULAR_GUARDIAN !== zeroAddress) {
    obj['GranularGuardian'] = {
      address: addressBook.GRANULAR_GUARDIAN,
      modifiers: [
        {
          modifier: 'onlyRetryGuardian',
          addresses: mapRoleAddresses('RETRY_ROLE', ggAdminRoles, owners),
          functions: roles['GranularGuardian']['onlyRetryGuardian'],
        },
        {
          modifier: 'onlyEmergencyGuardian',
          addresses: mapRoleAddresses('SOLVE_EMERGENCY_ROLE', ggAdminRoles, owners),
          functions: roles['GranularGuardian']['onlyEmergencyGuardian'],
        },
        {
          modifier: 'onlyDefaultAdmin',
          addresses: mapRoleAddresses('DEFAULT_ADMIN', ggAdminRoles, owners),
          functions: roles['GranularGuardian']['onlyDefaultAdmin'],
        },
      ],
    };
  }

  // only valid while 2.5 is active
  if (addressBook.GOVERNANCE && addressBook.GOVERNANCE !== zeroAddress) {
    const govContractGuardian = getContract({ address: getAddress(addressBook.GOVERNANCE), abi: IWithGuardian_ABI, client: provider });
    const govContractOwner = getContract({ address: getAddress(addressBook.GOVERNANCE), abi: onlyOwnerAbi, client: provider });
    const govGuardian = await govContractGuardian.read.guardian() as Address;
    const govOwner = await govContractOwner.read.owner() as Address;

    const govOwnerInfo = await ownerResolver.resolve(govOwner);
    const govGuardianInfo = await ownerResolver.resolve(govGuardian);

    obj['AaveGovernanceV3'] = {
      address: addressBook.GOVERNANCE,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [{ address: govOwner, owners: govOwnerInfo.owners, signersThreshold: govOwnerInfo.threshold }],
          functions: roles['AaveGovernanceV3']['onlyOwner'],
        },
        {
          modifier: 'onlyGuardian',
          addresses: [{ address: govGuardian, owners: govGuardianInfo.owners, signersThreshold: govGuardianInfo.threshold }],
          functions: roles['AaveGovernanceV3']['onlyGuardian'],
        },
        {
          modifier: 'onlyOwnerOrGuardian',
          addresses: [
            { address: govGuardian, owners: govGuardianInfo.owners, signersThreshold: govGuardianInfo.threshold },
            { address: govOwner, owners: govOwnerInfo.owners, signersThreshold: govOwnerInfo.threshold },
          ],
          functions: roles['AaveGovernanceV3']['onlyOwnerOrGuardian'],
        },
      ],
    };
  }

  if (addressBook.PAYLOADS_CONTROLLER && addressBook.PAYLOADS_CONTROLLER !== zeroAddress) {
    const pcContractGuardian = getContract({ address: getAddress(addressBook.PAYLOADS_CONTROLLER), abi: IWithGuardian_ABI, client: provider });
    const pcContractOwner = getContract({ address: getAddress(addressBook.PAYLOADS_CONTROLLER), abi: onlyOwnerAbi, client: provider });
    const pcContractRescue = getContract({ address: getAddress(addressBook.PAYLOADS_CONTROLLER), abi: PayloadsController_ABI, client: provider });

    const pcGuardian = await pcContractGuardian.read.guardian() as Address;
    const pcOwner = await pcContractOwner.read.owner() as Address;
    const rescuer = await pcContractRescue.read.whoCanRescue() as Address;

    const pcOwnerInfo = await ownerResolver.resolve(pcOwner);
    const pcGuardianInfo = await ownerResolver.resolve(pcGuardian);
    const rescuerInfo = await ownerResolver.resolve(rescuer);

    obj['PayloadsController'] = {
      address: addressBook.PAYLOADS_CONTROLLER,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [{ address: pcOwner, owners: pcOwnerInfo.owners, signersThreshold: pcOwnerInfo.threshold }],
          functions: roles['PayloadsController']['onlyOwner'],
        },
        {
          modifier: 'onlyGuardian',
          addresses: [{ address: pcGuardian, owners: pcGuardianInfo.owners, signersThreshold: pcGuardianInfo.threshold }],
          functions: roles['PayloadsController']['onlyGuardian'],
        },
        {
          modifier: 'onlyOwnerOrGuardian',
          addresses: [
            { address: pcGuardian, owners: pcGuardianInfo.owners, signersThreshold: pcGuardianInfo.threshold },
            { address: pcOwner, owners: pcOwnerInfo.owners, signersThreshold: pcOwnerInfo.threshold },
          ],
          functions: roles['PayloadsController']['onlyOwnerOrGuardian'],
        },
        {
          modifier: 'onlyRescueGuardian',
          addresses: [{ address: rescuer, owners: rescuerInfo.owners, signersThreshold: rescuerInfo.threshold }],
          functions: roles['PayloadsController']['onlyRescueGuardian'],
        },
      ],
    };

    if (!addressBook.PROXY_ADMIN && addressBook.TRANSPARENT_PROXY_FACTORY) {
      const pcProxyAdmin = await getProxyAdmin(addressBook.PAYLOADS_CONTROLLER, provider);
      const proxyAdminContract = getContract({ address: getAddress(pcProxyAdmin), abi: onlyOwnerAbi, client: provider });
      const proxyAdminOwner = await proxyAdminContract.read.owner() as Address;
      const ownerInfo = await ownerResolver.resolve(proxyAdminOwner);

      obj['PayloadsControllerProxyAdmin'] = {
        address: pcProxyAdmin,
        modifiers: [
          {
            modifier: 'onlyOwner',
            addresses: [{ address: proxyAdminOwner, owners: ownerInfo.owners, signersThreshold: ownerInfo.threshold }],
            functions: roles['ProxyAdmin']['onlyOwner'],
          },
        ],
      };
    }
  }

  if (addressBook.VOTING_MACHINE && addressBook.VOTING_MACHINE !== zeroAddress) {
    const vmContract = getContract({ address: getAddress(addressBook.VOTING_MACHINE), abi: onlyOwnerAbi, client: provider });
    const owner = await vmContract.read.owner() as Address;
    const ownerInfo = await ownerResolver.resolve(owner);

    obj['VotingMachine'] = {
      address: addressBook.VOTING_MACHINE,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [{ address: owner, owners: ownerInfo.owners, signersThreshold: ownerInfo.threshold }],
          functions: roles['VotingMachine']['onlyOwner'],
        },
      ],
    };
  }

  // Voting Portals
  const votingPortals = [
    { key: 'VOTING_PORTAL_ETH_ETH', name: 'VotingPortal_Eth_Eth' },
    { key: 'VOTING_PORTAL_ETH_AVAX', name: 'VotingPortal_Eth_Avax' },
    { key: 'VOTING_PORTAL_ETH_POL', name: 'VotingPortal_Eth_Pol' },
  ];

  for (const portal of votingPortals) {
    if (addressBook[portal.key] && addressBook[portal.key] !== zeroAddress) {
      const vpContract = getContract({ address: getAddress(addressBook[portal.key]), abi: onlyOwnerAbi, client: provider });
      const owner = await vpContract.read.owner() as Address;
      const ownerInfo = await ownerResolver.resolve(owner);

      obj[portal.name] = {
        address: addressBook[portal.key],
        modifiers: [
          {
            modifier: 'onlyOwner',
            addresses: [{ address: owner, owners: ownerInfo.owners, signersThreshold: ownerInfo.threshold }],
            functions: roles['VotingPortal']['onlyOwner'],
          },
        ],
      };
    }
  }

  // Executors
  const executors = [
    { key: 'EXECUTOR_LVL_1', name: 'Executor_lvl1' },
    { key: 'EXECUTOR_LVL_2', name: 'Executor_lvl2' },
  ];

  for (const executor of executors) {
    if (addressBook[executor.key] && addressBook[executor.key] !== zeroAddress) {
      const executorContract = getContract({ address: getAddress(addressBook[executor.key]), abi: onlyOwnerAbi, client: provider });
      const owner = await executorContract.read.owner() as Address;
      const ownerInfo = await ownerResolver.resolve(owner);

      obj[executor.name] = {
        address: addressBook[executor.key],
        modifiers: [
          {
            modifier: 'onlyOwner',
            addresses: [{ address: owner, owners: ownerInfo.owners, signersThreshold: ownerInfo.threshold }],
            functions: roles['Executor']['onlyOwner'],
          },
        ],
      };
    }
  }

  if (addressBook.EMERGENCY_REGISTRY && addressBook.EMERGENCY_REGISTRY !== zeroAddress) {
    const emergencyRegistryContract = getContract({ address: getAddress(addressBook.EMERGENCY_REGISTRY), abi: onlyOwnerAbi, client: provider });
    const owner = await emergencyRegistryContract.read.owner() as Address;
    const ownerInfo = await ownerResolver.resolve(owner);

    obj['EmergencyRegistry'] = {
      address: addressBook.EMERGENCY_REGISTRY,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [{ address: owner, owners: ownerInfo.owners, signersThreshold: ownerInfo.threshold }],
          functions: roles['EmergencyRegistry']['onlyOwner'],
        },
      ],
    };
  }

  if (addressBook.CROSS_CHAIN_CONTROLLER && addressBook.CROSS_CHAIN_CONTROLLER !== zeroAddress) {
    const cccContract = getContract({ address: getAddress(addressBook.CROSS_CHAIN_CONTROLLER), abi: ICrossChainController_ABI, client: provider });
    const cccContractOwner = getContract({ address: getAddress(addressBook.CROSS_CHAIN_CONTROLLER), abi: onlyOwnerAbi, client: provider });
    const cccContractGuardian = getContract({ address: getAddress(addressBook.CROSS_CHAIN_CONTROLLER), abi: IWithGuardian_ABI, client: provider });
    const cccContractRescue = getContract({ address: getAddress(addressBook.CROSS_CHAIN_CONTROLLER), abi: ICrossChainController_ABI, client: provider });
    const owner = await cccContractOwner.read.owner() as Address;
    const guardian = await cccContractGuardian.read.guardian() as Address;
    const rescuer = await cccContractRescue.read.whoCanRescue() as Address;

    const ownerInfo = await ownerResolver.resolve(owner);
    const guardianInfo = await ownerResolver.resolve(guardian);
    const rescuerInfo = await ownerResolver.resolve(rescuer);

    const supportedChains = await cccContract.read.getSupportedChains() as number[];
    const receiverBridges: Set<string> = new Set();
    for (let i = 0; i < supportedChains.length; i++) {
      const bridges: string[] = await cccContract.read.getReceiverBridgeAdaptersByChain([supportedChains[i]]) as string[];
      bridges.map((bridge) => receiverBridges.add(bridge));
    }

    const receiverBridgesArray = Array.from(receiverBridges);
    for (let i = 0; i < receiverBridgesArray.length; i++) {
      const trustedRemotes: { address: string; chain: string }[] = [];
      for (let j = 0; j < supportedChains.length; j++) {
        const bridgeAdapterContract = getContract({ address: getAddress(receiverBridgesArray[i]), abi: baseAdapter, client: provider });
        const trustedRemote: string = await bridgeAdapterContract.read.getTrustedRemoteByChainId([supportedChains[j]]) as Address;

        if (trustedRemote === zeroAddress) break;
        trustedRemotes.push({ address: trustedRemote, chain: supportedChains[j].toString() });
      }

      let bridgeAdapterName = `BridgeAdapter${i}`;
      try {
        const bridgeAdapterContract = getContract({ address: getAddress(receiverBridgesArray[i]), abi: baseAdapter, client: provider });
        bridgeAdapterName = await bridgeAdapterContract.read.adapterName() as string;
      } catch (error) {
        if (addressNames && addressNames[receiverBridgesArray[i]] !== '') {
          bridgeAdapterName = addressNames[receiverBridgesArray[i]];
        }
      }

      obj[bridgeAdapterName] = {
        address: receiverBridgesArray[i],
        modifiers: [
          {
            modifier: 'trustedRemote',
            addresses: trustedRemotes.map((trustedRemote) => ({
              address: trustedRemote.address,
              owners: [],
              chain: trustedRemote.chain.toString(),
            })),
            functions: ['receiveMessage'],
          },
        ],
      };
    }

    obj['CrossChainController'] = {
      address: addressBook.CROSS_CHAIN_CONTROLLER,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [{ address: owner, owners: ownerInfo.owners, signersThreshold: ownerInfo.threshold }],
          functions: roles['CrossChainController']['onlyOwner'],
        },
        {
          modifier: 'onlyOwnerOrGuardian',
          addresses: [
            { address: guardian, owners: guardianInfo.owners, signersThreshold: guardianInfo.threshold },
            { address: owner, owners: ownerInfo.owners, signersThreshold: ownerInfo.threshold },
          ],
          functions: roles['CrossChainController']['onlyOwnerOrGuardian'],
        },
        {
          modifier: 'onlyRescueGuardian',
          addresses: [{ address: rescuer, owners: rescuerInfo.owners, signersThreshold: rescuerInfo.threshold }],
          functions: roles['CrossChainController']['onlyRescueGuardian'],
        },
        {
          modifier: 'onlyApprovedSenders',
          addresses: senders.map((sender) => ({ address: sender, owners: [] })),
          functions: roles['CrossChainController']['onlyApprovedSenders'],
        },
        {
          modifier: 'onlyApprovedBridges',
          addresses: Array.from(receiverBridges).map((approvedBridge: string) => ({ address: approvedBridge, owners: [] })),
          functions: roles['CrossChainController']['onlyApprovedBridges'],
        },
      ],
    };

    if (chainId === ChainId.polygon || chainId === ChainId.avalanche || chainId === 56 || chainId === 100 || chainId === 146 || chainId === 42220) {
      obj['CrossChainController'].modifiers.push({
        modifier: 'onlyGuardian',
        addresses: [{ address: guardian, owners: guardianInfo.owners, signersThreshold: guardianInfo.threshold }],
        functions: roles['CrossChainController']['onlyGuardian'],
      });
    }

    if (!addressBook.PROXY_ADMIN && addressBook.TRANSPARENT_PROXY_FACTORY) {
      const cccProxyAdmin = await getProxyAdmin(addressBook.CROSS_CHAIN_CONTROLLER, provider);
      const proxyAdminContract = getContract({ address: getAddress(cccProxyAdmin), abi: onlyOwnerAbi, client: provider });
      const proxyAdminOwner = await proxyAdminContract.read.owner() as Address;
      const proxyOwnerInfo = await ownerResolver.resolve(proxyAdminOwner);

      obj['CrossChainControllerProxyAdmin'] = {
        address: cccProxyAdmin,
        modifiers: [
          {
            modifier: 'onlyOwner',
            addresses: [{ address: proxyAdminOwner, owners: proxyOwnerInfo.owners, signersThreshold: proxyOwnerInfo.threshold }],
            functions: roles['ProxyAdmin']['onlyOwner'],
          },
        ],
      };
    }
  }

  // add proxy admins
  const proxyAdminContracts: string[] = permissionsObject
    .filter((contract) => contract.proxyAdmin)
    .map((contract) => contract.contract);
  for (let i = 0; i < proxyAdminContracts.length; i++) {
    if (obj[proxyAdminContracts[i]]) {
      obj[proxyAdminContracts[i]]['proxyAdmin'] = await getProxyAdmin(obj[proxyAdminContracts[i]].address, provider);
    }
  }

  return obj;
};
