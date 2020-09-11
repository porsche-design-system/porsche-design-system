import { componentsFactory } from './lib/components-provider';
import { load, LoadOptions } from '@porsche-design-system/components-js';

export const getPrefixedComponents = (opts: LoadOptions, preventComponentLibraryLoading: boolean = false) => {
  if (!preventComponentLibraryLoading) {
    load(opts);
  }

  return componentsFactory((tagName: string) => `${opts.prefix ?? ''}-${tagName}`);
};
