import sprites from './sprites.js';
import audio from './audio.js';
import animations from './animations.js';

const extractKeysFrom = (obj) => {
	const keys = {};
	Object.keys(obj).forEach((key) => keys[key] = key);
	return keys;
};

const scenes = {
	menuScene: 'MenuScene',
	configScene: 'ConfigScene',
	playScene: 'PlayScene',
	voirScene: 'VoirScene',
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
	animations,
	audio,
	colors,
	keys: {
		...scenes,
		...extractKeysFrom(sprites),
		...extractKeysFrom(colors),
		...extractKeysFrom(audio),
		...extractKeysFrom(configTypes),
		...extractKeysFrom(animations),
	},
	sprites,
};

export default constants;