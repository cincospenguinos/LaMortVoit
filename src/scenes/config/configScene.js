import Phaser from 'phaser';
import CONST from '../../constants/index.js';

export default class ConfigScene extends Phaser.Scene {
	constructor() {
		super({ key: CONST.keys.configScene });
	}

	init() {
		this.cameras.main.setBackgroundColor(CONST.colors.light);
	}

	preload() {
		const { keyboardSprites } = CONST.sprites;

		this.load.spritesheet(CONST.keys.keyboardSprites, keyboardSprites.location, keyboardSprites.config);
	}

	create() {
		
	}

	update() {}
}