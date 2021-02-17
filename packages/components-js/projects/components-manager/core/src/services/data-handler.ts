import { WebComponentManagerData } from './web-components-manager';

export const WCM_KEY = 'porscheDesignSystem';

declare global {
  interface Document {
    [WCM_KEY]: WebComponentManagerData;
  }
}

export function getWebComponentManagerData() {
  if (!document[WCM_KEY]) {
    document[WCM_KEY] = {};
  }

  return document[WCM_KEY];
}
