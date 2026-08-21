export const RISK_ORACLE_ABI = [
  {
    "type": "function",
    "name": "addAuthorizedSender",
    "inputs": [
      {
        "name": "sender",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "addUpdateType",
    "inputs": [
      {
        "name": "newUpdateType",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "description",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getAllUpdateTypes",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string[]",
        "internalType": "string[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getLatestUpdateByParameterAndMarket",
    "inputs": [
      {
        "name": "updateType",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct RiskOracle.RiskParameterUpdate",
        "components": [
          {
            "name": "timestamp",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "newValue",
            "type": "bytes",
            "internalType": "bytes"
          },
          {
            "name": "referenceId",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "previousValue",
            "type": "bytes",
            "internalType": "bytes"
          },
          {
            "name": "updateType",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "updateId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "market",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "additionalData",
            "type": "bytes",
            "internalType": "bytes"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getUpdateById",
    "inputs": [
      {
        "name": "updateId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct RiskOracle.RiskParameterUpdate",
        "components": [
          {
            "name": "timestamp",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "newValue",
            "type": "bytes",
            "internalType": "bytes"
          },
          {
            "name": "referenceId",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "previousValue",
            "type": "bytes",
            "internalType": "bytes"
          },
          {
            "name": "updateType",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "updateId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "market",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "additionalData",
            "type": "bytes",
            "internalType": "bytes"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isAuthorized",
    "inputs": [
      {
        "name": "sender",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "latestUpdateIdByMarketAndType",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "publishBulkRiskParameterUpdates",
    "inputs": [
      {
        "name": "referenceIds",
        "type": "string[]",
        "internalType": "string[]"
      },
      {
        "name": "newValues",
        "type": "bytes[]",
        "internalType": "bytes[]"
      },
      {
        "name": "updateTypes",
        "type": "string[]",
        "internalType": "string[]"
      },
      {
        "name": "markets",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "additionalData",
        "type": "bytes[]",
        "internalType": "bytes[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "publishRiskParameterUpdate",
    "inputs": [
      {
        "name": "referenceId",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "newValue",
        "type": "bytes",
        "internalType": "bytes"
      },
      {
        "name": "updateType",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "additionalData",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "removeAuthorizedSender",
    "inputs": [
      {
        "name": "sender",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "renounceOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transferOwnership",
    "inputs": [
      {
        "name": "newOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateCounter",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "error",
    "name": "OwnableInvalidOwner",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "OwnableUnauthorizedAccount",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      }
    ]
  }
] as const;

export const PT_PARAMETER_REGISTRY_ABI = [
  {
    "type": "function",
    "name": "K_FACTOR_SCALE",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint64",
        "internalType": "uint64"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "MAX_BPS",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint64",
        "internalType": "uint64"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "acceptOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "deleteMarket",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getEmodeCategoryIds",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint16[]",
        "internalType": "uint16[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPtMarketParams",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct PTParameterRegistry.PtMarketParams",
        "components": [
          {
            "name": "enabled",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "modelVersion",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "emaSpan",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "emaFreshnessSeconds",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "thresholdBps",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "kReferenceEndpoint",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "emodeCategoryIds",
            "type": "uint16[]",
            "internalType": "uint16[]"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "marketExists",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "pendingOwner",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "renounceOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setDeviationThresholdBps",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "thresholdBps",
        "type": "uint64",
        "internalType": "uint64"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setEmaFreshnessSeconds",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "emaFreshnessSeconds",
        "type": "uint64",
        "internalType": "uint64"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setEmaSpan",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "emaSpan",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setEmodeCategoryIds",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "ids",
        "type": "uint16[]",
        "internalType": "uint16[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setEnabled",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "enabled_",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setKReferenceEndpoint",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "kReferenceEndpoint",
        "type": "uint64",
        "internalType": "uint64"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setModelVersion",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "modelVersion",
        "type": "uint32",
        "internalType": "uint32"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setPtMarketParams",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "p",
        "type": "tuple",
        "internalType": "struct PTParameterRegistry.PtMarketParams",
        "components": [
          {
            "name": "enabled",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "modelVersion",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "emaSpan",
            "type": "uint32",
            "internalType": "uint32"
          },
          {
            "name": "emaFreshnessSeconds",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "thresholdBps",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "kReferenceEndpoint",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "emodeCategoryIds",
            "type": "uint16[]",
            "internalType": "uint16[]"
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setUpdater",
    "inputs": [
      {
        "name": "_updater",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transferOwnership",
    "inputs": [
      {
        "name": "newOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updater",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "error",
    "name": "BpsTooHigh",
    "inputs": [
      {
        "name": "value",
        "type": "uint64",
        "internalType": "uint64"
      }
    ]
  },
  {
    "type": "error",
    "name": "EmptyEmodeCategoryIds",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidEmaFreshness",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidEmaSpan",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidKReferenceEndpoint",
    "inputs": []
  },
  {
    "type": "error",
    "name": "MarketNotFound",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OnlyUpdater",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OwnableInvalidOwner",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "OwnableUnauthorizedAccount",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "ZeroAddress",
    "inputs": []
  }
] as const;

export const LLAMAGUARD_RISK_ORACLE_ROUTER_ABI = [
  {
    "type": "function",
    "name": "MAX_STEP_OFF",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint64",
        "internalType": "uint64"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "MIN_REPORT_AGE_SECONDS",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint64",
        "internalType": "uint64"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "acceptOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "addRoute",
    "inputs": [
      {
        "name": "workflowId",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "forwarder",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "author",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "workflowName",
        "type": "bytes10",
        "internalType": "bytes10"
      },
      {
        "name": "riskOracle",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "publishSelector",
        "type": "bytes4",
        "internalType": "bytes4"
      },
      {
        "name": "agentHub",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "agentIds",
        "type": "uint256[]",
        "internalType": "uint256[]"
      },
      {
        "name": "maxReportAgeSeconds",
        "type": "uint64",
        "internalType": "uint64"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getAgentIds",
    "inputs": [
      {
        "name": "workflowId",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getUpdateRecord",
    "inputs": [
      {
        "name": "workflowId",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "updateType",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct LlamaguardRiskOracleRouter.UpdateRecord",
        "components": [
          {
            "name": "lastAt",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "hasBaseline",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "lastSignedAt",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "lastValue",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getWorkflowConfig",
    "inputs": [
      {
        "name": "workflowId",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct AbstractCreReceiver.WorkflowConfig",
        "components": [
          {
            "name": "expectedForwarder",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "expectedAuthor",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "expectedWorkflowName",
            "type": "bytes10",
            "internalType": "bytes10"
          },
          {
            "name": "isActive",
            "type": "bool",
            "internalType": "bool"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "guardian",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isReportWriteSecured",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isWorkflowActive",
    "inputs": [
      {
        "name": "workflowId",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "onReport",
    "inputs": [
      {
        "name": "metadata",
        "type": "bytes",
        "internalType": "bytes"
      },
      {
        "name": "report",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "pause",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "paused",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "pendingOwner",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "removeRoute",
    "inputs": [
      {
        "name": "workflowId",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "renounceOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "routes",
    "inputs": [
      {
        "name": "workflowId",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "riskOracle",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "publishSelector",
        "type": "bytes4",
        "internalType": "bytes4"
      },
      {
        "name": "agentHub",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "enabled",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "minDelaySeconds",
        "type": "uint64",
        "internalType": "uint64"
      },
      {
        "name": "maxStepBps",
        "type": "uint64",
        "internalType": "uint64"
      },
      {
        "name": "maxReportAgeSeconds",
        "type": "uint64",
        "internalType": "uint64"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "setAgentHub",
    "inputs": [
      {
        "name": "workflowId",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "agentHub",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setAgentIds",
    "inputs": [
      {
        "name": "workflowId",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "agentIds",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setGuardian",
    "inputs": [
      {
        "name": "_guardian",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setRiskOracle",
    "inputs": [
      {
        "name": "workflowId",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "riskOracle",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "publishSelector",
        "type": "bytes4",
        "internalType": "bytes4"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setRouteEnabled",
    "inputs": [
      {
        "name": "workflowId",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "enabled_",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setRouteMaxReportAge",
    "inputs": [
      {
        "name": "workflowId",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "maxReportAgeSeconds",
        "type": "uint64",
        "internalType": "uint64"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setRouteThrottle",
    "inputs": [
      {
        "name": "workflowId",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "minDelaySeconds",
        "type": "uint64",
        "internalType": "uint64"
      },
      {
        "name": "maxStepBps",
        "type": "uint64",
        "internalType": "uint64"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setUpdater",
    "inputs": [
      {
        "name": "_updater",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "supportsInterface",
    "inputs": [
      {
        "name": "interfaceId",
        "type": "bytes4",
        "internalType": "bytes4"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "pure"
  },
  {
    "type": "function",
    "name": "transferOwnership",
    "inputs": [
      {
        "name": "newOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "unpause",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updater",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "workflowConfigs",
    "inputs": [
      {
        "name": "workflowId",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "expectedForwarder",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "expectedAuthor",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "expectedWorkflowName",
        "type": "bytes10",
        "internalType": "bytes10"
      },
      {
        "name": "isActive",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "error",
    "name": "BpsTooHigh",
    "inputs": [
      {
        "name": "bps",
        "type": "uint64",
        "internalType": "uint64"
      }
    ]
  },
  {
    "type": "error",
    "name": "EmptyAgentIds",
    "inputs": []
  },
  {
    "type": "error",
    "name": "EnforcedPause",
    "inputs": []
  },
  {
    "type": "error",
    "name": "ExpectedPause",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidAuthor",
    "inputs": [
      {
        "name": "received",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "expected",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "InvalidForwarder",
    "inputs": [
      {
        "name": "received",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "expected",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "InvalidReportAge",
    "inputs": [
      {
        "name": "maxReportAgeSeconds",
        "type": "uint64",
        "internalType": "uint64"
      }
    ]
  },
  {
    "type": "error",
    "name": "InvalidRiskOracle",
    "inputs": [
      {
        "name": "riskOracle",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "InvalidWorkflowId",
    "inputs": [
      {
        "name": "workflowId",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ]
  },
  {
    "type": "error",
    "name": "InvalidWorkflowName",
    "inputs": [
      {
        "name": "received",
        "type": "bytes10",
        "internalType": "bytes10"
      },
      {
        "name": "expected",
        "type": "bytes10",
        "internalType": "bytes10"
      }
    ]
  },
  {
    "type": "error",
    "name": "NotOwnerOrGuardian",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OnlyUpdater",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OutOfOrderReport",
    "inputs": [
      {
        "name": "workflowId",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "updateType",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "signedAt",
        "type": "uint64",
        "internalType": "uint64"
      },
      {
        "name": "lastSignedAt",
        "type": "uint64",
        "internalType": "uint64"
      }
    ]
  },
  {
    "type": "error",
    "name": "OwnableInvalidOwner",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "OwnableUnauthorizedAccount",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "PublishFailed",
    "inputs": [
      {
        "name": "workflowId",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "returnData",
        "type": "bytes",
        "internalType": "bytes"
      }
    ]
  },
  {
    "type": "error",
    "name": "ReentrancyGuardReentrantCall",
    "inputs": []
  },
  {
    "type": "error",
    "name": "ReportExpired",
    "inputs": [
      {
        "name": "workflowId",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "signedAt",
        "type": "uint64",
        "internalType": "uint64"
      },
      {
        "name": "maxReportAgeSeconds",
        "type": "uint64",
        "internalType": "uint64"
      }
    ]
  },
  {
    "type": "error",
    "name": "RouteAlreadyExists",
    "inputs": [
      {
        "name": "workflowId",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ]
  },
  {
    "type": "error",
    "name": "RouteDisabled",
    "inputs": [
      {
        "name": "workflowId",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ]
  },
  {
    "type": "error",
    "name": "RouteNotFound",
    "inputs": [
      {
        "name": "workflowId",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ]
  },
  {
    "type": "error",
    "name": "ThrottleCheckFailed",
    "inputs": [
      {
        "name": "workflowId",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "updateType",
        "type": "string",
        "internalType": "string"
      }
    ]
  },
  {
    "type": "error",
    "name": "WorkflowConfigDesync",
    "inputs": [
      {
        "name": "workflowId",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ]
  },
  {
    "type": "error",
    "name": "WorkflowNotActive",
    "inputs": [
      {
        "name": "workflowId",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ]
  },
  {
    "type": "error",
    "name": "ZeroAddress",
    "inputs": []
  },
  {
    "type": "error",
    "name": "ZeroSelector",
    "inputs": []
  },
  {
    "type": "error",
    "name": "ZeroWorkflowName",
    "inputs": []
  }
] as const;
