import {
  Actor,
  Vector,
  CollisionType,
  Color,
  CollisionGroupManager
} from "excalibur";
import { midpoint, length, angleOfLine } from "../utils";
import { stats } from "../stats";

export const EDGE_COLLIDER = "edge";
const riftEdgeGroup = CollisionGroupManager.create(EDGE_COLLIDER);

export class RiftEdge extends Actor {
  public used = false;
  constructor(p1: Vector, p2: Vector) {
    super({
      pos: midpoint(p1, p2),
      rotation: angleOfLine(p1, p2),
      color: Color.Red,
      opacity: 0.7,
      height: 10,
      width: length(p1, p2)
    });
    this.body.collider.type = CollisionType.Passive;
    this.body.collider.group = riftEdgeGroup;
  }

  markUsed() {
    if (this.used) {
      return;
    }
    this.color = Color.Gray;
    this.used = true;
    stats.remainingEdges -= 1;
  }

  markTarget() {}
  unmarkTarget() {}
}
