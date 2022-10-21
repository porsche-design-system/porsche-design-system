import type { TagName } from '@porsche-design-system/shared';
import { getPrefixedTagNames, getTagName, paramCaseToCamelCase } from '..';

export const areAllChildrenOfKind = (element: HTMLElement, tagName: TagName): boolean => {
  const children = Array.from(element.children);
  const prefixedElementTagName = getPrefixedTagNames(element)[paramCaseToCamelCase(tagName)];
  return !children.some((child: HTMLElement) => getTagName(child) !== prefixedElementTagName);
};
