import Phaser from 'phaser';
import CONST from '../../constants/index.js';
import GameState from '../../state/state.js';

export default class TarotScene extends Phaser.Scene {
	constructor() {
		super({ key: CONST.keys.tarotScene });
	}

	init() {
		this.state = 'idle'
		this.focusedPoint = { x: 42, y: 24 };
		this.cameras.main.setBackgroundColor(CONST.colors.dark);
	}

	preload() {
		const { tarotDeath } = CONST.sprites;

		this.load.image(CONST.keys.tarotDeath, tarotDeath.location);
		this.load.audio(CONST.keys.endSong, CONST.audio.endSong.location);
		this.load.audio(CONST.keys.tarotMove, CONST.audio.tarotMove.location);
	}

	create() {
		this.placardZone = new Phaser.Geom.Rectangle(38, 117, 75, 8);
		this.endSong = this.sound.add(CONST.keys.endSong);
		this.tarotMove = this.sound.add(CONST.keys.tarotMove);

		const { tarotDeath } = CONST.sprites;
		this.add.image(42, tarotDeath.config.frameHeight / 2, CONST.keys.tarotDeath);

		const keyMappings = GameState.getKeyMappings();
		this.inputKeys = this.input.keyboard.addKeys(keyMappings);
	}

	update() {
		if (this.placardZone.contains(this.focusedPoint.x, this.focusedPoint.y)) {
			this.state = 'complete';
		}

		switch(this.state) {
			case 'idle': {
				if (Phaser.Input.Keyboard.JustDown(this.inputKeys.up)) {
					this.tarotMove.play();
					this.state = 'moving';
					this.focusedPoint.y -= 10;
					this._updateCamera();
				}

				if (Phaser.Input.Keyboard.JustDown(this.inputKeys.down)) {
					this.tarotMove.play();
					this.state = 'moving';
					this.focusedPoint.y += 10;
					this._updateCamera();
				}
				break;
			}
			case 'complete': {
				this.state = 'complete';

				if (!this.endSong.isPlaying) {
					this.endSong.play();
				}

				setTimeout(() => this.scene.start(CONST.keys.endScene), 1000);
				break;
			}
		}
	}

	_updateCamera() {
		this.cameras.main.pan(this.focusedPoint.x, this.focusedPoint.y, 200, 'Linear', false, 
			() => { this.state = 'idle' });
	}
}
