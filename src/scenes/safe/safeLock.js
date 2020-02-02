import CONST from '../../constants/index.js';
import KeyboardSprite from '../../sprites/keyboardSprite.js';

export default class SafeLock {
	constructor(scene, opts = {}) {
		this.currentValue = opts.currentValue;
		this.indicator = new KeyboardSprite(scene, { x: opts.x, y: opts.y });
		this.indicator.setDisplayedKey(this.currentValue);
		this.lock = scene.add.image(opts.x, opts.y, CONST.keys.safeLock);
		this.lock.visible = opts.visible;
	}

	increment() {
		this.currentValue = (this.currentValue + 1) % 10;
		this.indicator.setDisplayedKey(this.currentValue);
	}

	decrement() {
		if (this.currentValue === 0) {
			this.currentValue = 9;
		} else {
			this.currentValue -= 1;
		}

		this.indicator.setDisplayedKey(this.currentValue);
	}

	disable() {
		this.lock.visible = false;
	}

	enable() {
		this.lock.visible = true;
	}
}