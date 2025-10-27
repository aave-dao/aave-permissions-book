import { Address, Client, getAddress, getContract } from "viem";
import { AgentHubRiskOracleInfo, Contracts, PermissionsJson } from "../helpers/types.js";
import { generateRoles } from "../helpers/jsonParsers.js";
import { getSafeOwners, getSafeThreshold } from "../helpers/guardian.js";
import { getProxyAdmin } from "../helpers/proxyAdmin.js";
import { uniqueAddresses } from "../helpers/utils.js";
import { getAuthorizedSenders } from "../helpers/hubRiskOracle.js";
import { ChainId } from "@bgd-labs/toolbox";
import { onlyOwnerAbi } from "../abis/onlyOwnerAbi.js";


export const resolveAgentHubModifiers = async (
  addressBook: any,
  provider: Client,
  permissionsObject: PermissionsJson,
  chainId: number,
  agentHubRiskOracleInfo: Record<string, AgentHubRiskOracleInfo>,
  agentHubBlock: number,
  tenderlyBlock?: number,
): Promise<{ agentHubPermissions: Contracts, agentHubRiskOracleInfo: Record<string, AgentHubRiskOracleInfo> }> => {
  let obj: Contracts = {};
  const roles = generateRoles(permissionsObject);

  // hub
  if (addressBook.HUB) {
    const hubContract = getContract({ address: getAddress(addressBook.HUB), abi: HUB_ABI, client: provider });
    const hubOwner = await hubContract.read.owner() as Address;


    const agentCount = Number(await hubContract.read.getAgentCount() as bigint);
    const agentAdmins: Set<Address> = new Set();
    const validationModules: Set<Address> = new Set();
    const riskOracles: Set<Address> = new Set();

    for (let i = 0; i < agentCount; i++) {
      const agentEnabled = await hubContract.read.isAgentEnabled(i) as boolean;
      if (agentEnabled) {
        const agentAdmin = await hubContract.read.getAgentAdmin(i) as Address;
        const agentAddress = await hubContract.read.getAgentAddress(i) as Address;
        const agentRiskOracle = await hubContract.read.getRiskOracle(i) as Address;

        riskOracles.add(agentRiskOracle);
        agentAdmins.add(agentAdmin);

        // get agent info
        const agentContract = getContract({ address: getAddress(agentAddress), abi: agentABI, client: provider });
        const rangeValidatorModule = await agentContract.read.RANGE_VALIDATION_MODULE() as Address;
        const agentUpdateType = await hubContract.read.getUpdateType(i) as string;
        const agentName = agentUpdateType.replace('Update', '');

        validationModules.add(rangeValidatorModule);

        obj[`${agentName}`] = {
          address: agentAddress,
          modifiers: [
            {
              modifier: 'onlyAgentHub',
              addresses: [
                {
                  address: addressBook.HUB,
                  owners: await getSafeOwners(provider, addressBook.HUB),
                  signersThreshold: await getSafeThreshold(
                    provider,
                    addressBook.HUB,
                  ),
                },
              ],
              functions: roles['Agent']['onlyAgentHub'],
            },
          ],
        };
      }
    }

    // get proxy admin from new transparent proxy factory

    const hubProxyAdmin = await getProxyAdmin(
      addressBook.HUB,
      provider,
    );

    const onlyAgentAdmins: { address: Address, owners: string[], signersThreshold: number }[] = [];
    for (const agentAdmin of agentAdmins) {
      onlyAgentAdmins.push({
        address: agentAdmin,
        owners: await getSafeOwners(provider, agentAdmin),
        signersThreshold: await getSafeThreshold(provider, agentAdmin),
      });
    }

    obj['AgentHub'] = {
      address: addressBook.HUB,
      proxyAdmin: hubProxyAdmin,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: hubOwner,
              owners: await getSafeOwners(provider, hubOwner),
              signersThreshold: await getSafeThreshold(provider, hubOwner),
            },
          ],
          functions: roles['AgentHub']['onlyOwner'],
        },
        {
          modifier: 'onlyOwnerOrAgentAdmin',
          addresses: uniqueAddresses([
            ...onlyAgentAdmins,
            {
              address: hubOwner,
              owners: await getSafeOwners(provider, hubOwner),
              signersThreshold: await getSafeThreshold(provider, hubOwner),
            },
          ]),
          functions: roles['AgentHub']['onlyOwnerOrAgentAdmin'],
        },
      ],
    };

    const proxyAdminContract = getContract({ address: getAddress(hubProxyAdmin), abi: onlyOwnerAbi, client: provider });
    const proxyAdminOwner = await proxyAdminContract.read.owner() as Address;

    obj['AgentHubProxyAdmin'] = {
      address: hubProxyAdmin,
      modifiers: [
        {
          modifier: 'onlyOwner',
          addresses: [
            {
              address: proxyAdminOwner,
              owners: await getSafeOwners(provider, proxyAdminOwner),
              signersThreshold: await getSafeThreshold(provider, proxyAdminOwner),
            },
          ],
          functions: roles['ProxyAdmin']['onlyOwner'],
        },
      ],
    };

    // module
    if (validationModules.size > 0) {
      for (const [index, validationModule] of validationModules.entries()) {
        obj[`${validationModule}-${index}`] = {
          address: validationModule,
          modifiers: [
            {
              modifier: 'onlyHubOwnerOrAgentAdmin',
              addresses: uniqueAddresses([
                ...onlyAgentAdmins,
                {
                  address: hubOwner,
                  owners: await getSafeOwners(provider, hubOwner),
                  signersThreshold: await getSafeThreshold(provider, hubOwner),
                },
              ]),
              functions: roles['RangeValidationModule']['onlyHubOwnerOrAgentAdmin'],
            },
          ],
        };
      }
    }

    // risk oracle
    if (riskOracles.size > 0) {
      for (const [index, riskOracle] of riskOracles.entries()) {

        const riskOracleContract = getContract({ address: getAddress(riskOracle), abi: riskOracleABI, client: provider });
        const riskOracleOwner = await riskOracleContract.read.owner() as Address;

        const onlyAuthorized: { address: Address, owners: string[], signersThreshold: number }[] = [];

        const { authorizedSenders, latestBlockNumber } = await getAuthorizedSenders(
          provider,
          agentHubRiskOracleInfo[riskOracle] || { address: riskOracle, authorizedSenders: [], latestBlockNumber: agentHubBlock } as AgentHubRiskOracleInfo,
          chainId,
          tenderlyBlock,
        );
        agentHubRiskOracleInfo[riskOracle] = {
          authorizedSenders: authorizedSenders,
          latestBlockNumber: latestBlockNumber,
          address: riskOracle,
        };

        for (const authorizedSender of authorizedSenders) {
          onlyAuthorized.push({
            address: getAddress(authorizedSender),
            owners: await getSafeOwners(provider, authorizedSender),
            signersThreshold: await getSafeThreshold(provider, authorizedSender),
          });
        }

        obj[`${riskOracle}-${index}`] = {
          address: riskOracle,
          modifiers: [
            {
              modifier: 'onlyOwner',
              addresses: [
                {
                  address: riskOracleOwner,
                  owners: await getSafeOwners(provider, riskOracleOwner),
                  signersThreshold: await getSafeThreshold(provider, riskOracleOwner),
                },
              ],
              functions: roles['RiskOracle']['onlyOwner'],
            },
            {
              modifier: 'onlyAuthorized',
              addresses: [
                ...onlyAuthorized,
              ],
              functions: roles['RiskOracle']['onlyAuthorized'],
            },
          ],
        };
      }
    }
  }






  return { agentHubPermissions: obj, agentHubRiskOracleInfo: agentHubRiskOracleInfo };
};