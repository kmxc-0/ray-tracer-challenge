import { Point } from "./point";

describe("Point", () => {
  it("should create a new Point", () => {
    expect(new Point()).toBeDefined();
  });

  it("should create a Tuple that is a point w = 0", () => {
    expect(new Point().isPoint).toEqual(true);
    expect(new Point().isVector).toEqual(false);
  });
});
