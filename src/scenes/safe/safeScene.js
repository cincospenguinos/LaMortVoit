import Phaser from 'phaser';
import CONST from '../../constants/index.js';
import GameState from '../../state/state.js';
import KeyboardSprite from '../../sprites/keyboardSprite.js';
import SafeLock from './safeLock.js';

export default class SafeScene extends Phaser.Scene {
	constructor() {
		super({ key: CONST.keys.safeScene });
	}

	init() {
		this.cameras.main.setBackgroundColor(CONST.colors.light);
	}

	preload() {
		const { backIcon, safeLock } = CONST.sprites;

		this.load.image(CONST.keys.backIcon, backIcon.location);
		this.load.image(CONST.keys.safeLock, safeLock.location);

		this.load.audio(CONST.keys.negative, CONST.audio.negative.location);
		this.load.audio(CONST.keys.safeOpened, CONST.audio.safeOpened.location);
	}

	create() {
		this.safeOpened = this.sound.add(CONST.keys.safeOpened);
		this.negativeSound = this.sound.add(CONST.keys.negative);
		const backIcon = this.add.image(3, 3, CONST.keys.backIcon);

		const safeScene = this;
		const code = GameState.getCode();
		this.currentSafeLockIdx = 0;
		this.safeLocks = [
			new SafeLock(this, { x: 11, y: 28, currentValue: code.left, visible: true }),
			new SafeLock(this, { x: 42, y: 28, currentValue: code.middle, visible: false }),
			new SafeLock(this, { x: 73, y: 28, currentValue: code.right, visible: false }),
		];

		const keyMappings = GameState.getKeyMappings();
		this.inputKeys = this.input.keyboard.addKeys(keyMappings);
		new KeyboardSprite(this, { x: 8, y: 3, currentKey: keyMappings.back });
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(this.inputKeys.up)) {
			this.currentSafeLock.increment();
		}

		if (Phaser.Input.Keyboard.JustDown(this.inputKeys.down)) {
			this.currentSafeLock.decrement();
		}

		if (Phaser.Input.Keyboard.JustDown(this.inputKeys.left)) {
			this.previousLock();
		}

		if (Phaser.Input.Keyboard.JustDown(this.inputKeys.right)) {
			this.nextLock();
		}

		if (Phaser.Input.Keyboard.JustDown(this.inputKeys.select)) {
			GameState.setCode(this.safeLocks[0].currentValue, this.safeLocks[1].currentValue,
				this.safeLocks[2].currentValue);

			if (GameState.openSafe()) {
				this.safeOpened.play();
				this.scene.start(CONST.keys.tarotScene);
			} else {
				this.negativeSound.play();
			}
		}

		if (Phaser.Input.Keyboard.JustDown(this.inputKeys.back)) {
			GameState.setCode(this.safeLocks[0].currentValue, this.safeLocks[1].currentValue,
				this.safeLocks[2].currentValue);
			this.scene.switch(CONST.keys.playScene);
		}
	}

	get currentSafeLock() {
		return this.safeLocks[this.currentSafeLockIdx];
	}

	nextLock() {
		if (this.currentSafeLockIdx < this.safeLocks.length - 1) {
			this.currentSafeLock.disable();
			this.currentSafeLockIdx += 1;
			this.currentSafeLock.enable();
		}
	}

	previousLock() {
		if (this.currentSafeLockIdx > 0) {
			this.currentSafeLock.disable();
			this.currentSafeLockIdx -= 1;
			this.currentSafeLock.enable();
		}
	}
}
