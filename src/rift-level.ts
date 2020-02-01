import * as ex from "excalibur";
import { Ship } from "./actors/ship";

import { animManager } from "./actors/animation-manager";
import { addRift } from "./actors/rift";

export class RiftLevel extends ex.Scene {
  onInitialize(engine: ex.Engine) {
    engine.add(animManager);

    addRift(engine);

    const ship = new Ship(engine.halfDrawWidth, 800, 80, 80);
    engine.add(ship);
  }
}
