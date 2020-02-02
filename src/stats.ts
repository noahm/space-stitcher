import Config from "./config";

class Stats {
  public hp: number = Config.totalHp;
  public gameOver: boolean = false;
  public remainingEdges = -1;
  public reset() {
    this.hp = Config.totalHp;
    this.gameOver = false;
    this.remainingEdges = -1;
  }
}

export const stats = new Stats();
