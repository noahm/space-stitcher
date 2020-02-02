import {
  Vector,
  Engine,
  Actor,
  Polygon,
  Color,
  CollisionType
} from "excalibur";
import { eachCircularNeighbor } from "../utils";
import { RiftEdge } from "./rift-edge";
import { stats } from "../stats";

const points = [
  new Vector(68, 299),
  new Vector(255, 192),
  new Vector(499, 161),
  new Vector(767, 280),
  new Vector(472, 505),
  new Vector(215, 416)
];

export function addRift(engine: Engine) {
  const edges: RiftEdge[] = [];
  for (const [p1, p2] of eachCircularNeighbor(points)) {
    const edge = new RiftEdge(p1, p2);
    edges.push(edge);
  }
  engine.add(new Rift(points, edges));
  edges.forEach(edge => engine.add(edge));
  stats.remainingEdges = points.length;
}

export class Rift extends Actor {
  private edges: RiftEdge[];
  private polygon: Polygon;

  constructor(points: Vector[], edges: RiftEdge[]) {
    const polygon = new Polygon(points);
    polygon.lineColor = Color.Transparent;
    polygon.filled = true;
    polygon.lineWidth = 0;

    super({
      pos: new Vector(polygon.width / 2, polygon.height / 2),
      width: polygon.width,
      height: polygon.height,
      opacity: 0.8
    });

    this.edges = edges;

    this.addDrawing("shape", polygon);
    this.body.usePolygonCollider(
      points,
      new Vector(polygon.width / -2, polygon.height / -2)
    );
    this.body.collider.type = CollisionType.Passive;
    this.polygon = polygon;
  }

  onPreUpdate() {
    if (stats.remainingEdges === 0) {
      stats.gameOver = true;
      for (const edge of this.edges) {
        edge.actions.fade(0, 500).die();
      }
      this.actions.scaleTo(0, 0, 0.5, 0.5).die();
    }
    this.polygon.fillColor = Color.fromRGB(50, 50, 50, this.opacity);
  }
}
