import { Tuple } from "./tuple";

export class Color extends Tuple {
  readonly red: number;
  readonly green: number;
  readonly blue: number;
  constructor(public x = 0, public y = 0, public z = 0) {
    super(x, y, z);
    this.red = x;
    this.green = y;
    this.blue = z;
  }

  hadamardProduct(color: Color): Color {
    const red = this.red * color.red;
    const green = this.green * color.green;
    const blue = this.blue * color.blue;
    return new Color(+red.toFixed(2), +green.toFixed(2), +blue.toFixed(2));
  }
}
