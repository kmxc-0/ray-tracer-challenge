export class Matrix {
  public m: number[][];
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
}
