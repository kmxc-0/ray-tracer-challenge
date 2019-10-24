import { TestBed } from "@angular/core/testing";
import { TransformationService } from "./transformation.service";
import { Point } from "../models/tuples/point";
import { Matrix } from "../models/matrices/matrix";
import { Vector } from "../models/tuples/vector";

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
});
