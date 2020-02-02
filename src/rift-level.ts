import * as ex from "excalibur";
import { Ship } from "./actors/ship";
import { Baddie } from "./actors/baddie";

import { animManager } from "./actors/animation-manager";
import { addRift } from "./actors/rift";

export class RiftLevel extends ex.Scene {
  onInitialize(engine: ex.Engine) {
    engine.add(animManager);

    addRift(engine);
    const ship = new Ship(engine.halfDrawWidth, 800, 50, 137);
    const baddie = new Baddie(engine.halfDrawWidth + 200, 200, 50, 50, ship);
    engine.add(baddie);
    engine.add(ship);
  }
}
