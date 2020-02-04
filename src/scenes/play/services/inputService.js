const PLAYER_DIRECTIONS = ['up', 'down', 'left', 'right'];

export default class InputService {
	constructor(player) {
		this.player = player;
		this.isEnabled = true;
	}

	applyInput(inputKeys) {
		if (this.isEnabled) {
			const directions = Object.keys(inputKeys).map((action) => {
				if (inputKeys[action].isDown) {
					return action;
				}

				return undefined;
			}).flat().filter(action => PLAYER_DIRECTIONS.includes(action));

			this.player.move(directions);
		}
	}

	enable() {
		this.isEnabled = true;
	}

	disable() {
		this.isEnabled = false;
	}
}