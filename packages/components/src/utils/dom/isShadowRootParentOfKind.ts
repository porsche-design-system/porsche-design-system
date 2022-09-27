import type { TagNameCamelCase } from '@porsche-design-system/shared';
import { getPrefixedTagNames } from '../getPrefixedTagNames';
import { getTagName } from '../getTagName';

export const isShadowRootParentOfKind = (element: HTMLElement, tagName: TagNameCamelCase): boolean => {
  const parentElement = (element.getRootNode() as ShadowRoot).host;

  return parentElement && getTagName(parentElement as HTMLElement) === getPrefixedTagNames(element)[tagName];
};
