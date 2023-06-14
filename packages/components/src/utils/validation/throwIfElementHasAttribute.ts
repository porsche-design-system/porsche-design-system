import { getAttribute } from '../dom/getAttribute';
import { hasAttribute } from '../dom/hasAttribute';
import { throwException } from '../log';

export const throwIfElementHasAttribute = (el: HTMLElement, name: string): void => {
  if (hasAttribute(el, name)) {
    throwException(`attribute ${name}='${getAttribute(el, name)}' needs to be set as property.`);
  }
};
