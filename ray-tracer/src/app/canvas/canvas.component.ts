import {
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  Component
} from "@angular/core";
import { Canvas } from "../models/canvas/canvas";
import { interval, Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";
import { Vector } from "../models/tuples/vector";
import { Environment } from "../models/projectile/environment";
import { Projectile } from "../models/projectile/projectile";
import { Tuple } from "../models/tuples/tuple";
import { Point } from "../models/tuples/point";

@Component({
  selector: "grid",
  template: "<canvas #canvas></canvas>",
  styles: ["canvas { border: 1px solid #000; }"]
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild("canvas", { static: false }) public canvasEl: ElementRef;

  @Input() public width = 800;
  @Input() public height = 400;

  private context: CanvasRenderingContext2D;
  private canvas: Canvas;

  public ngAfterViewInit() {
    const canvasElement: HTMLCanvasElement = this.canvasEl.nativeElement;
    this.context = canvasElement.getContext("2d");

    this.initializeCanvas(canvasElement);
    this.fillGridWithBlackPixels();
    this.draw();
  }

  private initializeCanvas(canvas) {
    this.setViewportDimensions(canvas);
    this.createCanvasModel();
    this.context.strokeStyle = "#FFF";
    this.context.lineCap = "round";
    this.invertCanvas();
  }

  private setViewportDimensions(canvas: HTMLCanvasElement) {
    canvas.width = this.width;
    canvas.height = this.height;
  }

  private createCanvasModel() {
    this.canvas = new Canvas(this.height, this.width);
  }

  private fillGridWithBlackPixels() {
    this.context.fillRect(0, 0, this.width, this.height);
  }

  private invertCanvas() {
    this.context.translate(0, this.height); // reset where 0,0 is located
    this.context.scale(1, -1);
  }

  private draw() {
    const unsubscribe$ = new Subject<void>();
    let projectile = new Projectile(
      new Point(0, 350, 0),
      new Vector(100, 10, 0).normalize()
    );

    const environment = new Environment(
      new Vector(0, -0.01, 0),
      new Vector(-0.01, 0, 0)
    );

    interval(10)
      .pipe(
        take(1000),
        takeUntil(unsubscribe$)
      )
      .subscribe(_ => {
        console.log("x :" + projectile.position.x);
        console.log("y :" + projectile.position.y);
        this.context.beginPath();
        this.context.moveTo(projectile.position.x, projectile.position.y);
        projectile = this.tick(environment, projectile);
        if (projectile.position.x <= 0 || projectile.position.y <= 0) {
          unsubscribe$.next();
        }
        this.context.lineTo(projectile.position.x, projectile.position.y);
        this.context.stroke();
      });
  }

  private tick(environment: Environment, projectile: Projectile) {
    const updatedPosition = projectile.position.add(projectile.velocity);
    const updatedVelocityT: Tuple = projectile.velocity.add(
      environment.gravity
    );

    const updatedVelocity: Vector = new Vector(
      updatedVelocityT.x,
      updatedVelocityT.y,
      updatedVelocityT.z
    );

    return new Projectile(updatedPosition, updatedVelocity);
  }
}
