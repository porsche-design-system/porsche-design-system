import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IMaskModule } from 'angular-imask';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as fromComponents from './components';
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
    ...fromComponents.components,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IMaskModule,
    PorscheDesignSystemModule.load({ prefix: '', cdn: 'auto', theme: 'light' }), // first configured theme wins
    PorscheDesignSystemModule.load({ prefix: 'my-prefix', cdn: 'auto', theme: 'dark' }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
