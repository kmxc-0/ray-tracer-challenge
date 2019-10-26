import { Injectable } from "@angular/core";
import { TransformationService } from "./transformation.service";
import { Sphere } from "../models/sphere";
import { Matrix } from "../models/matrices/matrix";

@Injectable()
export class SphereTransformationService extends TransformationService {
  transform(sphere: Sphere, transformation: Matrix): Sphere {
    const t = transformation.multiply(sphere.transformation) as Matrix;
    const s = new Sphere();
    s.transformation = t;
    return s;
  }
}
