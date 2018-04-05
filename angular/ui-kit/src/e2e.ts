import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {PuiE2eModule} from './e2e-app/pui-e2e.module';

enableProdMode();

platformBrowserDynamic().bootstrapModule(PuiE2eModule)
  .catch(err => console.log(err));
