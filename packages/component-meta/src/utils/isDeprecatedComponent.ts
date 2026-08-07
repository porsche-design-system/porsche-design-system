// Matches a single-line `@deprecated` message, e.g. `@deprecated since v3.0.0, will be removed…`
// Note: multiline deprecation messages are not supported by design, only the first line is captured
const deprecationTagRegex = /@deprecated ([^*\n]*)/;

/**
 * Checks if a component is deprecated by searching for the `@deprecated` tag
 * in the doc block preceding the `@Component` decorator of the provided file content.
 *
 * Only the section before the first `@Component` decorator is inspected, so `@deprecated` tags
 * of props, methods or events (which are declared after the decorator) are ignored.
 *
 * @param {string} fileContent - The content of the file to be checked for deprecation.
 * @returns {[boolean, string]} - An array where the first element is a boolean indicating
 * whether the component is deprecated, and the second element is the raw deprecation message.
 * If no deprecation message is found, the second element will be an empty string.
 */
export const isDeprecatedComponent = (fileContent: string): [boolean, string] => {
  // Slicing at the `@Component` decorator keeps the matching linear instead of relying on
  // backtracking (avoids polynomial regex complexity on uncontrolled input)
  const componentDecoratorIndex = fileContent.indexOf('@Component');

  if (componentDecoratorIndex === -1) {
    return [false, ''];
  }

  const [deprecated, rawDeprecationMessage = ''] =
    deprecationTagRegex.exec(fileContent.slice(0, componentDecoratorIndex)) || [];

  return [!!deprecated, rawDeprecationMessage];
};
