import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { AgGridAngular } from 'ag-grid-angular';
import { IMaskModule } from 'angular-imask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, SafePipe } from './app.component';
import * as fromComponents from './components';
import * as fromExamples from './examples';
import * as fromPages from './pages';
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
    AgGridAngular,
    IMaskModule,
    PorscheDesignSystemModule.load({ prefix: '', cdn: 'auto' }), // first configured theme wins or fallback 'light'
    PorscheDesignSystemModule.load({ prefix: 'my-prefix', cdn: 'auto', theme: 'dark' }),
    SafePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
