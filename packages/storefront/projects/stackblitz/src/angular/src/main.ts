import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { ExampleComponent } from './app/app.component';
import 'zone.js';

bootstrapApplication(ExampleComponent, {
  providers: [importProvidersFrom(PorscheDesignSystemModule.load({ theme: 'auto' }))],
}).catch((err) => console.error(err));
