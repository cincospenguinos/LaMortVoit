export const configTypes = {
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
		1: 'ONE',
		2: 'TWO',
		3: 'THREE',
		4: 'FOUR',
		5: 'FIVE',
		6: 'SIX',
		7: 'SEVEN',
		8: 'EIGHT',
		9: 'NINE',
	},
	keypad: {
		1: 'SEVEN',
		2: 'EIGHT',
		3: 'NINE',
		4: 'FOUR',
		5: 'FIVE',
		6: 'SIX',
		7: 'ONE',
		8: 'TWO',
		9: 'THREE',
	},
};

export const inputKeysFor = (inputTypeConfig) => {
	if (!Object.keys(configTypes).includes(inputTypeConfig)) {
		throw `No config type ${inputTypeConfig}`;
	}

	return configTypes[inputTypeConfig];
};
