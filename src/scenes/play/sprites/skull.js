import Phaser from 'phaser';
import CONST from '../../../constants/index.js';

export default class Skull extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, opts = {}) {
		const offset = CONST.tiledOffset;
		super(scene, opts.x + offset.x, opts.y + offset.y, CONST.keys.skull);

		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.textKey = opts.textKey;
		this.anims.play(CONST.keys.skullAnim);
	}
}
