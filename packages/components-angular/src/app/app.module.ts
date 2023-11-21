import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    ...fromComponents.components,
    ...fromExamples.examples,
    ...fromPages.generatedPages,
    ...fromPages.pages,
    ...fromStyles.examples,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    IMaskModule,
    PorscheDesignSystemModule.load({ prefix: '', cdn: 'auto' }), // first configured theme wins or fallback 'light'
    PorscheDesignSystemModule.load({ prefix: 'my-prefix', cdn: 'auto', theme: 'dark' }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
