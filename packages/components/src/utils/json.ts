export const parseJSONAttribute = <T>(attribute: T | string): T => {
  // JSON.parse throws exception for empty string: `""`
  return typeof attribute === 'string' && attribute
    ? // input is potentially JSON parsable string, e.g. "{ aria-label: 'Some label' }"
      JSON.parse(
        attribute
          .replace(/'/g, '"') // convert single quotes to double quotes
          .replace(/[\s"]?([\w-]+)[\s"]?:/g, '"$1":') // wrap keys in double quotes
      )
    : // input is object, e.g. { aria-label: 'Some label' }
      attribute;
};
