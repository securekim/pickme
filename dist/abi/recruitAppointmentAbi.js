recruitAppointmentAbi = [
	{
		"constant": true,
		"inputs": [],
		"name": "getRecruitInfo",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
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
		"name": "insertRecruitAppointments",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "assignAppointment",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
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
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]