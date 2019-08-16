import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ComponentLibraryModule } from '@porscheui/ui-kit-angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ComponentLibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
