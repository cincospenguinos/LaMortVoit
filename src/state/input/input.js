const configTypes = {
	default: {
		1: 'q',
		2: 'w',
		3: 'e',
		4: 'a',
		5: 's',
		6: 'd',
		7: 'z',
		8: 'x',
		9: 'c',
	},
	nokia: {
		1: '1',
		2: '2',
		3: '3',
		4: '4',
		5: '5',
		6: '6',
		7: '7',
		8: '8',
		9: '9',
	},
	keypad: {
		1: '7',
		2: '8',
		3: '9',
		4: '4',
		5: '5',
		6: '6',
		7: '1',
		8: '2',
		9: '3',
	},
};

export const inputKeysFor = (inputTypeConfig) => {
	if (!Object.keys(configTypes).includes(inputTypeConfig)) {
		throw `No config type ${inputTypeConfig}`;
	}

	return configTypes[inputTypeConfig];
};
