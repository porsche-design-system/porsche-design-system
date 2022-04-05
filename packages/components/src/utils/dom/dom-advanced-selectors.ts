import type { HTMLElementOrShadowRoot, HTMLTagName } from './dom-base-selectors';
import { getHTMLElement } from './dom-base-selectors';

// prettier-ignore
export function getShadowRootHTMLElement<K extends HTMLTagName>(element: HTMLElement, selector: K): HTMLElementTagNameMap[K] | null;
// prettier-ignore
export function getShadowRootHTMLElement<E extends Element = Element>(element: HTMLElementOrShadowRoot, selector: string): E | null;
// prettier-ignore
export function getShadowRootHTMLElement<K extends HTMLTagName>(element: HTMLElement, selector: string): HTMLElementTagNameMap[K] | null {
  return getHTMLElement(element.shadowRoot, selector);
}

// prettier-ignore
export function getDirectChildHTMLElement<K extends HTMLTagName>(element: HTMLElement, selector: K): HTMLElementTagNameMap[K] | null;
// prettier-ignore
export function getDirectChildHTMLElement<E extends Element = Element>(element: HTMLElement, selector: string): E | null;
// prettier-ignore
export function getDirectChildHTMLElement<K extends HTMLTagName>(element: HTMLElement, selector: string): HTMLElementTagNameMap[K] | null {
  return getHTMLElement(
    element,
    selector
      .split(',')
      .map((part) => ':scope>' + part)
      .join(',')
  );
}

export const getSlotTextContent = (el: HTMLElementOrShadowRoot, slotName: string): string =>
  getHTMLElement(el, `[slot="${slotName}"]`)?.textContent;
