import { Canvas } from "./canvas";
import { Pixel } from "./pixel";
import { Color } from "../tuples/color";

describe("Canvas", () => {
  it("should create a new Canvas with dimensions 100, 100", () => {
    const canvas = new Canvas();
    expect(canvas).toBeDefined();
    expect(canvas.height).toEqual(100);
    expect(canvas.width).toEqual(100);
  });

  it("should initialize a grid of height x width of pixels", () => {
    const canvas = new Canvas(11, 10);
    expect(canvas.canvas.length).toEqual(10);
    canvas.canvas.forEach((row: Pixel[]) => {
      expect(row.length).toEqual(11);
    });
  });

  describe("writePixel", () => {
    it("should set the color of a pixel at the location", () => {
      const red = new Color(255, 0, 0);
      const canvas = new Canvas();
      canvas.writePixel(1, 1, red);
      expect(canvas.pixelAt(1, 1)).toEqual(red);
    });
  });
});
