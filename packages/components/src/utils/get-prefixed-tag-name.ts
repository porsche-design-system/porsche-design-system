import type { TagNameCamelCase } from '@porsche-design-system/shared';
import { TAG_NAMES } from '@porsche-design-system/shared';
import { getTagName, paramCaseToCamelCase } from '.';

type PrefixedTagNames = { [key in TagNameCamelCase]: string };

const prefixRegex = /^(.*-)p-(.*)$/;

// TODO: caching
export const getPrefixedTagNames = (host: HTMLElement): PrefixedTagNames => {
  const [, prefix = ''] = prefixRegex.exec(getTagName(host)) ?? [];
  const tagNames: PrefixedTagNames = {} as PrefixedTagNames;
  for (const tag of TAG_NAMES) {
    tagNames[paramCaseToCamelCase(tag)] = `${prefix}${tag}`;
  }
  return tagNames;
};
