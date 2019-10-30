import { Color } from "./tuples/color";
import { Point } from "./tuples/point";

export class Lights {
  constructor(public intensity: Color, public position: Point) {}
}
