import { Ship } from "./actors/ship";

import { animManager } from "./actors/animation-manager";
import { addRift } from "./actors/rift";
import { getStarField } from "./actors/star";
import { Engine, Scene, Vector } from "excalibur";
import { Score } from "./actors/score";

export class RiftLevel extends Scene {
  onInitialize(engine: Engine) {
    engine.add(animManager);
    engine.add(
      new Score({
        pos: new Vector(30, 30)
      })
    );

    engine.add(getStarField(engine));

    addRift(engine);
    const ship = new Ship(engine, engine.halfDrawWidth, 800, 50, 137);
    engine.add(ship);
  }
}
