import Phaser from 'phaser';
import CONST from '../../constants/index.js';
import GameState from '../../state/state.js';
import Player from './sprites/player.js';
import Safe from './sprites/safe.js';
import Door from './sprites/door.js';
import KeyboardSprite from '../../sprites/keyboardSprite.js';
import InputService from './services/inputService.js';

export default class PlayScene extends Phaser.Scene {
	constructor() {
		super({ key: CONST.keys.playScene });
	}

	init(data) {
		this.cameras.main.setBackgroundColor(CONST.colors.light);

		this.currentMap = CONST.maps[data.mapKey];
	}

	preload() {
		const { player, safe, gameTilesheet, door } = CONST.sprites;

		this.load.image(CONST.keys.gameTilesheet, gameTilesheet.location);
		this.load.spritesheet(CONST.keys.player, player.location, player.config);
		this.load.spritesheet(CONST.keys.safe, safe.location, safe.config);
		this.load.spritesheet(CONST.keys.door, door.location, door.config);

		this.load.tilemapTiledJSON(this.currentMap.key, this.currentMap.location);
	}

	create() {
		const doorGroup = this._createMap();
		this.player = new Player(this, { x: 5, y: 72 });
		this.cameras.main.startFollow(this.player);

		this.physics.add.overlap(this.player, doorGroup, (player, door) => {
			console.log('Go to a new area!');
		});

		if (this.currentMap.objects.safe) {
			this.safe = new Safe(this, this.currentMap.objects.safe);
			this.physics.add.collider(this.player, this.safe);
		}

		this.physics.add.collider(this.player, this.safe);

		this._createAnimations();
		this.inputService = new InputService(this.player);

		const keyMappings = GameState.getKeyMappings();
		this.inputKeys = this.input.keyboard.addKeys(keyMappings);
	}

	update() {
		this.inputService.applyInput(this.inputKeys);

		this._updateSafeIndicator();

		if (Phaser.Input.Keyboard.JustDown(this.inputKeys.options)) {
			this.scene.switch(CONST.keys.voirScene);
		}

		if (Phaser.Input.Keyboard.JustDown(this.inputKeys.select) && this.playerCanOpenSafe) {
			this.scene.switch(CONST.keys.safeScene);
		}
	}

	eyesModified() {
		if (this.safe) {
			this.safe.presentAccordingTo(GameState.getEyes());
		}
	}

	_createAnimations() {
		const { playerVert, playerLeft, playerRight } = CONST.animations;

		playerVert.frames = this.anims.generateFrameNumbers(CONST.keys.player, { start: 0, end: 2 });
		playerLeft.frames = this.anims.generateFrameNumbers(CONST.keys.player, { start: 3, end: 4 });
		playerRight.frames = this.anims.generateFrameNumbers(CONST.keys.player, { start: 5, end: 6 });

		this.anims.create(playerVert);
		this.anims.create(playerLeft);
		this.anims.create(playerRight);
	}

	_createMap() {
		const map = this.add.tilemap(this.currentMap.key);
		this.physics.world.bounds.width = map.widthInPixels;
		this.physics.world.bounds.height = map.heightInPixels;

		const tileset = map.addTilesetImage(CONST.keys.gameTilesheet);
		map.createStaticLayer(this.currentMap.layers.walls, tileset);
		map.createStaticLayer(this.currentMap.layers.floor, tileset);

		const doors = map.getObjectLayer(this.currentMap.layers.doors);
		const doorGroup = this.physics.add.group();

		doors.objects.forEach((doorObj) => {
			const door = new Door(this, {
				x: doorObj.x,
				y: doorObj.y,
				transportsTo: doorObj.transportsTo
			});

			doorGroup.add(door);
		});
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
