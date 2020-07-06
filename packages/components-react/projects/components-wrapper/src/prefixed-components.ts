import { componentsFactory } from './lib/components-provider';
import { load } from '@porsche-design-system/components-pwcm';

export const getPrefixedComponents = (prefix: string = '', preventComponentLibraryLoading: boolean = false) => {
  if (!preventComponentLibraryLoading) {
    load(prefix);
  }

  return componentsFactory((tagName: string) => `${prefix}-${tagName}`);
};
