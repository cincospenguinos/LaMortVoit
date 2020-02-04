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

		this._prepareObjects(map, this.currentMap.layers.doors)
			.forEach((doorProps) => {
				doorGroup.add(new Door(this.scene, doorProps));
			});

		this._prepareObjects(map, this.currentMap.layers.flame)
			.forEach((flameProps) => {
				const flame = new Flame(this.scene, flameProps);
				flame.display(eyes.left, eyes.middle, eyes.right);
				flameGroup.add(flame);
			});

		let skull = this._prepareObjects(map, this.currentMap.layers.skull)
			.map(skullProps => new Skull(this.scene, skullProps))[0];

		return { doorGroup, flameGroup, skull };
	}

	get currentMap() {
		return this.map;
	}

	set currentMap(map) {
		this.map = map;
	}

	_prepareObjects(map, layer) {
		return map.getObjectLayer(layer).objects.map((obj) => {
			const props = this._extractPropsFrom(obj);

			return { x: obj.x, y: obj.y,
				flippedVertical: obj.flippedVertical,
				flippedHorizontal: obj.flippedHorizontal,
				...props,
			};
		});
	}

	_extractPropsFrom(objectLayerObj) {
		const properties = {};

		objectLayerObj.properties.forEach((prop) => {
			properties[prop.name] = prop.value;
		});

		return properties;
	}
}
