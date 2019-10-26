import { TestBed } from "@angular/core/testing";
import { RayTransformationService } from "./ray-transformation.service";
import { Ray } from "../models/ray/ray";
import { Point } from "../models/tuples/point";
import { Vector } from "../models/tuples/vector";

describe("RayTransformationService", () => {
  let service: RayTransformationService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RayTransformationService]
    });

    service = TestBed.get(RayTransformationService);
  });

  describe("transformations", () => {
    it("should not modify the origin ray", () => {
      const ray = new Ray(new Point(1, 2, 3), new Vector(0, 1, 0));
      const transformation = service.translation(3, 4, 5);
      service.transform(ray, transformation);
      expect(ray).toEqual(new Ray(new Point(1, 2, 3), new Vector(0, 1, 0)));
    });

    it("should apply the translation matrix to the origin and direction of the ray", () => {
      const ray = new Ray(new Point(1, 2, 3), new Vector(0, 1, 0));
      const transformation = service.translation(3, 4, 5);
      const transformedRay = service.transform(ray, transformation);
      expect(transformedRay.origin).toEqual(new Point(4, 6, 8));
      expect(transformedRay.direction).toEqual(new Vector(0, 1, 0));
    });

    it("should apply the scaling matrix to the origin and direction of the ray", () => {
      const ray = new Ray(new Point(1, 2, 3), new Vector(0, 1, 0));
      const transformation = service.scaling(2, 3, 4);
      const transformedRay = service.transform(ray, transformation);
      expect(transformedRay.origin).toEqual(new Point(2, 6, 12));
      expect(transformedRay.direction).toEqual(new Vector(0, 3, 0));
    });
  });
});
