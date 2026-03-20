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
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "hasRole",
    "outputs": [
      {
        "internalType": "bool",
        "name": "isMember",
        "type": "bool"
      },
      {
        "internalType": "uint32",
        "name": "executionDelay",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "target",
        "type": "address"
      },
      {
        "internalType": "bytes4",
        "name": "selector",
        "type": "bytes4"
      }
    ],
    "name": "getTargetFunctionRole",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint64",
        "name": "roleId",
        "type": "uint64"
      }
    ],
    "name": "getRoleAdmin",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
