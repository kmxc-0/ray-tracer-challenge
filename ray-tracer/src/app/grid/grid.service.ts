import { Injectable } from "@angular/core";
import { Pixel } from "../models/tuples/pixel";

@Injectable()
export class GridService {
  canvasToPPM(height: number, width: number, grid: Pixel[][]): string {
    const header = ["P3", `${height} ${width}`, "255"].join("\n");
    const pixels = grid
      .map((row: Pixel[]) =>
        row
          .map((pixel: Pixel) => pixel.color.toRGBComponents().join(" "))
          .join(" ")
      )
      .join("\n");
    return [header, pixels].join("\n");
  }
}
