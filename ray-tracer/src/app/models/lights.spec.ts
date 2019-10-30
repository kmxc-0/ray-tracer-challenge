import { Lights } from "./lights";
import { Color } from "./tuples/color";
import { Point } from "./tuples/point";

describe("Lights", () => {
  it("should create a point light with position and intensity", () => {
    const intensity = new Color(1, 1, 1);
    const position = new Point(0, 0, 0);

    const light = new Lights(intensity, position);
    expect(light.intensity).toEqual(intensity);
    expect(light.position).toEqual(position);
  });
});
