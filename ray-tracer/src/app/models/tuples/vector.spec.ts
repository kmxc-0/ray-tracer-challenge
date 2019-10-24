import { Vector } from "./vector";

describe("Vector", () => {
  it("should create a new Vector", () => {
    expect(new Vector()).toBeDefined();
  });

  it("should create a Tuple that is a vector w = 0", () => {
    expect(new Vector().isVector).toEqual(true);
    expect(new Vector().isPoint).toEqual(false);
  });

  describe("magnitude", () => {
    test.each`
      vector                    | magnitude
      ${new Vector(1, 0, 0)}    | ${1}
      ${new Vector(0, 0, 1)}    | ${1}
      ${new Vector(1, 2, 3)}    | ${Math.sqrt(14)}
      ${new Vector(-1, -2, -3)} | ${Math.sqrt(14)}
    `("the magnitude of $vector is $magnitude", ({ vector, magnitude }) => {
      expect(vector.magnitude()).toEqual(magnitude);
    });
  });

  describe("normalize", () => {
    test.each`
      vector                 | result
      ${new Vector(4, 0, 0)} | ${new Vector(1, 0, 0)}
      ${new Vector(1, 2, 3)} | ${new Vector(1 / Math.sqrt(14), 2 / Math.sqrt(14), 3 / Math.sqrt(14))}
    `("normalized $vector is $result", ({ vector, result }) => {
      expect(vector.normalize()).toEqual(expect.objectContaining(result));
    });

    it("should return 1 when getting the magnitude of a normalized vector", () => {
      expect(new Vector(1, 2, 3).normalize().magnitude()).toEqual(1);
    });
  });

  describe("dot", () => {
    it("should return the dot product of two vectors", () => {
      expect(new Vector(1, 2, 3).dot(new Vector(2, 3, 4))).toEqual(20);
    });
  });

  describe("cross", () => {
    it("should return the cross-product of two vectors", () => {
      expect(new Vector(1, 2, 3).cross(new Vector(2, 3, 4))).toEqual(
        expect.objectContaining(new Vector(-1, 2, -1))
      );
    });

    it("should return the cross-product of two vectors", () => {
      expect(new Vector(2, 3, 4).cross(new Vector(1, 2, 3))).toEqual(
        expect.objectContaining(new Vector(1, -2, 1))
      );
    });
  });
});
