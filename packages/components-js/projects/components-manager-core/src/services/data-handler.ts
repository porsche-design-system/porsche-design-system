import type { ComponentsManagerData } from './components-manager';

export const CM_KEY = 'porscheDesignSystem';

declare global {
  interface Document {
    [CM_KEY]: ComponentsManagerData;
  }
}

export function getComponentsManagerData(): ComponentsManagerData {
  if (!document[CM_KEY]) {
    document[CM_KEY] = {} as any;
  }

  return document[CM_KEY];
}
