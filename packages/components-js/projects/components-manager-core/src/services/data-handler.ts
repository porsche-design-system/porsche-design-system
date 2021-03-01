import { ComponentManagerData } from './web-components-manager';

export const CM_KEY = 'porscheDesignSystem';

declare global {
  interface Document {
    [CM_KEY]: ComponentManagerData;
  }
}

export function getComponentManagerData() {
  if (!document[CM_KEY]) {
    document[CM_KEY] = {};
  }

  return document[CM_KEY];
}
