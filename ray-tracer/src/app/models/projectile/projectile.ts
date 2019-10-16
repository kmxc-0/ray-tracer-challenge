import { Point } from "../tuples/point";
import { Vector } from "../tuples/vector";

export class Projectile {
  constructor(public position: Point, public velocity: Vector) {}
}
