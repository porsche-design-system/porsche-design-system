import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, SafePipe } from './app.component';
import * as fromComponents from './components';
import * as fromPages from './pages';
import * as fromStyles from './styles';

@NgModule({
  declarations: [
    AppComponent,
    ...fromComponents.components,
    ...fromPages.generatedPages,
    ...fromPages.pages,
    ...fromStyles.examples,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    PorscheDesignSystemModule.load({ prefix: '', cdn: 'auto' }), // first configured theme wins or fallback 'light'
    PorscheDesignSystemModule.load({ prefix: 'my-prefix', cdn: 'auto', theme: 'dark' }),
    SafePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
