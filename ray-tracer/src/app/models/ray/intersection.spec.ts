import { Intersection, Intersections } from "./intersection";
import { Sphere } from "../sphere";

describe("Intersection", () => {
  describe("creating a new intersection", () => {
    it("should encapsulate t and object", () => {
      const sphere = new Sphere();
      expect(new Intersection(3.5, sphere)).toEqual(
        expect.objectContaining({
          t: 3.5,
          object: sphere
        })
      );
    });
  });
});

describe("Intersections", () => {
  it("should provide a collection of intersections", () => {
    const s = new Sphere();
    const i1 = new Intersection(1, s);
    const i2 = new Intersection(2, s);

    const xs = new Intersections(i1, i2);
    expect(xs.intersections.length).toEqual(2);
    expect(xs.intersections[0].t).toEqual(1);
    expect(xs.intersections[1].t).toEqual(2);
  });

  describe("hit", () => {
    let s: Sphere;
    beforeEach(() => {
      s = new Sphere();
    });

    it("should return a hit (lowest non-negative t value) when all intersections have positive t", () => {
      const i1 = new Intersection(1, s);
      const i2 = new Intersection(2, s);
      const xs = new Intersections(i2, i1);

      expect(xs.hit()).toEqual(i1);
    });

    it("should return a hit when some intersections have negative t", () => {
      const i1 = new Intersection(-1, s);
      const i2 = new Intersection(1, s);
      const xs = new Intersections(i2, i1);

      expect(xs.hit()).toEqual(i2);
    });

    it("should return no hit when all intersections have negative t", () => {
      const i1 = new Intersection(-2, s);
      const i2 = new Intersection(-1, s);
      const xs = new Intersections(i2, i1);

      expect(xs.hit()).toEqual(undefined);
    });

    it("should always return the lowest nonnegative intersection", () => {
      const i1 = new Intersection(5, s);
      const i2 = new Intersection(7, s);
      const i3 = new Intersection(-3, s);
      const i4 = new Intersection(2, s);
      const xs = new Intersections(i1, i2, i3, i4);

      expect(xs.hit()).toEqual(i4);
    });
  });
});
