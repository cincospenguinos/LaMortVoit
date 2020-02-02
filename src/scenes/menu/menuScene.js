import Phaser from 'phaser';
import GameState from '../../state/state.js';
import CONST from '../../constants/index.js';
import FullEye from './fullEye.js';
import KeyboardSprite from '../../sprites/keyboardSprite.js';

export default class MenuScene extends Phaser.Scene {
	constructor() {
		super({ key: CONST.keys.menuScene });
	}

	init() {
		this.eyes = [];
		this.currentEyeIndex = 0;

		this.cameras.main.setBackgroundColor(CONST.colors.light);
	}

	preload() {
		const { menuText, fullEyes, keyboardSprites, cogWheel, playButton } = CONST.sprites;

		this.load.image(CONST.keys.menuText, menuText.location);
		this.load.spritesheet(CONST.keys.fullEyes, fullEyes.location, fullEyes.config);
		this.load.spritesheet(CONST.keys.cogWheel, cogWheel.location, cogWheel.config);
		this.load.spritesheet(CONST.keys.playButton, playButton.location, playButton.config);
		this.load.spritesheet(CONST.keys.keyboardSprites, keyboardSprites.location, keyboardSprites.config);

		this.load.audio(CONST.keys.theme, CONST.audio.theme.location);
	}

	create() {
		this.add.image(42, 10, CONST.keys.menuText);

		this._createEyes();

		const keyMappings = GameState.getKeyMappings();
		this.inputKeys = this.input.keyboard.addKeys(keyMappings);
		this._createKeyImages(keyMappings);
	}

	update() {
		if (this.inputKeys.select.isDown) {
			this.music.stop();
			this.scene.start(CONST.keys.playScene, { stage: 0 });
		}

		if (this.inputKeys.options.isDown) {
			console.warn('NO SETTINGS SET!');
		}
	}

	_createEyes() {
		this.eyes.push(new FullEye(this, { x: 10, y: 36 }));
		this.eyes.push(new FullEye(this, { x: 42, y: 28 }));
		this.eyes.push(new FullEye(this, { x: 74, y: 36 }));

		this.music = this.sound.add(CONST.keys.theme);
		this.music.play();

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

	_createKeyImages(keyMappings) {
		this.add.image(22, 44, CONST.keys.cogWheel);
		new KeyboardSprite(this, { x: 27, y: 44, currentKey: keyMappings.options });

		this.add.image(57, 44, CONST.keys.playButton);
		new KeyboardSprite(this, { x: 62, y: 44, currentKey: keyMappings.play });
	}

	get currentEye() {
		return this.eyes[this.currentEyeIndex];
	}
}
