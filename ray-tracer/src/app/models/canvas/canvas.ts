import { Pixel } from "./pixel";
import { Color } from "../tuples/color";

export class Canvas {
  public canvas: Pixel[][] = [];
  constructor(public height = 100, public width = 100) {
    this.canvas = this.createCanvas(height, width);
  }

  writePixel(x: number, y: number, color: Color) {
    console.log("x: ", x);
    console.log("y: ", y);
    if (x < this.width && y < this.height) {
      this.canvas[x - 1][y - 1] = new Pixel(x, y, color);
    }
  }

  pixelAt(x: number, y: number) {
    return this.canvas[x][y].color;
  }

  canvasToPPM(): string {
    const header = ["P3", `${this.height} ${this.width}`, "255"].join("\n");
    const pixels = this.canvas
      .map((row: Pixel[]) =>
        row
          .map((pixel: Pixel) => {
            const red = this.normalizePixelRange(pixel.color.red);
            const green = this.normalizePixelRange(pixel.color.green);
            const blue = this.normalizePixelRange(pixel.color.blue);
            return [red, green, blue].join(" ");
          })
          .join(" ")
      )
      .join("\n");
    return [header, pixels].join("\n");
  }

  private normalizePixelRange(color: number): string {
    if (color < 0) {
      return "0";
    }

    if (color > 1) {
      return "255";
    }

    return `${color * 255}`;
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
