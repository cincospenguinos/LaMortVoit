import Phaser from 'phaser';
import CONST from '../../../constants/index.js';
import BeamOfLight from './beamOfLight.js';

export default class OriginBeam extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, opts = {}) {
		super(scene, opts.x, opts.y, CONST.keys.originBeam);

		scene.add.existing(this);
		scene.physics.add.existing(this, true);

		this.scene = scene;
		this.beams = [];

		this.direction = opts.direction;
		this.leftEye = opts.left;
		this.middleEye = opts.middle;
		this.rightEye = opts.right;

		this._updateAngle();
	}

	createBeams(eyes) {
		if (this.beams.length === 0) {
			let { xPos, yPos } = this._nextDisplay(this.x, this.y);
			const { width, height } = this.scene.physics.world.bounds;

			while (xPos < width && xPos > 0 &&
							yPos < height && yPos > 0) {
				const beam = new BeamOfLight(this.scene, { x: xPos, y: yPos, origin: this });
				this.beams.push(beam);

				const next = this._nextDisplay(xPos, yPos);
				xPos = next.xPos;
				yPos = next.yPos;
			}

			this.presentAccordingTo(eyes);
		}

		return this.beams;
	}

	presentAccordingTo(eyes) {
		if (this.leftEye === eyes.left &&
				this.middleEye === eyes.middle &&
				this.rightEye === eyes.right) {
			this.beams.forEach(beam => beam.hideSelf());
			return;
		}

		this.beams.forEach(beam => beam.showSelf());
	}

	strikingCross(crossX, crossY) {
		this.beams.forEach((beam) => {
			if (this.direction === 'left' && beam.x < crossX) {
				beam.hideSelf();
			} else if (this.direction === 'up' && beam.y < crossY) {
				beam.hideSelf();
			} else if (this.direction === 'right' && beam.x > crossX) {
				beam.hideSelf();
			} else if (this.direction === 'down' && beam.y > crossY) {
				beam.hideSelf();
			}
		});
	}

	_nextDisplay(xPos, yPos) {
		switch (this.direction) {
			case 'left': {
				return { xPos: xPos - 8, yPos };
			}
			case 'up': {
				return { xPos, yPos: yPos - 8 };
			}
			case 'right': {
				return { xPos: xPos + 8, yPos };
			}
			case 'down': {
				return { xPos, yPos: yPos + 8 };
			}
		}
	}

	_updateAngle() {
		switch (this.direction) {
			case 'left': {
				this.setAngle(-90);
				break;
			}
			case 'up': {
				break;
			}
			case 'right': {
				this.setAngle(90);
				break;
			}
			case 'down': {
				this.setAngle(180);
				break;
			}
		}
	}
}
