import {
  getPermissionsByNetwork,
  saveJson,
} from '../helpers/fileSystem.js';
import { getNetowkName, networkConfigs, Pools } from '../helpers/configs.js';
import { explorerAddressUrlComposer } from '../helpers/explorer.js';
import { ChainId } from '@bgd-labs/toolbox';
import { generateContractsByAddress } from '../helpers/jsonParsers.js';
import {
  getLineSeparator,
  getTableBody,
  getTableHeader,
} from '../helpers/tables.js';
import { getPrincipalReadme } from './readme.js';
import {
  AddressInfo,
  ContractsByAddress,
  PoolConfigs,
  PoolGuardians,
} from '../helpers/types.js';
import {
  Decentralization,
  getActionExecutors,
  getLevelOfDecentralization,
} from '../helpers/decentralization.js';
import { getAddress } from 'viem';

export const generateTableAddress = (
  address: string | undefined,
  addressesNames: Record<string, string>,
  contractsByAddress: ContractsByAddress,
  poolGuardians: PoolGuardians,
  network: string,
  chainId?: string,
): string => {
  const checkSummedAddress = address ? getAddress(address) : null;

  if (chainId) {
    const newContractsByAddress = generateContractsByAddress({
      ...getPermissionsByNetwork(chainId)['V3'].govV3?.contracts,
      ...getPermissionsByNetwork(chainId)['V3'].ppc?.contracts,
      ...getPermissionsByNetwork(chainId)['V3_WHITE_LABEL']?.govV3?.contracts,
      ...getPermissionsByNetwork(chainId)['V3_WHITE_LABEL']?.ppc?.contracts,
    });
    const networkContractsByAddress: Record<string, string> = {};
    Object.keys(newContractsByAddress).forEach((key) => {
      networkContractsByAddress[
        key
      ] = `${newContractsByAddress[key]}(${getNetowkName[chainId]})`;
    });
    contractsByAddress = {
      ...contractsByAddress,
      ...networkContractsByAddress,
    };
  }
  return address && checkSummedAddress
    ? '[' +
    (
      addressesNames[address]
        ? addressesNames[address]
        : addressesNames[checkSummedAddress]
          ? addressesNames[checkSummedAddress]
          : contractsByAddress[address]
            ? contractsByAddress[address]
            : contractsByAddress[checkSummedAddress]
              ? contractsByAddress[checkSummedAddress]
              : poolGuardians[checkSummedAddress] &&
                poolGuardians[checkSummedAddress].owners.length > 0
                ? addressesNames[checkSummedAddress]
                  ? addressesNames[checkSummedAddress]
                  : `${checkSummedAddress} (Safe)`
                : checkSummedAddress) +
    '](' +
    (contractsByAddress[checkSummedAddress] &&
      (contractsByAddress[checkSummedAddress] === 'ShortExecutor' ||
        contractsByAddress[checkSummedAddress] === 'LongExecutor')
      ? explorerAddressUrlComposer(
        checkSummedAddress,
        ChainId.mainnet.toString(),
      )
      : explorerAddressUrlComposer(checkSummedAddress, network)) +
    ')'
    : '-';
};

export const generateTable = (network: string, pool: string): string => {
  let readmeDirectoryTable: string = '';

  // to generate tenderly tables, add TENDERLY flag on .env file
  if (
    (!process.env.TENDERLY || process.env.TENDERLY === 'false') &&
    pool.toLowerCase().indexOf('tenderly') > -1
  ) {
    return '';
  }

  const networkPermits = getPermissionsByNetwork(network);
  const mainnetPermissions = getPermissionsByNetwork(ChainId.mainnet);

  const networkName = networkConfigs[Number(network)].name.toUpperCase();
  const addressesNames = networkConfigs[network].addressesNames || {};

  // create network Readme with pool tables
  let readmeByNetwork = `# ${networkName} \n`;

  const poolGuardians: PoolGuardians = {};
  let poolPermitsByContract = networkPermits[pool];
  poolPermitsByContract.contracts = {
    ...networkPermits[pool].contracts,
    ...getPermissionsByNetwork(network)[pool].collector?.contracts,
    ...getPermissionsByNetwork(network)[pool].clinicSteward?.contracts,
    // ...getPermissionsByNetwork(network)[pool].umbrella?.contracts,
    // ...getPermissionsByNetwork(network)[pool].ppc?.contracts,
  }

  if (!poolPermitsByContract?.contracts) {
    return readmeDirectoryTable;
  }

  if (pool === Pools.LIDO || pool === Pools.ETHERFI) {
    poolPermitsByContract.contracts = {
      ...poolPermitsByContract.contracts,
      PoolExposureSteward: getPermissionsByNetwork(network)['V3'].contracts['PoolExposureSteward'],
    };
  }

  // create pool table
  readmeByNetwork += `## ${pool} \n`;

  let contractsByAddress: Record<string, string> = {};

  // add gov contracts to contractsByAddresses
  if (pool !== Pools.GOV_V2 && pool !== Pools.GOV_V2_TENDERLY) {
    contractsByAddress = generateContractsByAddress({
      ...mainnetPermissions[Pools.GOV_V2].contracts,
    });
  }

  let v3Contracts;
  if (
    pool === Pools.LIDO ||
    pool === Pools.ETHERFI ||
    pool === Pools.ETHERFI_TENDERLY ||
    pool === Pools.LIDO_TENDERLY
  ) {
    v3Contracts = generateContractsByAddress({
      ...(poolPermitsByContract?.contracts || {}),
      ...getPermissionsByNetwork(network)['V3'].govV3?.contracts,
      ...getPermissionsByNetwork(network)['V3'].collector?.contracts,
      ...getPermissionsByNetwork(network)['V3'].clinicSteward?.contracts,
      ...getPermissionsByNetwork(network)['V3'].umbrella?.contracts,
      ...getPermissionsByNetwork(network)['V3'].ppc?.contracts,
      ...getPermissionsByNetwork(network)['V3'].agentHub?.contracts,
    });
  } else if (pool === Pools.V3_WHITE_LABEL) {
    v3Contracts = generateContractsByAddress({
      ...(poolPermitsByContract?.contracts || {}),
      ...getPermissionsByNetwork(network)['V3_WHITE_LABEL']?.govV3?.contracts,
      ...getPermissionsByNetwork(network)['V3_WHITE_LABEL']?.contracts,
      ...getPermissionsByNetwork(network)['V3_WHITE_LABEL']?.collector?.contracts,
      ...getPermissionsByNetwork(network)['V3_WHITE_LABEL']?.clinicSteward?.contracts,
      ...getPermissionsByNetwork(network)['V3_WHITE_LABEL']?.umbrella?.contracts,
      ...getPermissionsByNetwork(network)['V3_WHITE_LABEL']?.ppc?.contracts,
      ...getPermissionsByNetwork(network)['V3_WHITE_LABEL']?.agentHub?.contracts,
    });
  } else {
    v3Contracts = generateContractsByAddress({
      ...(poolPermitsByContract?.contracts || {}),
      ...getPermissionsByNetwork(network)['V3'].govV3?.contracts,
      ...getPermissionsByNetwork(network)['V3'].contracts,
      ...getPermissionsByNetwork(ChainId.mainnet)['GHO'].contracts,
      ...getPermissionsByNetwork(network)['V3'].collector?.contracts,
      ...getPermissionsByNetwork(network)['V3'].clinicSteward?.contracts,
      ...getPermissionsByNetwork(network)['V3'].ppc?.contracts,
      ...getPermissionsByNetwork(network)['V3'].umbrella?.contracts,
      ...getPermissionsByNetwork(network)['V3'].agentHub?.contracts,
    });
  }
  contractsByAddress = { ...contractsByAddress, ...v3Contracts };

  let decentralizationTable = `### Contracts upgradeability\n`;
  const decentralizationHeaderTitles = ['contract', 'upgradeable by'];
  const decentralizationHeader = getTableHeader(decentralizationHeaderTitles);
  decentralizationTable += decentralizationHeader;

  // fill pool table
  let decentralizationTableBody = '';
  for (let contractName of Object.keys(poolPermitsByContract.contracts)) {
    const contract = poolPermitsByContract.contracts[contractName];
    let govPermissions = pool === Pools.V3_WHITE_LABEL ? {
      ...getPermissionsByNetwork(network)['V3_WHITE_LABEL']?.govV3?.contracts,
      ...getPermissionsByNetwork(network)['V3_WHITE_LABEL']?.ppc?.contracts,
    } : {
      ...getPermissionsByNetwork(network)['V3'].govV3?.contracts,
    };
    if (pool === Pools.V2_ARC) {
      govPermissions = {
        ...getPermissionsByNetwork(network)['V3'].govV3?.contracts,
        ...getPermissionsByNetwork(ChainId.mainnet)['V2_ARC'].contracts,
      };
    }
    const { upgradeable, ownedBy }: Decentralization =
      getLevelOfDecentralization(
        contract,
        pool === Pools.LIDO ||
          pool === Pools.ETHERFI ||
          pool === Pools.ETHERFI_TENDERLY ||
          pool === Pools.LIDO_TENDERLY
          ? {
            ...poolPermitsByContract.contracts,
            ...getPermissionsByNetwork(network)['V3'].collector?.contracts,
            ...getPermissionsByNetwork(network)['V3'].govV3?.contracts,
            ...getPermissionsByNetwork(network)['V3'].clinicSteward?.contracts,
            ...getPermissionsByNetwork(network)['V3'].umbrella?.contracts,
            ...getPermissionsByNetwork(network)['V3'].ppc?.contracts,
            ...getPermissionsByNetwork(network)['V3'].agentHub?.contracts,
          }
          : pool === Pools.V3_WHITE_LABEL ?
            {

              ...getPermissionsByNetwork(network)['V3_WHITE_LABEL']?.govV3?.contracts,
              ...getPermissionsByNetwork(network)['V3_WHITE_LABEL']?.contracts,
              ...getPermissionsByNetwork(network)['V3_WHITE_LABEL']?.collector?.contracts,
              ...getPermissionsByNetwork(network)['V3_WHITE_LABEL']?.clinicSteward?.contracts,
              ...getPermissionsByNetwork(network)['V3_WHITE_LABEL']?.umbrella?.contracts,
              ...getPermissionsByNetwork(network)['V3_WHITE_LABEL']?.ppc?.contracts,
              ...getPermissionsByNetwork(network)['V3_WHITE_LABEL']?.agentHub?.contracts,
            } :
            {
              ...poolPermitsByContract.contracts,
              ...getPermissionsByNetwork(network)['V3'].contracts,
              ...getPermissionsByNetwork(network)['V3'].collector?.contracts,
              ...getPermissionsByNetwork(network)['V3'].govV3?.contracts,
              ...getPermissionsByNetwork(network)['V3'].clinicSteward?.contracts,
              ...getPermissionsByNetwork(network)['V3'].umbrella?.contracts,
              ...getPermissionsByNetwork(network)['V3'].ppc?.contracts,
              ...getPermissionsByNetwork(network)['V3'].agentHub?.contracts,
            },
        govPermissions,
        pool === Pools.V3_WHITE_LABEL ? true : false,
      );
    decentralizationTableBody += getTableBody([
      `[${contractName}](${explorerAddressUrlComposer(
        contract.address,
        network,
      )})`,
      `${upgradeable ? ownedBy : 'not upgradeable'}`,
    ]);
    decentralizationTableBody += getLineSeparator(
      decentralizationHeaderTitles.length,
    );
  }
  // hardcode aave a/v/s tokens
  if (pool.includes('V3') || pool.includes('V2') || pool.includes('LIDO') || pool.includes('ETHERFI')) {
    decentralizationTableBody += getTableBody([
      `Aave a/v/s tokens`,
      `${pool === Pools.V3_WHITE_LABEL ? 'PPC Multi-sig' : 'Governance'}`,
    ]);
    decentralizationTableBody += getLineSeparator(
      decentralizationHeaderTitles.length,
    );
  }

  if (
    poolPermitsByContract.govV3 &&
    Object.keys(poolPermitsByContract.govV3).length > 0 &&
    poolPermitsByContract.govV3.contracts
  ) {
    for (let contractName of Object.keys(
      poolPermitsByContract.govV3.contracts,
    )) {
      const contract = poolPermitsByContract.govV3.contracts[contractName];
      const { upgradeable, ownedBy }: Decentralization =
        getLevelOfDecentralization(
          contract,
          {
            ...poolPermitsByContract.contracts,
            ...getPermissionsByNetwork(network)['V3'].govV3?.contracts,
          },
          getPermissionsByNetwork(network)['V3'].govV3?.contracts || {},
          pool === Pools.V3_WHITE_LABEL ? true : false,
        );
      decentralizationTableBody += getTableBody([
        `[${contractName}](${explorerAddressUrlComposer(
          contract.address,
          network,
        )})`,
        `${upgradeable ? ownedBy : 'not upgradeable'}`,
      ]);
      decentralizationTableBody += getLineSeparator(
        decentralizationHeaderTitles.length,
      );
    }
  }

  decentralizationTable += decentralizationTableBody;
  readmeByNetwork += decentralizationTable + '\n';

  let actionsTable = `### Actions type\n`;
  const actionsHeaderTitles = ['type', 'can be executed by'];
  const actionsHeader = getTableHeader(actionsHeaderTitles);
  actionsTable += actionsHeader;

  // fill pool table
  let actionsTableBody = '';
  const actionExecutors = getActionExecutors(
    pool === Pools.V3_WHITE_LABEL ?
      {
        ...poolPermitsByContract.contracts,
        ...getPermissionsByNetwork(network)['V3_WHITE_LABEL']?.govV3?.contracts,
        ...getPermissionsByNetwork(network)['V3_WHITE_LABEL']?.contracts,
        ...getPermissionsByNetwork(network)['V3_WHITE_LABEL']?.collector?.contracts,
        ...getPermissionsByNetwork(network)['V3_WHITE_LABEL']?.clinicSteward?.contracts,
        ...getPermissionsByNetwork(network)['V3_WHITE_LABEL']?.umbrella?.contracts,
        ...getPermissionsByNetwork(network)['V3_WHITE_LABEL']?.ppc?.contracts,
        ...getPermissionsByNetwork(network)['V3_WHITE_LABEL']?.agentHub?.contracts,
      } :
      {
        ...poolPermitsByContract.contracts,
        ...getPermissionsByNetwork(network)['V3'].govV3?.contracts,
        ...getPermissionsByNetwork(network)['V3'].collector?.contracts,
        ...getPermissionsByNetwork(network)['V3'].clinicSteward?.contracts,
        ...getPermissionsByNetwork(ChainId.mainnet)['GHO'].contracts,
        ...getPermissionsByNetwork(network)['V3'].agentHub?.contracts,
      },
    pool === Pools.V3_WHITE_LABEL ?
      {
        ...getPermissionsByNetwork(network)['V3_WHITE_LABEL']?.govV3?.contracts,
        ...getPermissionsByNetwork(network)['V3_WHITE_LABEL']?.ppc?.contracts,
      } :
      {
        ...getPermissionsByNetwork(network)['V3'].govV3?.contracts,
        ...getPermissionsByNetwork(network)['V3'].ppc?.contracts,
        ...getPermissionsByNetwork(network)['V3'].clinicSteward?.contracts,
        ...getPermissionsByNetwork(ChainId.mainnet)['GHO'].contracts,
        ...getPermissionsByNetwork(network)['V3'].agentHub?.contracts,
      },
    pool === Pools.V3_WHITE_LABEL ? true : false,
    networkConfigs[Number(network)].addressesNames
  );
  for (let actionName of Object.keys(actionExecutors)) {
    if (Array.from(actionExecutors[actionName]).length > 0) {
      actionsTableBody += getTableBody([
        actionName,
        `${Array.from(actionExecutors[actionName])}`,
      ]);
      actionsTableBody += getLineSeparator(actionsHeaderTitles.length);
    }
  }
  if (actionsTableBody !== '') {
    actionsTable += actionsTableBody;
    readmeByNetwork += actionsTable + '\n';
  }

  if (poolPermitsByContract.contracts && Object.keys(poolPermitsByContract.contracts).length > 0) {
    let contractTable = `### Contracts\n`;
    const contractsModifiersHeaderTitles = [
      'contract',
      'proxyAdmin',
      'modifier',
      'permission owner',
      'functions',
    ];
    const header = getTableHeader(contractsModifiersHeaderTitles);
    contractTable += header;

    // fill pool table
    let tableBody = '';
    for (let contractName of Object.keys(poolPermitsByContract.contracts)) {
      const contract = poolPermitsByContract.contracts[contractName];

      if (contract.modifiers.length === 0) {
        tableBody += getTableBody([
          `[${contractName}](${explorerAddressUrlComposer(
            contract.address,
            network,
          )})`,
          `${generateTableAddress(
            getAddress(contract.proxyAdmin!),
            addressesNames,
            contractsByAddress,
            poolGuardians,
            network,
          )}`,
          `-`,
          `-`,
          '-',
        ]);
        tableBody += getLineSeparator(contractsModifiersHeaderTitles.length);
      }
      for (let modifier of contract.modifiers) {
        for (let modifierAddress of modifier.addresses) {
          if (!poolGuardians[modifierAddress.address]) {
            if (modifierAddress.owners.length > 0) {
              poolGuardians[modifierAddress.address] = {
                owners: modifierAddress.owners,
                threshold: modifierAddress.signersThreshold,
              };
            }
          }
        }

        tableBody += getTableBody([
          `[${contractName}](${explorerAddressUrlComposer(
            contract.address,
            network,
          )})`,
          `${generateTableAddress(
            contract.proxyAdmin,
            addressesNames,
            contractsByAddress,
            poolGuardians,
            network,
          )}`,
          `${modifier.modifier}`,
          `${modifier.addresses
            .map((modifierAddress: AddressInfo) =>
              generateTableAddress(
                modifierAddress.address,
                addressesNames,
                contractsByAddress,
                poolGuardians,
                network,
                modifierAddress.chain,
              ),
            )
            .join(', ')}`,
          modifier?.functions ? modifier.functions.join(', ') : '',
        ]);
        tableBody += getLineSeparator(contractsModifiersHeaderTitles.length);
      }
    }

    contractTable += tableBody;

    readmeDirectoryTable += getTableBody([
      networkName,
      pool,
      `[Permissions](./out/${networkName}-${pool}.md#contracts)`,
    ]);
    readmeDirectoryTable += getLineSeparator(3);

    readmeByNetwork += contractTable + '\n';
  }

  if (
    poolPermitsByContract.govV3 &&
    Object.keys(poolPermitsByContract.govV3).length > 0 &&
    poolPermitsByContract.govV3.contracts
  ) {
    let govV3Table = `### Governance V3 Contracts \n`;
    const govV3HeaderTitles = [
      'contract',
      'proxyAdmin',
      'modifier',
      'permission owner',
      'functions',
    ];
    const govV3Header = getTableHeader(govV3HeaderTitles);
    govV3Table += govV3Header;

    let govV3tableBody = '';
    for (let contractName of Object.keys(
      poolPermitsByContract.govV3.contracts,
    )) {
      const contract = poolPermitsByContract.govV3.contracts[contractName];

      if (contract.modifiers.length === 0) {
        govV3tableBody += getTableBody([
          `[${contractName}](${explorerAddressUrlComposer(
            contract.address,
            network,
          )})`,
          `${generateTableAddress(
            contract.proxyAdmin,
            addressesNames,
            contractsByAddress,
            poolGuardians,
            network,
          )}`,
          `-`,
          `-`,
          '-',
        ]);
        govV3tableBody += getLineSeparator(
          govV3HeaderTitles.length,
        );
      }
      for (let modifier of contract.modifiers) {
        for (let modifierAddress of modifier.addresses) {
          if (!poolGuardians[modifierAddress.address]) {
            if (modifierAddress.owners.length > 0) {
              poolGuardians[modifierAddress.address] = {
                owners: modifierAddress.owners,
                threshold: modifierAddress.signersThreshold,
              };
            }
          }
        }

        govV3tableBody += getTableBody([
          `[${contractName}](${explorerAddressUrlComposer(
            contract.address,
            network,
          )})`,
          `${generateTableAddress(
            contract.proxyAdmin,
            addressesNames,
            contractsByAddress,
            poolGuardians,
            network,
          )}`,
          `${modifier.modifier}`,
          `${modifier.addresses
            .map((modifierAddress: AddressInfo) =>
              generateTableAddress(
                modifierAddress.address,
                addressesNames,
                contractsByAddress,
                poolGuardians,
                network,
                modifierAddress.chain,
              ),
            )
            .join(', ')}`,
          modifier?.functions ? modifier.functions.join(', ') : '',
        ]);
        govV3tableBody += getLineSeparator(
          govV3HeaderTitles.length,
        );
      }
    }

    govV3Table += govV3tableBody;
    readmeByNetwork += govV3Table + '\n';
  }

  // Umbrella Table
  if (poolPermitsByContract.umbrella &&
    Object.keys(poolPermitsByContract.umbrella).length > 0 &&
    poolPermitsByContract.umbrella.contracts) {


    let umbrellaTable = `### Umbrella Contracts \n`;
    const umbrellaHeaderTitles = [
      'contract',
      'proxyAdmin',
      'modifier',
      'permission owner',
      'functions',
    ];
    const umbrellaHeader = getTableHeader(umbrellaHeaderTitles);
    umbrellaTable += umbrellaHeader;

    let umbrellaTableBody = '';
    for (let contractName of Object.keys(
      poolPermitsByContract.umbrella.contracts,
    )) {
      const contract = poolPermitsByContract.umbrella.contracts[contractName];

      if (contract.modifiers.length === 0) {
        umbrellaTableBody += getTableBody([
          `[${contractName}](${explorerAddressUrlComposer(
            contract.address,
            network,
          )})`,
          `${generateTableAddress(
            contract.proxyAdmin,
            addressesNames,
            contractsByAddress,
            poolGuardians,
            network,
          )}`,
          `-`,
          `-`,
          '-',
        ]);
        umbrellaTableBody += getLineSeparator(
          umbrellaHeaderTitles.length,
        );
      }
      for (let modifier of contract.modifiers) {
        for (let modifierAddress of modifier.addresses) {
          if (!poolGuardians[modifierAddress.address]) {
            if (modifierAddress.owners.length > 0) {
              poolGuardians[modifierAddress.address] = {
                owners: modifierAddress.owners,
                threshold: modifierAddress.signersThreshold,
              };
            }
          }
        }

        umbrellaTableBody += getTableBody([
          `[${contractName}](${explorerAddressUrlComposer(
            contract.address,
            network,
          )})`,
          `${generateTableAddress(
            contract.proxyAdmin,
            addressesNames,
            contractsByAddress,
            poolGuardians,
            network,
          )}`,
          `${modifier.modifier}`,
          `${modifier.addresses
            .map((modifierAddress: AddressInfo) =>
              generateTableAddress(
                modifierAddress.address,
                addressesNames,
                contractsByAddress,
                poolGuardians,
                network,
                modifierAddress.chain,
              ),
            )
            .join(', ')}`,
          modifier?.functions ? modifier.functions.join(', ') : '',
        ]);
        umbrellaTableBody += getLineSeparator(
          umbrellaHeaderTitles.length,
        );
      }
    }

    umbrellaTable += umbrellaTableBody;
    readmeByNetwork += umbrellaTable + '\n';

  }

  // Agent Hub Table

  if (poolPermitsByContract.agentHub &&
    Object.keys(poolPermitsByContract.agentHub).length > 0 &&
    poolPermitsByContract.agentHub.contracts) {

    let agentHubTable = `### Agent Hub Contracts \n`;
    const agentHubHeaderTitles = [
      'contract',
      'proxyAdmin',
      'modifier',
      'permission owner',
      'functions',
    ];
    const agentHubHeader = getTableHeader(agentHubHeaderTitles);
    agentHubTable += agentHubHeader;

    let agentHubTableBody = '';
    for (let contractName of Object.keys(
      poolPermitsByContract.agentHub.contracts,
    )) {
      const contract = poolPermitsByContract.agentHub.contracts[contractName];

      if (contract.modifiers.length === 0) {
        agentHubTableBody += getTableBody([
          `[${contractName}](${explorerAddressUrlComposer(
            contract.address,
            network,
          )})`,
          `${generateTableAddress(
            contract.proxyAdmin,
            addressesNames,
            contractsByAddress,
            poolGuardians,
            network,
          )}`,
          `-`,
          `-`,
          '-',
        ]);
        agentHubTableBody += getLineSeparator(
          agentHubHeaderTitles.length,
        );
      }
      for (let modifier of contract.modifiers) {
        for (let modifierAddress of modifier.addresses) {
          if (!poolGuardians[modifierAddress.address]) {
            if (modifierAddress.owners.length > 0) {
              poolGuardians[modifierAddress.address] = {
                owners: modifierAddress.owners,
                threshold: modifierAddress.signersThreshold,
              };
            }
          }
        }
        agentHubTableBody += getTableBody([
          `[${contractName}](${explorerAddressUrlComposer(
            contract.address,
            network,
          )})`,
          `${generateTableAddress(
            contract.proxyAdmin,
            addressesNames,
            contractsByAddress,
            poolGuardians,
            network,
          )}`,
          `${modifier.modifier}`,
          `${modifier.addresses
            .map((modifierAddress: AddressInfo) =>
              generateTableAddress(
                modifierAddress.address,
                addressesNames,
                contractsByAddress,
                poolGuardians,
                network,
                modifierAddress.chain,
              ),
            )
            .join(', ')}`,
          modifier?.functions ? modifier.functions.join(', ') : '',
        ]);
        agentHubTableBody += getLineSeparator(
          agentHubHeaderTitles.length,
        );
      }
    }
    agentHubTable += agentHubTableBody;
    readmeByNetwork += agentHubTable + '\n';
  }

  // PPC Table
  if (poolPermitsByContract.ppc &&
    Object.keys(poolPermitsByContract.ppc).length > 0 &&
    poolPermitsByContract.ppc.contracts) {


    let ppcTable = `### Permissioned Payloads Controller Contracts \n`;
    const ppcHeaderTitles = [
      'contract',
      'proxyAdmin',
      'modifier',
      'permission owner',
      'functions',
    ];
    const ppcHeader = getTableHeader(ppcHeaderTitles);
    ppcTable += ppcHeader;

    let ppcTableBody = '';
    for (let contractName of Object.keys(
      poolPermitsByContract.ppc.contracts,
    )) {
      const contract = poolPermitsByContract.ppc.contracts[contractName];

      if (contract.modifiers.length === 0) {
        ppcTableBody += getTableBody([
          `[${contractName}](${explorerAddressUrlComposer(
            contract.address,
            network,
          )})`,
          `${generateTableAddress(
            contract.proxyAdmin,
            addressesNames,
            contractsByAddress,
            poolGuardians,
            network,
          )}`,
          `-`,
          `-`,
          '-',
        ]);
        ppcTableBody += getLineSeparator(
          ppcHeaderTitles.length,
        );
      }
      for (let modifier of contract.modifiers) {
        for (let modifierAddress of modifier.addresses) {
          if (!poolGuardians[modifierAddress.address]) {
            if (modifierAddress.owners.length > 0) {
              poolGuardians[modifierAddress.address] = {
                owners: modifierAddress.owners,
                threshold: modifierAddress.signersThreshold,
              };
            }
          }
        }

        ppcTableBody += getTableBody([
          `[${contractName}](${explorerAddressUrlComposer(
            contract.address,
            network,
          )})`,
          `${generateTableAddress(
            contract.proxyAdmin,
            addressesNames,
            contractsByAddress,
            poolGuardians,
            network,
          )}`,
          `${modifier.modifier}`,
          `${modifier.addresses
            .map((modifierAddress: AddressInfo) =>
              generateTableAddress(
                modifierAddress.address,
                addressesNames,
                contractsByAddress,
                poolGuardians,
                network,
                modifierAddress.chain,
              ),
            )
            .join(', ')}`,
          modifier?.functions ? modifier.functions.join(', ') : '',
        ]);
        ppcTableBody += getLineSeparator(
          ppcHeaderTitles.length,
        );
      }
    }

    ppcTable += ppcTableBody;
    readmeByNetwork += ppcTable + '\n';

  }

  if (Object.keys(poolGuardians).length > 0) {
    let guardianTable = `### Guardians \n`;
    const guardianHeaderTitles = ['Guardian', 'Threshold', 'Address', 'Owners'];
    const guardianHeader = getTableHeader(guardianHeaderTitles);
    guardianTable += guardianHeader;

    Object.keys(poolGuardians).forEach((guardian) => {
      guardianTable += getTableBody([
        `[${addressesNames[getAddress(guardian)]
          ? addressesNames[getAddress(guardian)]
          : `${getAddress(guardian)} (Safe)`
        }](${explorerAddressUrlComposer(guardian, network)})`,
        `${poolGuardians[guardian].threshold}/${poolGuardians[guardian].owners.length}`,
        guardian,
        `${poolGuardians[guardian].owners
          .map(
            (owner) =>
              `[${owner}](${explorerAddressUrlComposer(owner, network)})`,
          )
          .join(', ')}`,
      ]);
      guardianTable += getLineSeparator(guardianHeaderTitles.length);
    });

    readmeByNetwork += guardianTable + '\n';
  }
  let adminTable = `### Admins \n`;
  const adminsHeaderTitles = ['Role', 'Contract'];
  const adminHeader = getTableHeader(adminsHeaderTitles);
  adminTable += adminHeader;

  if (
    networkConfigs[network].pools[pool] &&
    poolPermitsByContract.roles &&
    poolPermitsByContract.roles.role
  ) {
    Object.keys(poolPermitsByContract.roles.role).forEach((role) => {
      const roleAddresses = poolPermitsByContract.roles?.role[role] || [];
      adminTable += getTableBody([
        role,
        `${roleAddresses
          .map((roleAddress: string) =>
            generateTableAddress(
              roleAddress,
              addressesNames,
              contractsByAddress,
              poolGuardians,
              network,
            ),
          )
          .join(', ')}`,
      ]);
      adminTable += getLineSeparator(adminsHeaderTitles.length);
    });

    readmeByNetwork += adminTable + '\n';
  }

  let ggAdminTable = `### Granular Guardian Admins \n`;
  const ggAdminsHeaderTitles = ['Role', 'Contract'];
  const ggAdminHeader = getTableHeader(ggAdminsHeaderTitles);
  ggAdminTable += ggAdminHeader;

  if (
    networkConfigs[network].pools[pool] &&
    poolPermitsByContract.govV3 &&
    poolPermitsByContract.govV3.ggRoles &&
    poolPermitsByContract.govV3.ggRoles.role
  ) {
    Object.keys(poolPermitsByContract.govV3.ggRoles.role).forEach((role) => {
      const roleAddresses =
        poolPermitsByContract.govV3?.ggRoles?.role[role] || [];
      ggAdminTable += getTableBody([
        role,
        `${roleAddresses
          .map((roleAddress: string) =>
            generateTableAddress(
              roleAddress,
              addressesNames,
              contractsByAddress,
              poolGuardians,
              network,
            ),
          )
          .join(', ')}`,
      ]);
      ggAdminTable += getLineSeparator(ggAdminsHeaderTitles.length);
    });

    readmeByNetwork += ggAdminTable + '\n';
  }

  // umbrella admins
  let umbrellaAdminTable = `### Umbrella Admins \n`;
  const umbrellaAdminHeaderTitles = ['Role', 'Contract'];
  const umbrellaAdminHeader = getTableHeader(umbrellaAdminHeaderTitles);
  umbrellaAdminTable += umbrellaAdminHeader;

  if (
    networkConfigs[network].pools[pool] &&
    poolPermitsByContract.umbrella &&
    poolPermitsByContract.umbrella.umbrellaRoles &&
    poolPermitsByContract.umbrella.umbrellaRoles.role &&
    poolPermitsByContract.umbrella.umbrellaIncentivesRoles &&
    poolPermitsByContract.umbrella.umbrellaIncentivesRoles.role
  ) {
    const umbrellaRoles = { ...poolPermitsByContract.umbrella.umbrellaRoles.role, ...poolPermitsByContract.umbrella.umbrellaIncentivesRoles.role }
    Object.keys(umbrellaRoles).forEach((role) => {
      const roleAddresses = umbrellaRoles[role] || [];
      umbrellaAdminTable += getTableBody([
        role,
        `${roleAddresses
          .map((roleAddress: string) =>
            generateTableAddress(
              roleAddress,
              addressesNames,
              contractsByAddress,
              poolGuardians,
              network,
            ),
          )
          .join(', ')}`,
      ]);
      umbrellaAdminTable += getLineSeparator(umbrellaAdminHeaderTitles.length);
    });

    readmeByNetwork += umbrellaAdminTable + '\n';
  }

  // collector tables
  let collectorAdminTable = `### Collector Admins \n`;
  const collectorAdminHeaderTitles = ['Role', 'Contract'];
  const collectorAdminHeader = getTableHeader(collectorAdminHeaderTitles);
  collectorAdminTable += collectorAdminHeader;

  if (
    networkConfigs[network].pools[pool] &&
    poolPermitsByContract.collector &&
    poolPermitsByContract.collector.cRoles &&
    poolPermitsByContract.collector.cRoles.role
  ) {
    Object.keys(poolPermitsByContract.collector.cRoles.role).forEach((role) => {
      const roleAddresses = poolPermitsByContract.collector?.cRoles.role[role] || [];
      collectorAdminTable += getTableBody([
        role,
        `${roleAddresses
          .map((roleAddress: string) =>
            generateTableAddress(
              roleAddress,
              addressesNames,
              contractsByAddress,
              poolGuardians,
              network,
            ),
          )
          .join(', ')}`,
      ]);
      collectorAdminTable += getLineSeparator(collectorAdminHeaderTitles.length);
    });

    readmeByNetwork += collectorAdminTable + '\n';
  }

  // Clinic Steward tables
  let clinicStewardAdminTable = `### Clinic Steward Admins \n`;
  const clinicStewardAdminHeaderTitles = ['Role', 'Contract'];
  const clinicStewardAdminHeader = getTableHeader(clinicStewardAdminHeaderTitles);
  clinicStewardAdminTable += clinicStewardAdminHeader;

  if (
    networkConfigs[network].pools[pool] &&
    poolPermitsByContract.clinicSteward &&
    poolPermitsByContract.clinicSteward.clinicStewardRoles &&
    poolPermitsByContract.clinicSteward.clinicStewardRoles.role
  ) {
    Object.keys(poolPermitsByContract.clinicSteward.clinicStewardRoles.role).forEach((role) => {
      const roleAddresses = poolPermitsByContract.clinicSteward?.clinicStewardRoles.role[role] || [];
      clinicStewardAdminTable += getTableBody([
        role,
        `${roleAddresses
          .map((roleAddress: string) =>
            generateTableAddress(
              roleAddress,
              addressesNames,
              contractsByAddress,
              poolGuardians,
              network,
            ),
          )
          .join(', ')}`,
      ]);
      clinicStewardAdminTable += getLineSeparator(clinicStewardAdminHeaderTitles.length);
    });

    readmeByNetwork += clinicStewardAdminTable + '\n';
  }

  // gho gsms tables
  if (networkConfigs[network].pools[pool] && poolPermitsByContract.gsmRoles) {
    for (
      let i = 0;
      i < Object.keys(poolPermitsByContract.gsmRoles).length;
      i++
    ) {
      const key = Object.keys(poolPermitsByContract.gsmRoles)[i];
      const gsmRoles = poolPermitsByContract.gsmRoles[key];
      let gsmAdminTable = `### Admins ${key}\n`;
      const gsmAdminsHeaderTitles = ['Role', 'Contract'];
      const gsmAdminHeader = getTableHeader(gsmAdminsHeaderTitles);
      gsmAdminTable += gsmAdminHeader;

      Object.keys(gsmRoles.role).forEach((role) => {
        const roleAddresses = gsmRoles?.role[role] || [];
        gsmAdminTable += getTableBody([
          role,
          `${roleAddresses
            .map((roleAddress: string) =>
              generateTableAddress(
                roleAddress,
                addressesNames,
                contractsByAddress,
                poolGuardians,
                network,
              ),
            )
            .join(', ')}`,
        ]);
        gsmAdminTable += getLineSeparator(gsmAdminsHeaderTitles.length);
      });

      readmeByNetwork += gsmAdminTable + '\n';
    }
  }

  let poolName = pool;
  if (networkConfigs[network].pools[pool].tenderlyBasePool) {
    poolName = networkConfigs[network].pools[pool].tenderlyBasePool;
  }
  saveJson(`./out/${networkName}-${poolName}.md`, readmeByNetwork);

  return readmeDirectoryTable;
};

const checkForTenderlyPool = (
  pools: Record<string, PoolConfigs>,
  selectedPool: string,
): boolean => {
  if (!process.env.TENDERLY || process.env.TENDERLY === 'false') {
    return false;
  }

  const poolNames = Object.keys(pools).map((pool) => pool);
  for (const poolName of poolNames) {
    if (
      poolName !== selectedPool &&
      pools[poolName].tenderlyBasePool &&
      pools[poolName].tenderlyBasePool === selectedPool
    ) {
      return true;
    }
  }

  return false;
};

export const generateAllTables = () => {
  const networks = Object.keys(networkConfigs).map((network) => network);

  // create readme string
  let readmeDirectoryTable = '';
  const readmeDirectoryTableHeaderTitles = ['Network', 'System type', 'Tables'];
  const readmeDirectoryHeader = getTableHeader(
    readmeDirectoryTableHeaderTitles,
  );
  readmeDirectoryTable += readmeDirectoryHeader;

  for (let network of networks) {
    const pools = Object.keys(networkConfigs[network].pools).map(
      (pool) => pool,
    );
    for (let pool of pools) {
      // if pool has a tenderly pool enabled only generate tenderly
      const hasTenderlyTable = checkForTenderlyPool(
        networkConfigs[network].pools,
        pool,
      );

      if (!hasTenderlyTable) {
        readmeDirectoryTable += generateTable(network, pool);
      }
    }
  }

  saveJson('./README.md', getPrincipalReadme(readmeDirectoryTable));
};

generateAllTables();
