import { InjectionToken } from '@angular/core';

export type PorscheDesignSystemModuleConfig = {
  prefix?: string;
};

export const PORSCHE_DESIGN_SYSTEM_MODULE_CONFIG = new InjectionToken<PorscheDesignSystemModuleConfig>(
  'Custom config for the Porsche Design System'
);
