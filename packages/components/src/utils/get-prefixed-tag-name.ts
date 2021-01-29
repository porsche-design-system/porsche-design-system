import { camelCase } from 'change-case';
import type { TagName, TagNameCamelCase } from '@porsche-design-system/shared';
import { TAG_NAMES } from '@porsche-design-system/shared';

type PrefixedTagNames = { [key in TagNameCamelCase]: string };

const prefixRegex = /^(.*-)p-(.*)$/;

export const getPrefixedTagNames = (host: HTMLElement, rawTagNames: TagName[]): Partial<PrefixedTagNames> => {
  const [, prefix = ''] = prefixRegex.exec(host.tagName.toLowerCase()) ?? [];
  const tagNames: PrefixedTagNames = {} as PrefixedTagNames;
  for (const tag of rawTagNames) {
    tagNames[camelCase(tag)] = `${prefix}${tag}`;
  }
  return tagNames;
};

export const getAllPrefixedTagNames = (host: HTMLElement): PrefixedTagNames =>
  getPrefixedTagNames(host, (TAG_NAMES as unknown) as TagName[]) as PrefixedTagNames;
