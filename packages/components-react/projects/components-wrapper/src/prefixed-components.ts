import { componentsFactory } from './lib/components-provider';

export function getPrefixedComponents(prefix: string = '', preventComponentLibraryLoading: boolean = false) {
  if (!preventComponentLibraryLoading) {
    require('@porsche-design-system/components-pwcm').load(prefix);
  }

  return componentsFactory((tagName: string) => {
    return `${prefix}-${tagName}`;
  });
}
