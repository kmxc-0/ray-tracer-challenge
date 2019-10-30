import { Color } from "./tuples/color";
import { Vector } from "./tuples/vector";
import { Lights } from "./lights";
import { Point } from "./tuples/point";
import { Tuple } from "./tuples/tuple";

export class Material {
  private static readonly BLACK = new Color(0, 0, 0);
  constructor(
    public color = new Color(1, 1, 1),
    public ambient = 0.1,
    public diffuse = 0.9,
    public specular = 0.9,
    public shininess = 200
  ) {}

  lighting(
    eyev: Vector,
    normalV: Vector,
    light: Lights,
    position: Point
  ): Tuple {
    const effectiveColor = this.color.multiplyByTuple(light.intensity);
    const lightT = light.position.subtract(position);
    const lightV = new Vector(lightT.x, lightT.y, lightT.z).normalize();
    const ambient = effectiveColor.multiply(this.ambient);

    const lightDotNormal = lightV.dot(normalV);
    let diffuse, specular;

    if (lightDotNormal < 0) {
      diffuse = Material.BLACK;
      specular = Material.BLACK;
    } else {
      diffuse = effectiveColor
        .multiply(this.diffuse as number)
        .multiply(lightDotNormal);
      // lightV may need to be negative
      const nlv = lightV.negate();
      const invertedLightV = new Vector(nlv.x, nlv.y, nlv.z);
      const reflectv = invertedLightV.reflect(normalV);
      const reflectDotEye = reflectv.dot(eyev);

      if (reflectDotEye <= 0) {
        specular = Material.BLACK;
      } else {
        specular = light.intensity
          .multiply(this.specular)
          .multiply(reflectDotEye ** this.shininess);
      }
    }
    const intermediary = ambient.add(diffuse);
    const intermediaryV = new Vector(
      intermediary.x,
      intermediary.y,
      intermediary.z
    );

    const { x, y, z } = intermediaryV.add(specular);
    return new Color(+x.toFixed(4), +y.toFixed(4), +z.toFixed(4));
  }
}
