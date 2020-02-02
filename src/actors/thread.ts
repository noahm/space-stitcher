import { Vector, Color, Actor } from "excalibur";
import { Ship } from "./ship";

export class SpaceThread extends Actor {
  private startPoint: Vector;
  private ship: Ship;
  private endPoint: Vector | null;

  constructor(ship: Ship) {
    super({
      pos: ship.center,
      width: 10,
      height: 10
    });

    this.ship = ship;
    this.startPoint = ship.center;
    this.endPoint = null;
  }

  draw(ctx: CanvasRenderingContext2D, delta: number) {
    ctx.beginPath();
    ctx.strokeStyle = Color.Magenta.toString();
    ctx.lineWidth = 4;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.moveTo(this.startPoint.x, this.startPoint.y + this.ship.height / 2);
    if (this.endPoint) {
      ctx.lineTo(this.endPoint.x, this.endPoint.y);
    } else {
      const { x, y } = this.ship.getThreadAttachPoint();
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.closePath();
  }

  anchorThread() {
    this.endPoint = this.ship.center;
  }
}
