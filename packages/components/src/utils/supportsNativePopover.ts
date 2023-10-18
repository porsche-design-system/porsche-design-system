/**
 * Checks if the current environment supports the native Popover API.
 *
 * @returns {boolean} `true` if the native Popover API is supported, `false` otherwise.
 */
export const supportsNativePopover = (): boolean => {
  try {
    return HTMLElement.prototype.hasOwnProperty('popover');
  } catch {
    return false;
  }
};

// determine it once
const hasNativePopoverSupport = supportsNativePopover();
// getter for easy mocking
export const getHasNativePopoverSupport = (): boolean => hasNativePopoverSupport;
