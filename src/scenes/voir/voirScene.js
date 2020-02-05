import Phaser from 'phaser';
import GameState from '../../state/state.js';
import FullEye from '../../sprites/fullEye.js';
import KeyboardSprite from '../../sprites/keyboardSprite.js';
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
		const { fullEyes, backIcon } = CONST.sprites;

		this.load.audio(CONST.keys.eyeChanged, CONST.audio.eyeChanged.location);
		this.load.audio(CONST.keys.closeEyeMenu, CONST.audio.closeEyeMenu.location);

		this.load.image(CONST.keys.backIcon, backIcon.location);
		this.load.spritesheet(CONST.keys.fullEyes, fullEyes.location, fullEyes.config);
	}

	create() {
		this.eyeChanged = this.sound.add(CONST.keys.eyeChanged);
		this.closeEyeMenu = this.sound.add(CONST.keys.closeEyeMenu);

		const eyeState = GameState.getEyes();
		const solution = GameState.solution;

		this.leftSol = new KeyboardSprite(this, { x: 10, y: 28, currentKey: solution.left });
		this.leftSol.visible = false;
		this.leftEye = new FullEye(this, { x: 10, y: 36, isOpen: eyeState.left });

		this.middleSol = new KeyboardSprite(this, { x: 42, y: 20, currentKey: solution.middle });
		this.middleSol.visible = false;
		this.middleEye = new FullEye(this, { x: 42, y: 28, isOpen: eyeState.middle });

		this.rightSol = new KeyboardSprite(this, { x: 74, y: 28, currentKey: solution.right });
		this.rightSol.visible = false;
		this.rightEye = new FullEye(this, { x: 74, y: 36, isOpen: eyeState.right });

		const backIcon = this.add.image(3, 3, CONST.keys.backIcon);

		const keyMappings = GameState.getKeyMappings();
		this.inputKeys = this.input.keyboard.addKeys(keyMappings);
		new KeyboardSprite(this, { x: 8, y: 3, currentKey: keyMappings.back });
		new KeyboardSprite(this, { x: 80, y: 3, currentKey: keyMappings.select });

		GameState.seenVoirMenu = true;
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(this.inputKeys.select)) {
			this.eyeChanged.play();
			this.eyeToggleFunc();
			this.eyeToggleIdx = (this.eyeToggleIdx + 1) % 3;
		}

		if (Phaser.Input.Keyboard.JustDown(this.inputKeys.back)) {
			this.closeEyeMenu.play();
			GameState.setEyesOpen(this.leftEye.isOpen(), this.middleEye.isOpen(), this.rightEye.isOpen());
			this.scene.get(CONST.keys.playScene).eyesModified();
			this.scene.switch(CONST.keys.playScene);
		}
	}

	skullRetrieved(location) {
		switch(location) {
			case 'left': {
				this.leftSol.visible = true;
				break;
			}
			case 'middle': {
				this.middleSol.visible = true;
				break;
			}
			case 'right': {
				this.rightSol.visible = true;
				break;
			}
		}
	}

	get eyeToggleFunc() {
		return this.eyesToToggle[this.eyeToggleIdx]
	}
}
