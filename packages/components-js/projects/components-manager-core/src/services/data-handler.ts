import type { ComponentsManagerData } from './components-manager';

export const CM_KEY = 'porscheDesignSystem';

declare global {
  interface Document {
    [CM_KEY]: ComponentsManagerData;
  }
}

export function getComponentsManagerData(): ComponentsManagerData {
  return document[CM_KEY];
}
