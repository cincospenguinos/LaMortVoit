const mapLocation = 'data/maps';

const tilesheet = {
	name: 'gameTilesheet',
	json: 'data/tilesheets/gameTilesheet.json',
};

const layers = {
	skull: 'skullLayer',
	doors: 'doorLayer',
	floor: 'floorLayer',
	walls: 'wallLayer',
	flame: 'flameLayer',
};

const maps = {
	hub: {
		key: 'hub',
		location: `${mapLocation}/hub.json`,
		objects: {
			safe: {
				x: 36,
				y: 50,
			},
		},
		layers,
		tilesheet,
	},
	left: {
		key: 'left',
		layers,
		location: `${mapLocation}/left.json`,
		objects: {},
		tilesheet,
	},
};

export default maps;
