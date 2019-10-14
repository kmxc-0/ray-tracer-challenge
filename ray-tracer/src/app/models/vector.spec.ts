import { Vector } from "./vector";

describe("Vector", () => {
  it("should create a new Vector", () => {
    expect(new Vector()).toBeDefined();
  });

  it("should create a Tuple that is a vector w = 0", () => {
    expect(new Vector().isVector).toEqual(false);
    expect(new Vector().isPoint).toEqual(true);
  });
});
