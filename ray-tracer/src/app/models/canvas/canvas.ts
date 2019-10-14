import { Pixel } from "./pixel";
import { Color } from "../tuples/color";

export class Canvas {
  public canvas: Pixel[][] = [];
  constructor(public height = 100, public width = 100) {
    this.canvas = this.createCanvas(height, width);
  }

  writePixel(x: number, y: number, color: Color) {
    this.canvas[x][y] = new Pixel(x, y, color);
  }

  pixelAt(x: number, y: number) {
    return this.canvas[x][y].color;
  }

  canvasToPPM(): string {
    const header = [
      '"""',
      "P3",
      `${this.height} ${this.width}`,
      "255",
      '"""'
    ].join("\n");

    return header;
  }

  private createCanvas(rows: number, columns: number): Pixel[][] {
    return Array.from({ length: columns }, (_, colIndex) =>
      Array.from(
        { length: rows },
        (_, rowIndex) => new Pixel(colIndex, rowIndex)
      )
    );
  }
}
