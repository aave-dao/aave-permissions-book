export const AGENT_ABI = [
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
    "name": "POOL",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract IPool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "RANGE_VALIDATION_MODULE",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract IRangeValidationModule"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getMarkets",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
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
    "name": "inject",
    "inputs": [
      {
        "name": "agentId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "agentContext",
        "type": "bytes",
        "internalType": "bytes"
      },
      {
        "name": "update",
        "type": "tuple",
        "internalType": "struct IRiskOracle.RiskParameterUpdate",
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
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "validate",
    "inputs": [
      {
        "name": "agentId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "agentContext",
        "type": "bytes",
        "internalType": "bytes"
      },
      {
        "name": "update",
        "type": "tuple",
        "internalType": "struct IRiskOracle.RiskParameterUpdate",
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
    "type": "error",
    "name": "InvalidBytesValue",
    "inputs": []
  },
  {
    "type": "error",
    "name": "OnlyAgentHub",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      }
    ]
  }
];