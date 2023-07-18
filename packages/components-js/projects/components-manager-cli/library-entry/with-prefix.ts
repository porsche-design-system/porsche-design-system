import { loadComponentLibrary } from '@porsche-design-system/components-manager-core';
import type { EntryConfig } from '../shared-definitions/entry-config';

declare global {
  interface Window {
    /** @deprecated since v3 */
    PORSCHE_DESIGN_SYSTEM_CDN: 'auto' | 'cn' | 'com';
    PORSCHE_DESIGN_SYSTEM_CDN_URL: string;
  }
}

/**
 * CM_CONFIG will be provided via webpack
 */
declare var CM_CONFIG: EntryConfig;

/**
 * @property prefix - the prefix used for the components
 */
export type LoadOptions = {
  prefix: string;
};

export const load = (opts: LoadOptions = { prefix: '' }): void => {
  // backwards compatibility to detect cdn for older pds versions
  window.PORSCHE_DESIGN_SYSTEM_CDN =
    window.PORSCHE_DESIGN_SYSTEM_CDN || (window.location.origin.match(/\.cn$/) ? 'cn' : 'com');
  window.PORSCHE_DESIGN_SYSTEM_CDN_URL =
    'https://cdn.ui.porsche.' + (window.PORSCHE_DESIGN_SYSTEM_CDN === 'cn' ? 'cn' : 'com');
  loadComponentLibrary({ ...CM_CONFIG, ...opts });
};
