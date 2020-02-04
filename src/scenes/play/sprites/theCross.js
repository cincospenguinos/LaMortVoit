import Phaser from 'phaser';
import CONST from '../../../constants/index.js';

export default class TheCross extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, opts = {}) {
		super(scene, opts.x, opts.y, CONST.keys.theCross);

		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.scene = scene;
		this.body.setSize(5, 5, true);

		this.anims.play(CONST.keys.theCrossAnim);
	}

	push(nextPos) {
		this.scene.tweens.add({
			targets: this,
			duration: 750,
			repeat: 0,
			ease: 'Linear',
			...nextPos,
			onComplete: () => {
				this.scene.crossPushComplete();
			},
		});
	}

	extractNextPos() {
		if (this.body.velocity.x > 0) {
			return { x: this.x + 8, y: this.y };
		}

		if (this.body.velocity.x < 0) {
			return { x: this.x - 8, y: this.y };
		}

		if (this.body.velocity.y > 0) {
			return { x: this.x, y: this.y + 8 };
		}

		if (this.body.velocity.y < 0) {
			return { x: this.x, y: this.y - 8 };
		}
	}
}
