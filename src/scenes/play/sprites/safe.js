import Phaser from 'phaser';
import GameState from '../../../state/state.js';
import CONST from '../../../constants/index.js';
import KeyboardSprite from '../../../sprites/keyboardSprite.js';

export default class Safe extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, opts = {}) {
		super(scene, opts.x, opts.y, CONST.keys.safe);

		scene.add.existing(this);
		scene.physics.add.existing(this, true);

		this.indicator = new KeyboardSprite(scene, { x: opts.x, y: opts.y - 10 })
		this.indicator.setDisplayedKey(GameState.getKeyMappings().select);
		this.indicator.visible = false;

		this.presentAccordingTo(GameState.getEyes());
	}

	showIndicator() {
		this.indicator.visible = true;
	}

	hideIndicator() {
		this.indicator.visible = false;
	}

	presentAccordingTo(eyesOpen) {
		if (eyesOpen.left && eyesOpen.right) {
			this.setFrame(0);
		} else if (eyesOpen.left && eyesOpen.middle) {
			this.setFrame(1);
		} else {
			this.setFrame(2);
		}
	}
}
