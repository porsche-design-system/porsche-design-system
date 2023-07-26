/* eslint-disable prefer-arrow/prefer-arrow-functions */
import type { HTMLElementOrShadowRoot } from './dom-types';
import { getHTMLElements } from './getHTMLElements';

// prettier-ignore
export function getShadowRootHTMLElements<K extends keyof HTMLElementTagNameMap>(element: HTMLElement, selector: K): HTMLElementTagNameMap[K][] | null;
// prettier-ignore
export function getShadowRootHTMLElements<E extends Element = Element>(element: HTMLElementOrShadowRoot, selector: string): E[] | null;
export function getShadowRootHTMLElements(element: HTMLElement, selector: string): any {
  return getHTMLElements(element.shadowRoot, selector);
}
