/**
 * Checks if a component is deprecated by searching for the `@deprecated` tag
 * in the provided file content.
 *
 * @param {string} fileContent - The content of the file to be checked for deprecation.
 * @returns {[boolean, string]} - An array where the first element is a boolean indicating
 * whether the component is deprecated, and the second element is the raw deprecation message.
 * If no deprecation message is found, the second element will be an empty string.
 */
export const isDeprecatedComponent = (fileContent: string): [boolean, string] => {
  // Regex does not work for multiline deprecation message
  const [deprecated, rawDeprecationMessage = ''] = /@deprecated ([^*\n]*)[\s\S]*?@Component/.exec(fileContent) || [];
  return [!!deprecated, rawDeprecationMessage];
};
