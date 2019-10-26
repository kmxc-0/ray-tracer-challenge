import { Injectable } from "@angular/core";
import { TransformationService } from "./transformation.service";
import { Ray } from "../models/ray/ray";
import { Matrix } from "../models/matrices/matrix";
import { Tuple } from "../models/tuples/tuple";
import { Point } from "../models/tuples/point";
import { Vector } from "../models/tuples/vector";

@Injectable()
export class RayTransformationService extends TransformationService {
  transform(ray: Ray, transformation: Matrix): Ray {
    const { x, y, z } = transformation.multiply(ray.origin) as Tuple;
    const originPos = new Point(x, y, z);
    const dir = transformation.multiply(ray.direction) as Tuple;
    const directionVector = new Vector(dir.x, dir.y, dir.z);

    return new Ray(originPos, directionVector);
  }
}
