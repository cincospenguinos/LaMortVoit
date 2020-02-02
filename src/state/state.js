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
			eyesOpen: {
				left: true,
				middle: false,
				right: true,
			},
		};
	}

	setInputConfig(configName) {
		const inputKeys = inputHelpers.inputKeysFor(configName);
		this.currentState.inputKeys = inputKeys;
	}

	getEyes() {
		return this.currentState.eyesOpen;
	}

	setEyesOpen(left, middle, right) {
		this.currentState.eyesOpen = { left, middle, right };
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
