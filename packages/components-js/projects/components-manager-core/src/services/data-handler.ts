import { ComponentsManagerData } from './web-components-manager';

export const CM_KEY = 'porscheDesignSystem';

declare global {
  interface Document {
    [CM_KEY]: ComponentsManagerData;
  }
}

export function getComponentsManagerData() {
  if (!document[CM_KEY]) {
    document[CM_KEY] = {};
  }

  return document[CM_KEY];
}
