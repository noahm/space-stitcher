import * as ex from "excalibur";
import { Vector } from "excalibur";
import { eachCircularNeighbor } from "../utils";
import { RiftEdge } from "./rift-edge";

export class Rift extends ex.Actor {
  constructor() {
    super({
      pos: new ex.Vector(0, 0),
      width: 0,
      height: 0,
      color: ex.Color.LightGray
    });
  }

  onInitialize(engine: ex.Engine) {
    this.pos = new Vector(engine.halfDrawWidth, engine.halfDrawHeight);
    const points = [
      new ex.Vector(88, 66),
      new ex.Vector(148, 33),
      new ex.Vector(244, 37),
      new ex.Vector(291, 78),
      new ex.Vector(218, 119),
      new ex.Vector(120, 129)
    ];

    const polygon = new ex.Polygon(points);
    polygon.lineColor = ex.Color.Blue;
    polygon.fillColor = ex.Color.LightGray;
    polygon.filled = true;
    polygon.lineWidth = 2;
    this.height = polygon.height;
    this.width = polygon.width;
    // this.scale = new ex.Vector(6, 6);
    this.addDrawing("shape", polygon);

    for (const [p1, p2] of eachCircularNeighbor(points)) {
      const edge = new RiftEdge(p1, p2);
      this.add(edge);
    }
  }
}
