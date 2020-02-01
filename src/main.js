import Phaser from 'phaser';

const scenes = [];

const config = {
	width: 84,
	height: 48,
	parent: 'game',
	scale: {
  	mode: Phaser.Scale.AUTO,
  	autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scenes,
};

const game = new Phaser.Game(config);

export default game;
