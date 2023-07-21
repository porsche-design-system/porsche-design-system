import { loadComponentLibrary } from '@porsche-design-system/components-manager-core';
import type { EntryConfig } from '../shared-definitions/entry-config';

declare global {
  interface Window {
    /** @deprecated since v3 */
    PORSCHE_DESIGN_SYSTEM_CDN: 'auto' | 'cn';
    PORSCHE_DESIGN_SYSTEM_CDN_URL: string;
  }
}

/**
 * CM_CONFIG will be provided via webpack
 */
declare var CM_CONFIG: EntryConfig;

/**
 * @property prefix - the prefix used for the components
 * @property cdn - the cdn to load assets from
 */
export type LoadOptions = {
  prefix?: string;
  cdn?: 'auto' | 'cn';
};

export const load = (opts: LoadOptions = {}): void => {
  const cdnKey = 'PORSCHE_DESIGN_SYSTEM_CDN';
  const cdnUrlKey: 'PORSCHE_DESIGN_SYSTEM_CDN_URL' = `${cdnKey}_URL`;
  // backwards compatibility to detect cdn for older/other pds versions
  window[cdnKey] = opts.cdn || window[cdnKey] || (window.location.origin.match(/\.cn$/) ? 'cn' : 'auto');
  // this value is used at runtime of web components via getCDNBaseURL() util
  window[cdnUrlKey] = `https://cdn.ui.porsche.${window[cdnKey] === 'cn' ? 'cn' : 'com'}`;

  loadComponentLibrary({ ...CM_CONFIG, prefix: opts.prefix || '' });
};
