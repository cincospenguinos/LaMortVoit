import Phaser from 'phaser';
import CONST from '../../constants/index.js';
import FullEye from './fullEye.js';

export default class MenuScene extends Phaser.Scene {
	constructor() {
		super({ key: CONST.keys.menuScene });
	}

	init() {
		this.cameras.main.setBackgroundColor(CONST.colors.light);

		this.eyes = [];
		this.currentEyeIndex = 0;
	}

	preload() {
		const { menuText, fullEyes } = CONST.sprites;

		this.load.image(CONST.keys.menuText, menuText.location);
		this.load.spritesheet(CONST.keys.fullEyes, fullEyes.location, fullEyes.config);

		this.load.audio(CONST.keys.theme, CONST.audio.theme.location);
	}

	create() {
		this.add.image(42, 10, CONST.keys.menuText);

		this.eyes.push(new FullEye(this, { x: 10, y: 36 }));
		this.eyes.push(new FullEye(this, { x: 42, y: 28 }));
		this.eyes.push(new FullEye(this, { x: 74, y: 36 }));

		this.sound.add(CONST.keys.theme).play();
		this.time.addEvent({
			delay: 787,
			callback: () => {
				this.currentEye.toggle();
				this.currentEyeIndex = (this.currentEyeIndex + 1) % 3;
			},
			repeat: -1,
			startAt: 112,
		});
	}

	update() {}

	get currentEye() {
		return this.eyes[this.currentEyeIndex];
	}
}
