import * as ex from "excalibur";
import { Sounds, explosionSpriteSheet, needleSheet } from "../resources";
import Config from "../config";
import { Bullet } from "./bullet";
import { animManager } from "./animation-manager";
import { stats } from "../stats";
import {
  Engine,
  Input,
  Color,
  CollisionStartEvent,
  CollisionEndEvent,
  Vector
} from "excalibur";
import { RiftEdge, EDGE_COLLIDER } from "./rift-edge";
import { Rift } from "./rift";
import { SpaceThread } from "./thread";

type FireFunction = (engine: ex.Engine) => void;
function throttle(func: FireFunction, throttle: number): FireFunction {
  var lastTime = Date.now();
  return (engine: ex.Engine) => {
    var currentTime = Date.now();
    if (currentTime - lastTime > throttle) {
      var val = func(engine);
      lastTime = currentTime;
      return val;
    }
  };
}

export class Ship extends ex.Actor {
  private flipBarrel = false;
  private throttleFire?: FireFunction;
  private explode?: ex.Animation;
  private isInsideRift: boolean;
  private currentThread: SpaceThread | null;
  private engine: Engine;

  constructor(
    engine: Engine,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    super({
      pos: new ex.Vector(x, y),
      width: width,
      height: height
    });

    this.body.collider.type = ex.CollisionType.Passive;
    this.isInsideRift = false;
    this.currentThread = null;
    this.engine = engine;
  }

  onInitialize(engine: ex.Engine) {
    this.throttleFire = throttle(this.fire, Config.playerFireThrottle);
    this.on("collisionstart", this.onCollisionStart);
    this.on("collisionend", this.onCollisionEnd);

    // Get animation
    const anim = needleSheet.getSprite(0);
    anim.scale = new ex.Vector(1, 1);
    this.addDrawing("default", anim);

    this.explode = explosionSpriteSheet.getAnimationForAll(engine, 40);
    this.explode.scale = new ex.Vector(3, 3);
    this.explode.loop = false;
  }

  private targetedEdge: RiftEdge | undefined;

  onCollisionStart(evt: CollisionStartEvent) {
    if (evt.other instanceof RiftEdge) {
      if (this.targetedEdge) {
        this.targetedEdge.unmarkTarget();
      }
      this.targetedEdge = evt.other;
      this.targetedEdge.markTarget();
    } else if (evt.other instanceof Rift) {
      this.isInsideRift = true;
    }
  }

  onCollisionEnd(evt: CollisionEndEvent) {
    if (evt.other instanceof RiftEdge) {
      if (this.isInsideRift && !this.currentThread) {
        // by the time this event bubbles, the current thread
        // attach point is a few pixels away from the actual
        // targeted edge. Need to do some math to extend the current
        // thread attach point vector to the middle of the
        // targeted edge.
        this.currentThread = new SpaceThread(
          this,
          this.getThreadAttachPoint(),
          evt.other
        );
        this.engine.add(this.currentThread);
      }

      if (evt.other === this.targetedEdge) {
        this.targetedEdge.unmarkTarget();
        this.targetedEdge = undefined;
      }
    } else if (evt.other instanceof Rift) {
      this.isInsideRift = false;

      if (this.currentThread && this.targetedEdge) {
        this.currentThread.anchorThread(this.targetedEdge);
        this.currentThread = null;
      }
    }
  }

  onPreUpdate(engine: Engine, delta: number) {
    this.handleMovement(engine);
  }

  onPostUpdate(engine: ex.Engine, delta: number) {
    if (stats.hp <= 0 && this.explode) {
      // update game to display game over
      // gameOver = true;
      animManager.play(this.explode, this.pos);
      Sounds.explodeSound.play();
      this.kill();
    }

    // Decay velocity
    this.vel.scaleEqual(0.9);
    // Keep player in the viewport
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y = 0;
    }
    if (this.pos.x > engine.drawWidth) {
      this.pos.x = engine.drawWidth;
      this.vel.x = 0;
    }
    if (this.pos.y > engine.drawHeight) {
      this.pos.y = engine.drawHeight;
      this.vel.y = 0;
    }
  }

  private fire = (engine: ex.Engine) => {
    let bullet = new Bullet(
      this.pos.x + (this.flipBarrel ? -40 : 40),
      this.pos.y - 20,
      0,
      Config.playerBulletVelocity,
      this
    );
    this.flipBarrel = !this.flipBarrel;
    Sounds.laserSound.play();
    engine.add(bullet);
  };

  handlePointerEvent = (engine: ex.Engine, evt: ex.Input.PointerDownEvent) => {
    let dir = evt.worldPos.sub(this.pos);
    let distance = dir.magnitude();
    if (distance > 50) {
      this.vel = dir.scale(Config.playerSpeed / distance);
    } else {
      this.throttleFire ? this.throttleFire(engine) : null;
    }
  };

  private handleMovement(engine: ex.Engine) {
    const keyDir = this.getDirFromKeys(engine);
    if (keyDir.distance()) {
      this.applyInput(keyDir);
      return;
    }

    const touchDir = this.getDirFromTouch(engine);
    if (touchDir.distance()) {
      this.applyInput(touchDir);
    }
  }

  private applyInput(input: Vector) {
    this.vel = input
      .scale(Config.playerSpeed)
      .average(this.vel.scale(Config.playerSmoothness))
      .normalize()
      .scale(Config.playerSpeed);
    this.rotation = this.vel.toAngle() + Math.PI / 2;
  }

  private getDirFromKeys(engine: Engine) {
    const dir = ex.Vector.Zero.clone();
    // Some keys do the same thing
    if (
      engine.input.keyboard.isHeld(ex.Input.Keys.Up) ||
      engine.input.keyboard.isHeld(ex.Input.Keys.W)
    ) {
      dir.y += -1;
    }

    if (
      engine.input.keyboard.isHeld(ex.Input.Keys.Left) ||
      engine.input.keyboard.isHeld(ex.Input.Keys.A)
    ) {
      dir.x += -1;
    }

    if (
      engine.input.keyboard.isHeld(ex.Input.Keys.Right) ||
      engine.input.keyboard.isHeld(ex.Input.Keys.D)
    ) {
      dir.x += 1;
    }

    if (
      engine.input.keyboard.isHeld(ex.Input.Keys.Down) ||
      engine.input.keyboard.isHeld(ex.Input.Keys.S)
    ) {
      dir.y += 1;
    }
    return dir;
  }

  private getDirFromTouch(engine: Engine) {
    const pointer = engine.input.pointers.primary;

    if (pointer.isDragging) {
      if (!pointer.isActorUnderPointer(this)) {
        return pointer.lastWorldPos.sub(this.pos).normalize();
      }
    }
    return Vector.Zero;
  }

  /**
   * Returns a vector that matches the thread location
   * from the Space Needle sprite sheet, regardless of
   * rotation or orientation.
   */
  getThreadAttachPoint() {
    const drawingWidth = this.currentDrawing.drawWidth;
    const drawingHeight = this.currentDrawing.drawHeight;
    const worldPos = this.getWorldPos();

    let bottomLeft = new Vector(
      worldPos.x - drawingWidth / 2,
      worldPos.y + drawingHeight / 2
    );
    // bottomLeft = bottomLeft.rotate(this.rotation, this.center);

    let bottomRight = new Vector(
      worldPos.x + drawingWidth / 2,
      worldPos.y + drawingHeight / 2
    );
    // bottomRight = bottomRight.rotate(this.rotation, this.center);

    return bottomLeft.average(bottomRight).rotate(this.rotation, this.center);
    const attachPoint = new Vector(
      (bottomLeft.x + bottomRight.x) / 2,
      (bottomLeft.y + bottomRight.y) / 2
    );

    return attachPoint;
  }
}
