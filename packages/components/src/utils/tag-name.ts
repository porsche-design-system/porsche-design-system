import type { TagName, TagNameCamelCase, TagNameWithChunk } from '@porsche-design-system/shared';
import { TAG_NAMES } from '@porsche-design-system/shared';
import { paramCaseToCamelCase } from './paramCaseToCamelCase';

// NOTE: these utils are in the same file on purpose
// to force them being bundled into our core chunk

export const getTagName = (el: HTMLElement): string => el.tagName.toLowerCase();

export const getTagNameWithoutPrefix = (host: HTMLElement): TagName => {
  const tagName = getTagName(host);
  const [, tagNameWithoutPrefix = ''] = /^(?:[a-z-]+-)?(p-[a-z-]+)$/.exec(tagName) || [];
  return (tagNameWithoutPrefix || tagName) as TagName; // return tagName as fallback for default tags
};

export const getTagNamesWithoutDuplicates = (tagNames: string[] | TagName[] | TagNameWithChunk[]): string[] =>
  tagNames.filter((tagName, idx, arr) => arr.indexOf(tagName) === idx);

// prevent internal usage of p-headline and p-text
type AllowedTagNameCamelCase = Exclude<TagNameCamelCase, 'pHeadline' | 'pText'>;
type PrefixedTagNames = Record<AllowedTagNameCamelCase, string>;
const tagNamesWithoutTextAndHeadline = TAG_NAMES.filter((item) => item !== 'p-text' && item !== 'p-headline');

export const PREFIXED_TAG_NAMES_CACHE = new Map<string, PrefixedTagNames>();

export const getPrefixedTagNames = (host: HTMLElement): PrefixedTagNames => {
  const [, prefix = ''] = /^([a-z-]+)-p-[a-z-]+$/.exec(getTagName(host)) || [];

  if (!PREFIXED_TAG_NAMES_CACHE.has(prefix)) {
    const tagNames: PrefixedTagNames = tagNamesWithoutTextAndHeadline.reduce(
      prefix
        ? (result, tag) => ({
            ...result,
            [paramCaseToCamelCase(tag)]: `${prefix}-${tag}`,
          })
        : (result, tag) => ({
            ...result,
            [paramCaseToCamelCase(tag)]: tag,
          }),
      {} as PrefixedTagNames
    );

    PREFIXED_TAG_NAMES_CACHE.set(prefix, tagNames);
  }

  return PREFIXED_TAG_NAMES_CACHE.get(prefix);
};
