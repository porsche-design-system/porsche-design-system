import type { TagNameCamelCase } from '@porsche-design-system/shared';
import { getPrefixedTagNames, getTagName } from '../tag-name';

export const areChildrenOfKind = (element: HTMLElement, tagName: TagNameCamelCase): boolean => {
  const children = Array.from(element.children);
  const prefixedElementTagName = getPrefixedTagNames(element)[tagName];
  return children.every((child: HTMLElement) => getTagName(child) === prefixedElementTagName);
};
