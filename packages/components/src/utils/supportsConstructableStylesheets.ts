/**
 * Checks if the current environment supports the constructable stylesheets feature.
 *
 * @returns {boolean} `true` if constructable stylesheets are supported, `false` otherwise.
 */
export const supportsConstructableStylesheets = (): boolean => {
  try {
    return typeof new CSSStyleSheet().replaceSync === 'function';
  } catch {
    return false;
  }
};

// determine it once
const hasConstructableStylesheetSupport = supportsConstructableStylesheets();
// getter for easy mocking
export const getHasConstructableStylesheetSupport = (): boolean => hasConstructableStylesheetSupport;
