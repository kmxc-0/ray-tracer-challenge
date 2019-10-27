import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GridComponent } from "./grid/grid.component";
import { PixelComponent } from "./grid/pixel.component";
import { GridService } from "./grid/grid.service";
import { TransformationService } from "./transformations/transformation.service";
import { RayCanvasComponent } from "./ray-canvas/ray-canvas.component";

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    PixelComponent,
    RayCanvasComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [GridService, TransformationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
