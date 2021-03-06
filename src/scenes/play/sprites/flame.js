import Phaser from 'phaser';
import CONST from '../../../constants/index.js';

export default class Flame extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, opts = {}) {
		const offset = CONST.tiledOffset;
		super(scene, opts.x + offset.x, opts.y + offset.y, CONST.keys.flames);

		scene.add.existing(this);
		scene.physics.add.existing(this, true);

		this.leftFlag = opts.left;
		this.middleFlag = opts.middle;
		this.rightFlag = opts.right;
	}

	display(leftEye, middleEye, rightEye) {
		if (this._eyesMatch(leftEye, middleEye, rightEye)) {
			this.disableBody(false);
			this.visible = false;
			this.anims.stop(CONST.keys.flamesAnim);
		} else {
			this.enableBody(false, this.x, this.y, true, true);
			this.visible = true;
			this.anims.play(CONST.keys.flamesAnim, true);
		}
	}

	_eyesMatch(leftEye, middleEye, rightEye) {
		return (this.leftFlag === leftEye) &&
			(this.middleFlag === middleEye) &&
			(this.rightFlag === rightEye);
	}
}
