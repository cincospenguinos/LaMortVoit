const PLAYER_DIRECTIONS = ['up', 'down', 'left', 'right'];

export default class InputService {
	constructor(player) {
		this.player = player;
	}

	applyInput(inputKeys) {
		const directions = Object.keys(inputKeys).map((action) => {
			if (inputKeys[action].isDown) {
				return action;
			}

			return undefined;
		}).flat().filter(action => PLAYER_DIRECTIONS.includes(action));

		this.player.move(directions);
	}
}