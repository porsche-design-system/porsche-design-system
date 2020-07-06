import { camelCase } from 'change-case';

export const getPrefixedTagNames = (element: HTMLElement, tagNames: string[]): { [tagName: string]: string } => {
  const lowerCaseTagName = element.tagName.toLowerCase();
  const [, prefix = ''] = new RegExp(/^(.*-)p-(.*)$/).exec(lowerCaseTagName) || [];
  return tagNames.reduce(
    (tagNameMap, tagName) => ({
      ...tagNameMap,
      [camelCase(tagName)]: prefix + tagName
    }),
    {}
  );
};
