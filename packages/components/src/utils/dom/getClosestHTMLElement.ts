/* eslint-disable prefer-arrow/prefer-arrow-functions */

// prettier-ignore
export function getClosestHTMLElement<K extends keyof HTMLElementTagNameMap>(element: HTMLElement, selector: K): HTMLElementTagNameMap[K] | null;
// prettier-ignore
export function getClosestHTMLElement<E extends Element = Element>(element: HTMLElement, selector: string): E | null;
export function getClosestHTMLElement(element: HTMLElement, selector: string): any {
  return element.closest(selector);
}
