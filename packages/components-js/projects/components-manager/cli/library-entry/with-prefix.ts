import { loadComponentLibrary } from '@porsche-design-system/web-components-manager';
import { EntryConfig } from '../shared-definitions/entry-config';

/**
 * PWCM_CONFIG will be provided via webpack
 */
declare var PWCM_CONFIG: EntryConfig;

/**
 * @property prefix - the prefix used for the components
 */
export type LoadOptions = {
  prefix: string;
};

export const load = (opts: LoadOptions = { prefix: '' }): void => {
  loadComponentLibrary({ ...PWCM_CONFIG, ...opts });
};
