const spriteDir = '/data/sprites';

const sprites = {
	tarotDeath: {
		location: `${spriteDir}/death.png`,
		config: {
			frameWidth: 84,
			frameHeight: 147,
		},
	},
	fullEyes: {
		location: `${spriteDir}/fullEyes.png`,
		config: {
			frameWidth: 15,
			frameHeight: 9,
		},
	},
	player: {
		location: `${spriteDir}/player.png`,
		config: {
			frameWidth: 8,
			frameHeight: 8,
		},
	},
	menuText: {
		location: `${spriteDir}/menuText.png`,
		config: {
			frameWidth: 51,
			frameHeight: 17,
		},
	},
};

export default sprites;