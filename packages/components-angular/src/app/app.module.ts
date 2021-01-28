import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as fromPages from './pages';

@NgModule({
  declarations: [AppComponent, ...fromPages.pages],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PorscheDesignSystemModule.load({ prefix: '' }),
    PorscheDesignSystemModule.load({ prefix: 'my-prefix' }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
