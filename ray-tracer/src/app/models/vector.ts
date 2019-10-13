import { Tuple } from "./tuple";

export class Vector extends Tuple {
  constructor(public x = 0, public y = 0, public z = 0) {
    super(x, y, z, 1);
  }
}
