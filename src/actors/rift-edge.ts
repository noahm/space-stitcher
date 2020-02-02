import {
  Actor,
  Vector,
  CollisionType,
  Color,
  CollisionEndEvent,
  CollisionStartEvent,
  CollisionGroupManager
} from "excalibur";
import { midpoint, length, angleOfLine } from "../utils";
import { Ship } from "./ship";

export const EDGE_COLLIDER = "edge";
const riftEdgeGroup = CollisionGroupManager.create(EDGE_COLLIDER);

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
    this.body.collider.group = riftEdgeGroup;
  }

  onInitialize() {
    // this.on("collisionstart", this.collisionStart);
    // this.on("collisionend", this.collisionEnd);
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

  markUsed() {
    this.color = Color.Gray;
  }

  markTarget() {}
  unmarkTarget() {}
}
