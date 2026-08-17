export const v4HubAbi = [
    {
        "inputs": [],
        "name": "getAssetCount",
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
                "name": "assetId",
                "type": "uint256"
            }
        ],
        "name": "getSpokeCount",
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
                "name": "assetId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getSpokeAddress",
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
        "inputs": [
            {
                "internalType": "uint256",
                "name": "assetId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "spoke",
                "type": "address"
            }
        ],
        "name": "getSpokeConfig",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint40",
                        "name": "addCap",
                        "type": "uint40"
                    },
                    {
                        "internalType": "uint40",
                        "name": "drawCap",
                        "type": "uint40"
                    },
                    {
                        "internalType": "uint24",
                        "name": "riskPremiumThreshold",
                        "type": "uint24"
                    },
                    {
                        "internalType": "bool",
                        "name": "active",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "halted",
                        "type": "bool"
                    }
                ],
                "internalType": "struct IHub.SpokeConfig",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "HUB_REVISION",
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
