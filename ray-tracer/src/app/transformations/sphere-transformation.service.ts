import { Injectable } from "@angular/core";
import { TransformationService } from "./transformation.service";
import { Sphere } from "../models/sphere";
import { Matrix } from "../models/matrices/matrix";
import { Tuple } from "../models/tuples/tuple";

@Injectable()
export class SphereTransformationService extends TransformationService {
  transform(sphere: Sphere, transformation: Matrix): Sphere {
    const t = transformation.multiply(sphere.transformation) as Matrix;
    const { x, y, z } = transformation.multiply(sphere) as Tuple;
    const s = new Sphere();
    s.transformation = t;
    s.x = x;
    s.y = y;
    s.z = z;
    return s;
  }
}
