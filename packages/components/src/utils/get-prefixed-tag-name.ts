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
    {}
  );
};

export const getAllPrefixedTagNames = (host: HTMLElement): PrefixedTagNames => {
  const [, prefix = ''] = host.tagName.toLowerCase().match(prefixRegex) ?? [];
  const tagNames: PrefixedTagNames = {} as PrefixedTagNames;
  Object.values({ ...TAG_NAMES }).forEach((tag) => (tagNames[tag as TagName] = prefix + tag));
  return tagNames;
};
