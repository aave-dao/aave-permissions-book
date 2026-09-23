export const v4RiskStewardAbi = [
  {
    inputs: [
      { internalType: 'address', name: 'riskCouncil_', type: 'address' },
      { internalType: 'address', name: 'initialOwner_', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  { inputs: [], name: 'ConfiguratorMismatch', type: 'error' },
  { inputs: [], name: 'DebounceNotRespected', type: 'error' },
  { inputs: [], name: 'InvalidCaller', type: 'error' },
  { inputs: [], name: 'InvalidParamConfig', type: 'error' },
  { inputs: [], name: 'InvalidPriceCapUpdate', type: 'error' },
  { inputs: [], name: 'InvalidUpdateToZero', type: 'error' },
  { inputs: [], name: 'NoExistingDynamicConfig', type: 'error' },
  { inputs: [], name: 'NoZeroUpdates', type: 'error' },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  { inputs: [], name: 'ParamChangeNotAllowed', type: 'error' },
  {
    inputs: [{ internalType: 'address', name: 'addr', type: 'address' }],
    name: 'RestrictedAddress',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'int256', name: 'value', type: 'int256' }],
    name: 'SafeCastOverflowedIntToUint',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint8', name: 'bits', type: 'uint8' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
    ],
    name: 'SafeCastOverflowedUintDowncast',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'value', type: 'uint256' }],
    name: 'SafeCastOverflowedUintToInt',
    type: 'error',
  },
  { inputs: [], name: 'UpdateNotInRange', type: 'error' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'addr', type: 'address' },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isRestricted',
        type: 'bool',
      },
    ],
    name: 'AddressRestricted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'contract IHubConfigurator',
                name: 'configurator',
                type: 'address',
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'optimalUsageRatio',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'baseDrawnRate',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'rateGrowthBeforeOptimal',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'rateGrowthAfterOptimal',
                    type: 'tuple',
                  },
                ],
                internalType: 'struct IRiskSteward.HubRateConfig',
                name: 'rate',
                type: 'tuple',
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'addCap',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'drawCap',
                    type: 'tuple',
                  },
                ],
                internalType: 'struct IRiskSteward.HubCapConfig',
                name: 'cap',
                type: 'tuple',
              },
            ],
            internalType: 'struct IRiskSteward.HubConfig',
            name: 'hub',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'contract ISpokeConfigurator',
                name: 'configurator',
                type: 'address',
              },
              {
                components: [
                  { internalType: 'uint40', name: 'minDelay', type: 'uint40' },
                  {
                    internalType: 'uint208',
                    name: 'maxPercentChange',
                    type: 'uint208',
                  },
                  {
                    internalType: 'bool',
                    name: 'isChangeRelative',
                    type: 'bool',
                  },
                ],
                internalType: 'struct IRiskSteward.RiskParamConfig',
                name: 'collateralRisk',
                type: 'tuple',
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'collateralFactor',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'maxLiquidationBonus',
                    type: 'tuple',
                  },
                ],
                internalType: 'struct IRiskSteward.SpokeDynamicConfig',
                name: 'dynamicUpdate',
                type: 'tuple',
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'collateralFactor',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'maxLiquidationBonus',
                    type: 'tuple',
                  },
                ],
                internalType: 'struct IRiskSteward.SpokeDynamicConfig',
                name: 'dynamicAdd',
                type: 'tuple',
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'targetHealthFactor',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'healthFactorForMaxBonus',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'liquidationBonusFactor',
                    type: 'tuple',
                  },
                ],
                internalType: 'struct IRiskSteward.SpokeLiquidationConfig',
                name: 'liquidation',
                type: 'tuple',
              },
            ],
            internalType: 'struct IRiskSteward.SpokeConfig',
            name: 'spoke',
            type: 'tuple',
          },
          {
            components: [
              {
                components: [
                  { internalType: 'uint40', name: 'minDelay', type: 'uint40' },
                  {
                    internalType: 'uint208',
                    name: 'maxPercentChange',
                    type: 'uint208',
                  },
                  {
                    internalType: 'bool',
                    name: 'isChangeRelative',
                    type: 'bool',
                  },
                ],
                internalType: 'struct IRiskSteward.RiskParamConfig',
                name: 'priceCapLst',
                type: 'tuple',
              },
              {
                components: [
                  { internalType: 'uint40', name: 'minDelay', type: 'uint40' },
                  {
                    internalType: 'uint208',
                    name: 'maxPercentChange',
                    type: 'uint208',
                  },
                  {
                    internalType: 'bool',
                    name: 'isChangeRelative',
                    type: 'bool',
                  },
                ],
                internalType: 'struct IRiskSteward.RiskParamConfig',
                name: 'priceCapStable',
                type: 'tuple',
              },
              {
                components: [
                  { internalType: 'uint40', name: 'minDelay', type: 'uint40' },
                  {
                    internalType: 'uint208',
                    name: 'maxPercentChange',
                    type: 'uint208',
                  },
                  {
                    internalType: 'bool',
                    name: 'isChangeRelative',
                    type: 'bool',
                  },
                ],
                internalType: 'struct IRiskSteward.RiskParamConfig',
                name: 'discountRatePendle',
                type: 'tuple',
              },
            ],
            internalType: 'struct IRiskSteward.OracleConfig',
            name: 'oracle',
            type: 'tuple',
          },
        ],
        indexed: false,
        internalType: 'struct IRiskSteward.Config',
        name: 'config',
        type: 'tuple',
      },
    ],
    name: 'ConfigSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferStarted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [],
    name: 'RISK_COUNCIL',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'contract ISpokeConfigurator',
            name: 'spokeConfigurator',
            type: 'address',
          },
          { internalType: 'address', name: 'spoke', type: 'address' },
          { internalType: 'address', name: 'hub', type: 'address' },
          { internalType: 'address', name: 'underlying', type: 'address' },
          {
            components: [
              {
                internalType: 'uint16',
                name: 'collateralFactor',
                type: 'uint16',
              },
              {
                internalType: 'uint32',
                name: 'maxLiquidationBonus',
                type: 'uint32',
              },
              {
                internalType: 'uint16',
                name: 'liquidationFee',
                type: 'uint16',
              },
            ],
            internalType: 'struct ISpoke.DynamicReserveConfig',
            name: 'dynamicConfig',
            type: 'tuple',
          },
        ],
        internalType:
          'struct IAaveV4ConfigEngine.DynamicReserveConfigAddition[]',
        name: 'additions',
        type: 'tuple[]',
      },
    ],
    name: 'addDynamicReserveConfigs',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getConfig',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'contract IHubConfigurator',
                name: 'configurator',
                type: 'address',
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'optimalUsageRatio',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'baseDrawnRate',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'rateGrowthBeforeOptimal',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'rateGrowthAfterOptimal',
                    type: 'tuple',
                  },
                ],
                internalType: 'struct IRiskSteward.HubRateConfig',
                name: 'rate',
                type: 'tuple',
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'addCap',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'drawCap',
                    type: 'tuple',
                  },
                ],
                internalType: 'struct IRiskSteward.HubCapConfig',
                name: 'cap',
                type: 'tuple',
              },
            ],
            internalType: 'struct IRiskSteward.HubConfig',
            name: 'hub',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'contract ISpokeConfigurator',
                name: 'configurator',
                type: 'address',
              },
              {
                components: [
                  { internalType: 'uint40', name: 'minDelay', type: 'uint40' },
                  {
                    internalType: 'uint208',
                    name: 'maxPercentChange',
                    type: 'uint208',
                  },
                  {
                    internalType: 'bool',
                    name: 'isChangeRelative',
                    type: 'bool',
                  },
                ],
                internalType: 'struct IRiskSteward.RiskParamConfig',
                name: 'collateralRisk',
                type: 'tuple',
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'collateralFactor',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'maxLiquidationBonus',
                    type: 'tuple',
                  },
                ],
                internalType: 'struct IRiskSteward.SpokeDynamicConfig',
                name: 'dynamicUpdate',
                type: 'tuple',
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'collateralFactor',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'maxLiquidationBonus',
                    type: 'tuple',
                  },
                ],
                internalType: 'struct IRiskSteward.SpokeDynamicConfig',
                name: 'dynamicAdd',
                type: 'tuple',
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'targetHealthFactor',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'healthFactorForMaxBonus',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'liquidationBonusFactor',
                    type: 'tuple',
                  },
                ],
                internalType: 'struct IRiskSteward.SpokeLiquidationConfig',
                name: 'liquidation',
                type: 'tuple',
              },
            ],
            internalType: 'struct IRiskSteward.SpokeConfig',
            name: 'spoke',
            type: 'tuple',
          },
          {
            components: [
              {
                components: [
                  { internalType: 'uint40', name: 'minDelay', type: 'uint40' },
                  {
                    internalType: 'uint208',
                    name: 'maxPercentChange',
                    type: 'uint208',
                  },
                  {
                    internalType: 'bool',
                    name: 'isChangeRelative',
                    type: 'bool',
                  },
                ],
                internalType: 'struct IRiskSteward.RiskParamConfig',
                name: 'priceCapLst',
                type: 'tuple',
              },
              {
                components: [
                  { internalType: 'uint40', name: 'minDelay', type: 'uint40' },
                  {
                    internalType: 'uint208',
                    name: 'maxPercentChange',
                    type: 'uint208',
                  },
                  {
                    internalType: 'bool',
                    name: 'isChangeRelative',
                    type: 'bool',
                  },
                ],
                internalType: 'struct IRiskSteward.RiskParamConfig',
                name: 'priceCapStable',
                type: 'tuple',
              },
              {
                components: [
                  { internalType: 'uint40', name: 'minDelay', type: 'uint40' },
                  {
                    internalType: 'uint208',
                    name: 'maxPercentChange',
                    type: 'uint208',
                  },
                  {
                    internalType: 'bool',
                    name: 'isChangeRelative',
                    type: 'bool',
                  },
                ],
                internalType: 'struct IRiskSteward.RiskParamConfig',
                name: 'discountRatePendle',
                type: 'tuple',
              },
            ],
            internalType: 'struct IRiskSteward.OracleConfig',
            name: 'oracle',
            type: 'tuple',
          },
        ],
        internalType: 'struct IRiskSteward.Config',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'hub', type: 'address' },
      { internalType: 'address', name: 'asset', type: 'address' },
    ],
    name: 'getHubAssetDebounce',
    outputs: [
      {
        components: [
          { internalType: 'uint40', name: 'optimalUsageRatio', type: 'uint40' },
          { internalType: 'uint40', name: 'baseDrawnRate', type: 'uint40' },
          {
            internalType: 'uint40',
            name: 'rateGrowthBeforeOptimal',
            type: 'uint40',
          },
          {
            internalType: 'uint40',
            name: 'rateGrowthAfterOptimal',
            type: 'uint40',
          },
        ],
        internalType: 'struct IRiskSteward.HubAssetDebounce',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'hub', type: 'address' },
      { internalType: 'address', name: 'spoke', type: 'address' },
      { internalType: 'address', name: 'asset', type: 'address' },
    ],
    name: 'getHubSpokeAssetDebounce',
    outputs: [
      {
        components: [
          { internalType: 'uint40', name: 'addCap', type: 'uint40' },
          { internalType: 'uint40', name: 'drawCap', type: 'uint40' },
        ],
        internalType: 'struct IRiskSteward.HubSpokeAssetDebounce',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'oracle', type: 'address' }],
    name: 'getOracleDebounce',
    outputs: [{ internalType: 'uint40', name: '', type: 'uint40' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spoke', type: 'address' },
      { internalType: 'address', name: 'hub', type: 'address' },
      { internalType: 'address', name: 'asset', type: 'address' },
    ],
    name: 'getSpokeDynamicDebounce',
    outputs: [
      {
        components: [
          { internalType: 'uint40', name: 'collateralFactor', type: 'uint40' },
          {
            internalType: 'uint40',
            name: 'maxLiquidationBonus',
            type: 'uint40',
          },
        ],
        internalType: 'struct IRiskSteward.SpokeDynamicDebounce',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'spoke', type: 'address' }],
    name: 'getSpokeLiquidationDebounce',
    outputs: [
      {
        components: [
          {
            internalType: 'uint40',
            name: 'targetHealthFactor',
            type: 'uint40',
          },
          {
            internalType: 'uint40',
            name: 'healthFactorForMaxBonus',
            type: 'uint40',
          },
          {
            internalType: 'uint40',
            name: 'liquidationBonusFactor',
            type: 'uint40',
          },
        ],
        internalType: 'struct IRiskSteward.SpokeLiquidationDebounce',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spoke', type: 'address' },
      { internalType: 'address', name: 'hub', type: 'address' },
      { internalType: 'address', name: 'asset', type: 'address' },
    ],
    name: 'getSpokeReserveDebounce',
    outputs: [
      {
        components: [
          { internalType: 'uint40', name: 'collateralRisk', type: 'uint40' },
        ],
        internalType: 'struct IRiskSteward.SpokeReserveDebounce',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'addr', type: 'address' }],
    name: 'isAddressRestricted',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'addr', type: 'address' },
      { internalType: 'bool', name: 'isRestricted', type: 'bool' },
    ],
    name: 'setAddressRestricted',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'contract IHubConfigurator',
                name: 'configurator',
                type: 'address',
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'optimalUsageRatio',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'baseDrawnRate',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'rateGrowthBeforeOptimal',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'rateGrowthAfterOptimal',
                    type: 'tuple',
                  },
                ],
                internalType: 'struct IRiskSteward.HubRateConfig',
                name: 'rate',
                type: 'tuple',
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'addCap',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'drawCap',
                    type: 'tuple',
                  },
                ],
                internalType: 'struct IRiskSteward.HubCapConfig',
                name: 'cap',
                type: 'tuple',
              },
            ],
            internalType: 'struct IRiskSteward.HubConfig',
            name: 'hub',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'contract ISpokeConfigurator',
                name: 'configurator',
                type: 'address',
              },
              {
                components: [
                  { internalType: 'uint40', name: 'minDelay', type: 'uint40' },
                  {
                    internalType: 'uint208',
                    name: 'maxPercentChange',
                    type: 'uint208',
                  },
                  {
                    internalType: 'bool',
                    name: 'isChangeRelative',
                    type: 'bool',
                  },
                ],
                internalType: 'struct IRiskSteward.RiskParamConfig',
                name: 'collateralRisk',
                type: 'tuple',
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'collateralFactor',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'maxLiquidationBonus',
                    type: 'tuple',
                  },
                ],
                internalType: 'struct IRiskSteward.SpokeDynamicConfig',
                name: 'dynamicUpdate',
                type: 'tuple',
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'collateralFactor',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'maxLiquidationBonus',
                    type: 'tuple',
                  },
                ],
                internalType: 'struct IRiskSteward.SpokeDynamicConfig',
                name: 'dynamicAdd',
                type: 'tuple',
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'targetHealthFactor',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'healthFactorForMaxBonus',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint40',
                        name: 'minDelay',
                        type: 'uint40',
                      },
                      {
                        internalType: 'uint208',
                        name: 'maxPercentChange',
                        type: 'uint208',
                      },
                      {
                        internalType: 'bool',
                        name: 'isChangeRelative',
                        type: 'bool',
                      },
                    ],
                    internalType: 'struct IRiskSteward.RiskParamConfig',
                    name: 'liquidationBonusFactor',
                    type: 'tuple',
                  },
                ],
                internalType: 'struct IRiskSteward.SpokeLiquidationConfig',
                name: 'liquidation',
                type: 'tuple',
              },
            ],
            internalType: 'struct IRiskSteward.SpokeConfig',
            name: 'spoke',
            type: 'tuple',
          },
          {
            components: [
              {
                components: [
                  { internalType: 'uint40', name: 'minDelay', type: 'uint40' },
                  {
                    internalType: 'uint208',
                    name: 'maxPercentChange',
                    type: 'uint208',
                  },
                  {
                    internalType: 'bool',
                    name: 'isChangeRelative',
                    type: 'bool',
                  },
                ],
                internalType: 'struct IRiskSteward.RiskParamConfig',
                name: 'priceCapLst',
                type: 'tuple',
              },
              {
                components: [
                  { internalType: 'uint40', name: 'minDelay', type: 'uint40' },
                  {
                    internalType: 'uint208',
                    name: 'maxPercentChange',
                    type: 'uint208',
                  },
                  {
                    internalType: 'bool',
                    name: 'isChangeRelative',
                    type: 'bool',
                  },
                ],
                internalType: 'struct IRiskSteward.RiskParamConfig',
                name: 'priceCapStable',
                type: 'tuple',
              },
              {
                components: [
                  { internalType: 'uint40', name: 'minDelay', type: 'uint40' },
                  {
                    internalType: 'uint208',
                    name: 'maxPercentChange',
                    type: 'uint208',
                  },
                  {
                    internalType: 'bool',
                    name: 'isChangeRelative',
                    type: 'bool',
                  },
                ],
                internalType: 'struct IRiskSteward.RiskParamConfig',
                name: 'discountRatePendle',
                type: 'tuple',
              },
            ],
            internalType: 'struct IRiskSteward.OracleConfig',
            name: 'oracle',
            type: 'tuple',
          },
        ],
        internalType: 'struct IRiskSteward.Config',
        name: 'config',
        type: 'tuple',
      },
    ],
    name: 'setConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'contract ISpokeConfigurator',
            name: 'spokeConfigurator',
            type: 'address',
          },
          { internalType: 'address', name: 'spoke', type: 'address' },
          { internalType: 'address', name: 'hub', type: 'address' },
          { internalType: 'address', name: 'underlying', type: 'address' },
          {
            internalType: 'uint256',
            name: 'dynamicConfigKey',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'collateralFactor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxLiquidationBonus',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'liquidationFee', type: 'uint256' },
        ],
        internalType: 'struct IAaveV4ConfigEngine.DynamicReserveConfigUpdate[]',
        name: 'updates',
        type: 'tuple[]',
      },
    ],
    name: 'updateDynamicReserveConfigs',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'contract IHubConfigurator',
            name: 'hubConfigurator',
            type: 'address',
          },
          { internalType: 'address', name: 'hub', type: 'address' },
          { internalType: 'address', name: 'underlying', type: 'address' },
          { internalType: 'uint256', name: 'liquidityFee', type: 'uint256' },
          { internalType: 'address', name: 'feeReceiver', type: 'address' },
          { internalType: 'address', name: 'irStrategy', type: 'address' },
          {
            components: [
              {
                internalType: 'uint16',
                name: 'optimalUsageRatio',
                type: 'uint16',
              },
              { internalType: 'uint32', name: 'baseDrawnRate', type: 'uint32' },
              {
                internalType: 'uint32',
                name: 'rateGrowthBeforeOptimal',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'rateGrowthAfterOptimal',
                type: 'uint32',
              },
            ],
            internalType: 'struct IAssetInterestRateStrategy.InterestRateData',
            name: 'irData',
            type: 'tuple',
          },
          {
            internalType: 'address',
            name: 'reinvestmentController',
            type: 'address',
          },
        ],
        internalType: 'struct IAaveV4ConfigEngine.AssetConfigUpdate[]',
        name: 'updates',
        type: 'tuple[]',
      },
    ],
    name: 'updateHubAssetIRs',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'contract IHubConfigurator',
            name: 'hubConfigurator',
            type: 'address',
          },
          { internalType: 'address', name: 'hub', type: 'address' },
          { internalType: 'address', name: 'underlying', type: 'address' },
          { internalType: 'address', name: 'spoke', type: 'address' },
          { internalType: 'uint256', name: 'addCap', type: 'uint256' },
          { internalType: 'uint256', name: 'drawCap', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'riskPremiumThreshold',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'active', type: 'uint256' },
          { internalType: 'uint256', name: 'halted', type: 'uint256' },
        ],
        internalType: 'struct IAaveV4ConfigEngine.SpokeConfigUpdate[]',
        name: 'updates',
        type: 'tuple[]',
      },
    ],
    name: 'updateHubSpokeCaps',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'oracle', type: 'address' },
          {
            components: [
              {
                internalType: 'uint104',
                name: 'snapshotRatio',
                type: 'uint104',
              },
              {
                internalType: 'uint48',
                name: 'snapshotTimestamp',
                type: 'uint48',
              },
              {
                internalType: 'uint16',
                name: 'maxYearlyRatioGrowthPercent',
                type: 'uint16',
              },
            ],
            internalType: 'struct IPriceCapAdapter.PriceCapUpdateParams',
            name: 'priceCapUpdateParams',
            type: 'tuple',
          },
        ],
        internalType: 'struct IRiskSteward.PriceCapLstUpdate[]',
        name: 'updates',
        type: 'tuple[]',
      },
    ],
    name: 'updateLstPriceCaps',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'oracle', type: 'address' },
          { internalType: 'uint256', name: 'discountRate', type: 'uint256' },
        ],
        internalType: 'struct IRiskSteward.DiscountRatePendleUpdate[]',
        name: 'updates',
        type: 'tuple[]',
      },
    ],
    name: 'updatePendleDiscountRates',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'contract ISpokeConfigurator',
            name: 'spokeConfigurator',
            type: 'address',
          },
          { internalType: 'address', name: 'spoke', type: 'address' },
          { internalType: 'address', name: 'hub', type: 'address' },
          { internalType: 'address', name: 'underlying', type: 'address' },
          { internalType: 'address', name: 'priceSource', type: 'address' },
          { internalType: 'uint256', name: 'collateralRisk', type: 'uint256' },
          { internalType: 'uint256', name: 'paused', type: 'uint256' },
          { internalType: 'uint256', name: 'frozen', type: 'uint256' },
          { internalType: 'uint256', name: 'borrowable', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'receiveSharesEnabled',
            type: 'uint256',
          },
        ],
        internalType: 'struct IAaveV4ConfigEngine.ReserveConfigUpdate[]',
        name: 'updates',
        type: 'tuple[]',
      },
    ],
    name: 'updateReserveConfigs',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'contract ISpokeConfigurator',
            name: 'spokeConfigurator',
            type: 'address',
          },
          { internalType: 'address', name: 'spoke', type: 'address' },
          {
            internalType: 'uint256',
            name: 'targetHealthFactor',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'healthFactorForMaxBonus',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'liquidationBonusFactor',
            type: 'uint256',
          },
        ],
        internalType: 'struct IAaveV4ConfigEngine.LiquidationConfigUpdate[]',
        name: 'updates',
        type: 'tuple[]',
      },
    ],
    name: 'updateSpokeLiquidationConfigs',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'oracle', type: 'address' },
          { internalType: 'uint256', name: 'priceCap', type: 'uint256' },
        ],
        internalType: 'struct IRiskSteward.PriceCapStableUpdate[]',
        name: 'updates',
        type: 'tuple[]',
      },
    ],
    name: 'updateStablePriceCaps',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
