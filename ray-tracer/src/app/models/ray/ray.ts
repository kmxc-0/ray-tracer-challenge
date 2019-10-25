import { Point } from "../tuples/point";
import { Vector } from "../tuples/vector";
import { Sphere } from "../sphere";
import { Tuple } from "../tuples/tuple";

export class Ray {
  constructor(public origin = new Point(), public direction = new Vector()) {}

  position(t: number) {
    return this.direction.multiply(t).add(this.origin);
  }

  intersect(s: Sphere): number[] {
    const d: Tuple = this.origin.subtract(new Vector());
    const sphereToRay = new Vector(d.x, d.y, d.z);
    const a = this.direction.dot(this.direction);
    const b = 2 * this.direction.dot(sphereToRay);
    const c = sphereToRay.dot(sphereToRay) - 1;

    const discriminant = Math.pow(b, 2) - 4 * a * c;

    if (discriminant < 0) {
      // ray misses the sphere
      return [];
    }

    const t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
    const t2 = (-b + Math.sqrt(discriminant)) / (2 * a);

    return [t1, t2];
  }
}
