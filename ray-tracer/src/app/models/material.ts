import { Color } from "./tuples/color";
import { Vector } from "./tuples/vector";
import { Lights } from "./light";
import { Point } from "./tuples/point";
import { Tuple } from "./tuples/tuple";

export class Material {
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
  ): Color {
    const effectiveColor: Color = this.color.hadamardProduct(light.intensity);
    const lightV: Vector = Vector.toVector(
      light.position.subtract(position)
    ).normalize();
    const ambient: Color = effectiveColor.timesScalar(this.ambient);

    const lightDotNormal: number = lightV.dot(normalV);
    let diffuse: Color;
    let specular: Color;
    if (lightDotNormal < 0) {
      diffuse = Color.BLACK;
      specular = Color.BLACK;
    } else {
      diffuse = effectiveColor.timesScalar(this.diffuse * lightDotNormal);
      const reflect: Vector = Vector.toVector(lightV.negate()).reflect(normalV);
      const reflectDotEye = +reflect.dot(eyev).toFixed(4);
      console.log(reflectDotEye);
      if (reflectDotEye < 0) {
        specular = Color.BLACK;
      } else {
        specular = light.intensity.timesScalar(
          this.specular * reflectDotEye ** this.shininess
        );
      }
    }
    console.log(
      `ambient: ${ambient.red}, diffuse: ${diffuse.red}, specular: ${specular.red}`
    );
    return ambient.colorMerge(diffuse).colorMerge(specular);
  }
}
