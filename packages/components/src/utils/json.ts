export const parseJSONAttribute = <T>(attribute: T | string): T => {
  // Input is object, e.g. { 'aria-label': 'Some label' }
  if (typeof attribute !== 'string') {
    return attribute;
  }

  return JSON.parse(
    attribute
      // Convert colon to tmp colon
      .replace(/(?<=['"]\s*\w+[\s\w]*):/g, '__tmp-colon__')
      // Convert single quotes to double quotes except the ones which are escaped by backslash
      .replace(/\\'/g, '__escaped_single_quote__')
      .replace(/'/g, '"')
      .replace(/__escaped_single_quote__/g, "\\'")
      // Remove string escapes except the ones followed by unicode u0027
      .replace(/([^\\])\\(?!u0027)/g, '$1')
      // Wrap keys in double quotes
      .replace(/[\s"]?([\w-]+)[\s"]?:/g, '"$1":')
      // Convert tmp colon to real colon after all other replacements
      .replace(/__tmp-colon__/g, ':')
  );
};
