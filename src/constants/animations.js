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
		frameRate,
		repeat: -1,
		yoyo: false,
	},
	playerRight: {
		key: 'playerRight',
		frameRate,
		repeat: -1,
		yoyo: false,
	},
	flamesAnim: {
		key: 'flamesAnim',
		frameRate,
		repeat: -1,
		yoyo: false,
	},
	skullAnim: {
		key: 'skullAnim',
		frameRate: 1,
		repeat: -1,
		yoyo: false,
	},
};

export default animations;