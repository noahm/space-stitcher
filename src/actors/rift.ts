import * as ex from "excalibur";
import { Vector, CollisionType, Engine, CollisionStartEvent, Color, CollisionEndEvent, Polygon } from "excalibur";
import { eachCircularNeighbor } from "../utils";
import { RiftEdge } from "./rift-edge";
import { Ship } from "./ship";

const points = [
  new ex.Vector(50, 50),
  new ex.Vector(50, 200),
  new ex.Vector(200, 200),
  new ex.Vector(200, 50)
];

export function addRift(engine: Engine) {
  engine.add(new Rift(points));

  for (const [p1, p2] of eachCircularNeighbor(points)) {
    const edge = new RiftEdge(p1, p2);
    // edge.scale = new ex.Vector(6, 6);
    engine.add(edge);
  }
}

export class Rift extends ex.Actor {
  private polygon: Polygon;
  private isInsideRift: boolean;

  constructor(points: Vector[]) {
    const polygon = new ex.Polygon(points);
    polygon.lineColor = Color.Transparent;
    polygon.fillColor = Color.LightGray;
    polygon.filled = true;
    polygon.lineWidth = 0;

    super({
      pos: new Vector(polygon.width / 2, polygon.height / 2),
      width: polygon.width,
      height: polygon.height
    });

    this.polygon = polygon;
    this.isInsideRift = false;

    this.addDrawing("shape", polygon);
    this.body.usePolygonCollider(points, new Vector(polygon.width / -2, polygon.height / -2));
    this.body.collider.type = CollisionType.Passive;
  }

  onInitialize() {
    this.on("collisionstart", this.collisionStart);
    this.on("collisionend", this.collisionEnd);
  }

  collisionStart(evt: CollisionStartEvent) {
    if (evt.other instanceof Ship) {
      this.polygon.fillColor = Color.Magenta;
      this.isInsideRift = true;
    }
  }

  collisionEnd(evt: CollisionEndEvent) {
    if (evt.other instanceof Ship) {
      this.polygon.fillColor = Color.LightGray;
      this.isInsideRift = false;
    }
  }
}
