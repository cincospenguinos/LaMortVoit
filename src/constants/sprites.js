const spriteDir = '/data/sprites';

const sprites = {
	cogWheel: {
		location: `${spriteDir}/cogWheel.png`,
		config: {
			frameWidth: 5,
			frameHeight: 5,
		},
	},
	fullEyes: {
		location: `${spriteDir}/fullEyes.png`,
		config: {
			frameWidth: 15,
			frameHeight: 9,
		},
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
		config: {
			frameWidth: 5,
			frameHeight: 5,
		},
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
	tarotDeath: {
		location: `${spriteDir}/tarotDeath.png`,
		config: {
			frameWidth: 84,
			frameHeight: 147,
		},
	},
};

export default sprites;