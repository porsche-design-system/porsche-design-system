import { Inject, NgModule, Optional, SkipSelf } from '@angular/core';
import { load } from '@porsche-design-system/components-js';
import { PREVENT_WEB_COMPONENTS_REGISTRATION, WEB_COMPONENTS_PREFIX } from './injection.tokens';
import { DECLARATIONS } from './lib/components';

@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  imports: [],
  providers: [],
})
export class PorscheDesignSystemModule {
  constructor(
    @Inject(PREVENT_WEB_COMPONENTS_REGISTRATION) preventWebComponentsRegistration: boolean,
    @Inject(WEB_COMPONENTS_PREFIX) webComponentsPrefix: string,
    @Optional() @SkipSelf() porscheDesignSystemModule: PorscheDesignSystemModule
  ) {
    /**
     * prevent registration of components js web components if it's prevented
     * explicitly via PREVENT_WEB_COMPONENTS_REGISTRATION inject token
     */
    if (!preventWebComponentsRegistration) {
      load({ prefix: webComponentsPrefix });
    }
  }
}
