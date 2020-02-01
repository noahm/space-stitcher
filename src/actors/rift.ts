import * as ex from "excalibur";
import { Vector, CollisionType, Engine } from "excalibur";
import { eachCircularNeighbor } from "../utils";
import { RiftEdge } from "./rift-edge";

const points = [
  new ex.Vector(88, 66),
  new ex.Vector(148, 33),
  new ex.Vector(244, 37),
  new ex.Vector(291, 78),
  new ex.Vector(218, 119),
  new ex.Vector(120, 129)
];

export function addRift(engine: Engine) {
  engine.add(new Rift(points));

  for (const [p1, p2] of eachCircularNeighbor(points)) {
    const edge = new RiftEdge(p1, p2);
    // edge.scale = new ex.Vector(6, 6);
    engine.add(edge);
  }
}

class Rift extends ex.Actor {
  constructor(points: Vector[]) {
    const polygon = new ex.Polygon(points);
    polygon.lineColor = ex.Color.Transparent;
    polygon.fillColor = ex.Color.LightGray;
    polygon.filled = true;
    polygon.lineWidth = 0;
    super({
      pos: new Vector(polygon.width / 2, polygon.height / 2),
      width: polygon.width,
      height: polygon.height
    });
    this.addDrawing("shape", polygon);
  }
}
