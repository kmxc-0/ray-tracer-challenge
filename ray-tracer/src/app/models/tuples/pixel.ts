import { Color } from "./color";

export class Pixel {
  constructor(public x, public y, public color = new Color(0, 0, 0)) {}
}
