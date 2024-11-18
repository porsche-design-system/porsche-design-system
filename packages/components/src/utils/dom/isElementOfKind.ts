import type { TagName } from '@porsche-design-system/shared';
import { getTagNameWithoutPrefix } from '../tag-name';

export const isElementOfKind = (element: HTMLElement, tagName: TagName): boolean =>
  getTagNameWithoutPrefix(element) === tagName;
