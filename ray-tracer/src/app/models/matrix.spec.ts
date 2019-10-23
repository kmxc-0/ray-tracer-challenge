import { Matrix } from "./matrix";

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
});
