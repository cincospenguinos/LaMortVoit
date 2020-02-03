import KeyboardSprite from '../../sprites/keyboardSprite.js';
import GameState from '../../state/state.js';

const GAME_WIDTH = 84;

export default class TextWriter {
	constructor(scene) {
		this.scene = scene;
		this.letters = [];
		this.shownTextKey = null;
	}

	showText(shownTextKey, text) {
		this.shownTextKey = shownTextKey;

		this.letters.forEach(l => l.destroy());
		this.letters = [];

		let xPos = 5;
		let yPos = 10;

		text.toLowerCase().split('').forEach((character) => {
			if (!character.trim()) {
				xPos += 5;
				return;
			}

			if (xPos + 5 >= GAME_WIDTH) {
				yPos += 6;
				xPos = 5;
			}

			const letter = new KeyboardSprite(this.scene, { x: xPos, y: yPos });
			letter.setDisplayedKey(character);
			this.letters.push(letter);

			xPos += 5;
		});

		const solution = GameState.getSolutionFor(this.shownTextKey);
		const solutionSprite = new KeyboardSprite(this.scene, { x: 42, y: 44 });
		solutionSprite.setDisplayedKey(solution);
	}

	mustUpdate(expectedTextKey) {
		return this.shownTextKey !== expectedTextKey;
	}
}
