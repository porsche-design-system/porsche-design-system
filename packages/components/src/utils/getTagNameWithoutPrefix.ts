import type { TagName } from '@porsche-design-system/shared';
import { getTagName } from './getTagName';

export const getTagNameWithoutPrefix = (host: HTMLElement): TagName => {
  return /^(?:[a-z-]+-)?(p-[a-z-]+)$/.exec(getTagName(host))[1] as TagName;
};
