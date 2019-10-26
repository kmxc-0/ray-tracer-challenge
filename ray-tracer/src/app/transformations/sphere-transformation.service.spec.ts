import { SphereTransformationService } from "./sphere-transformation.service";
import { TestBed } from "@angular/core/testing";
import { Sphere } from "../models/sphere";

describe("SphereTransformationService", () => {
  let service: SphereTransformationService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SphereTransformationService]
    });

    service = TestBed.get(SphereTransformationService);
  });

  describe("transform", () => {
    it("should change a spheres transformation", () => {
      const s = new Sphere();
      const t = service.translation(2, 3, 4);
      const transformedSphere = service.transform(s, t);

      expect(transformedSphere.transformation).toEqual(t);
    });
  });
});
