import { Input, Component, OnInit, AfterViewInit } from "@angular/core";
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Vector } from "../models/tuples/vector";
import { Environment } from "../models/projectile/environment";
import { Projectile } from "../models/projectile/projectile";
import { Tuple } from "../models/tuples/tuple";
import { Point } from "../models/tuples/point";
import { Color } from "../models/tuples/color";
import { GridService } from "./grid.service";
import { Pixel } from "../models/tuples/pixel";

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.scss"]
})
export class GridComponent implements AfterViewInit, OnInit {
  @Input() public width = 500;
  @Input() public height = 200;

  grid: Pixel[][] = [];

  ppm: string;
  private readonly sizeOfPixel = 5;

  constructor(private readonly gridService: GridService) {}

  public ngOnInit() {
    this.grid = this.createGridModel();
  }

  public ngAfterViewInit() {
    this.draw();
  }

  private createGridModel(): Pixel[][] {
    const maxHeight = this.height / this.sizeOfPixel;
    const maxWidth = this.width / this.sizeOfPixel;
    return Array.from({ length: maxWidth }, (_, colIndex) =>
      Array.from(
        { length: maxHeight },
        (_, rowIndex) => new Pixel(colIndex, rowIndex)
      )
    );
  }

  private draw() {
    const unsubscribe$ = new Subject<void>();
    unsubscribe$.subscribe(() => {
      this.ppm = this.gridService.canvasToPPM(
        this.width,
        this.height,
        this.grid
      );
    });
    let projectile = new Projectile(
      new Point(0, 1, 0),
      new Vector(500, 750, 0).normalize()
    );

    const environment = new Environment(
      new Vector(0, -0.01, 0),
      new Vector(-0.01, 0, 0)
    );

    interval(50)
      .pipe(takeUntil(unsubscribe$))
      .subscribe(_ => {
        console.log("x :" + projectile.position.x);
        console.log("y :" + projectile.position.y);
        projectile = this.tick(environment, projectile);

        if (
          projectile.position.x <= 0 ||
          projectile.position.y <= 0 ||
          projectile.position.x >= this.width / 5 ||
          projectile.position.y >= this.height / 5
        ) {
          unsubscribe$.next();
        } else {
          this.colorize(
            projectile.position.x,
            projectile.position.y,
            new Color(0.4, 0.5, 0.2)
          );
        }
      });
  }

  private colorize(x: number, y: number, color: Color) {
    const round = (num: number) => Math.floor(num);
    const [roundX, roundY] = [x, y].map(round);
    const pixel = this.grid[roundX][roundY];
    if (pixel) {
      pixel.color = color;
    }
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
