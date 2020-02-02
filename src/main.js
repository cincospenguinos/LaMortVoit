import Phaser from 'phaser';
import MenuScene from './scenes/menu/menuScene.js';
import ConfigScene from './scenes/config/configScene.js';

const scene = [MenuScene, ConfigScene];

const config = {
	width: 84,
	height: 48,
	parent: 'game',
	pixelArt: true,
	scale: {
  	mode: Phaser.Scale.FIT,
  	autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene,
  physics: {
  	default: 'arcade',
  	arcade: {
  		debug: true,
  	},
  }
};

const game = new Phaser.Game(config);

export default game;
