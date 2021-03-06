import { Tuple } from "./tuple";

export class Vector extends Tuple {
  constructor(public x = 0, public y = 0, public z = 0, public w = 0) {
    super(x, y, z, w);
  }

  static toVector(t: Tuple): Vector {
    return new Vector(t.x, t.y, t.z);
  }

  magnitude(): number {
    return Math.sqrt(
      Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2)
    );
  }

  normalize(): Vector {
    const magnitude = this.magnitude();
    return new Vector(
      this.x / magnitude,
      this.y / magnitude,
      this.z / magnitude
    );
  }

  dot(v: Vector): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  cross(v: Vector): Vector {
    return new Vector(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }

  reflect(normalIn: Vector): Vector {
    const dotProduct = normalIn.dot(this);
    const normalOut = normalIn.subtract(this.multiply(2).multiply(dotProduct));
    console.log("reflect", normalOut.x);
    return new Vector(normalOut.x, normalOut.y, normalOut.z);
  }
}
