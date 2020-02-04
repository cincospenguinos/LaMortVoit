import Phaser from 'phaser';
import CONST from '../../../constants/index.js';

export default class BeamOfLight extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, opts = {}) {
		super(scene, opts.x, opts.y, CONST.keys.beamOfLight);

		scene.add.existing(this);
		scene.physics.add.existing(this, true);

		this.originBeam = opts.origin;
	}

	hideSelf() {
		this.disableBody(false);
		this.visible = false;
		this.anims.stop(CONST.keys.beamOfLightAnim);
	}

	showSelf() {
		this.enableBody(false, this.x, this.y, true, true);
		this.visible = true;
		this.anims.play(CONST.keys.beamOfLightAnim, true);
	}

	strikingCross() {
		this.hideSelf();
		this.originBeam.strikingCross(this.x, this.y);
	}
}
