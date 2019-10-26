import { Point } from "../tuples/point";
import { Vector } from "../tuples/vector";
import { Sphere } from "../sphere";
import { Tuple } from "../tuples/tuple";
import { Intersections, Intersection } from "./intersection";

export class Ray {
  constructor(public origin = new Point(), public direction = new Vector()) {}

  position(t: number) {
    return this.direction.multiply(t).add(this.origin);
  }

  intersect(s: Sphere): Intersections {
    const d: Tuple = this.origin.subtract(new Vector());
    const sphereToRay = new Vector(d.x, d.y, d.z);
    const a = this.direction.dot(this.direction);
    const b = 2 * this.direction.dot(sphereToRay);
    const c = sphereToRay.dot(sphereToRay) - 1;

    const discriminant = Math.pow(b, 2) - 4 * a * c;

    if (discriminant < 0) {
      // ray misses the sphere
      return new Intersections();
    }

    const t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
    const t2 = (-b + Math.sqrt(discriminant)) / (2 * a);

    const i1 = new Intersection(t1, s);
    const i2 = new Intersection(t2, s);
    return new Intersections(i1, i2);
  }
}
