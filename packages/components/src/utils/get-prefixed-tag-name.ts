import { camelCase } from 'change-case';
import { TagName, TagNameCamelCase, TAG_NAMES } from '../tags';

type PrefixedTagNames = { [key in TagNameCamelCase]: string };

const prefixRegex = /^(.*-)p-(.*)$/;

export const getPrefixedTagNames = (host: HTMLElement, rawTagNames: TagName[]): Partial<PrefixedTagNames> => {
  const [, prefix = ''] = new RegExp(prefixRegex).exec(host.tagName.toLowerCase()) ?? [];
  const tagNames: PrefixedTagNames = {} as PrefixedTagNames;
  for (const tag of rawTagNames) {
    tagNames[camelCase(tag)] = `${prefix}${tag}`;
  }
  return tagNames;
};

export const getAllPrefixedTagNames = (host: HTMLElement): PrefixedTagNames => {
  return getPrefixedTagNames(host, (TAG_NAMES as unknown) as TagName[]) as PrefixedTagNames;
};
