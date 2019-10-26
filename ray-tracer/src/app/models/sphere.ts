import { Point } from "./tuples/point";
import { identity4 } from "./matrices/identities";
import { Matrix } from "./matrices/matrix";

export class Sphere extends Point {
  radii = 1;
  transformation: Matrix = identity4;
  constructor() {
    super();
  }
}
