import Phaser from 'phaser';
import CONST from '../../constants/index.js';
import GameState from '../../state/state.js';
import Player from './sprites/player.js';
import InputService from './services/inputService.js';

export default class PlayScene extends Phaser.Scene {
	constructor() {
		super({ key: CONST.keys.playScene });
	}

	init(data) {
		this.cameras.main.setBackgroundColor(CONST.colors.light);
	}

	preload() {
		const { player } = CONST.sprites;

		this.load.spritesheet(CONST.keys.player, player.location, player.config);
	}

	create() {
		this._createAnimations();

		const player = new Player(this, { x: 10, y: 10 });
		this.inputService = new InputService(player);

		const keyMappings = GameState.getKeyMappings();
		this.inputKeys = this.input.keyboard.addKeys(keyMappings);
	}

	update() {
		this.inputService.applyInput(this.inputKeys);
	}

	_createAnimations() {
		const { playerVert, playerLeft, playerRight } = CONST.animations;

		playerVert.frames = this.anims.generateFrameNumbers(CONST.keys.player, { start: 0, end: 2 });
		playerLeft.frames = this.anims.generateFrameNumbers(CONST.keys.player, { start: 3, end: 4 });
		playerRight.frames = this.anims.generateFrameNumbers(CONST.keys.player, { start: 5, end: 6 });

		this.anims.create(playerVert);
		this.anims.create(playerLeft);
		this.anims.create(playerRight);
	}
}