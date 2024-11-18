import type { HTMLElementOrShadowRoot } from './dom-types';

// prettier-ignore
export function getHTMLElements<K extends keyof HTMLElementTagNameMap>(element: HTMLElementOrShadowRoot, selector: K): HTMLElementTagNameMap[K][];
// prettier-ignore
export function getHTMLElements<E extends Element = Element>(element: HTMLElementOrShadowRoot, selector: string): E[];
export function getHTMLElements(element: HTMLElementOrShadowRoot, selector: string): any {
  return element ? Array.from(element.querySelectorAll(selector)) : [];
}
