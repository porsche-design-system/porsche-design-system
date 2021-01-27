import { Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { DECLARATIONS } from './lib/components/barrel';
import { PORSCHE_DESIGN_SYSTEM_MODULE_CONFIG, PorscheDesignSystemModuleConfig } from './injection.tokens';
import { load } from '@porsche-design-system/components-js';

@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  imports: [],
  providers: [],
})
export class PorscheDesignSystemModule {
  constructor(@Optional() @Inject(PORSCHE_DESIGN_SYSTEM_MODULE_CONFIG) config: PorscheDesignSystemModuleConfig) {
    console.log('module constructor', config);
    const { prefix } = config ?? {};
    load({ prefix });
  }

  static forRoot(config: PorscheDesignSystemModuleConfig): ModuleWithProviders<PorscheDesignSystemModule> {
    return {
      ngModule: PorscheDesignSystemModule,
      providers: [
        {
          provide: PORSCHE_DESIGN_SYSTEM_MODULE_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
