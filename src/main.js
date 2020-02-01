import Phaser from 'phaser';
import MenuScene from './scenes/menu/menuScene.js';

const scene = [MenuScene];

const config = {
	width: 84,
	height: 48,
	parent: 'game',
	scale: {
  	mode: Phaser.Scale.AUTO,
  	autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene,
};

const game = new Phaser.Game(config);

export default game;
