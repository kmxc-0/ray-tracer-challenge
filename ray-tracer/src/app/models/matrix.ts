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
}
