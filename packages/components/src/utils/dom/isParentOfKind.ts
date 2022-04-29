import type { TagNameCamelCase } from '@porsche-design-system/shared';
import { getPrefixedTagNames, getTagName } from '../tag-name';

export const isParentOfKind = (element: HTMLElement, tagName: TagNameCamelCase, inShadowRoot?: boolean): boolean => {
  const parentElement = inShadowRoot ? (element.getRootNode() as ShadowRoot).host : element.parentElement;

  return parentElement && getTagName(parentElement as HTMLElement) === getPrefixedTagNames(element)[tagName];
};
