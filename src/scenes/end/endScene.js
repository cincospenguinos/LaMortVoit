import Phaser from 'phaser';
import CONST from '../../constants/index.js';

export default class EndScene extends Phaser.Scene {
	constructor() {
		super({ key: CONST.keys.endScene });
	}

	init() {
		this.cameras.main.setBackgroundColor(CONST.colors.dark);
	}

	preload() {
		const { playerDeath } = CONST.sprites;

		this.load.spritesheet(CONST.keys.playerDeath, playerDeath.location, { frameWidth: 8, frameHeight: 8 });
	}

	create() {
		const { playerDeathAnim } = CONST.animations;

		playerDeathAnim.frames = this.anims.generateFrameNumbers(CONST.keys.playerDeath, { start: 0, end: 12 });
		this.anims.create(playerDeathAnim);

		const playerDeath = this.add.sprite(42, 24, 'playerDeath');
		this.anims.play(CONST.keys.playerDeathAnim, playerDeath);
	}

	update() {}
}