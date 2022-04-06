/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { getHTMLElement } from './getHTMLElement';
import type { HTMLElementOrShadowRoot } from './dom-types';

// prettier-ignore
export function getHTMLElementAndThrowIfUndefined<K extends keyof HTMLElementTagNameMap>(element: HTMLElementOrShadowRoot, selector: K): HTMLElementTagNameMap[K] | null;
// prettier-ignore
export function getHTMLElementAndThrowIfUndefined<E extends Element = Element>(element: HTMLElementOrShadowRoot, selector: string): E | null;
export function getHTMLElementAndThrowIfUndefined(element: HTMLElementOrShadowRoot, selector: string): any {
  const el = getHTMLElement(element, selector);
  if (!el) {
    throw new Error(`Child HTMLElement ${selector} is missing.`);
  }
  return el;
}
