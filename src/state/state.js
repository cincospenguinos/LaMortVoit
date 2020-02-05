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
	let number = Math.floor(Math.random() * 10);

	while (number === 0 || number === 10) {
		number = Math.floor(Math.random() * 10);
	}

	return number;
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
			locationsPerRoom: {
				hub: {
					player: { x: 5, y: 72 },
				},
				left: {
					player: { x: 75, y: 75 },
				},
				middle: {
					player: { x: 42, y: 75 },
				},
				right: {
					player: { x: 12, y: 58 },
				},
			},
			skullsRetrieved: {
				left: false,
				middle: false,
				right: false,
			},
			hasSeenVoirMenu: false,
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

	get solution() {
		return this.currentState.solution;
	}

	getSolutionFor(textKey) {
		return this.currentState.solution[textKey];
	}

	locationsFor(roomKey) {
		return this.currentState.locationsPerRoom[roomKey];
	}

	setLastPlayerLoc(roomKey, x, y) {
		this.currentState.locationsPerRoom[roomKey].player.x = x;
		this.currentState.locationsPerRoom[roomKey].player.y = y;
	}

	get seenVoirMenu() {
		return this.currentState.hasSeenVoirMenu;
	}

	set seenVoirMenu(bool) {
		this.currentState.hasSeenVoirMenu = bool;
	}

	openSafe() {
		if (!this.retrievedAllSkulls) {
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

	retrievedSkull(key) {
		this.currentState.skullsRetrieved[key] = true;
	}

	get retrievedAllSkulls() {
		const { left, middle, right } = this.currentState.skullsRetrieved;
		return left && middle && right;
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
