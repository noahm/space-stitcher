import { Vector, Color, Actor } from "excalibur";
import { Ship } from "./ship";

const colors = [
  Color.Azure,
  Color.Chartreuse,
  Color.Magenta,
  Color.Rose,
  Color.Orange,
  Color.Viridian,
  Color.Violet,
  Color.Vermillion,
  Color.Cyan,
  Color.Yellow
];

export class SpaceThread extends Actor {
  private startPoint: Vector;
  private ship: Ship;
  private endPoint: Vector | null;
  private threadColor: string;

  constructor(ship: Ship, startPoint: Vector) {
    super({
      pos: ship.center,
      width: 10,
      height: 10
    });

    const colorIdx = Math.floor(Math.random() * colors.length);
    this.threadColor = colors[colorIdx].toString();

    this.ship = ship;
    this.startPoint = startPoint;
    this.endPoint = null;
  }

  draw(ctx: CanvasRenderingContext2D, delta: number) {
    ctx.beginPath();
    ctx.strokeStyle = this.threadColor;
    ctx.lineWidth = 4;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // Move to the start point
    ctx.moveTo(this.startPoint.x, this.startPoint.y);

    // Knot
    ctx.arc(this.startPoint.x, this.startPoint.y, 5, 0, Math.PI * 2);

    if (this.endPoint) {
      ctx.lineTo(this.endPoint.x, this.endPoint.y);
      ctx.arc(this.endPoint.x, this.endPoint.y, 5, 0, Math.PI * 2);
    } else {
      const { x, y } = this.ship.getThreadAttachPoint();
      ctx.lineTo(x, y);
      ctx.arc(x, y, 2, 0, Math.PI * 2);
    }
    ctx.stroke();
    ctx.closePath();
  }

  anchorThread() {
    this.endPoint = this.ship.getThreadAttachPoint();
  }
}
