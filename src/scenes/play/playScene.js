import Phaser from 'phaser';
import CONST from '../../constants/index.js';
import GameState from '../../state/state.js';
import { Door, Flame, Player, Safe, Skull } from './sprites/index.js';
import KeyboardSprite from '../../sprites/keyboardSprite.js';
import InputService from './services/inputService.js';
import MapCreator from './services/mapCreator.js';

export default class PlayScene extends Phaser.Scene {
	constructor() {
		super({ key: CONST.keys.playScene });
		this.mapCreator = new MapCreator(this);
	}

	init(data) {
		this.cameras.main.setBackgroundColor(CONST.colors.light);

		this.currentMap = CONST.maps[data.mapKey];
		this.mapCreator.currentMap = this.currentMap;
	}

	preload() {
		const { player, safe, gameTilesheet, door, flames,
			skull, originBeam, theCross, beamOfLight } = CONST.sprites;

		this.load.image(CONST.keys.gameTilesheet, gameTilesheet.location);
		this.load.spritesheet(CONST.keys.player, player.location, player.config);
		this.load.spritesheet(CONST.keys.safe, safe.location, safe.config);
		this.load.spritesheet(CONST.keys.door, door.location, door.config);
		this.load.spritesheet(CONST.keys.flames, flames.location, flames.config);
		this.load.spritesheet(CONST.keys.skull, skull.location, skull.config);
		this.load.spritesheet(CONST.keys.originBeam, originBeam.location, originBeam.config);
		this.load.spritesheet(CONST.keys.theCross, theCross.location, theCross.config);
		this.load.spritesheet(CONST.keys.beamOfLight, beamOfLight.location, beamOfLight.config);

		this.load.tilemapTiledJSON(this.currentMap.key, this.currentMap.location);
	}

	create() {
		this._createAnimations();
		const eyes = GameState.getEyes();

		const { beamGroup, doorGroup, flameGroup, skull, theCross } = this.mapCreator.create();

		this.theCross = theCross;
		this.beamGroup = beamGroup;
		this.flameGroup = flameGroup;

		const locations = GameState.locationsFor(this.currentMap.key);
		this.player = new Player(this, locations.player);
		this.cameras.main.startFollow(this.player);

		this.physics.add.collider(this.player, this.flameGroup);
		this.physics.add.collider(this.player, this.beamGroup);
		this.physics.add.collider(this.player, this.theCross, (player, theCross) => {
			const nextPos = theCross.extractNextPos();
			theCross.setVelocity(0, 0);
			this.player.setVelocity(0, 0);

			// TODO: Sound effect for moving cross
			this.inputService.disable();
			theCross.push(nextPos);
		});

		const beamOfLightGroup = this.physics.add.staticGroup();

		this.beamGroup.children.entries.forEach((originBeam) => {
			const beams = originBeam.createBeams(eyes);
			beams.forEach(beam => beamOfLightGroup.add(beam));
		});

		if (this.theCross) {
			this.physics.add.overlap(this.theCross, beamOfLightGroup, 
				(theCross, beam) => beam.strikingCross());
		}

		this.physics.add.overlap(this.player, beamOfLightGroup, (player, beam) => {
			// TODO: Sound effect for hitting beam
			this.scene.pause();
			this.scene.restart({ mapKey: this.currentMap.key });
		});

		this.physics.add.overlap(this.player, doorGroup, (player, door) => {
			GameState.setLastPlayerLoc(this.currentMap.key, door.playerX, door.playerY);
			this.scene.pause();
			this.scene.restart({ mapKey: door.transportsTo });
		});

		this.physics.add.overlap(this.player, skull, (player, skull) => {
			GameState.retrievedSkull(this.currentMap.key);
			this.scene.get(CONST.keys.textScene).setTextKey(skull.textKey);
			skull.destroy();
			this.scene.switch(CONST.keys.textScene);
		});

		if (this.currentMap.objects.safe) {
			this.safe = new Safe(this, this.currentMap.objects.safe);
			this.physics.add.collider(this.player, this.safe);
		}

		this.inputService = new InputService(this.player);

		const keyMappings = GameState.getKeyMappings();
		this.inputKeys = this.input.keyboard.addKeys(keyMappings);
	}

	update() {
		this.inputService.applyInput(this.inputKeys);

		if (Phaser.Input.Keyboard.JustDown(this.inputKeys.options)) {
			this.scene.switch(CONST.keys.voirScene);
		}

		if (Phaser.Input.Keyboard.JustDown(this.inputKeys.select) && this.playerCanOpenSafe) {
			this.scene.switch(CONST.keys.safeScene);
		}

		this._updateSafeIndicator();
	}

	eyesModified() {
		const eyes = GameState.getEyes();

		if (this.safe) {
			this.safe.presentAccordingTo(eyes);
		}

		this.flameGroup.children.entries.forEach((flame) => {
			flame.display(eyes.left, eyes.middle, eyes.right);
		});

		this.beamGroup.children.entries.forEach((originBeam) => {
			originBeam.presentAccordingTo(eyes);
		});
	}

	crossPushComplete() {
		const eyes = GameState.getEyes();

		this.beamGroup.children.entries.forEach((originBeam) => {
			originBeam.presentAccordingTo(eyes);
		});

		this.inputService.enable();
	}

	_createAnimations() {
		const { playerVert, playerLeft, playerRight,
			flamesAnim, skullAnim, beamOfLightAnim,
			theCrossAnim } = CONST.animations;

		playerVert.frames = this.anims.generateFrameNumbers(CONST.keys.player, { start: 0, end: 2 });
		playerLeft.frames = this.anims.generateFrameNumbers(CONST.keys.player, { start: 3, end: 4 });
		playerRight.frames = this.anims.generateFrameNumbers(CONST.keys.player, { start: 5, end: 6 });
		flamesAnim.frames = this.anims.generateFrameNumbers(CONST.keys.flames, { start: 0, end: 4 });
		skullAnim.frames = this.anims.generateFrameNumbers(CONST.keys.skull, { start: 0, end: 1 });
		beamOfLightAnim.frames = this.anims.generateFrameNumbers(CONST.keys.beamOfLight, { start: 0, end: 2 });
		theCrossAnim.frames = this.anims.generateFrameNumbers(CONST.keys.theCross, { start: 0, end: 4 });

		this.anims.create(playerVert);
		this.anims.create(playerLeft);
		this.anims.create(playerRight);
		this.anims.create(flamesAnim);
		this.anims.create(skullAnim);
		this.anims.create(beamOfLightAnim);
		this.anims.create(theCrossAnim);
	}

	_updateSafeIndicator() {
		if (this.playerCanOpenSafe) {
			this.safe.showIndicator();
		} else {
			this.safe.hideIndicator();
		}
	}

	get playerCanOpenSafe() {
		if (!this.safe) {
			return false;
		}

		const playerSafeDistance = Phaser.Math.Distance.BetweenPoints(this.player, this.safe);
		return playerSafeDistance <= 12;
	}
}
