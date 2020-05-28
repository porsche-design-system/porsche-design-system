function kebabToCamelCase(kebabCaseString: string) {
  /**
   * from https://stackoverflow.com/a/6661012
   */
  return kebabCaseString.replace(/-([a-z])/g, function (match) {
    return match[1].toUpperCase();
  });
}

export function getPrefixedTagNames(element: HTMLElement, tagNames: string[]): { [tagName: string]: string } {
  const lowerCaseTagName = element.tagName.toLowerCase();
  const [,prefix=''] = lowerCaseTagName.match(/^(.*-)p-(.*)$/) || [];
  return tagNames.reduce((tagNameMap,tagName) => {
    return {
      ...tagNameMap,
      [kebabToCamelCase(tagName)]: `${prefix}${tagName}`
    };
  }, {});
}
