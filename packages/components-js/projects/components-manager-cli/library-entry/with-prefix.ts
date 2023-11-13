import { loadComponentLibrary } from '@porsche-design-system/components-manager-core';
import type { EntryConfig } from '../shared-definitions/entry-config';

// TODO: Share type across repo
declare global {
  interface Window {
    /** @deprecated since v3 */
    PORSCHE_DESIGN_SYSTEM_CDN: 'auto' | 'cn';
  }

  interface Document {
    porscheDesignSystem: {
      [key: `${number}.${number}.${number}${`-rc.${number}` | ''}`]: {
        prefixes: string[];
        isReady: () => Promise<void>;
        readyResolve: () => void;
      };
      cdn: {
        url: string;
        prefixes: string[]; // to not break older versions
      };
    };
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
  }

  // NOTE: validation if document[CM_KEY].cdn is already set might make sense
  // but this is tricky when there are multiple load() calls, e.g. with multiple prefixes
  // so we can't just check if document[CM_KEY].cdn is defined or not

  // this value is used at runtime of web components via getCDNBaseURL() util
  document[CM_KEY].cdn = {
    url: `https://cdn.ui.porsche.${window[cdnKey] === 'cn' ? 'cn' : 'com'}`,
    prefixes: [], // to not break older versions
  };

  loadComponentLibrary({ ...CM_CONFIG, prefix: opts.prefix || '' });
};
