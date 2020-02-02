import Phaser from 'phaser';
import GameState from '../../state/state.js';
import FullEye from '../../sprites/fullEye.js';
import CONST from '../../constants/index.js';

export default class VoirScene extends Phaser.Scene {
	constructor() {
		super({ key: CONST.keys.voirScene });
	}

	init() {
		this.cameras.main.setBackgroundColor(CONST.colors.light);

		let voirScene = this;
		this.eyesToToggle = [
			() => { voirScene.leftEye.toggle(); voirScene.middleEye.toggle() },
			() => { voirScene.rightEye.toggle(); voirScene.leftEye.toggle() },
			() => { voirScene.middleEye.toggle(); voirScene.rightEye.toggle() },
		];
		const eyeState = GameState.getEyes();

		if (eyeState.left && eyeState.right) {
			this.eyeToggleIdx = 0;
		} else if (eyeState.middle && eyeState.right) {
			this.eyeToggleIdx = 1;
		} else {
			this.eyeToggleIdx = 2;
		}
	}

	preload() {
		const { fullEyes, playButton } = CONST.sprites;

		this.load.image(CONST.keys.playButton, playButton.location);
		this.load.spritesheet(CONST.keys.fullEyes, fullEyes.location, fullEyes.config);
	}

	create() {
		const eyeState = GameState.getEyes();
		this.leftEye = new FullEye(this, { x: 10, y: 36, isOpen: eyeState.left });
		this.middleEye = new FullEye(this, { x: 42, y: 28, isOpen: eyeState.middle });
		this.rightEye = new FullEye(this,{ x: 74, y: 36, isOpen: eyeState.right });

		const keyMappings = GameState.getKeyMappings();
		this.inputKeys = this.input.keyboard.addKeys(keyMappings);
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(this.inputKeys.select)) {
			this.eyeToggleFunc();
			this.eyeToggleIdx = (this.eyeToggleIdx + 1) % 3;
		}

		if (Phaser.Input.Keyboard.JustDown(this.inputKeys.back)) {
			GameState.setEyesOpen(this.leftEye.isOpen(), this.middleEye.isOpen(), this.rightEye.isOpen());
			this.scene.get(CONST.keys.playScene).eyesModified();
			this.scene.switch(CONST.keys.playScene);
		}
	}

	get eyeToggleFunc() {
		return this.eyesToToggle[this.eyeToggleIdx]
	}
}
