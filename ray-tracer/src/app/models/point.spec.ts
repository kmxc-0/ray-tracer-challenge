import { Point } from "./point";

describe("Point", () => {
  it("should create a new Point", () => {
    expect(new Point()).toBeDefined();
  });

  it("should create a Tuple that is a point w = 1", () => {
    expect(new Point().isPoint).toEqual(false);
    expect(new Point().isVector).toEqual(true);
  });
});
