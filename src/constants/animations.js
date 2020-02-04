const frameRate = 6;

const animations = {
	beamOfLightAnim: {
		key: 'beamOfLightAnim',
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
	playerVert: {
		key: 'playerVert',
		repeat: -1,
		frameRate,
		yoyo: true,
	},
	skullAnim: {
		key: 'skullAnim',
		frameRate: 1,
		repeat: -1,
		yoyo: false,
	},
	theCrossAnim: {
		key: 'theCrossAnim',
		frameRate: 6,
		repeat: -1,
		yoyo: false,
	},
};

export default animations;