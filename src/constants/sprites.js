const spriteDir = 'data/sprites';

const iconConfig = {
	frameWidth: 5,
	frameHeight: 5,
};

const sprites = {
	backIcon: {
		location: `${spriteDir}/backIcon.png`,
		config: iconConfig,
	},
	cogWheel: {
		location: `${spriteDir}/cogWheel.png`,
		config: iconConfig,
	},
	door: {
		location: `${spriteDir}/door.png`,
		config: {
			frameWidth: 10,
			frameHeight: 10,
		}
	},
	fullEyes: {
		location: `${spriteDir}/fullEyes.png`,
		config: {
			frameWidth: 15,
			frameHeight: 9,
		},
	},
	gameTilesheet: {
		location: `${spriteDir}/gameTilesheet.png`,
	},
	keyboardSprites: {
		location: `${spriteDir}/keyboardSpritesheet.png`,
		config: {
			frameWidth: 5,
			frameHeight: 5,
		}
	},
	menuText: {
		location: `${spriteDir}/menuText.png`,
		config: {
			frameWidth: 51,
			frameHeight: 17,
		},
	},
	playButton: {
		location: `${spriteDir}/playButton.png`,
		config: iconConfig,
	},
	player: {
		location: `${spriteDir}/player.png`,
		config: {
			frameWidth: 8,
			frameHeight: 8,
		},
	},
	safe: {
		location: `${spriteDir}/safe.png`,
		config: {
			frameWidth: 10,
			frameHeight: 12,
		},
	},
	safeLock: {
		location: `${spriteDir}/safeLock.png`,
		config: {
			frameWidth: 7,
			frameHeight: 17,
		}
	},
	tarotDeath: {
		location: `${spriteDir}/tarotDeath.png`,
		config: {
			frameWidth: 84,
			frameHeight: 147,
		},
	},
};

export default sprites;