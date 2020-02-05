import KeyboardSprite from '../../sprites/keyboardSprite.js';
import GameState from '../../state/state.js';

export default class TextWriter {
	constructor(scene) {
		this.scene = scene;

		this.letters = [];
	}

	display(text) {
		this.letters.forEach(l => l.destroy());

		let xPos = 26;
		let yPos = 10;

		text.split('').forEach((character) => {
			const letter = new KeyboardSprite(this.scene, { x: xPos, y: yPos });
			letter.setDisplayedKey(character);
			this.letters.push(letter);

			xPos += 5;
		})
	}

	destroy() {
		this.letters.forEach(l => l.destroy());
	}
}