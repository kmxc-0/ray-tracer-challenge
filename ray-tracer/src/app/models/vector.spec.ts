import { Vector } from "./vector";

describe("Vector", () => {
  it("should create a new Vector", () => {
    expect(new Vector()).toBeDefined();
  });

  it("should create a Tuple that is a vector w = 1", () => {
    expect(new Vector().isVector).toEqual(true);
    expect(new Vector().isPoint).toEqual(false);
  });
});
