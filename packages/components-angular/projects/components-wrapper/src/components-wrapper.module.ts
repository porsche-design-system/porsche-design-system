import { ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { DECLARATIONS } from './lib/components/barrel';
import { load } from '@porsche-design-system/components-js';
import { USES_SKELETONS, usesSkeletons } from './skeleton-helper';

export type PorscheDesignSystemModuleConfig = {
  prefix?: string;
};

export class DefaultConfig implements Required<PorscheDesignSystemModuleConfig> {
  prefix = '';
}

@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  providers: [{ provide: USES_SKELETONS, useValue: usesSkeletons() }],
})
export class PorscheDesignSystemModule {
  constructor(@Optional() configParam: DefaultConfig) {
    const configs = (configParam ?? ([new DefaultConfig()] as unknown)) as PorscheDesignSystemModuleConfig[];
    configs.forEach(({ prefix }) => load({ prefix }));
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
