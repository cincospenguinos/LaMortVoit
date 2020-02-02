import Phaser from 'phaser';
import CONSTANTS from '../constants/index.js';

const keyboardMapping = {
	1: 0,
	2: 1,
	3: 2,
	4: 3,
	5: 4,
	6: 5,
	7: 6,
	8: 7,
	9: 8,
	0: 9,
	a: 10,
	b: 11,
	c: 12,
	d: 13,
	e: 14,
	f: 15,
	g: 8,
	h: 16,
	i: 17,
	j: 18,
	k: 19,
	l: 20,
	m: 21,
	n: 22,
	o: 23,
	p: 24,
	q: 25,
	r: 26,
	s: 4,
	t: 27,
	u: 28,
	v: 29,
	w: 30,
	x: 31,
	y: 32,
	z: 33,
};

export default class KeyboardSprite extends Phaser.GameObjects.Sprite {
	constructor(scene, opts = {}) {
		super(scene, opts.x, opts.y, CONSTANTS.keys.keyboardSprites);
		scene.add.existing(this);
		this.setFrame(keyboardMapping[opts.currentKey || 1]);
	}

	setDisplayedKey(keyName) {
		const key = keyboardMapping[keyName];

		if (key) {
			this.setFrame(key);
		}
	}
}