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
    PorscheDesignSystemModule,
    // PorscheDesignSystemModule.forRoot({ prefix: 'my-prefix' }),
    AppRoutingModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
