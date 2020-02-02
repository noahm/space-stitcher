import { Ship } from "./actors/ship";

import { animManager } from "./actors/animation-manager";
import { addRift } from "./actors/rift";
import { getStarField } from "./actors/star";
import { Engine, Scene } from "excalibur";

export class RiftLevel extends Scene {
  onInitialize(engine: Engine) {
    engine.add(animManager);

    engine.add(getStarField(engine));

    addRift(engine);
    const ship = new Ship(engine, engine.halfDrawWidth, 800, 50, 137);
    engine.add(ship);
  }
}
