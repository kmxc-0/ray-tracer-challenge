import { Point } from "./tuples/point";
import { identity4 } from "./matrices/identities";
import { Matrix } from "./matrices/matrix";
import { Vector } from "./tuples/vector";

export class Sphere extends Point {
  radii = 1;
  transformation: Matrix = identity4;
  constructor() {
    super();
  }

  normalAt(p: Point): Vector {
    const { x, y, z } = p.subtract(new Point(0, 0, 0));
    return new Vector(x, y, z).normalize();
  }
}
