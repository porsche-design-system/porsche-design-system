import type { TagNameCamelCase } from '@porsche-design-system/shared';
import { getPrefixedTagNames } from '../getPrefixedTagNames';
import { getTagName } from '../getTagName';

export const areAllChildrenOfKind = (element: HTMLElement, tagName: TagNameCamelCase): boolean => {
  const children = Array.from(element.children);
  const prefixedElementTagName = getPrefixedTagNames(element)[tagName];
  return !children.some((child: HTMLElement) => getTagName(child) !== prefixedElementTagName);
};
