/**
 * from https://stackoverflow.com/a/6661012
 */
const kebabToCamelCase = (kebabCaseString: string): string =>
  kebabCaseString.replace(/-([a-z])/g, (match) => match[1].toUpperCase());

export const getPrefixedTagNames = (element: HTMLElement, tagNames: string[]): { [tagName: string]: string } => {
  const lowerCaseTagName = element.tagName.toLowerCase();
  const [,prefix=''] = new RegExp(/^(.*-)p-(.*)$/).exec(lowerCaseTagName) || [];
  return tagNames.reduce((tagNameMap, tagName) => ({
    ...tagNameMap,
    [kebabToCamelCase(tagName)]: `${prefix}${tagName}`
  }), {});
};
