/**
 * Checks if a click event occurred outside the specified element.
 *
 * @param {Event} e - The click event object.
 * @param {HTMLElement} host - The host element to compare against.
 * @returns {boolean} - Returns true if the click event occurred outside the host element, otherwise false.
 */
export const isClickOutside = (e: Event, host: HTMLElement): boolean => !e.composedPath().includes(host);
