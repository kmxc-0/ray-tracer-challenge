import { Point } from "./tuples/point";
import { identity4 } from "./matrices/identities";
import { Matrix } from "./matrices/matrix";
import { Vector } from "./tuples/vector";
import { SphereTransformationService } from "../transformations/sphere-transformation.service";
import { Tuple } from "./tuples/tuple";
import { Material } from "./material";

export class Sphere extends Point {
  radii = 1;
  transformation: Matrix = identity4;
  material = new Material();
  transformationService: SphereTransformationService;
  constructor() {
    super();
    this.transformationService = new SphereTransformationService();
  }

  normalAt(worldPoint: Point): Vector {
    const objP = this.transformation.invert().multiply(worldPoint) as Tuple;
    const objPNormal = new Point(objP.x, objP.y, objP.z);
    const worldNormal = this.transformation
      .invert()
      .transpose()
      .multiply(objPNormal) as Tuple;
    return new Vector(worldNormal.x, worldNormal.y, worldNormal.z).normalize();
  }

  setTransform(m: Matrix) {
    const { x, y, z, transformation } = this.transformationService.transform(
      this,
      m
    );
    this.x = x;
    this.y = y;
    this.z = z;
    this.transformation = transformation;
  }
}
