import { Actor, Color, Vector, Engine } from "excalibur";

interface StarOptions {
  randomX: boolean;
}

export function getStar(engine: Engine, opts?: Partial<StarOptions>) {
  const size = Math.round(Math.random() * 4);
  const y = Math.round(Math.random() * engine.canvasHeight);
  const x = opts && opts.randomX ?  Math.round(Math.random() * engine.canvasWidth) : engine.canvasWidth;
  const colorVal = Math.round(Math.random() * 50) + 200;
  const vel = (colorVal / 250) * -20;

  let redMod = 0;
  let blueMod = 0;

  if (colorVal >= 200 && colorVal < 203) {
    redMod = 255;
  } else if (colorVal > 247) {
    blueMod = 255;
  }

  const instance = new Actor(x, y, size, size);
  const red = redMod || (blueMod ? 30 : colorVal);
  const blue = blueMod || (redMod ? 30 : colorVal);
  const green = (redMod || blueMod) ? 0 : colorVal;
  const alpha = (redMod || blueMod) ? 0.35 : 1;
  instance.color = new Color(red, green, blue, alpha);
  instance.vel = new Vector(vel, 0);

  instance.on('postdraw', () => {
    if (instance.isOffScreen) {
      engine.remove(instance);
    }
  })

  return instance;
}