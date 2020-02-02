import Phaser from 'phaser';
import CONST from '../constants/index.js';

export default class FullEye extends Phaser.GameObjects.Sprite {
	constructor(scene, opts = {}) {
		const frame = !!opts.isOpen ? 1 : 0;
		super(scene, opts.x, opts.y, CONST.keys.fullEyes, frame);
		scene.add.existing(this);
	}

	toggle() {
		if (this.frame.name === 0) {
			this.setFrame(1);
			return;
		}
		
		this.setFrame(0);
	}

	isOpen() {
		return this.frame.name === 1;
	}
}