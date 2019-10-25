import { Ray } from "./ray";
import { Point } from "../tuples/point";
import { Vector } from "../tuples/vector";
import { Sphere } from "../sphere";

describe("Ray", () => {
  it("should create a new Ray", () => {
    expect(new Ray()).toBeDefined();
  });

  describe("creating and querying a ray", () => {
    it("should have an origin and direction public", () => {
      const origin = new Point(1, 2, 3);
      const direction = new Vector(4, 5, 6);
      expect(new Ray(origin, direction)).toEqual(
        expect.objectContaining({
          origin,
          direction
        })
      );
    });
  });

  describe("position", () => {
    it("should compute the point from a distance", () => {
      const ray = new Ray(new Point(2, 3, 4), new Vector(1, 0, 0));

      expect(ray.position(0)).toEqual(new Point(2, 3, 4));
      expect(ray.position(1)).toEqual(new Point(3, 3, 4));
      expect(ray.position(-1)).toEqual(new Point(1, 3, 4));
      expect(ray.position(2.5)).toEqual(new Point(4.5, 3, 4));
    });
  });

  describe("intersect", () => {
    it("should return points of intersection at two points", () => {
      const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));

      const pointsOfIntersection: number[] = ray.intersect(new Sphere());
      expect(pointsOfIntersection.length).toEqual(2);
      expect(pointsOfIntersection[0]).toEqual(4.0);
      expect(pointsOfIntersection[1]).toEqual(6.0);
    });

    it("should return a single point of contact when intersecting a sphere at a tangent", () => {
      const ray = new Ray(new Point(0, 1, -5), new Vector(0, 0, 1));

      const pointsOfIntersection: number[] = ray.intersect(new Sphere());
      expect(pointsOfIntersection.length).toEqual(2);
      expect(pointsOfIntersection[0]).toEqual(5.0);
      expect(pointsOfIntersection[1]).toEqual(5.0);
    });

    it("should return no intersections when a ray misses a sphere", () => {
      const ray = new Ray(new Point(0, 2, -5), new Vector(0, 0, 1));

      const pointsOfIntersection: number[] = ray.intersect(new Sphere());
      expect(pointsOfIntersection.length).toEqual(0);
    });

    it("should return intersections for a ray originating within a sphere", () => {
      const ray = new Ray(new Point(0, 0, 0), new Vector(0, 0, 1));

      const pointsOfIntersection: number[] = ray.intersect(new Sphere());
      expect(pointsOfIntersection.length).toEqual(2);
      expect(pointsOfIntersection[0]).toEqual(-1.0);
      expect(pointsOfIntersection[1]).toEqual(1.0);
    });

    it("should return intersections for a ray originating behind a sphere", () => {
      const ray = new Ray(new Point(0, 0, 5), new Vector(0, 0, 1));

      const pointsOfIntersection: number[] = ray.intersect(new Sphere());
      expect(pointsOfIntersection.length).toEqual(2);
      expect(pointsOfIntersection[0]).toEqual(-6.0);
      expect(pointsOfIntersection[1]).toEqual(-4.0);
    });
  });
});
