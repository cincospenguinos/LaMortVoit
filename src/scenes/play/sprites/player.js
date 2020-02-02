import Phaser from 'phaser';
import CONST from '../../../constants/index.js';

const PLAYER_VEL = 20;

export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, opts = {}) {
		super(scene, opts.x, opts.y, CONST.keys.player);

		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setCollideWorldBounds(true);
	}

	move(directions) {
		let xVel = 0;
		let yVel = 0;

		if (directions.includes('up')) {
			yVel -= PLAYER_VEL;
		}

		if (directions.includes('down')) {
			yVel += PLAYER_VEL;
		}

		if (directions.includes('left')) {
			xVel -= PLAYER_VEL;
		}

		if (directions.includes('right')) {
			xVel += PLAYER_VEL;
		}

		if (xVel && yVel) {
			yVel = 0;
		}

		if (xVel > 0) {
			this.anims.play('playerRight', true);
		} else if (xVel < 0) {
			this.anims.play('playerLeft', true);
		} else if (yVel) {
			this.anims.play('playerVert', true);
		} else {
			this.setFrame(1);
		}

		this.setVelocity(xVel, yVel);
	}
}
