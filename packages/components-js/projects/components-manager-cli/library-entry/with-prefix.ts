import { loadComponentLibrary } from '@porsche-design-system/components-manager-core';
import type { EntryConfig } from '../shared-definitions/entry-config';

declare global {
  interface Window {
    /** @deprecated since v3 */
    PORSCHE_DESIGN_SYSTEM_CDN: 'auto' | 'cn';
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
  // backwards compatibility to detect cdn for older/other pds versions
  window[cdnKey] = opts.cdn || window[cdnKey] || (window.location.origin.match(/\.cn$/) ? 'cn' : 'auto');

  const CM_KEY = 'porscheDesignSystem';

  if (!document[CM_KEY]) {
    document[CM_KEY] = {} as any;
  } else if (document[CM_KEY].cdn) {
    console.warn(
      `[Porsche Design System v${CM_CONFIG.version}] document.${CM_KEY}.cdn was already set during a previous initialization which indicates that there might be a conflict.`
    );
  }

  // this value is used at runtime of web components via getCDNBaseURL() util
  document[CM_KEY].cdn = `https://cdn.ui.porsche.${window[cdnKey] === 'cn' ? 'cn' : 'com'}`;

  loadComponentLibrary({ ...CM_CONFIG, prefix: opts.prefix || '' });
};
