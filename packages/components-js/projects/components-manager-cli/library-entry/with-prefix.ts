import { loadComponentLibrary } from '@porsche-design-system/components-manager-core';
import type { EntryConfig } from '../shared-definitions/entry-config';

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
  loadComponentLibrary({ ...CM_CONFIG, ...opts });
};
