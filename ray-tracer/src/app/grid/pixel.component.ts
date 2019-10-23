import { Input, Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-pixel",
  templateUrl: "./pixel.component.html",
  styleUrls: ["./pixel.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PixelComponent {
  @Input() color = "white";
  @Input() x: number;
  @Input() y: number;
}
