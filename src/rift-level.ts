import * as ex from "excalibur";
import { Ship } from "./actors/ship";
import { Baddie } from "./actors/baddie";

import { animManager } from "./actors/animation-manager";
import { addRift } from "./actors/rift";
import { getStar } from "./actors/star";

export class RiftLevel extends ex.Scene {
  onInitialize(engine: ex.Engine) {
    engine.add(animManager);

    for (let i = 0; i < 90; i++) {
      engine.add(getStar(engine, { randomX: true }))
    }

    addRift(engine);
    const ship = new Ship(engine, engine.halfDrawWidth, 800, 50, 137);
    const baddie = new Baddie(engine.halfDrawWidth + 200, 200, 50, 50, ship);
    engine.add(baddie);
    engine.add(ship);
  }
}
