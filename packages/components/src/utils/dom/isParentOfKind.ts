import type { TagNameCamelCase } from '@porsche-design-system/shared';
import { getPrefixedTagNames, getTagName } from '../tag-name';

export const isParentOfKind = (element: HTMLElement, tagName: TagNameCamelCase): boolean => {
  return element.parentElement && getTagName(element.parentElement) === getPrefixedTagNames(element)[tagName];
};
