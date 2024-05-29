export const parseJSONAttribute = <T>(attribute: T | string): T => {
  // Input is object, e.g. { 'aria-label': 'Some label' }
  if (typeof attribute !== 'string') {
    return attribute;
  }

  // Convert single quotes to double quotes except the ones which are escaped by backslash
  let jsonString = attribute
    .replace(/\\'/g, '__escaped_single_quote__')
    .replace(/'/g, '"')
    .replace(/__escaped_single_quote__/g, '\\\'');

  // Remove string escapes except the ones followed by unicode u0027
  jsonString = jsonString.replace(/([^\\])\\(?!u0027)/g, '$1');

  // Wrap keys in double quotes
  jsonString = jsonString.replace(/[\s"]?([\w-]+)[\s"]?:/g, '"$1":');

  return JSON.parse(jsonString);
};
