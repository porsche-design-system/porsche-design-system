import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { BehaviorSubject } from 'rxjs';
import { AppComponent, SafePipe, THEME_TOKEN, Theme } from './app.component';
import { AppRoutingModule } from './app-routing.module';
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
    PorscheDesignSystemModule.load({ prefix: 'my-prefix', cdn: 'auto' }),
    SafePipe,
  ],
  providers: [
    {
      provide: THEME_TOKEN,
      useValue: new BehaviorSubject<Theme>('auto'),
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
