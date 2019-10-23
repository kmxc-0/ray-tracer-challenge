import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GridComponent } from "./grid/grid.component";
import { PixelComponent } from "./grid/pixel.component";
import { GridService } from "./grid/grid.service";

@NgModule({
  declarations: [AppComponent, GridComponent, PixelComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [GridService],
  bootstrap: [AppComponent]
})
export class AppModule {}
