//Uncomment to use the es6 class
// import Game from './Game.js';
//Comment the following line if you uncomment the line above
import Game from './Game.ts';

window.addEventListener('DOMContentLoaded', () => {
  // Create the game using the 'renderCanvas'.
  let game = new Game('renderCanvas');

  // Create the scene.
  game.createScene();

  // Start render loop.
  game.doRender();
});