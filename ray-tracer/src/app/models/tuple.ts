export class Tuple {
  isPoint: boolean;
  isVector: boolean;
  private readonly EPSILON = 0.00001;

  constructor(public x = 0, public y = 0, public z = 0, private w = 0) {
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
