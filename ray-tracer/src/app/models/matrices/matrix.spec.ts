import { Matrix } from "./matrix";
import { identity4 } from "./identities";
import { Tuple } from "../tuples/tuple";

describe("Matrix", () => {
  it("should create a new Matrix", () => {
    expect(new Matrix()).toBeDefined();
  });

  it("Constructing and inspecting a 4x4 matrix", () => {
    const m = new Matrix(
      [1, 2, 3, 4],
      [5.5, 6.5, 7.5, 8.5],
      [9, 10, 11, 12],
      [13.5, 14.5, 15.5, 16.5]
    );

    expect(m.at(0, 3)).toEqual(4);
    expect(m.at(0, 0)).toEqual(1);
    expect(m.at(1, 0)).toEqual(5.5);
    expect(m.at(1, 2)).toEqual(7.5);
    expect(m.at(2, 2)).toEqual(11);
    expect(m.at(3, 0)).toEqual(13.5);
    expect(m.at(3, 2)).toEqual(15.5);
  });

  it("should represent a 2x2 matrix", () => {
    const m = new Matrix([-3, 5], [1, -2]);

    expect(m.at(0, 0)).toEqual(-3);
    expect(m.at(0, 1)).toEqual(5);
    expect(m.at(1, 0)).toEqual(1);
    expect(m.at(1, 1)).toEqual(-2);
  });

  it("should represent a 3x3 matrix", () => {
    const m = new Matrix([-3, 5, 0], [1, -2, 7], [0, 1, 1]);

    expect(m.at(1, 1)).toEqual(-2);
    expect(m.at(2, 2)).toEqual(1);
  });

  describe("isEqual", () => {
    it("should return that the same matrix is equal to itself", () => {
      const matrix = new Matrix(
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 8, 7, 6],
        [5, 4, 3, 2]
      );

      expect(Matrix.isEqual(matrix, matrix)).toBe(true);
    });

    it("should return that two different matrices are not equal", () => {
      const matrix = new Matrix(
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 8, 7, 6],
        [5, 4, 3, 2]
      );

      const otherMatrix = new Matrix(
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 8, 7, 6],
        [5, 4, 3, 3]
      );

      expect(Matrix.isEqual(matrix, otherMatrix)).toBe(false);
    });
  });

  describe("multiplication", () => {
    it("should multiply two matrices together", () => {
      const matrixA = new Matrix(
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 8, 7, 6],
        [5, 4, 3, 2]
      );

      const matrixB = new Matrix(
        [-2, 1, 2, 3],
        [3, 2, 1, -1],
        [4, 3, 6, 5],
        [1, 2, 7, 8]
      );

      expect(matrixA.multiply(matrixB)).toEqual(
        new Matrix(
          [20, 22, 50, 48],
          [44, 54, 114, 108],
          [40, 58, 110, 102],
          [16, 26, 46, 42]
        )
      );
    });

    it("should allow multipliction by a tuple", () => {
      const matrix = new Matrix(
        [1, 2, 3, 4],
        [2, 4, 4, 2],
        [8, 6, 4, 1],
        [0, 0, 0, 1]
      );

      const tuple = new Tuple(1, 2, 3, 1);

      expect(matrix.multiply(tuple)).toEqual(
        expect.objectContaining(new Tuple(18, 24, 33, 1))
      );
    });
  });

  describe("identity matrix", () => {
    it("should return the same matrix a when a is multiplied by the identity matrix", () => {
      const matrix = new Matrix(
        [0, 1, 2, 4],
        [1, 2, 4, 8],
        [2, 4, 8, 16],
        [4, 8, 16, 32]
      );

      expect(matrix.multiply(identity4)).toEqual(
        expect.objectContaining(matrix)
      );
    });

    it("should return the same tuple when it is multiplied by the identity matrix", () => {
      const tuple = new Tuple(1, 2, 3, 4);
      expect(identity4.multiply(tuple)).toEqual(tuple);
    });
  });

  describe("transpose", () => {
    it("should transpose a matrix, swapping columns and rows", () => {
      const matrix = new Matrix(
        [0, 9, 3, 0],
        [9, 8, 0, 8],
        [1, 8, 5, 3],
        [0, 0, 5, 8]
      );

      expect(matrix.transpose()).toEqual(
        new Matrix([0, 9, 1, 0], [9, 8, 8, 0], [3, 0, 5, 5], [0, 8, 3, 8])
      );
    });
  });

  describe("determinant of a 2x2 matrix", () => {
    it("should calculate the determinant of a 2x2 matrix", () => {
      const matrix = new Matrix([1, 5], [-3, 2]);

      expect(matrix.determinant()).toEqual(17);
    });
  });

  describe("submatrices", () => {
    it("should find the 2x2 submatrix of a 3x3 matrix", () => {
      const matrix = new Matrix([1, 5, 0], [-3, 2, 7], [0, 6, -3]);

      expect(matrix.subMatrix(0, 2)).toEqual(new Matrix([-3, 2], [0, 6]));
    });

    it("should find the 3x3 submatrix of a 4x4 matrix", () => {
      const matrix = new Matrix(
        [-6, 1, 1, 6],
        [-8, 5, 8, 6],
        [-1, 0, 8, 2],
        [-7, 1, -1, 1]
      );

      expect(matrix.subMatrix(2, 1)).toEqual(
        new Matrix([-6, 1, 6], [-8, 8, 6], [-7, -1, 1])
      );
    });

    describe("minor", () => {
      it("should find the minor of row i and column j of a 3x3 matrix", () => {
        const matrix = new Matrix([3, 5, 0], [2, -1, 7], [6, -1, 5]);

        expect(matrix.minor(1, 0)).toEqual(25);
      });
    });

    describe("cofactor", () => {
      it("should find the cofactor of a 3x3 matrix", () => {
        const matrix = new Matrix([3, 5, 0], [2, -1, -7], [6, -1, 5]);
        expect(matrix.cofactor(0, 0)).toEqual(-12);
        expect(matrix.cofactor(1, 0)).toEqual(-25);
      });
    });
  });
});
