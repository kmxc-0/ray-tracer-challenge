import { Injectable } from "@angular/core";
import { Matrix } from "../models/matrices/matrix";

@Injectable()
export class TransformationService {
  translation(x: number, y: number, z: number): Matrix {
    const xr = [1, 0, 0, x];
    const yr = [0, 1, 0, y];
    const zr = [0, 0, 1, z];
    const wr = [0, 0, 0, 1];
    return new Matrix(xr, yr, zr, wr);
  }

  scaling(x: number, y: number, z: number): Matrix {
    const xr = [x, 0, 0, 0];
    const yr = [0, y, 0, 0];
    const zr = [0, 0, z, 0];
    const wr = [0, 0, 0, 1];
    return new Matrix(xr, yr, zr, wr);
  }
}
