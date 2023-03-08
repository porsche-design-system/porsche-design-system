export const parseJSONAttribute = <T>(attribute: T | string): T => {
  return typeof attribute === 'string'
    ? // input is potentially JSON parsable string, e.g. "{ aria-label: 'Some label' }"
      JSON.parse(
        attribute
          .replace(/'/g, '"') // convert single quotes to double quotes
          .replace(/[\s"]?([a-z-]+)[\s"]?:([^//])/g, '"$1":$2') // wrap keys in double quotes if they don't have them but ignore potential urls
      )
    : // input is object, e.g. { aria-label: 'Some label' }
      attribute;
};
