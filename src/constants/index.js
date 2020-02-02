import sprites from './sprites.js';
import audio from './audio.js';

const extractKeysFrom = (obj) => {
	const keys = {};
	Object.keys(obj).forEach((key) => keys[key] = key);
	return keys;
};

const scenes = {
	menuScene: 'MenuScene',
};

const colors = {
	dark: '#43523d',
	light: '#c7f0d8',
}

const constants = {
	audio,
	colors,
	keys: {
		...scenes,
		...extractKeysFrom(sprites),
		...extractKeysFrom(colors),
		...extractKeysFrom(audio),
	},
	sprites,
};

export default constants;