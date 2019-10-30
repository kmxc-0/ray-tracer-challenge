import { Sphere } from "./sphere";
import { Vector } from "./tuples/vector";
import { Point } from "./tuples/point";
import { Matrix } from "./matrices/matrix";
import { Material } from "./material";

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

  describe("setTransform", () => {
    it("should compute the normal on a translated sphere", () => {
      const s = new Sphere();
      const transformation = s.transformationService.translation(0, 1, 0);
      s.setTransform(transformation);
      const normal = s.normalAt(new Point(0, 1.70711, -0.70711));
      expect(normal.x).toBeCloseTo(0);
      expect(normal.y).toBeCloseTo(0.70711);
      expect(normal.z).toBeCloseTo(-0.70711);
    });

    it("should compute the normal on a transformed sphere", () => {
      const s = new Sphere();
      const piOverFive = +(Math.PI / 5).toFixed(5);
      const sqrtTwoOverTwo = +(Math.SQRT2 / 2).toFixed(3);

      const transformation = s.transformationService
        .scaling(1, 0.5, 1)
        .multiply(s.transformationService.rotationZ(piOverFive)) as Matrix;

      s.setTransform(transformation);

      const normal = s.normalAt(new Point(0, sqrtTwoOverTwo, -sqrtTwoOverTwo));
      expect(normal.x).toBeCloseTo(0);
      expect(normal.y).toBeCloseTo(0.97014);
      expect(normal.z).toBeCloseTo(-0.24254);
    });
  });

  describe("sphere's material", () => {
    it("should have a default material", () => {
      const material = new Sphere().material;
      expect(material).toEqual(new Material());
    });

    it("can be assigned a new material", () => {
      const sphere = new Sphere();
      const material = new Material();
      material.ambient = 0.1;
      sphere.material = material;
      expect(sphere.material).toEqual(material);
    });
  });
});
