import { getAttribute } from './getAttribute';
import { hasAttribute } from './hasAttribute';

export const throwIfElementHasAttribute = (el: HTMLElement, name: string): void => {
  if (hasAttribute(el, name)) {
    throw new Error(`Attribute '${name}' with the value '${getAttribute(el, name)}' needs to be set as property`);
  }
};
