import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IMaskModule } from 'angular-imask';
import * as fromPages from './pages';
import * as fromExamples from './examples';
import * as fromStyles from './styles';

@NgModule({
  declarations: [
    AppComponent,
    ...fromPages.pages,
    ...fromPages.generatedPages,
    ...fromExamples.examples,
    ...fromStyles.examples,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IMaskModule,
    PorscheDesignSystemModule.load({ prefix: '', cdn: 'auto' }),
    PorscheDesignSystemModule.load({ prefix: 'my-prefix', cdn: 'auto' }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
