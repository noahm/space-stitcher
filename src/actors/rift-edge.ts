import {
  Actor,
  Engine,
  Vector,
  CollisionType,
  Color,
  PreCollisionEvent,
  CollisionEndEvent,
  CollisionStartEvent
} from "excalibur";
import { midpoint, length, angleOfLine } from "../utils";
import { Ship } from "./ship";

export class RiftEdge extends Actor {
  constructor(p1: Vector, p2: Vector) {
    super({
      pos: midpoint(p1, p2),
      rotation: angleOfLine(p1, p2),
      color: Color.Red,
      height: 10,
      width: length(p1, p2)
    });
    this.body.collider.type = CollisionType.Passive;
  }

  onInitialize() {
    this.on("collisionstart", this.collisionStart);
    this.on("collisionend", this.collisionEnd);
  }

  collisionStart(evt: CollisionStartEvent) {
    if (evt.other instanceof Ship) {
      this.color = Color.Blue;
    }
  }

  collisionEnd(evt: CollisionEndEvent) {
    if (evt.other instanceof Ship) {
      this.color = Color.Red;
    }
  }
}
