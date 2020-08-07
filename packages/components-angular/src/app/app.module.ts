import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PorscheDesignSystemModule, PrefixService } from '@porsche-design-system/components-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as fromPages from './pages';

@NgModule({
  declarations: [AppComponent, ...fromPages.pages],
  imports: [BrowserModule, PorscheDesignSystemModule, AppRoutingModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private prefixService: PrefixService) {
    prefixService.load('my-prefix');
  }
}
