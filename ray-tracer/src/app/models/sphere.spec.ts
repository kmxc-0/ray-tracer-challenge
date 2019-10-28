import { Sphere } from "./sphere";
import { Vector } from "./tuples/vector";
import { Point } from "./tuples/point";

describe("Sphere", () => {
  it("should create a new Sphere", () => {
    expect(new Sphere()).toBeDefined();
  });

  it("should create a normal at a given point on the x axis", () => {
    expect(new Sphere().normalAt(new Point(1, 0, 0))).toEqual(
      new Vector(1, 0, 0)
    );
  });

  it("should create a normal at the given point on the y axis", () => {
    expect(new Sphere().normalAt(new Point(0, 1, 0))).toEqual(
      new Vector(0, 1, 0)
    );
  });

  it("should create a normal at the given point on the z axis", () => {
    expect(new Sphere().normalAt(new Point(0, 0, 1))).toEqual(
      new Vector(0, 0, 1)
    );
  });

  it("should create a normal at a noaxial point", () => {
    const root3Over3 = +(Math.sqrt(3) / 3).toFixed(4);
    const normal: Vector = new Sphere().normalAt(
      new Point(root3Over3, root3Over3, root3Over3)
    );
    expect(normal.x).toBeCloseTo(root3Over3);
    expect(normal.y).toBeCloseTo(root3Over3);
    expect(normal.z).toBeCloseTo(root3Over3);
  });

  it("should create a normalized vector as a normal", () => {
    const root3Over3 = +(Math.sqrt(3) / 3).toFixed(4);
    const normal: Vector = new Sphere().normalAt(
      new Point(root3Over3, root3Over3, root3Over3)
    );

    const normalizedNormal = normal.normalize();
    expect(normal).toEqual(normalizedNormal);
  });
});
