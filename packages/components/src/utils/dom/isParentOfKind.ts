import type { TagNameCamelCase } from '@porsche-design-system/shared';
import { getPrefixedTagNames, getTagName } from '../tag-name';

export const isParentOfKind = (element: HTMLElement, tagName: TagNameCamelCase): boolean => {
  const { parentElement } = element;
  return parentElement && getTagName(parentElement) === getPrefixedTagNames(element)[tagName];
};
