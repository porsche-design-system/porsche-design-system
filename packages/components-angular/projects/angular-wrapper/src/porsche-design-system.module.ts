import { Inject, type ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { load } from '@porsche-design-system/components-js';
import { DECLARATIONS } from './lib/components/barrel';
import type { Theme } from './lib/types';
import { THEME_TOKEN } from './utils';

export type PorscheDesignSystemModuleConfig = {
  prefix?: string;
  cdn?: 'auto' | 'cn';
  theme?: Theme;
};

export class DefaultConfig implements PorscheDesignSystemModuleConfig {
  prefix = '';
  theme: 'light';
}

// TODO: unit tests are missing
@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  providers: [
    {
      provide: THEME_TOKEN,
      useValue: new BehaviorSubject('light'),
    },
  ],
})
export class PorscheDesignSystemModule {
  constructor(@Optional() configParam: DefaultConfig, @Inject(THEME_TOKEN) themeSubject: BehaviorSubject<Theme>) {
    const configs = (configParam as unknown as DefaultConfig[]) || [new DefaultConfig()];
    themeSubject.next(configs[0].theme); // first config sets the theme
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
