import sprites from './sprites.js';
import audio from './audio.js';

const extractKeysFrom = (obj) => {
	const keys = {};
	Object.keys(obj).forEach((key) => keys[key] = key);
	return keys;
};

const scenes = {
	menuScene: 'MenuScene',
	configScene: 'ConfigScene',
};

const colors = {
	dark: '#43523d',
	light: '#c7f0d8',
};

const configTypes = {
	default: 'default',
	nokia: 'nokia',
	keypad: 'keypad',
};

const constants = {
	audio,
	colors,
	keys: {
		...scenes,
		...extractKeysFrom(sprites),
		...extractKeysFrom(colors),
		...extractKeysFrom(audio),
		...extractKeysFrom(configTypes),
	},
	sprites,
};

export default constants;