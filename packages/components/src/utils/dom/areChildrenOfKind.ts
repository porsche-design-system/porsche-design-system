import type { TagNameCamelCase } from '@porsche-design-system/shared';
import { getPrefixedTagNames, getTagName } from '../tag-name';

export const areChildrenOfKind = (element: HTMLElement, tagName: TagNameCamelCase): boolean => {
  const children = Array.from(element.children);
  const prefixedElementTagNames = getPrefixedTagNames(element);
  return children && children.every((child: HTMLElement) => getTagName(child) === prefixedElementTagNames[tagName]);
};
