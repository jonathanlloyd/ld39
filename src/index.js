import * as PIXI from 'pixi.js';

const Container = PIXI.Container;
const autoDetectRenderer = PIXI.autoDetectRenderer;
const loader = PIXI.loader;
const resources = PIXI.loader.resources;
const Sprite = PIXI.Sprite;

const STAGE_WIDTH_PX = 800;
const STAGE_HEIGHT_PX = 494;

      

//Create a Pixi stage and renderer 
const stage = new Container();
const renderer = autoDetectRenderer(STAGE_WIDTH_PX, STAGE_HEIGHT_PX);
document.getElementById("gameContainer").appendChild(renderer.view);

//Load assets
loader
  .add("img/ld-logo.png")
  .load(setup);


let logoSprite;

function setup() {
  logoSprite = new Sprite(resources["img/ld-logo.png"].texture);
  logoSprite.anchor.x = 0.5;
  logoSprite.anchor.y = 0.5;
  logoSprite.x = STAGE_WIDTH_PX / 2;
  logoSprite.y = STAGE_HEIGHT_PX / 2;
  stage.addChild(logoSprite);
 
  //Start the game loop
  gameLoop();
}

function gameLoop(){
  requestAnimationFrame(gameLoop);
  logoSprite.rotation += 0.01;
  renderer.render(stage);
}
