import type { TagName, TagNameCamelCase } from '@porsche-design-system/shared';
import { TAG_NAMES } from '@porsche-design-system/shared';
import { paramCaseToCamelCase } from '.';

type PrefixedTagNames = { [key in TagNameCamelCase]: string };

export const PREFIXED_TAG_NAMES_CACHE = new Map<string, PrefixedTagNames>();

export const getTagName = (el: HTMLElement): string => el.tagName.toLowerCase();

export const getPrefixedTagNames = (host: HTMLElement): PrefixedTagNames => {
  const [, prefix = ''] = /^(.*)-p-.*$/.exec(getTagName(host)) || [];

  if (!PREFIXED_TAG_NAMES_CACHE.has(prefix)) {
    const tagNames: PrefixedTagNames = {} as PrefixedTagNames;
    for (const tag of TAG_NAMES) {
      tagNames[paramCaseToCamelCase(tag)] = prefix ? `${prefix}-${tag}` : tag;
    }
    PREFIXED_TAG_NAMES_CACHE.set(prefix, tagNames);
  }

  return PREFIXED_TAG_NAMES_CACHE.get(prefix);
};

export const getTagNameWithoutPrefix = (host: HTMLElement): TagName => {
  return /^(?:.*-)?(p-.*)$/i.exec(getTagName(host))[1] as TagName;
};
