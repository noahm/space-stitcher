// Main Game Logic
import * as ex from "excalibur";
import Config from "./config";
import { Sounds, loader } from "./resources";
import { RiftLevel } from "./rift-level";
import { stats } from "./stats";

const engine = new ex.Engine({
  backgroundColor: ex.Color.Green,
  displayMode: ex.DisplayMode.Fixed,
  height: 600,
  width: 800
});
engine.backgroundColor = ex.Color.Black;
engine.setAntialiasing(false);

// Setup game scene
engine.add("game", new RiftLevel(engine));
engine.goToScene("game");

// Visibility changes pausing/restarting the game
document.onvisibilitychange = () => {
  if (document.hidden) {
    console.log("hidden - pausing");
    engine.stop();
  } else {
    console.log("visible - starting");
    engine.start();
  }
};

engine.input.keyboard.on("press", (evt: ex.Input.KeyEvent) => {
  if (evt.key === ex.Input.Keys.Z) {
    engine.isDebug = !engine.isDebug;
  }
});

engine.start(loader).then(() => {
  Sounds.laserSound.volume = Config.soundVolume;
  Sounds.explodeSound.volume = Config.soundVolume;
  Sounds.enemyFireSound.volume = Config.soundVolume;
  Sounds.powerUp.volume = Config.soundVolume;
  Sounds.rocketSound.volume = Config.soundVolume;

  console.log("Game Resources Loaded");
});
