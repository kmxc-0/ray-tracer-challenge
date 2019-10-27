import {
  Component,
  AfterViewInit,
  OnInit,
  Input,
  ViewChild,
  ElementRef
} from "@angular/core";
import { Point } from "../models/tuples/point";
import { Color } from "../models/tuples/color";
import { Sphere } from "../models/sphere";
import { Ray } from "../models/ray/ray";
import { Vector } from "../models/tuples/vector";

@Component({
  selector: "app-ray-canvas",
  templateUrl: "./ray-canvas.component.html",
  styleUrls: ["./ray-canvas.component.scss"]
})
export class RayCanvasComponent implements AfterViewInit {
  @Input() public width = 100;
  @Input() public height = 100;
  @ViewChild("canvas", { static: false }) canvasEl: ElementRef;
  public context: CanvasRenderingContext2D;

  ngAfterViewInit() {
    this.context = (this.canvasEl
      .nativeElement as HTMLCanvasElement).getContext("2d");
    this.context.fillStyle = "powderblue";
    this.context.fillRect(0, 0, this.height, this.width);
    this.draw();
  }

  private draw() {
    const rayOrigin = new Point(0, 0, -5);
    const wallZ = 10;
    const wallSize = 7;
    const pixelSize = wallSize / this.height;
    const halfOfWorldSize = wallSize / 2;
    const color = new Color(255, 99, 71);
    const shape = new Sphere();

    // Could use a symbol iterator here instead by enhancing the canvas model.
    for (let i = 0; i < this.height; i++) {
      const worldY = halfOfWorldSize - pixelSize * i;
      for (let j = 0; j < this.width; j++) {
        const worldX = -halfOfWorldSize + pixelSize * j;
        const position = new Point(worldX, worldY, wallZ);

        const { x, y, z } = position.subtract(rayOrigin);
        const rayPositionV = new Vector(x, y, z);

        const ray = new Ray(rayOrigin, rayPositionV);
        const xs = ray.intersect(shape);

        if (xs.hit()) {
          const imageData = new ImageData(
            Uint8ClampedArray.from([color.red, color.blue, color.green, 255]),
            1,
            1
          );

          this.context.putImageData(imageData, j, i);
        }
      }
    }
  }
}
