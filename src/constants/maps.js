const mapLocation = 'data/maps';

const tilesheet = {
	name: 'gameTilesheet',
	json: 'data/tilesheets/gameTilesheet.json',
};

const layers = {
	cross: 'crossLayer',
	doors: 'doorLayer',
	flame: 'flameLayer',
	floor: 'floorLayer',
	skull: 'skullLayer',
	walls: 'wallLayer',
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
	middle: {
		key: 'middle',
		layers,
		location: `${mapLocation}/middle.json`,
		objects: {},
		tilesheet,
	},
	right: {
		key: 'right',
		layers,
		location: `${mapLocation}/right.json`,
		objects: {},
		tilesheet,
	},
};

export default maps;
