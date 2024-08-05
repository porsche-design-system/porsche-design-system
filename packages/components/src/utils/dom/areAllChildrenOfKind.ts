import type { TagName } from '@porsche-design-system/shared';
import { getPrefixedTagNames, getTagName, paramCaseToCamelCase } from '..';
import type { PrefixedTagNames } from '../tag-name';

export const areAllChildrenOfKind = (element: HTMLElement, tagName: TagName): boolean => {
  const children = Array.from(element.children);
  const prefixedElementTagName = getPrefixedTagNames(element)[paramCaseToCamelCase(tagName) as keyof PrefixedTagNames];
  return !children.some((child: HTMLElement) => getTagName(child) !== prefixedElementTagName);
};
