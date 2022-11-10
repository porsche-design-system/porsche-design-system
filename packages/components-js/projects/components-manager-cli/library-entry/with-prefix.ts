import { loadComponentLibrary } from '@porsche-design-system/components-manager-core';
import { EntryConfig } from '../shared-definitions/entry-config';

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
  const { prefix } = opts;
  loadComponentLibrary({ ...CM_CONFIG, ...opts });

  if (prefix && !document.head.querySelector(`style[data-pds-initial-styles-${prefix}]`)) {
    console.warn(
      `You are using the Porsche Design System with prefixing but without 'getInitialStyles({ prefix: ${prefix} })'.
Please make sure to apply the 'getInitialStyles()' partial as described at https://designsystem.porsche.com/v2/partials/initial-styles`
    );
  }
};
