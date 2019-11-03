import { Material } from "./material";
import { Color } from "./tuples/color";
import { Vector } from "./tuples/vector";
import { Lights } from "./light";
import { Point } from "./tuples/point";

describe("Material", () => {
  it("should create a material with default color, ambient, diffuse, specular and shininess properties", () => {
    const material = new Material();

    expect(material.color).toEqual(new Color(1, 1, 1));
    expect(material.ambient).toEqual(0.1);
    expect(material.diffuse).toEqual(0.9);
    expect(material.specular).toEqual(0.9);
    expect(material.shininess).toEqual(200);
  });

  describe("lighting", () => {
    let position: Point;
    beforeEach(() => {
      position = new Point(0, 0, 0);
    });

    it("should light with the eye between the light and the surface (full ambient, diffuse and specular strength)", () => {
      const eyev = new Vector(0, 0, -1);
      const normalv = new Vector(0, 0, -1);
      const light = new Lights(new Color(1, 1, 1), new Point(0, 0, -10));
      const material = new Material();
      const result = material.lighting(eyev, normalv, light, position);
      expect(result).toEqual(new Color(1.9, 1.9, 1.9));
    });

    it("should light with the eye between the light and the surface, eye offset 45 degrees", () => {
      const root2over2 = +(Math.SQRT2 / 2).toFixed(4);
      const eyev = new Vector(0, root2over2, root2over2);
      const normalv = new Vector(0, 0, -1);
      const light = new Lights(new Color(1, 1, 1), new Point(0, 0, -10));
      const material = new Material();
      const result = material.lighting(eyev, normalv, light, position);
      expect(result).toEqual(new Color(1.0, 1.0, 1.0));
    });

    it("should light with the eye opposite the surface, light offset 45 degrees", () => {
      const eyev = new Vector(0, 0, -1);
      const normalv = new Vector(0, 0, -1);
      const light = new Lights(new Color(1, 1, 1), new Point(0, 10, -10));
      const material = new Material();
      const result = material.lighting(eyev, normalv, light, position);
      expect(result).toEqual(new Color(0.7364, 0.7364, 0.7364));
    });

    it("should light with the eye in the path of the reflection vector", () => {
      const root2over2 = +(Math.SQRT2 / 2).toFixed(4);
      const eyev = new Vector(0, -root2over2, -root2over2);
      const normalv = new Vector(0, 0, -1);
      const light = new Lights(new Color(1, 1, 1), new Point(0, 10, -10));
      const material = new Material();
      const result = material.lighting(eyev, normalv, light, position);
      expect(result).toEqual(new Color(1.6364, 1.6364, 1.6364));
    });

    it("should light with the light behind the surface", () => {
      const eyev = new Vector(0, 0, -1);
      const normalv = new Vector(0, 0, -1);
      const light = new Lights(new Color(1, 1, 1), new Point(0, 0, 10));
      const material = new Material();
      const result = material.lighting(eyev, normalv, light, position);
      expect(result).toEqual(new Color(0.1, 0.1, 0.1));
    });
  });
});
