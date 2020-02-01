import { Vector, Ray } from "excalibur";

export function midpoint(v1: Vector, v2: Vector) {
  return new Vector((v1.x + v2.x) / 2, (v1.y + v2.y) / 2);
}

export function length(v1: Vector, v2: Vector) {
  const xDiff = v1.x - v2.x;
  const yDiff = v1.y - v2.y;
  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
}

/**
 * Returns each pair of neighboring items in an array, including the wrap-around pair
 */
export function* eachCircularNeighbor<T>(items: T[]): Generator<[T, T], void> {
  let i = 0;
  while (i < items.length) {
    yield [items[(i || items.length) - 1], items[i]];
    i++;
  }
}

export function angleOfLine(v1: Vector, v2: Vector) {
  const xDiff = v2.x - v1.x;
  const yDiff = v2.y - v1.y;
  return Math.atan(yDiff / xDiff);
}
