import { Color, UIActor } from "excalibur";
import { stats } from "../stats";

export class Score extends UIActor {
  color = Color.Gray;

  draw(ctx: CanvasRenderingContext2D) {
    ctx.font = "normal 14px sans-serif";
    ctx.fillStyle = this.color.toString();
    ctx.fillText("Edges: " + stats.remainingEdges, this.pos.x, this.pos.y);
  }
}
