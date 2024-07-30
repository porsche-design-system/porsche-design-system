import type { TagName } from '@porsche-design-system/shared';
import { getPrefixedTagNames, getTagName, paramCaseToCamelCase } from '..';
import type { PrefixedTagNames } from '../tag-name';

export const isShadowRootParentOfKind = (element: HTMLElement, tagName: TagName): boolean => {
  const parentElement = (element.getRootNode() as ShadowRoot).host as HTMLElement;
  return !!(
    parentElement &&
    getTagName(parentElement) === getPrefixedTagNames(element)[paramCaseToCamelCase(tagName) as keyof PrefixedTagNames]
  );
};
