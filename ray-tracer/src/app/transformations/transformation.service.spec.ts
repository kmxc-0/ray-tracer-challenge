import { TestBed } from "@angular/core/testing";
import { TransformationService } from "./transformation.service";
import { Point } from "../models/tuples/point";
import { Matrix } from "../models/matrices/matrix";
import { Vector } from "../models/tuples/vector";
import { Tuple } from "../models/tuples/tuple";

describe("TransformationService", () => {
  let service: TransformationService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransformationService]
    });

    service = TestBed.get(TransformationService);
  });

  describe("translation", () => {
    it("should move a point by a translation matrix", () => {
      const transform: Matrix = service.translation(5, -3, 2);
      const point = new Point(-3, 4, 5);

      expect(transform.multiply(point)).toEqual(new Point(2, 1, 7));
    });

    it("should move a point in reverse when multiplied by the inverse of a translation matrix", () => {
      const transform: Matrix = service.translation(5, -3, 2).invert();
      const point = new Point(-3, 4, 5);

      expect(transform.multiply(point)).toEqual(new Point(-8, 7, 3));
    });

    it("should not effect vectors", () => {
      const transform: Matrix = service.translation(5, -3, 2);
      const vector = new Vector(-3, 4, 5);

      expect(transform.multiply(vector)).toEqual(vector);
    });
  });

  describe("scaling", () => {
    it("should return a scaling matrix to apply to a point", () => {
      const transform: Matrix = service.scaling(2, 3, 4);
      const point = new Point(-4, 6, 8);

      expect(transform.multiply(point)).toEqual(new Point(-8, 18, 32));
    });

    it("should return a scaling matrix to apply to a vector", () => {
      const transform: Matrix = service.scaling(2, 3, 4);
      const vector = new Vector(-4, 6, 8);

      expect(transform.multiply(vector)).toEqual(new Vector(-8, 18, 32));
    });

    it("should allow reflection by scaling through a negative value", () => {
      const transform: Matrix = service.scaling(-1, 1, 1);
      const point = new Point(2, 3, 4);

      expect(transform.multiply(point)).toEqual(new Point(-2, 3, 4));
    });
  });

  describe("rotationX", () => {
    it("should rotate a half quarter", () => {
      const halfQuarter = Math.PI / 4;
      const transform: Matrix = service.rotationX(halfQuarter);
      const point = new Point(0, 1, 0);

      const result = transform.multiply(point) as Tuple;
      expect(result.x).toEqual(0);
      expect(result.y).toBeCloseTo(Math.SQRT2 / 2, 5);
      expect(result.z).toBeCloseTo(Math.SQRT2 / 2, 5);
      expect(result.w).toEqual(1);
    });

    it("should rotate a full quarter", () => {
      const fullQuarter = Math.PI / 2;
      const transform: Matrix = service.rotationX(fullQuarter);
      const point = new Point(0, 1, 0);

      expect(transform.multiply(point)).toEqual(new Point(0, 0, 1));
    });
  });

  describe("rotationY", () => {
    it("should rotate a half quarter", () => {
      const halfQuarter = Math.PI / 4;
      const transform: Matrix = service.rotationY(halfQuarter);
      const point = new Point(0, 0, 1);

      const result = transform.multiply(point) as Tuple;
      expect(result.x).toBeCloseTo(Math.SQRT2 / 2, 5);
      expect(result.y).toEqual(0);
      expect(result.z).toBeCloseTo(Math.SQRT2 / 2, 5);
      expect(result.w).toEqual(1);
    });

    it("should rotate a full quarter", () => {
      const fullQuarter = Math.PI / 2;
      const transform: Matrix = service.rotationY(fullQuarter);
      const point = new Point(0, 0, 1);

      expect(transform.multiply(point)).toEqual(new Point(1, 0, 0));
    });
  });

  describe("rotationZ", () => {
    it("should rotate a half quarter", () => {
      const halfQuarter = Math.PI / 4;
      const transform: Matrix = service.rotationZ(halfQuarter);
      const point = new Point(0, 1, 0);

      const result = transform.multiply(point) as Tuple;
      expect(result.x).toBeCloseTo(-Math.SQRT2 / 2, 5);
      expect(result.y).toBeCloseTo(Math.SQRT2 / 2, 5);
      expect(result.z).toEqual(0);
      expect(result.w).toEqual(1);
    });

    it("should rotate a full quarter", () => {
      const fullQuarter = Math.PI / 2;
      const transform: Matrix = service.rotationZ(fullQuarter);
      const point = new Point(0, 1, 0);

      expect(transform.multiply(point)).toEqual(new Point(-1, 0, 0));
    });
  });

  describe("shearing", () => {
    it("should apply a shearing transformation where x moves in proportion to y", () => {
      const transform: Matrix = service.shearing(1, 0, 0, 0, 0, 0);
      const point = new Point(2, 3, 4);
      expect(transform.multiply(point)).toEqual(new Point(5, 3, 4));
    });

    it("should apply a shearing transformation where x moves in proportion to z", () => {
      const transform: Matrix = service.shearing(0, 1, 0, 0, 0, 0);
      const point = new Point(2, 3, 4);
      expect(transform.multiply(point)).toEqual(new Point(6, 3, 4));
    });

    it("should apply a shearing transformation where y moves in proportion to x", () => {
      const transform: Matrix = service.shearing(0, 0, 1, 0, 0, 0);
      const point = new Point(2, 3, 4);
      expect(transform.multiply(point)).toEqual(new Point(2, 5, 4));
    });

    it("should apply a shearing transformation where y moves in proportion to z", () => {
      const transform: Matrix = service.shearing(0, 0, 0, 1, 0, 0);
      const point = new Point(2, 3, 4);
      expect(transform.multiply(point)).toEqual(new Point(2, 7, 4));
    });

    it("should apply a shearing transformation where y moves in proportion to z", () => {
      const transform: Matrix = service.shearing(0, 0, 0, 0, 1, 0);
      const point = new Point(2, 3, 4);
      expect(transform.multiply(point)).toEqual(new Point(2, 3, 6));
    });

    it("should apply a shearing transformation where z moves in proportion to y", () => {
      const transform: Matrix = service.shearing(0, 0, 0, 0, 0, 1);
      const point = new Point(2, 3, 4);
      expect(transform.multiply(point)).toEqual(new Point(2, 3, 7));
    });
  });

  describe("transformation chaining", () => {
    it("should apply transformations in sequence", () => {
      const point = new Point(1, 0, 1);
      const rotate = service.rotationX(Math.PI / 2);
      const scaling = service.scaling(5, 5, 0);
      const translation = service.translation(10, 5, 7);

      const rotatedP = rotate.multiply(point);
      expect(rotatedP).toEqual(new Point(1, -1, 0));
      const scalingP = scaling.multiply(rotatedP);
      expect(scalingP).toEqual(new Point(5, -5, 0));
      const translatedP = translation.multiply(scalingP);

      expect(translatedP).toEqual(new Point(15, 0, 7));
    });

    it("should apply transformations in reversed order", () => {
      const point = new Point(1, 0, 1);
      const rotate = service.rotationX(Math.PI / 2);
      const scaling = service.scaling(5, 5, 0);
      const translation = service.translation(10, 5, 7);

      const transformation = (translation.multiply(scaling) as Matrix).multiply(
        rotate
      ) as Matrix;

      expect(transformation.multiply(point)).toEqual(new Point(15, 0, 7));
    });
  });
});
