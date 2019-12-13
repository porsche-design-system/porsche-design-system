import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PorscheUIKitModule } from '@porsche-design-system/components-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PorscheUIKitModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
