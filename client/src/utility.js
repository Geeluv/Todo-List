export const TodoContractAddress = "0x531476D33d5019409F126a72C4889b352A390269";
export const TodoContractABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "_recipient",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_taskId",
                "type": "uint256"
            }
        ],
        "name": "taskAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_taskId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "_isDeleted",
                "type": "bool"
            }
        ],
        "name": "taskDeleted",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_content",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "_isDeleted",
                "type": "bool"
            }
        ],
        "name": "addTask",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_taskId",
                "type": "uint256"
            }
        ],
        "name": "deleteTask",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllMyTasks",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "content",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "isDeleted",
                        "type": "bool"
                    }
                ],
                "internalType": "struct TodoContract.Task[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]