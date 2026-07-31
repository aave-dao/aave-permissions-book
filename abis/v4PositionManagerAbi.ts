export const v4PositionManagerAbi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "spoke",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "registered",
                "type": "bool"
            }
        ],
        "name": "RegisterSpoke",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spoke",
                "type": "address"
            }
        ],
        "name": "isSpokeRegistered",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
] as const;
