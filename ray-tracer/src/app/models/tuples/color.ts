import { Tuple } from "./tuple";

export class Color extends Tuple {
  readonly red: number;
  readonly green: number;
  readonly blue: number;
  readonly rgb: string;
  constructor(public x = 0, public y = 0, public z = 0) {
    super(+x.toFixed(4), +y.toFixed(4), +z.toFixed(4));
    this.red = +x.toFixed(4);
    this.green = +y.toFixed(4);
    this.blue = +z.toFixed(4);
    this.rgb = this.toRGB();
  }

  toRGB(): string {
    const [r, g, b] = this.toRGBComponents();
    return `rgb(${r},${g},${b})`;
  }

  toRGBComponents(): string[] {
    const normalize = (color: number) => this.normalizePixelColorRange(color);
    return [this.red, this.green, this.blue].map(normalize);
  }

  hadamardProduct(color: Color): Color {
    const red = this.red * color.red;
    const green = this.green * color.green;
    const blue = this.blue * color.blue;
    return new Color(+red.toFixed(2), +green.toFixed(2), +blue.toFixed(2));
  }

  private normalizePixelColorRange(color: number): string {
    if (color < 0) {
      return "0";
    }

    if (color > 1) {
      return "255";
    }

    return `${color * 255}`;
  }
}
