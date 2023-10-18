/**
 * Checks if the current environment supports the native Popover API.
 *
 * @returns {boolean} `true` if the native Popover API is supported, `false` otherwise.
 */
export const supportsNativePopover = (): boolean => HTMLElement.prototype.hasOwnProperty('popover');
