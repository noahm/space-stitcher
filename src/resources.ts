import * as ex from "excalibur";

const fighterFile = require("../res/fighter.png");
const enemyFile = require("../res/enemy.png");
const spriteexplosionFile = require("../res/spriteexplosion.png");
const gameSheetFile = require("../res/gameSheet.png");
const laserFile = require("../res/laser.wav");
const enemyfireFile = require("../res/enemyfire.wav");
const explodeFile = require("../res/explode.wav");
const hitFile = require("../res/hit.wav");
const powerupFile = require("../res/powerup.wav");
const rocketFile = require("../res/rocket.wav");
const needleFile = require("../res/needle_2.png");

export const loader = new ex.Loader();
loader.backgroundColor = "black";
loader.suppressPlayButton = true;
loader.logo = require("!!url-loader?limit=false!../res/needle-loader.png");
loader.logoWidth = 170;
loader.logoHeight = 49;

function loadAll(resMap: Record<string, ex.Loadable>) {
  for (const res of Object.values(resMap)) {
    loader.addResource(res);
  }
}

export const Images: { [key: string]: ex.Texture } = {
  fighter: new ex.Texture(fighterFile),
  enemyPink: new ex.Texture(enemyFile),
  explosion: new ex.Texture(spriteexplosionFile),
  sheet: new ex.Texture(gameSheetFile),
  needle: new ex.Texture(needleFile)
};
loadAll(Images);

export const Sounds: { [key: string]: ex.Sound } = {
  laserSound: new ex.Sound(laserFile),
  enemyFireSound: new ex.Sound(enemyfireFile),
  explodeSound: new ex.Sound(explodeFile),
  hitSound: new ex.Sound(hitFile),
  powerUp: new ex.Sound(powerupFile),
  rocketSound: new ex.Sound(rocketFile)
};
loadAll(Sounds);

export const explosionSpriteSheet = new ex.SpriteSheet(
  Images.explosion,
  5,
  5,
  45,
  45
);
export const gameSheet = new ex.SpriteSheet(
  Images.sheet,
  10.0,
  10.0,
  32.0,
  32.0
);
export const needleSheet = new ex.SpriteSheet(Images.needle, 1, 1, 50.0, 137.0);
