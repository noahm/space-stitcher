import { Ship } from "./actors/ship";

import { animManager } from "./actors/animation-manager";
import { addRift } from "./actors/rift";
import { getStar } from "./actors/star";
import { Engine, Scene, Timer } from "excalibur";

export class RiftLevel extends Scene {
  onInitialize(engine: Engine) {
    engine.add(animManager);

    for (let i = 0; i < 80; i++) {
      engine.add(getStar(engine, { randomX: true, useVelocity: true }));
    }

    const starTimer = new Timer(() => {
      engine.add(getStar(engine, { useVelocity: true }));
    }, 800);
    engine.add(starTimer);

    addRift(engine);
    const ship = new Ship(engine, engine.halfDrawWidth, 800, 50, 137);
    engine.add(ship);
  }
}
