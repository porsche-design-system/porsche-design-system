/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { getHTMLElement } from './dom-base-selectors';
import type { HTMLElementOrShadowRoot, HTMLTagName } from './dom-base-selectors';

// prettier-ignore
export function getHTMLElementAndThrowIfUndefined<K extends HTMLTagName>(element: HTMLElementOrShadowRoot, selector: K): HTMLElementTagNameMap[K] | null;
// prettier-ignore
export function getHTMLElementAndThrowIfUndefined<E extends Element = Element>(element: HTMLElementOrShadowRoot, selector: string): E | null;
export function getHTMLElementAndThrowIfUndefined(element: HTMLElementOrShadowRoot, selector: string): any {
  const el = getHTMLElement(element, selector);
  if (!el) {
    throw new Error(`Child HTMLElement ${selector} is missing.`);
  }
  return el;
}
