/* eslint-disable prefer-arrow/prefer-arrow-functions */
import type { HTMLElementOrShadowRoot } from './dom-types';
import { getHTMLElement } from './getHTMLElement';

// prettier-ignore
export function getShadowRootHTMLElement<K extends keyof HTMLElementTagNameMap>(element: HTMLElement, selector: K): HTMLElementTagNameMap[K] | null;
// prettier-ignore
export function getShadowRootHTMLElement<E extends Element = Element>(element: HTMLElementOrShadowRoot, selector: string): E | null;
export function getShadowRootHTMLElement(element: HTMLElement, selector: string): any {
  return getHTMLElement(element.shadowRoot, selector);
}
