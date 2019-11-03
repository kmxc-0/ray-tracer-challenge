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
import { Lights } from "../models/light";
import { Material } from "../models/material";

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
    const shape = new Sphere();
    shape.material.color = new Color(1, 0.2, 1);
    const light = new Lights(new Color(1, 1, 1), new Point(-10, 10, -10));

    // Could use a symbol iterator here instead by enhancing the canvas model.
    for (let i = 0; i < this.height; i++) {
      const worldY = halfOfWorldSize - pixelSize * i;
      for (let j = 0; j < this.width; j++) {
        const worldX = -halfOfWorldSize + pixelSize * j;
        const position = new Point(worldX, worldY, wallZ);

        const { x, y, z } = position.subtract(rayOrigin);
        const rayPositionV = new Vector(x, y, z).normalize();

        const ray = new Ray(rayOrigin, rayPositionV);
        const xs = ray.intersect(shape);

        if (xs.hit()) {
          const hit = xs.hit();
          const point = ray.position(hit.t);
          const normal = hit.object.normalAt(point);
          const eye = Vector.toVector(ray.direction.negate());
          const color = hit.object.material.lighting(eye, normal, light, point);
          const [red, green, blue] = color.toRGBComponents();
          console.log(color.red);
          const imageData = new ImageData(
            Uint8ClampedArray.from([+red, +green, +blue, 255]),
            1,
            1
          );

          this.context.putImageData(imageData, j, i);
        }
      }
    }
  }
}
