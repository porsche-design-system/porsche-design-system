import type { TagName } from '@porsche-design-system/shared';
import { getTagNameWithoutPrefix } from '..';

export const isParentOfKind = (element: HTMLElement, tagName: TagName): boolean => {
  const { parentElement } = element;
  return parentElement && getTagNameWithoutPrefix(parentElement) === tagName;
};
