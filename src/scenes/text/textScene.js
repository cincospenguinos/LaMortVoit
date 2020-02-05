import Phaser from 'phaser';
import TextWriter from './textWriter.js';
import GameState from '../../state/state.js';
import KeyboardSprite from '../../sprites/keyboardSprite.js';
import CONST from '../../constants/index.js';

export default class TextScene extends Phaser.Scene {
	constructor() {
		super({ key: CONST.keys.textScene });

		this.textWriter = new TextWriter(this);
		this.playSound = true;
	}

	init() {
		this.cameras.main.setBackgroundColor(CONST.colors.light);
	}

	preload() {
		this.load.audio(CONST.keys.textDisplayed, CONST.audio.textDisplayed.location);

		Object.values(CONST.text).forEach((textObj) => {
			this.load.json(textObj.key, textObj.location);
		});
	}

	create() {
		this.sound = this.sound.add(CONST.keys.textDisplayed);

		const backIcon = this.add.image(3, 3, CONST.keys.backIcon);

		const keyMappings = GameState.getKeyMappings();
		this.inputKeys = this.input.keyboard.addKeys(keyMappings);
		new KeyboardSprite(this, { x: 8, y: 3, currentKey: keyMappings.back });
	}

	update() {
		if (this.playSound) {
			this.sound.play();
			this.playSound = false;
		}

		if (this.textWriter.mustUpdate(this.textKey)) {
			const text = this.cache.json.get(this.textKey).text;
			this.textWriter.showText(this.textKey, text);
		}

		if (Phaser.Input.Keyboard.JustDown(this.inputKeys.back)) {
			this.scene.get(CONST.keys.voirScene).skullRetrieved(this.textKey);
			this.scene.switch(CONST.keys.playScene);
		}
	}

	setTextKey(textKey) {
		this.playSound = true;
		this.textKey = textKey;
	}
}
