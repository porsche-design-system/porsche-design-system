/* eslint-disable prefer-arrow/prefer-arrow-functions */
import type { HTMLElementOrShadowRoot } from './dom-types';

// prettier-ignore
export function getHTMLElement<K extends keyof HTMLElementTagNameMap>(element: HTMLElementOrShadowRoot, selector: K): HTMLElementTagNameMap[K] | null;
// prettier-ignore
export function getHTMLElement<E extends Element = Element>(element: HTMLElementOrShadowRoot, selector: string): E | null;
export function getHTMLElement(element: HTMLElementOrShadowRoot, selector: string): any {
  return element.querySelector(selector);
}
