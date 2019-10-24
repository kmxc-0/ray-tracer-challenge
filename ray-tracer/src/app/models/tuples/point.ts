import { Tuple } from "./tuple";

export class Point extends Tuple {
  constructor(public x = 0, public y = 0, public z = 1) {
    super(x, y, z, 1);
  }
}
