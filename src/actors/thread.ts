import { Vector, Color, Actor, Util } from "excalibur";
import { Ship } from "./ship";
import { RiftEdge } from "./rift-edge";
import { stats } from "../stats";

const hueRotationDistance = 0.28;
let nextHue = Math.random();

export class SpaceThread extends Actor {
  private startPoint: Vector;
  private ship: Ship;
  private endPoint: Vector | null;
  private threadColor: Color;
  private startEdge: RiftEdge;

  constructor(ship: Ship, startPoint: Vector, startEdge: RiftEdge) {
    super({
      pos: ship.center,
      width: 10,
      height: 10
    });
    this.startEdge = startEdge;

    this.threadColor = Color.fromHSL(nextHue, 0.7, 0.6);
    nextHue = (nextHue + hueRotationDistance) % 1;

    this.ship = ship;
    this.startPoint = startPoint;
    this.endPoint = null;
  }

  onPreUpdate() {
    if (stats.remainingEdges === 0) {
      this.actions.fade(0, 1000);
    }
  }

  draw(ctx: CanvasRenderingContext2D, delta: number) {
    ctx.beginPath();
    ctx.strokeStyle = Color.fromRGB(
      this.threadColor.r,
      this.threadColor.g,
      this.threadColor.b,
      this.opacity
    ).toRGBA();
    ctx.lineWidth = 4;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // Move to the start point
    ctx.moveTo(this.startPoint.x, this.startPoint.y);

    // Knot
    ctx.arc(this.startPoint.x, this.startPoint.y, 5, 0, Util.TwoPI);

    if (this.endPoint) {
      ctx.lineTo(this.endPoint.x, this.endPoint.y);
      ctx.arc(this.endPoint.x, this.endPoint.y, 5, 0, Util.TwoPI);
    } else {
      const { x, y } = this.ship.getThreadAttachPoint();
      ctx.lineTo(x, y);
      ctx.arc(x, y, 2, 0, Util.TwoPI);
    }
    ctx.stroke();
    ctx.closePath();
  }

  anchorThread(anchorEdge: RiftEdge) {
    if (this.startEdge === anchorEdge) {
      this.kill();
      return;
    }
    this.startEdge.markUsed();
    this.endPoint = this.ship.getThreadAttachPoint();
  }
}
