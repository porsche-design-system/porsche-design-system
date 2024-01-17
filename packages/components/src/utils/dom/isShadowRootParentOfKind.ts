import type { TagName } from '@porsche-design-system/shared';
import { getPrefixedTagNames, getTagName, paramCaseToCamelCase } from '..';

export const isShadowRootParentOfKind = (element: HTMLElement, tagName: TagName): boolean => {
  const parentElement = (element.getRootNode() as ShadowRoot).host as HTMLElement;
  return !!(parentElement && getTagName(parentElement) === getPrefixedTagNames(element)[paramCaseToCamelCase(tagName)]);
};
