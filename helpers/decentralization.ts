import { ContractInfo, Contracts } from './types.js';
import actionsConfig from '../statics/actionsConfig.json' assert { type: 'json' };

export type Decentralization = {
  upgradeable: boolean;
  ownedBy: Controller;
};

export enum Controller {
  NONE = 'Not owned',
  GOV_V3 = 'Governance',
  MULTI_SIG = 'Multi-sig',
  EOA = 'External Contract',
  PPC_MULTI_SIG = 'PPC Multi-sig',
  STEWARD = 'Steward',
}

export const getActionExecutors = (poolInfo: Contracts, govInfo: Contracts, isWhiteLabel: boolean, addressesNames: Record<string, string>) => {
  const actionsObject: Record<string, Set<string>> = {};
  Object.keys(actionsConfig).forEach((action) => {
    actionsObject[action] = new Set<string>();
    for (let contractName of Object.keys(poolInfo)) {
      const contract = poolInfo[contractName];
      // search all modifiers
      contract.modifiers.forEach((modifier) => {
        const hasFunction = modifier.functions.some((functionName: string) =>
          // @ts-ignore
          actionsConfig[action].includes(functionName),
        );
        if (hasFunction) {
          if (
            action === 'updateReserveBorrowSettings' ||
            action === 'configureCollateral' ||
            action === 'updateReserveSettings' ||
            action === 'reserveUpgradeability' ||
            action === 'configureProtocolFees'
          ) {
            if (isWhiteLabel) {
              actionsObject[action].add(Controller.PPC_MULTI_SIG);
            } else {
              actionsObject[action].add(Controller.GOV_V3);
            }
          } else {
            modifier.addresses.map((addressInfo) => {
              const addressName = addressesNames[addressInfo.address];
              if (addressName && (addressName.toLowerCase().includes('steward') || addressName.toLowerCase().includes('agrs'))) {
                actionsObject[action].add(Controller.STEWARD);
              } else {
                if (addressInfo.owners.length > 0) {
                  if (contractName.toLowerCase().includes('steward') || contractName.toLowerCase().includes('agrs')) {
                    actionsObject[action].add(Controller.STEWARD);
                  } else {
                    actionsObject[action].add(Controller.MULTI_SIG);
                  }
                } else {
                  const addressInPoolInfo = Object.keys(poolInfo).find((poolInfoContractName) => poolInfo[poolInfoContractName].address.toLowerCase() === addressInfo.address.toLowerCase());
                  if (addressInPoolInfo && (addressInPoolInfo.toLowerCase().includes('steward') || addressInPoolInfo.toLowerCase().includes('agrs'))) {
                    actionsObject[action].add(Controller.STEWARD);
                  } else {
                    const ownedInfo = isAdministeredAndByWho(
                      addressInfo.address,
                      poolInfo,
                      govInfo,
                      isWhiteLabel,
                    );
                    if (ownedInfo.owned) {
                      if (ownedInfo.ownedByAddress) {
                        const addressEOAName = addressesNames[ownedInfo.ownedByAddress];
                        if (addressEOAName && (addressEOAName.toLowerCase().includes('steward') || addressEOAName.toLowerCase().includes('agrs'))) {
                          actionsObject[action].add(Controller.STEWARD);
                        } else {
                          actionsObject[action].add(ownedInfo.ownedBy);
                        }
                      } else {
                        actionsObject[action].add(ownedInfo.ownedBy);
                      }
                    } else {
                      const addressEOAName = addressesNames[addressInfo.address];
                      if (contractName.toLowerCase().includes('steward') || contractName.toLowerCase().includes('agrs') || (addressEOAName && addressEOAName.toLowerCase().includes('steward'))) {
                        actionsObject[action].add(Controller.STEWARD);
                      } else {
                        actionsObject[action].add(Controller.EOA);
                      }
                    }
                  }
                }
              }
            });
          }
        }
      });
    }
  });

  return actionsObject;
};

export const getLevelOfDecentralization = (
  contract: ContractInfo,
  poolInfo: Contracts,
  govInfo: Contracts,
  isWhiteLabel: boolean,
): Decentralization => {
  let upgradeable = false;
  let ownedBy = Controller.NONE;

  // check if it has proxy admin (means upgradeable)
  if (contract.proxyAdmin) {
    upgradeable = true;
    let proxyOwnership = isOwnedAndByWho(
      contract.proxyAdmin,
      poolInfo,
      govInfo,
      isWhiteLabel,
    );

    if (proxyOwnership.owned) {
      ownedBy = proxyOwnership.ownedBy;
    }
  } else {
    let ownership = isOwnedAndByWho(contract.address, poolInfo, govInfo, isWhiteLabel);
    if (ownership.owned) {
      ownedBy = ownership.ownedBy;
    }
  }

  return { upgradeable, ownedBy };
};

const isOwnedByGov = (
  address: string,
  govInfo: Contracts,
  initialAddress: string,
): boolean => {
  let ownerFound = false;
  for (let contractName of Object.keys(govInfo)) {
    const contract = govInfo[contractName];
    if (contract.address.toLowerCase() === address.toLowerCase()) {
      if (contract.proxyAdmin) {
        ownerFound = isOwnedByGov(contract.proxyAdmin, govInfo, initialAddress);
        if (ownerFound) return ownerFound;
      }

      contract.modifiers.forEach((modifierInfo) => {
        if (
          modifierInfo.modifier === 'onlyOwner' ||
          modifierInfo.modifier === 'onlyEthereumGovernanceExecutor'
        ) {
          // @dev we use > 0 because we need to arrive to the contract that does not have owners.
          if (modifierInfo.addresses[0].owners.length > 0) {
            ownerFound = false;
          } else {
            // @dev case of executor owned by pc, and pc owned by executor
            if (
              modifierInfo.addresses[0].address.toLowerCase() ===
              initialAddress.toLowerCase()
            ) {
              ownerFound = true;
            } else {
              let owned = isOwnedByGov(
                modifierInfo.addresses[0].address,
                govInfo,
                address,
              );
              ownerFound = owned;
            }
          }
        }
      });
    }
  }

  return ownerFound;
};

const isOwnedAndByWho = (
  address: string,
  poolInfo: Contracts,
  govInfo: Contracts,
  isWhiteLabel: boolean,
): { owned: boolean; ownedBy: Controller, ownedByAddress?: string } => {
  // @dev hardcoded address off double proxy gho facilitator. Can be removed after facilitator gets changed
  if (address.toLowerCase() === ('0xf02d4931e0d5c79af9094cd9dff16ea6e3d9acb8').toLowerCase()) {
    return { owned: true, ownedBy: Controller.GOV_V3 };
  }
  let ownerInfo = { owned: false, ownedBy: Controller.EOA } as { owned: boolean; ownedBy: Controller, ownedByAddress?: string };
  for (let contractName of Object.keys(poolInfo)) {
    const contract = poolInfo[contractName];
    if (contract.address?.toLowerCase() === address.toLowerCase()) {
      if (contract.proxyAdmin) {
        ownerInfo = isOwnedAndByWho(contract.proxyAdmin, poolInfo, govInfo, isWhiteLabel);

      } else {
        contract.modifiers.forEach((modifierInfo) => {
          if (modifierInfo.modifier === 'onlyOwner') {
            if (modifierInfo.addresses[0].owners.length > 0) {
              ownerInfo = { owned: true, ownedBy: Controller.MULTI_SIG };
            } else {
              const ownedByGov = isOwnedByGov(
                modifierInfo.addresses[0].address,
                govInfo,
                modifierInfo.addresses[0].address,
              );
              if (ownedByGov) {
                if (isWhiteLabel) {
                  ownerInfo = { owned: true, ownedBy: Controller.PPC_MULTI_SIG };
                } else {
                  ownerInfo = { owned: true, ownedBy: Controller.GOV_V3 };
                }
              } else {
                ownerInfo = { owned: true, ownedBy: Controller.EOA, ownedByAddress: modifierInfo.addresses[0].address };
              }
            }
          }
        });
      }
    }
  }

  return ownerInfo;
};

const isAdministeredAndByWho = (
  address: string,
  poolInfo: Contracts,
  govInfo: Contracts,
  isWhiteLabel: boolean,
): { owned: boolean; ownedBy: Controller, ownedByAddress?: string } => {

  let ownerInfo = { owned: false, ownedBy: Controller.EOA } as { owned: boolean; ownedBy: Controller, ownedByAddress?: string };
  for (let contractName of Object.keys(poolInfo)) {
    const contract = poolInfo[contractName];
    if (contract.address?.toLowerCase() === address.toLowerCase()) {
      if (contract.proxyAdmin) {
        ownerInfo = isOwnedAndByWho(contract.proxyAdmin, poolInfo, govInfo, isWhiteLabel);
      } else {
        contract.modifiers.forEach((modifierInfo) => {
          if (
            modifierInfo.modifier === 'onlyOwner' ||
            modifierInfo.modifier === 'onlyEthereumGovernanceExecutor' ||
            (modifierInfo.modifier === 'onlyRiskCouncil' &&
              contractName !== 'GhoStewardV2') ||
            modifierInfo.modifier === 'onlyEmergencyAdmin' ||
            modifierInfo.modifier === 'onlyDefaultAdmin'
            // modifierInfo.modifier === 'onlyPayloadsManager'
          ) {
            if (modifierInfo.addresses[0].owners.length > 0) {
              ownerInfo = { owned: true, ownedBy: Controller.MULTI_SIG };
            } else {
              const ownedByGov = isOwnedByGov(
                modifierInfo.addresses[0].address,
                govInfo,
                modifierInfo.addresses[0].address,
              );
              if (ownedByGov) {
                if (isWhiteLabel) {
                  ownerInfo = { owned: true, ownedBy: Controller.PPC_MULTI_SIG };
                } else {
                  ownerInfo = { owned: true, ownedBy: Controller.GOV_V3 };
                }
              } else {
                ownerInfo = { owned: true, ownedBy: Controller.EOA, ownedByAddress: modifierInfo.addresses[0].address };
              }
            }
          }
        });
      }
    }
  }

  return ownerInfo;
};
