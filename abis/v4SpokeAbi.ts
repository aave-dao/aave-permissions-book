export const v4SpokeAbi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "positionManager",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "active",
                "type": "bool"
            }
        ],
        "name": "UpdatePositionManager",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "getReserveCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "reserveId",
                "type": "uint256"
            }
        ],
        "name": "getReserve",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "underlying",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "hub",
                        "type": "address"
                    },
                    {
                        "internalType": "uint16",
                        "name": "assetId",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint8",
                        "name": "decimals",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint24",
                        "name": "collateralRisk",
                        "type": "uint24"
                    },
                    {
                        "internalType": "uint8",
                        "name": "flags",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint32",
                        "name": "dynamicConfigKey",
                        "type": "uint32"
                    }
                ],
                "internalType": "struct ISpoke.Reserve",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "positionManager",
                "type": "address"
            }
        ],
        "name": "isPositionManagerActive",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "ORACLE",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "SPOKE_REVISION",
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
        "inputs": [],
        "name": "hub",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "assetId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "authority",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
] as const;
