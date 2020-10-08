import { camelCase } from 'change-case';
import { TagName, TagNameCamelCase, TAG_NAMES } from '../tags';

type PrefixedTagNames = { [key in TagNameCamelCase]: string };

const prefixRegex = /^(.*-)p-(.*)$/;

export const getPrefixedTagNames = (element: HTMLElement, tagNames: TagName[]): Partial<PrefixedTagNames> => {
  const lowerCaseTagName = element.tagName.toLowerCase();
  const [, prefix = ''] = new RegExp(prefixRegex).exec(lowerCaseTagName) || [];
  return tagNames.reduce(
    (tagNameMap, tagName) => ({
      ...tagNameMap,
      [camelCase(tagName)]: prefix + tagName
    }),
    {} as PrefixedTagNames
  );
};

export const getAllPrefixedTagNames = (host: HTMLElement): PrefixedTagNames => {
  const [, prefix = ''] = new RegExp(prefixRegex).exec(host.tagName.toLowerCase()) ?? [];
  const tagNames: PrefixedTagNames = {} as PrefixedTagNames;
  Object.values({ ...TAG_NAMES }).forEach((tag) => (tagNames[camelCase(tag as string)] = `${prefix}${tag}`));
  return tagNames;
};
