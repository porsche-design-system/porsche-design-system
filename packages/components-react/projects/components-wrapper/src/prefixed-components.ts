import { componentsFactory } from './lib/components-provider';
import { load } from '@porsche-design-system/components-pwcm';

export function getPrefixedComponents(prefix: string = '', preventComponentLibraryLoading: boolean = false) {
  if (!preventComponentLibraryLoading) {
    load(prefix);
  }

  return componentsFactory((tagName: string) => {
    return `${prefix}-${tagName}`;
  });
}
