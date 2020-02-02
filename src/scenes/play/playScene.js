import Phaser from 'phaser';
import CONST from '../../constants/index.js';
import GameState from '../../state/state.js';
import Player from './sprites/player.js';
import Safe from './sprites/safe.js';
import KeyboardSprite from '../../sprites/keyboardSprite.js';
import InputService from './services/inputService.js';

export default class PlayScene extends Phaser.Scene {
	constructor() {
		super({ key: CONST.keys.playScene });
	}

	init(data) {
		this.cameras.main.setBackgroundColor(CONST.colors.light);
	}

	preload() {
		const { player, safe } = CONST.sprites;

		this.load.spritesheet(CONST.keys.player, player.location, player.config);
		this.load.spritesheet(CONST.keys.safe, safe.location, safe.config);
	}

	create() {
		this.player = new Player(this, { x: 3, y: 3 });
		this.safe = new Safe(this, { x: 50, y: 25 });

		this.physics.add.collider(this.player, this.safe);

		this._createAnimations();
		this.inputService = new InputService(this.player);

		const keyMappings = GameState.getKeyMappings();
		this.inputKeys = this.input.keyboard.addKeys(keyMappings);
	}

	update() {
		this.inputService.applyInput(this.inputKeys);

		this._updateSafeIndicator();

		if (Phaser.Input.Keyboard.JustDown(this.inputKeys.options)) {
			this.scene.switch(CONST.keys.voirScene);
		}

		if (Phaser.Input.Keyboard.JustDown(this.inputKeys.select) && this.playerCanOpenSafe) {
			this.scene.switch(CONST.keys.safeScene);
		}
	}

	eyesModified() {
		this.safe.presentAccordingTo(GameState.getEyes());
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

	_updateSafeIndicator() {
		if (this.playerCanOpenSafe) {
			this.safe.showIndicator();
		} else {
			this.safe.hideIndicator();
		}
	}

	get playerCanOpenSafe() {
		const playerSafeDistance = Phaser.Math.Distance.BetweenPoints(this.player, this.safe);
		return playerSafeDistance <= 12;
	}
}
