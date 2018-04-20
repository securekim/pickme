recruitChkAbi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_recruitReward",
				"type": "uint256"
			},
			{
				"name": "_scouter",
				"type": "address"
			},
			{
				"name": "_user",
				"type": "address"
			},
			{
				"name": "_meetingDate",
				"type": "string"
			},
			{
				"name": "_meetingPlace",
				"type": "string"
			},
			{
				"name": "_emergencyPhoneNumber",
				"type": "string"
			}
		],
		"name": "makeRecruit",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_addr",
				"type": "address"
			},
			{
				"name": "start",
				"type": "uint256"
			},
			{
				"name": "end",
				"type": "uint256"
			}
		],
		"name": "getMapping",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]