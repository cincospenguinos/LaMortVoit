import CONST from '../../../constants/index.js';
import { Door, Flame, Player, Safe, Skull } from '../sprites/index.js';
import GameState from '../../../state/state.js';

export default class MapCreator {
	constructor(scene) {
		this.scene = scene;
	}

	create() {
		const map = this.scene.add.tilemap(this.map.key);
		this.scene.physics.world.bounds.width = map.widthInPixels;
		this.scene.physics.world.bounds.height = map.heightInPixels;

		const tileset = map.addTilesetImage(CONST.keys.gameTilesheet);
		map.createStaticLayer(this.currentMap.layers.walls, tileset);
		map.createStaticLayer(this.currentMap.layers.floor, tileset);

		const eyes = GameState.getEyes();
		const doorGroup = this.scene.physics.add.group();
		const flameGroup = this.scene.physics.add.staticGroup();

		map.getObjectLayer(this.currentMap.layers.doors)
			.objects.forEach((doorObj) => {
				const props = this._extractPropsFrom(doorObj);

				const door = new Door(this.scene, {
					x: doorObj.x,
					y: doorObj.y,
					flippedVertical: doorObj.flippedVertical,
					flippedHorizontal: doorObj.flippedHorizontal,
					...props,
				});

				doorGroup.add(door);
			});

		map.getObjectLayer(this.currentMap.layers.flame)
			.objects.forEach((flameObj) => {
				const props = this._extractPropsFrom(flameObj);

				const flame = new Flame(this.scene, {
					x: flameObj.x,
					y: flameObj.y,
					...props,
				});

				flame.display(eyes.left, eyes.middle, eyes.right);
				flameGroup.add(flame);
			});

		let skull = null;

		map.getObjectLayer(this.currentMap.layers.skull)
			.objects.forEach((skullObj) => {
				const props = this._extractPropsFrom(skullObj);

				skull = new Skull(this.scene, {
					x: skullObj.x,
					y: skullObj.y,
					...props,
				});
			});

		return { doorGroup, flameGroup, skull };
	}

	get currentMap() {
		return this.map;
	}

	set currentMap(map) {
		this.map = map;
	}

	_extractPropsFrom(objectLayerObj) {
		const properties = {};

		objectLayerObj.properties.forEach((prop) => {
			properties[prop.name] = prop.value;
		});

		return properties;
	}
}
