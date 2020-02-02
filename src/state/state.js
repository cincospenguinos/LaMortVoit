import * as inputHelpers from './input/input.js';

const mappings = {
	select: 1,
	back: 3,
	up: 2,
	down: 5,
	left: 4,
	right: 6,
	play: 1,
	options: 3,
};

class GameState {
	constructor() {
		this.currentState = {
			inputKeys: inputHelpers.inputKeysFor('default'),
		};
	}

	setInputConfig(configName) {
		const inputKeys = inputHelpers.inputKeysFor(configName);
		this.currentState.inputKeys = inputKeys;
	}

	getKeyMappings() {
		const keyMappings = {};

		Object.keys(mappings).forEach((action) => {
			const keyValue = mappings[action];
			keyMappings[action] = this.currentState.inputKeys[keyValue];
		});

		return keyMappings;
	}
};

const gameState = new GameState();
export default gameState;
