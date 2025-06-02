import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { componentsReady } from '@porsche-design-system/components-angular';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

(window as any).componentsReady = componentsReady; // for vrt
