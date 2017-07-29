import * as PIXI from 'pixi.js';

const Container = PIXI.Container;
const autoDetectRenderer = PIXI.autoDetectRenderer;
const loader = PIXI.loader;
const resources = PIXI.loader.resources;
const Sprite = PIXI.Sprite;

const STAGE_WIDTH_PX = 800;
const STAGE_HEIGHT_PX = 494;

const GRID_WIDTH = 10;
const GRID_HEIGHT = 10;

const ORIENTATIONS = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3
};

const TYPES = {
  A: 0, B: 1, C: 2, D: 3
}

function randomProperty (obj) {
    const keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
};

//Create a Pixi stage and renderer 
const stage = new Container();
const renderer = autoDetectRenderer(STAGE_WIDTH_PX, STAGE_HEIGHT_PX);
document.getElementById("gameContainer").appendChild(renderer.view);

//Load assets
loader
  .add("img/ld-logo.png")
  .load(setup);


let logoSprite;
let grid;

function setup() {
  logoSprite = new Sprite(resources["img/ld-logo.png"].texture);
  logoSprite.anchor.x = 0.5;
  logoSprite.anchor.y = 0.5;
  logoSprite.x = STAGE_WIDTH_PX / 2;
  logoSprite.y = STAGE_HEIGHT_PX / 2;
  stage.addChild(logoSprite);

  let x, y;
  grid = [];
  for(x = 0; x < GRID_WIDTH; x++) {
    grid[x] = [];
    for(y = 0; y < GRID_HEIGHT; y++) {
      grid[x][y] = GridTile.makeRandomTile();
    }
  }

  console.log(grid);
  //Start the game loop
  gameLoop();
}

function gameLoop(){
  requestAnimationFrame(gameLoop);
  logoSprite.rotation += 0.01;
  renderer.render(stage);
}

class GridTile {
  constructor(type, orientation) {
    this.type = type;
    this.orientation = orientation;
  }

  rotate() {
    this.orientation = (this.orientation + 1) % 4;
  }

  static makeRandomTile() {
    const randomTileType = randomProperty(TYPES),
        randomOrientation = randomProperty(ORIENTATIONS);

    return new GridTile(randomTileType, randomOrientation);
  }
}