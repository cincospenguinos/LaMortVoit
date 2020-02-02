import Phaser from 'phaser';
import GameState from '../../../state/state.js';
import CONST from '../../../constants/index.js';

export default class Safe extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, opts = {}) {
		super(scene, opts.x, opts.y, CONST.keys.safe);

		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.presentAccordingTo(GameState.getEyes());
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
