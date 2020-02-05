import Phaser from 'phaser';
import GameState from '../../state/state.js';
import KeyboardSprite from '../../sprites/keyboardSprite.js';
import CONST from '../../constants/index.js';
import { configTypes } from '../../state/input/input.js';
import TextWriter from './textWriter.js';

const INPUT_TYPES = ['default', 'nokia', 'keypad'];

export default class ConfigScene extends Phaser.Scene {
	constructor() {
		super({ key: CONST.keys.configScene });
	}

	init() {
		this.cameras.main.setBackgroundColor(CONST.colors.light);
		this.keyboardSprites = {};
		this.types = ['default', 'nokia', 'keypad'];
		this.currentInputTypeIndex = this.types.indexOf(GameState.inputType);
		this.textWriter = new TextWriter(this);
	}

	preload() {
		const { keyboardSprites, backIcon } = CONST.sprites;

		this.load.image(CONST.keys.backIcon, backIcon.location);
		this.load.spritesheet(CONST.keys.keyboardSprites, keyboardSprites.location, keyboardSprites.config);
	}

	create() {
		const mappings = GameState.getKeyMappings();
		this.inputKeys = this.input.keyboard.addKeys(mappings);

		new KeyboardSprite(this, { x: 8, y: 3, currentKey: mappings.back });
		this.add.image(3, 3, CONST.keys.backIcon);

		new KeyboardSprite(this, { x: 80, y: 3, currentKey: mappings.select });

		const presentedMapping = configTypes[this.currentInputType];
		let xPos = 24; // + 16
		let yPos = 28; // + 6

		for (let i = 1; i <= 6; i++) {
			const key = new KeyboardSprite(this, { x: xPos, y: yPos, currentKey: presentedMapping[i]});
			this.keyboardSprites[i] = key;

			xPos += 16;

			if (xPos >= 60) {
				xPos = 24;
				yPos += 6;
			}
		}

		this.textWriter.display(this.currentInputType);
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(this.inputKeys.select)) {
			this._updateCurrentInputType();
		}

		if (Phaser.Input.Keyboard.JustDown(this.inputKeys.back)) {
			GameState.inputType = this.currentInputType;
			this.textWriter.destroy();
			Object.values(this.keyboardSprites).forEach(s => s.destroy());
			this.scene.get(CONST.keys.menuScene).configUpdated();
			this.scene.switch(CONST.keys.menuScene);
		}
	}

	get currentInputType() {
		return this.types[this.currentInputTypeIndex];
	}

	_updateCurrentInputType() {
		this.currentInputTypeIndex += 1;

		if (this.currentInputTypeIndex >= this.types.length) {
			this.currentInputTypeIndex = 0;
		}

		this.textWriter.display(this.currentInputType);
		const presentedMapping = configTypes[this.currentInputType];
		
		for (let i = 1; i <= 6; i++) {
			this.keyboardSprites[i].setDisplayedKey(presentedMapping[i]);
		}
	}
}