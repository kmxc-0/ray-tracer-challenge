import { Tuple } from "./tuples/tuple";

export class Matrix {
  public m: number[][] = [];

  static isEqual = (matrixA: Matrix, matrixB: Matrix) => {
    const rowEqual = (aRow: number[], bRow: number[]) =>
      aRow.every((a, index) => {
        return a === bRow[index];
      });

    return matrixA.m.every((row: number[], index) =>
      rowEqual(row, matrixB.m[index])
    );
  };

  constructor(...rows: number[][]) {
    this.m = rows;
  }

  at(row: number, col: number) {
    try {
      return this.m[row][col];
    } catch (error) {
      throw new RangeError(`${row} ${col} is out of bounds for matrix`);
    }
  }

  multiply(b: Matrix | Tuple) {
    if (b instanceof Tuple) {
      return this.mTuple(b);
    }

    const bCols: number[][] = this.transpose(b.m);
    return this.m.map((aRow: number[]) =>
      bCols.map(bCol => this.dot(aRow, bCol))
    );
  }

  private mTuple(t: Tuple): Tuple {
    const asRow: number[][] = [[t.x, t.y, t.z, t.w]];
    const bCols: number[][] = this.transpose(asRow);

    const tColumn = this.m.map((row: number[]) =>
      this.sum(row.map((x: number, i) => x * bCols[i][0]))
    );

    return new Tuple(tColumn[0], tColumn[1], tColumn[2], tColumn[3]);
  }

  private dot(xs: number[], ys: number[]) {
    return this.sum(this.zipWith(this.product, xs, ys));
  }

  private zipWith(
    f: (a: number, b: number) => number,
    xs: number[],
    ys: number[]
  ) {
    return xs.length === ys.length ? xs.map((x, i) => f(x, ys[i])) : undefined;
  }

  private transpose(xs: number[][]) {
    return xs[0].map((_, iCol) => xs.map(row => row[iCol]));
  }

  private sum(xs: number[]) {
    return xs.reduce((a, i) => a + i, 0);
  }
  private product(a: number, b: number) {
    return a * b;
  }
}
