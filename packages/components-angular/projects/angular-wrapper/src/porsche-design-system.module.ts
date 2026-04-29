import { type ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { load } from '@porsche-design-system/components-js';
import { DECLARATIONS } from './lib/components/barrel';

export type PorscheDesignSystemModuleConfig = {
  prefix?: string;
  cdn?: 'auto' | 'cn';
};

export class DefaultConfig implements PorscheDesignSystemModuleConfig {
  prefix = '';
}

// TODO: unit tests are missing
@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
})
export class PorscheDesignSystemModule {
  constructor(@Optional() configParam: DefaultConfig) {
    const configs = (configParam as unknown as DefaultConfig[]) || [new DefaultConfig()];
    configs.forEach(load);
  }

  static load(config: PorscheDesignSystemModuleConfig): ModuleWithProviders<PorscheDesignSystemModule> {
    return {
      ngModule: PorscheDesignSystemModule,
      providers: [
        {
          provide: DefaultConfig,
          multi: true, // to support multiple prefixes in same module
          useValue: config,
        },
      ],
    };
  }
}
