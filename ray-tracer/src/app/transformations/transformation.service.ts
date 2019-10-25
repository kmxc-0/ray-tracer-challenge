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

  rotationX(r: number) {
    const fixed = (num: number): number => +num.toFixed(5);
    const fixedR = fixed(r);
    const xr = [1, 0, 0, 0];
    const yr = [0, fixed(Math.cos(fixedR)), fixed(-Math.sin(fixedR)), 0];
    const zr = [0, fixed(Math.sin(fixedR)), fixed(Math.cos(fixedR)), 0];
    const wr = [0, 0, 0, 1];

    return new Matrix(xr, yr, zr, wr);
  }

  rotationY(r: number) {
    const fixed = (num: number): number => +num.toFixed(5);
    const fixedR = fixed(r);

    const xr = [fixed(Math.cos(fixedR)), 0, fixed(Math.sin(fixedR)), 0];
    const yr = [0, 1, 0, 0];
    const zr = [fixed(-Math.sin(fixedR)), 0, fixed(Math.cos(fixedR)), 0];
    const wr = [0, 0, 0, 1];

    return new Matrix(xr, yr, zr, wr);
  }

  rotationZ(r: number) {
    const fixed = (num: number): number => +num.toFixed(5);
    const fixedR = fixed(r);

    const xr = [fixed(Math.cos(fixedR)), fixed(-Math.sin(fixedR)), 0, 0];
    const yr = [fixed(Math.sin(fixedR)), fixed(Math.cos(fixedR)), 0, 0];
    const zr = [0, 0, 1, 0];
    const wr = [0, 0, 0, 1];

    return new Matrix(xr, yr, zr, wr);
  }

  shearing(xy, xz, yx, yz, zx, zy) {
    const xs = [1, xy, xz, 0];
    const ys = [yx, 1, yz, 0];
    const zs = [zx, zy, 1, 0];
    const ws = [0, 0, 0, 1];

    return new Matrix(xs, ys, zs, ws);
  }
}
