import { Sphere } from "../sphere";

export type Objects = Sphere;
export class Intersection {
  constructor(public t: number, public object: Objects) {}
}

export class Intersections {
  public intersections: Intersection[] = [];
  constructor(...i: Intersection[]) {
    this.intersections = i.sort((a, b) => a.t - b.t);
  }

  hit(): Intersection {
    return this.intersections.find((i: Intersection) => i.t >= 0);
  }
}
