import Phaser from 'phaser';
import CONST from '../../../constants/index.js';

export default class Door extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, opts = {}) {
		const offset = CONST.tiledOffset;
		super(scene, opts.x + offset.x, opts.y + offset.y, CONST.keys.door);

		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.transportsTo = opts.transportsTo;
		this.playerX = opts.playerX;
		this.playerY = opts.playerY;

		if (opts.flippedVertical) {
			this.flipY = true;
		}

		if (opts.flippedHorizontal) {
			this.flipX = true;
		}
	}
}
