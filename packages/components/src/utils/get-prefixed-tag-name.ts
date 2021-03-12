import type { TagNameCamelCase } from '@porsche-design-system/shared';
import { TAG_NAMES } from '@porsche-design-system/shared';
import { getTagName, paramCaseToCamelCase } from '.';

type PrefixedTagNames = { [key in TagNameCamelCase]: string };

export const CACHE = new Map<string, PrefixedTagNames>();

export const getPrefixedTagNames = (host: HTMLElement): PrefixedTagNames => {
  const [, prefix = ''] = /^(.*)-p-(.*)$/.exec(getTagName(host)) || [];

  if (!CACHE.has(prefix)) {
    const tagNames: PrefixedTagNames = {} as PrefixedTagNames;
    for (const tag of TAG_NAMES) {
      tagNames[paramCaseToCamelCase(tag)] = prefix ? `${prefix}-${tag}` : tag;
    }
    CACHE.set(prefix, tagNames);
  }

  return CACHE.get(prefix);
};
