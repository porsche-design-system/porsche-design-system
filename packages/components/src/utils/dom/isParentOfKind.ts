import type { TagName } from '@porsche-design-system/shared';
import { getTagNameWithoutPrefix } from '../tag-name';

export const isParentOfKind = (element: HTMLElement, tagName: TagName): boolean => {
  const { parentElement } = element;
  return parentElement && getTagNameWithoutPrefix(parentElement) === tagName;
};
