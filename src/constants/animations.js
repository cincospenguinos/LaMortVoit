const frameRate = 6;

const animations = {
	playerVert: {
		key: 'playerVert',
		repeat: -1,
		frameRate,
		yoyo: true,
	},
	playerLeft: {
		key: 'playerLeft',
		frameRate: 6,
		repeat: -1,
		yoyo: false,
	},
	playerRight: {
		key: 'playerRight',
		frameRate: 6,
		repeat: -1,
		yoyo: false,
	},
};

export default animations;