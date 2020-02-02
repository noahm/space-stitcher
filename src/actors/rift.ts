import {
  Vector,
  Engine,
  Actor,
  Polygon,
  Color,
  CollisionType,
} from "excalibur";
import { eachCircularNeighbor } from "../utils";
import { RiftEdge } from "./rift-edge";

const points = [
  new Vector(68, 299),
  new Vector(255, 192),
  new Vector(499, 161),
  new Vector(767, 280),
  new Vector(472, 505),
  new Vector(215, 416)
];

export function addRift(engine: Engine) {
  engine.add(new Rift(points));

  for (const [p1, p2] of eachCircularNeighbor(points)) {
    const edge = new RiftEdge(p1, p2);
    engine.add(edge);
  }
}

export class Rift extends Actor {
  constructor(points: Vector[]) {
    const polygon = new Polygon(points);
    polygon.lineColor = Color.Transparent;
    polygon.fillColor = Color.LightGray;
    polygon.filled = true;
    polygon.lineWidth = 0;

    super({
      pos: new Vector(polygon.width / 2, polygon.height / 2),
      width: polygon.width,
      height: polygon.height
    });

    this.addDrawing("shape", polygon);
    this.body.usePolygonCollider(
      points,
      new Vector(polygon.width / -2, polygon.height / -2)
    );
    this.body.collider.type = CollisionType.Passive;
  }
}
