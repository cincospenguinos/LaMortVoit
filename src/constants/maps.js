const mapLocation = 'data/maps';

const tilesheet = {
	name: 'gameTilesheet',
	json: 'data/tilesheets/gameTilesheet.json',
};

const maps = {
	hub: {
		key: 'hub',
		location: `${mapLocation}/hub.json`,
		layers: {
			doors: 'doorLayer',
			floor: 'floorLayer',
			walls: 'wallLayer',
		},
		objects: {
			safe: {
				x: 36,
				y: 50,
			},
		},
		tilesheet,
	},
};

export default maps;
