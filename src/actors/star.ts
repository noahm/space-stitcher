import {
  Actor,
  Color,
  Vector,
  Engine,
  EmitterType,
  ParticleEmitter
} from "excalibur";

interface StarOptions {
  randomX: boolean;
  useVelocity: boolean;
}

export function getStarField(engine: Engine) {
  const emitter = new ParticleEmitter(
    engine.canvasWidth,
    0,
    1,
    engine.canvasHeight
  );
  emitter.emitterType = EmitterType.Rectangle;
  emitter.minVel = 162;
  emitter.maxVel = 225;
  emitter.minAngle = Math.PI;
  emitter.maxAngle = Math.PI;
  emitter.isEmitting = true;
  emitter.emitRate = 8;
  emitter.opacity = 0.68;
  emitter.fadeFlag = false;
  emitter.particleLife = 5445;
  emitter.maxSize = 3;
  emitter.minSize = 1;
  emitter.startSize = 0;
  emitter.endSize = 0;
  emitter.acceleration = new Vector(0, 0);
  emitter.beginColor = Color.White;
  emitter.endColor = Color.White;
  return emitter;
}
