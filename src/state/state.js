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

const getRandomInt = () => {
	return Math.random() * Math.floor(10);
}

class GameState {
	constructor() {
		this.currentState = {
			inputKeys: inputHelpers.inputKeysFor('default'),
			eyesOpen: {
				left: true,
				middle: false,
				right: true,
			},
			solution: {
				left: getRandomInt(),
				middle: getRandomInt(),
				right: getRandomInt(),
			},
			code: {
				left: 0,
				middle: 0,
				right: 0,
			},
			visitedAllRooms: false,
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

	getCode() {
		return this.currentState.code;
	}

	setCode(left, middle, right) {
		this.currentState.code = { left, middle, right };
	}

	openSafe() {
		if (!this.currentState.visitedAllRooms) {
			return false;
		}

		const solution = this.currentState.solution;
		const code = this.currentState.code;

		if (solution.left === code.left &&
				solution.middle === code.middle &&
				solution.right === code.right) {
			return true;
		}
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
