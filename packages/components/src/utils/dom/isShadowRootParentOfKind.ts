import type { TagNameCamelCase } from '@porsche-design-system/shared';
import { getPrefixedTagNames, getTagName } from '..';

export const isShadowRootParentOfKind = (element: HTMLElement, tagName: TagNameCamelCase): boolean => {
  const parentElement = (element.getRootNode() as ShadowRoot).host;

  return parentElement && getTagName(parentElement as HTMLElement) === getPrefixedTagNames(element)[tagName];
};
