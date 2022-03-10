import { InjectionToken, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { DECLARATIONS } from './lib/components/barrel';
import { load } from '@porsche-design-system/components-js';

export type PorscheDesignSystemModuleConfig = {
  prefix?: string;
};

export class DefaultConfig implements Required<PorscheDesignSystemModuleConfig> {
  prefix = '';
}

export const USES_SKELETONS = new InjectionToken<boolean>('usesSkeletons');

@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
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
        { provide: USES_SKELETONS, useValue: !!document.querySelector('style[uses-skeleton]') },
      ],
    };
  }
}
