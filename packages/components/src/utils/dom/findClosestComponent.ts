import { getPrefixedTagNames, PrefixedTagNames } from '../tag-name';

/**
 * Checks if the given host element is within a specific component based on the component's tag name.
 *
 * @param {HTMLElement} host - The element to check.
 * @param {keyof PrefixedTagNames} component - The tag name of the component to check against.
 * @returns {HTMLElement | null} The closest ancestor element that matches the component's tag name, or null if not found.
 */
export const findClosestComponent = (host: HTMLElement, component: keyof PrefixedTagNames): HTMLElement | null =>
  host.closest(getPrefixedTagNames(host)[component]);
