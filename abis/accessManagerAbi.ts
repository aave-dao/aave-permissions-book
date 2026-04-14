export const accessManagerAbi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint64",
        "name": "roleId",
        "type": "uint64"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "delay",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "uint48",
        "name": "since",
        "type": "uint48"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "newMember",
        "type": "bool"
      }
    ],
    "name": "RoleGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint64",
        "name": "roleId",
        "type": "uint64"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "RoleRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "target",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes4",
        "name": "selector",
        "type": "bytes4"
      },
      {
        "indexed": true,
        "internalType": "uint64",
        "name": "roleId",
        "type": "uint64"
      }
    ],
    "name": "TargetFunctionRoleUpdated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint64",
        "name": "roleId",
        "type": "uint64"
      }
    ],
    "name": "getLabelOfRole",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
