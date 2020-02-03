import Phaser from 'phaser';
import CONST from '../../../constants/index.js';

export default class Door extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, opts = {}) {
		super(scene, opts.x, opts.y, CONST.keys.door);

		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.transportsTo = opts.transportsTo;
	}
}