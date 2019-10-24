import { Tuple } from "../tuples/tuple";

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

    const bCols: Matrix = this.transpose(b);
    const m: number[][] = this.m.map((aRow: number[]) =>
      bCols.m.map(bCol => this.dot(aRow, bCol))
    );

    return new Matrix(...m);
  }

  transpose(matrix: Matrix = this) {
    const transposedM = matrix.m[0].map((_, iCol) =>
      matrix.m.map(row => row[iCol])
    );
    return new Matrix(...transposedM);
  }

  private mTuple(t: Tuple): Tuple {
    const asRow: Matrix = new Matrix([t.x, t.y, t.z, t.w]);
    const bCols: Matrix = this.transpose(asRow);

    const tColumn = this.m.map((row: number[]) =>
      this.sum(row.map((x: number, i) => x * bCols.m[i][0]))
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

  private sum(xs: number[]) {
    return xs.reduce((a, i) => a + i, 0);
  }
  private product(a: number, b: number) {
    return a * b;
  }
}