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

export const CAPS_PARAMETER_REGISTRY_ABI = [
  {
    "type": "function",
    "name": "MAX_BPS",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint16",
        "internalType": "uint16"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "MAX_KIND",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint8",
        "internalType": "uint8"
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
    "name": "addMarket",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "params",
        "type": "tuple",
        "internalType": "struct ICapsParameterRegistry.MarketParams",
        "components": [
          {
            "name": "defaultParams",
            "type": "tuple",
            "internalType": "struct ICapsParameterRegistry.WorkflowParams",
            "components": [
              {
                "name": "enabled",
                "type": "bool",
                "internalType": "bool"
              },
              {
                "name": "triggerBps",
                "type": "uint16",
                "internalType": "uint16"
              },
              {
                "name": "marginBps",
                "type": "uint16",
                "internalType": "uint16"
              },
              {
                "name": "minMarginTokens",
                "type": "uint64",
                "internalType": "uint64"
              }
            ]
          },
          {
            "name": "rvm",
            "type": "address",
            "internalType": "address"
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "addReserve",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "asset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "kind",
        "type": "uint8",
        "internalType": "uint8"
      },
      {
        "name": "params",
        "type": "tuple",
        "internalType": "struct ICapsParameterRegistry.ReserveOverride",
        "components": [
          {
            "name": "enabled",
            "type": "uint8",
            "internalType": "enum ICapsParameterRegistry.EnabledOverride"
          },
          {
            "name": "triggerBps",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "marginBps",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "minMarginTokens",
            "type": "uint64",
            "internalType": "uint64"
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getEffectiveParams",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "asset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "kind",
        "type": "uint8",
        "internalType": "uint8"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct ICapsParameterRegistry.WorkflowParams",
        "components": [
          {
            "name": "enabled",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "triggerBps",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "marginBps",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "minMarginTokens",
            "type": "uint64",
            "internalType": "uint64"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getMarketParams",
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
        "internalType": "struct ICapsParameterRegistry.MarketParams",
        "components": [
          {
            "name": "defaultParams",
            "type": "tuple",
            "internalType": "struct ICapsParameterRegistry.WorkflowParams",
            "components": [
              {
                "name": "enabled",
                "type": "bool",
                "internalType": "bool"
              },
              {
                "name": "triggerBps",
                "type": "uint16",
                "internalType": "uint16"
              },
              {
                "name": "marginBps",
                "type": "uint16",
                "internalType": "uint16"
              },
              {
                "name": "minMarginTokens",
                "type": "uint64",
                "internalType": "uint64"
              }
            ]
          },
          {
            "name": "rvm",
            "type": "address",
            "internalType": "address"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getMarkets",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address[]",
        "internalType": "address[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getReserveOverride",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "asset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "kind",
        "type": "uint8",
        "internalType": "uint8"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct ICapsParameterRegistry.ReserveOverride",
        "components": [
          {
            "name": "enabled",
            "type": "uint8",
            "internalType": "enum ICapsParameterRegistry.EnabledOverride"
          },
          {
            "name": "triggerBps",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "marginBps",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "minMarginTokens",
            "type": "uint64",
            "internalType": "uint64"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getReservesList",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "keys",
        "type": "tuple[]",
        "internalType": "struct ICapsParameterRegistry.ReserveKey[]",
        "components": [
          {
            "name": "asset",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "kind",
            "type": "uint8",
            "internalType": "uint8"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getReservesListByKind",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "kind",
        "type": "uint8",
        "internalType": "uint8"
      }
    ],
    "outputs": [
      {
        "name": "keys",
        "type": "tuple[]",
        "internalType": "struct ICapsParameterRegistry.ReserveKey[]",
        "components": [
          {
            "name": "asset",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "kind",
            "type": "uint8",
            "internalType": "uint8"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getReservesRaiseData",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "kind",
        "type": "uint8",
        "internalType": "uint8"
      },
      {
        "name": "assets",
        "type": "address[]",
        "internalType": "address[]"
      }
    ],
    "outputs": [
      {
        "name": "rows",
        "type": "tuple[]",
        "internalType": "struct ICapsParameterRegistry.ReserveRaiseData[]",
        "components": [
          {
            "name": "asset",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "found",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "params",
            "type": "tuple",
            "internalType": "struct ICapsParameterRegistry.WorkflowParams",
            "components": [
              {
                "name": "enabled",
                "type": "bool",
                "internalType": "bool"
              },
              {
                "name": "triggerBps",
                "type": "uint16",
                "internalType": "uint16"
              },
              {
                "name": "marginBps",
                "type": "uint16",
                "internalType": "uint16"
              },
              {
                "name": "minMarginTokens",
                "type": "uint64",
                "internalType": "uint64"
              }
            ]
          },
          {
            "name": "cap",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "usage",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "supplyBound",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "headroomTarget",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "maxCap",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "raiseBlocked",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "allowed",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "newCap",
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
    "name": "isListed",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "asset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "kind",
        "type": "uint8",
        "internalType": "uint8"
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
    "name": "removeMarket",
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
    "name": "removeReserve",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "asset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "kind",
        "type": "uint8",
        "internalType": "uint8"
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
    "stateMutability": "view"
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
        "name": "asset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "kind",
        "type": "uint8",
        "internalType": "uint8"
      },
      {
        "name": "enabled",
        "type": "uint8",
        "internalType": "enum ICapsParameterRegistry.EnabledOverride"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setMarketParams",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "params",
        "type": "tuple",
        "internalType": "struct ICapsParameterRegistry.MarketParams",
        "components": [
          {
            "name": "defaultParams",
            "type": "tuple",
            "internalType": "struct ICapsParameterRegistry.WorkflowParams",
            "components": [
              {
                "name": "enabled",
                "type": "bool",
                "internalType": "bool"
              },
              {
                "name": "triggerBps",
                "type": "uint16",
                "internalType": "uint16"
              },
              {
                "name": "marginBps",
                "type": "uint16",
                "internalType": "uint16"
              },
              {
                "name": "minMarginTokens",
                "type": "uint64",
                "internalType": "uint64"
              }
            ]
          },
          {
            "name": "rvm",
            "type": "address",
            "internalType": "address"
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setReserveOverride",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "asset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "kind",
        "type": "uint8",
        "internalType": "uint8"
      },
      {
        "name": "params",
        "type": "tuple",
        "internalType": "struct ICapsParameterRegistry.ReserveOverride",
        "components": [
          {
            "name": "enabled",
            "type": "uint8",
            "internalType": "enum ICapsParameterRegistry.EnabledOverride"
          },
          {
            "name": "triggerBps",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "marginBps",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "minMarginTokens",
            "type": "uint64",
            "internalType": "uint64"
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
        "name": "updater_",
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
    "type": "event",
    "name": "EnabledSet",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "asset",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "kind",
        "type": "uint8",
        "indexed": true,
        "internalType": "uint8"
      },
      {
        "name": "enabled",
        "type": "uint8",
        "indexed": false,
        "internalType": "enum ICapsParameterRegistry.EnabledOverride"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "MarketAdded",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "params",
        "type": "tuple",
        "indexed": false,
        "internalType": "struct ICapsParameterRegistry.MarketParams",
        "components": [
          {
            "name": "defaultParams",
            "type": "tuple",
            "internalType": "struct ICapsParameterRegistry.WorkflowParams",
            "components": [
              {
                "name": "enabled",
                "type": "bool",
                "internalType": "bool"
              },
              {
                "name": "triggerBps",
                "type": "uint16",
                "internalType": "uint16"
              },
              {
                "name": "marginBps",
                "type": "uint16",
                "internalType": "uint16"
              },
              {
                "name": "minMarginTokens",
                "type": "uint64",
                "internalType": "uint64"
              }
            ]
          },
          {
            "name": "rvm",
            "type": "address",
            "internalType": "address"
          }
        ]
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "MarketParamsSet",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "params",
        "type": "tuple",
        "indexed": false,
        "internalType": "struct ICapsParameterRegistry.MarketParams",
        "components": [
          {
            "name": "defaultParams",
            "type": "tuple",
            "internalType": "struct ICapsParameterRegistry.WorkflowParams",
            "components": [
              {
                "name": "enabled",
                "type": "bool",
                "internalType": "bool"
              },
              {
                "name": "triggerBps",
                "type": "uint16",
                "internalType": "uint16"
              },
              {
                "name": "marginBps",
                "type": "uint16",
                "internalType": "uint16"
              },
              {
                "name": "minMarginTokens",
                "type": "uint64",
                "internalType": "uint64"
              }
            ]
          },
          {
            "name": "rvm",
            "type": "address",
            "internalType": "address"
          }
        ]
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "MarketRemoved",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnershipTransferStarted",
    "inputs": [
      {
        "name": "previousOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [
      {
        "name": "previousOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ReserveAdded",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "asset",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "kind",
        "type": "uint8",
        "indexed": true,
        "internalType": "uint8"
      },
      {
        "name": "params",
        "type": "tuple",
        "indexed": false,
        "internalType": "struct ICapsParameterRegistry.ReserveOverride",
        "components": [
          {
            "name": "enabled",
            "type": "uint8",
            "internalType": "enum ICapsParameterRegistry.EnabledOverride"
          },
          {
            "name": "triggerBps",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "marginBps",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "minMarginTokens",
            "type": "uint64",
            "internalType": "uint64"
          }
        ]
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ReserveOverrideSet",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "asset",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "kind",
        "type": "uint8",
        "indexed": true,
        "internalType": "uint8"
      },
      {
        "name": "params",
        "type": "tuple",
        "indexed": false,
        "internalType": "struct ICapsParameterRegistry.ReserveOverride",
        "components": [
          {
            "name": "enabled",
            "type": "uint8",
            "internalType": "enum ICapsParameterRegistry.EnabledOverride"
          },
          {
            "name": "triggerBps",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "marginBps",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "minMarginTokens",
            "type": "uint64",
            "internalType": "uint64"
          }
        ]
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ReserveRemoved",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "asset",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "kind",
        "type": "uint8",
        "indexed": true,
        "internalType": "uint8"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "UpdaterChanged",
    "inputs": [
      {
        "name": "previousUpdater",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newUpdater",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "InvalidBps",
    "inputs": [
      {
        "name": "value",
        "type": "uint16",
        "internalType": "uint16"
      }
    ]
  },
  {
    "type": "error",
    "name": "InvalidKind",
    "inputs": [
      {
        "name": "kind",
        "type": "uint8",
        "internalType": "uint8"
      }
    ]
  },
  {
    "type": "error",
    "name": "InvalidRvm",
    "inputs": [
      {
        "name": "rvm",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "MarketAlreadyExists",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "MarketNotEmpty",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "MarketNotFound",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "NotSupported",
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
    "name": "ReserveAlreadyListed",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "asset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "kind",
        "type": "uint8",
        "internalType": "uint8"
      }
    ]
  },
  {
    "type": "error",
    "name": "ReserveNotFound",
    "inputs": [
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "asset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "kind",
        "type": "uint8",
        "internalType": "uint8"
      }
    ]
  },
  {
    "type": "error",
    "name": "ZeroAddress",
    "inputs": []
  }
] as const;

export const CAPS_RANGE_VALIDATION_MODULE_ABI = [
  {
    "type": "function",
    "name": "AGENT_HUB",
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
    "name": "BORROW_UPDATE_TYPE_HASH",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "MAX_HOLD_DURATION",
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
    "type": "function",
    "name": "MAX_ONBOARDING_DURATION",
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
    "type": "function",
    "name": "POOL",
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
    "name": "SUPPLY_UPDATE_TYPE_HASH",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bytes32",
        "internalType": "bytes32"
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
    "name": "getAgent",
    "inputs": [
      {
        "name": "agentId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct ICapsRangeValidationModule.AgentConfig",
        "components": [
          {
            "name": "direction",
            "type": "uint8",
            "internalType": "enum ICapsRangeValidationModule.Direction"
          },
          {
            "name": "kind",
            "type": "uint8",
            "internalType": "enum ICapsRangeValidationModule.CapKind"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getBounds",
    "inputs": [
      {
        "name": "kind",
        "type": "uint8",
        "internalType": "enum ICapsRangeValidationModule.CapKind"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct ICapsRangeValidationModule.Bounds",
        "components": [
          {
            "name": "alphaBpsLimit",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "cutBandBpsLimit",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "maxIncreaseBps",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "cooldown",
            "type": "uint40",
            "internalType": "uint40"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getDefaultRangeConfig",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
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
        "type": "tuple",
        "internalType": "struct IRangeValidationModule.RangeConfig",
        "components": [
          {
            "name": "maxIncrease",
            "type": "uint120",
            "internalType": "uint120"
          },
          {
            "name": "maxDecrease",
            "type": "uint120",
            "internalType": "uint120"
          },
          {
            "name": "isIncreaseRelative",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "isDecreaseRelative",
            "type": "bool",
            "internalType": "bool"
          }
        ]
      }
    ],
    "stateMutability": "pure"
  },
  {
    "type": "function",
    "name": "getKeyState",
    "inputs": [
      {
        "name": "asset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "kind",
        "type": "uint8",
        "internalType": "enum ICapsRangeValidationModule.CapKind"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct ICapsRangeValidationModule.KeyState",
        "components": [
          {
            "name": "maxCap",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "maxHeadroom",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "alphaBps",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "cutBandBps",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "holdUntil",
            "type": "uint40",
            "internalType": "uint40"
          },
          {
            "name": "lastIncreaseAt",
            "type": "uint40",
            "internalType": "uint40"
          },
          {
            "name": "onboardingUntil",
            "type": "uint40",
            "internalType": "uint40"
          },
          {
            "name": "listingCap",
            "type": "uint64",
            "internalType": "uint64"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getRangeConfigByMarket",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      },
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
        "type": "tuple",
        "internalType": "struct IRangeValidationModule.RangeConfig",
        "components": [
          {
            "name": "maxIncrease",
            "type": "uint120",
            "internalType": "uint120"
          },
          {
            "name": "maxDecrease",
            "type": "uint120",
            "internalType": "uint120"
          },
          {
            "name": "isIncreaseRelative",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "isDecreaseRelative",
            "type": "bool",
            "internalType": "bool"
          }
        ]
      }
    ],
    "stateMutability": "pure"
  },
  {
    "type": "function",
    "name": "getReserveState",
    "inputs": [
      {
        "name": "asset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "kind",
        "type": "uint8",
        "internalType": "enum ICapsRangeValidationModule.CapKind"
      }
    ],
    "outputs": [
      {
        "name": "state",
        "type": "tuple",
        "internalType": "struct ICapsRangeValidationModule.ReserveState",
        "components": [
          {
            "name": "cap",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "usage",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "supplyBound",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "headroomTarget",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "raiseCap",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "cutFloor",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "cutTrigger",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "holdUntil",
            "type": "uint40",
            "internalType": "uint40"
          },
          {
            "name": "raiseBlocked",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "maxCap",
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
    "name": "previewCut",
    "inputs": [
      {
        "name": "asset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "kind",
        "type": "uint8",
        "internalType": "enum ICapsRangeValidationModule.CapKind"
      }
    ],
    "outputs": [
      {
        "name": "due",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "currentCap",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "newCap",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "previewRaise",
    "inputs": [
      {
        "name": "asset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "kind",
        "type": "uint8",
        "internalType": "enum ICapsRangeValidationModule.CapKind"
      }
    ],
    "outputs": [
      {
        "name": "allowed",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "currentCap",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "newCap",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "renounceOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "riskCouncil",
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
    "name": "setAgent",
    "inputs": [
      {
        "name": "agentId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "direction",
        "type": "uint8",
        "internalType": "enum ICapsRangeValidationModule.Direction"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setBounds",
    "inputs": [
      {
        "name": "kind",
        "type": "uint8",
        "internalType": "enum ICapsRangeValidationModule.CapKind"
      },
      {
        "name": "bounds",
        "type": "tuple",
        "internalType": "struct ICapsRangeValidationModule.Bounds",
        "components": [
          {
            "name": "alphaBpsLimit",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "cutBandBpsLimit",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "maxIncreaseBps",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "cooldown",
            "type": "uint40",
            "internalType": "uint40"
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setDefaultRangeConfig",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct IRangeValidationModule.RangeConfig",
        "components": [
          {
            "name": "maxIncrease",
            "type": "uint120",
            "internalType": "uint120"
          },
          {
            "name": "maxDecrease",
            "type": "uint120",
            "internalType": "uint120"
          },
          {
            "name": "isIncreaseRelative",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "isDecreaseRelative",
            "type": "bool",
            "internalType": "bool"
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "pure"
  },
  {
    "type": "function",
    "name": "setHold",
    "inputs": [
      {
        "name": "asset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "kind",
        "type": "uint8",
        "internalType": "enum ICapsRangeValidationModule.CapKind"
      },
      {
        "name": "until",
        "type": "uint40",
        "internalType": "uint40"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setOnboarding",
    "inputs": [
      {
        "name": "asset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "kind",
        "type": "uint8",
        "internalType": "enum ICapsRangeValidationModule.CapKind"
      },
      {
        "name": "until",
        "type": "uint40",
        "internalType": "uint40"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setRangeConfigByMarket",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct IRangeValidationModule.RangeConfig",
        "components": [
          {
            "name": "maxIncrease",
            "type": "uint120",
            "internalType": "uint120"
          },
          {
            "name": "maxDecrease",
            "type": "uint120",
            "internalType": "uint120"
          },
          {
            "name": "isIncreaseRelative",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "isDecreaseRelative",
            "type": "bool",
            "internalType": "bool"
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "pure"
  },
  {
    "type": "function",
    "name": "setRateLimitConfig",
    "inputs": [
      {
        "name": "asset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "kind",
        "type": "uint8",
        "internalType": "enum ICapsRangeValidationModule.CapKind"
      },
      {
        "name": "rateLimitConfig",
        "type": "tuple",
        "internalType": "struct ICapsRangeValidationModule.RateLimitConfig",
        "components": [
          {
            "name": "maxCap",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "maxHeadroom",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "alphaBps",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "cutBandBps",
            "type": "uint16",
            "internalType": "uint16"
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setRiskCouncil",
    "inputs": [
      {
        "name": "riskCouncil_",
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
    "name": "validate",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct IRangeValidationModule.RangeValidationInput[]",
        "components": [
          {
            "name": "from",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "to",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "updateType",
            "type": "string",
            "internalType": "string"
          }
        ]
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
    "name": "validate",
    "inputs": [
      {
        "name": "agentHub",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "agentId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "market",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "input",
        "type": "tuple",
        "internalType": "struct IRangeValidationModule.RangeValidationInput",
        "components": [
          {
            "name": "from",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "to",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "updateType",
            "type": "string",
            "internalType": "string"
          }
        ]
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
    "type": "event",
    "name": "AgentSet",
    "inputs": [
      {
        "name": "agentId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "direction",
        "type": "uint8",
        "indexed": false,
        "internalType": "enum ICapsRangeValidationModule.Direction"
      },
      {
        "name": "kind",
        "type": "uint8",
        "indexed": false,
        "internalType": "enum ICapsRangeValidationModule.CapKind"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "BoundsSet",
    "inputs": [
      {
        "name": "kind",
        "type": "uint8",
        "indexed": true,
        "internalType": "enum ICapsRangeValidationModule.CapKind"
      },
      {
        "name": "bounds",
        "type": "tuple",
        "indexed": false,
        "internalType": "struct ICapsRangeValidationModule.Bounds",
        "components": [
          {
            "name": "alphaBpsLimit",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "cutBandBpsLimit",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "maxIncreaseBps",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "cooldown",
            "type": "uint40",
            "internalType": "uint40"
          }
        ]
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "DefaultRangeConfigSet",
    "inputs": [
      {
        "name": "agentHub",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "agentId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "updateType",
        "type": "string",
        "indexed": true,
        "internalType": "string"
      },
      {
        "name": "config",
        "type": "tuple",
        "indexed": false,
        "internalType": "struct IRangeValidationModule.RangeConfig",
        "components": [
          {
            "name": "maxIncrease",
            "type": "uint120",
            "internalType": "uint120"
          },
          {
            "name": "maxDecrease",
            "type": "uint120",
            "internalType": "uint120"
          },
          {
            "name": "isIncreaseRelative",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "isDecreaseRelative",
            "type": "bool",
            "internalType": "bool"
          }
        ]
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "HoldSet",
    "inputs": [
      {
        "name": "asset",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "kind",
        "type": "uint8",
        "indexed": true,
        "internalType": "enum ICapsRangeValidationModule.CapKind"
      },
      {
        "name": "until",
        "type": "uint40",
        "indexed": false,
        "internalType": "uint40"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "MarketRangeConfigSet",
    "inputs": [
      {
        "name": "agentHub",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "agentId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "market",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "updateType",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "config",
        "type": "tuple",
        "indexed": false,
        "internalType": "struct IRangeValidationModule.RangeConfig",
        "components": [
          {
            "name": "maxIncrease",
            "type": "uint120",
            "internalType": "uint120"
          },
          {
            "name": "maxDecrease",
            "type": "uint120",
            "internalType": "uint120"
          },
          {
            "name": "isIncreaseRelative",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "isDecreaseRelative",
            "type": "bool",
            "internalType": "bool"
          }
        ]
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OnboardingSet",
    "inputs": [
      {
        "name": "asset",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "kind",
        "type": "uint8",
        "indexed": true,
        "internalType": "enum ICapsRangeValidationModule.CapKind"
      },
      {
        "name": "until",
        "type": "uint40",
        "indexed": false,
        "internalType": "uint40"
      },
      {
        "name": "listingCap",
        "type": "uint64",
        "indexed": false,
        "internalType": "uint64"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnershipTransferStarted",
    "inputs": [
      {
        "name": "previousOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [
      {
        "name": "previousOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "RateLimitConfigSet",
    "inputs": [
      {
        "name": "asset",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "kind",
        "type": "uint8",
        "indexed": true,
        "internalType": "enum ICapsRangeValidationModule.CapKind"
      },
      {
        "name": "rateLimitConfig",
        "type": "tuple",
        "indexed": false,
        "internalType": "struct ICapsRangeValidationModule.RateLimitConfig",
        "components": [
          {
            "name": "maxCap",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "maxHeadroom",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "alphaBps",
            "type": "uint16",
            "internalType": "uint16"
          },
          {
            "name": "cutBandBps",
            "type": "uint16",
            "internalType": "uint16"
          }
        ]
      },
      {
        "name": "caller",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "RiskCouncilChanged",
    "inputs": [
      {
        "name": "previousRiskCouncil",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newRiskCouncil",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "CooldownActive",
    "inputs": [
      {
        "name": "nextIncreaseAt",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "type": "error",
    "name": "HoldTooLong",
    "inputs": [
      {
        "name": "until",
        "type": "uint40",
        "internalType": "uint40"
      },
      {
        "name": "maxUntil",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "type": "error",
    "name": "IncreaseTooLarge",
    "inputs": [
      {
        "name": "value",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "limit",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "type": "error",
    "name": "InvalidAgent",
    "inputs": [
      {
        "name": "agentId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "type": "error",
    "name": "InvalidBounds",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidMaxRelativeDecrease",
    "inputs": [
      {
        "name": "maxDecrease",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "type": "error",
    "name": "InvalidUpdateTypes",
    "inputs": []
  },
  {
    "type": "error",
    "name": "NotSupported",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OnboardingTooLong",
    "inputs": [
      {
        "name": "until",
        "type": "uint40",
        "internalType": "uint40"
      },
      {
        "name": "maxUntil",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "type": "error",
    "name": "OnlyHubOwnerOrAgentAdmin",
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
    "name": "OnlyRiskCouncil",
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
    "name": "OnlyRiskCouncilOrOwner",
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
    "name": "RateLimitConfigNotFound",
    "inputs": [
      {
        "name": "asset",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "kind",
        "type": "uint8",
        "internalType": "enum ICapsRangeValidationModule.CapKind"
      }
    ]
  },
  {
    "type": "error",
    "name": "RateLimitConfigOutOfBounds",
    "inputs": []
  },
  {
    "type": "error",
    "name": "ZeroAddress",
    "inputs": []
  }
] as const;
