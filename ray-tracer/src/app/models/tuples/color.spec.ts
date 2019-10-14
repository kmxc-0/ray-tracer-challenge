import { Color } from "./color";

describe("Color", () => {
  it("should create a new Color", () => {
    expect(new Color()).toBeDefined();
  });

  it("should create a Color with corresponding rgb values", () => {
    const color = new Color(-0.5, 0.4, 1.7);
    expect(color.red).toEqual(-0.5);
    expect(color.green).toEqual(0.4);
    expect(color.blue).toEqual(1.7);
  });

  describe("hadamard product", () => {
    test.each`
      colorA                    | colorB                    | result
      ${new Color(1, 0.2, 0.4)} | ${new Color(0.9, 1, 0.1)} | ${new Color(0.9, 0.2, 0.04)}
    `(
      "$colorA and $colorB's hadamard product should equal $result",
      ({ colorA, colorB, result }) => {
        expect(colorA.hadamardProduct(colorB)).toEqual(
          expect.objectContaining(result)
        );
      }
    );
  });
});
