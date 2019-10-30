export class Tuple {
  isPoint: boolean;
  isVector: boolean;
  private readonly EPSILON = 0.00001;

  constructor(public x = 0, public y = 0, public z = 0, public w = 0) {
    this.x = !isNaN(x) && typeof x === "number" ? x : 0;
    this.y = !isNaN(y) && typeof y === "number" ? y : 0;
    this.z = !isNaN(z) && typeof z === "number" ? z : 0;
    this.w = !isNaN(w) && typeof w === "number" ? w : 0;
    this.initDescriptors(this.w);
  }

  subtract(tuple: Tuple): Tuple {
    const subtract = (a: number, b: number): number => a - b;
    return new Tuple(
      subtract(this.x, tuple.x),
      subtract(this.y, tuple.y),
      subtract(this.z, tuple.z),
      subtract(this.w, tuple.w)
    );
  }

  add(tuple: Tuple): Tuple {
    const sum = (a: number, b: number): number => a + b;
    return new Tuple(
      sum(this.x, tuple.x),
      sum(this.y, tuple.y),
      sum(this.z, tuple.z),
      sum(this.w, tuple.w)
    );
  }

  negate(): Tuple {
    const negate = (a: number) => (a === 0 ? 0 : -a);
    return new Tuple(
      negate(this.x),
      negate(this.y),
      negate(this.z),
      negate(this.w)
    );
  }

  multiplyByTuple(multiplier: Tuple): Tuple {
    return new Tuple(
      this.x * multiplier.x,
      this.y * multiplier.y,
      this.z * multiplier.z
    );
  }
  multiply(multiplier: number): Tuple {
    const multiply = (x: number) => x * multiplier;
    return new Tuple(
      multiply(this.x),
      multiply(this.y),
      multiply(this.z),
      multiply(this.w)
    );
  }

  divide(divisor: number): Tuple {
    const divide = (x: number) => (x === 0 ? 0 : x / divisor);
    return new Tuple(
      divide(this.x),
      divide(this.y),
      divide(this.z),
      divide(this.w)
    );
  }

  isEqual(tuple: Tuple) {
    const compare = (a: number, b: number): boolean =>
      Math.abs(a - b) < this.EPSILON;

    return (
      compare(this.x, tuple.x) &&
      compare(this.y, tuple.y) &&
      compare(this.z, tuple.z) &&
      compare(this.w, tuple.w)
    );
  }

  private initDescriptors(w: number) {
    this.isPoint = w === 1;
    this.isVector = !this.isPoint;
  }
}
