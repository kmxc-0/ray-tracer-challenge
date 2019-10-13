export class Tuple {
  isPoint: boolean;
  isVector: boolean;

  constructor(public x = 0, public y = 0, public z = 0, private w = 0) {
    this.x = !isNaN(x) && typeof x === "number" ? x : 0;
    this.y = !isNaN(y) && typeof y === "number" ? y : 0;
    this.z = !isNaN(z) && typeof z === "number" ? z : 0;
    this.w = !isNaN(w) && typeof w === "number" ? w : 0;
    this.initDescriptors(this.w);
  }

  private initDescriptors(w: number) {
    this.isPoint = w === 0;
    this.isVector = !this.isPoint;
  }
}
