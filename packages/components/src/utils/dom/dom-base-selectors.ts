export type HTMLElementOrShadowRoot = HTMLElement | ShadowRoot;
export type HTMLTagName = keyof HTMLElementTagNameMap;

// prettier-ignore
export function getHTMLElement<K extends HTMLTagName>(element: HTMLElementOrShadowRoot, selector: K): HTMLElementTagNameMap[K] | null;
// prettier-ignore
export function getHTMLElement<E extends Element = Element>(element: HTMLElementOrShadowRoot, selector: string): E | null;
// prettier-ignore
export function getHTMLElement<K extends HTMLTagName>(element: HTMLElementOrShadowRoot, selector: K): HTMLElementTagNameMap[K] | null {
  return element.querySelector(selector);
}

// prettier-ignore
export function getHTMLElements<K extends HTMLTagName>(element: HTMLElementOrShadowRoot, selector: K): HTMLElementTagNameMap[K][];
// prettier-ignore
export function getHTMLElements<E extends Element = Element>(element: HTMLElementOrShadowRoot, selector: string): E[];
// prettier-ignore
export function getHTMLElements<K extends HTMLTagName>(element: HTMLElementOrShadowRoot, selector: K): HTMLElementTagNameMap[K][] {
  return Array.from(element.querySelectorAll(selector));
}

// prettier-ignore
export function getClosestHTMLElement<K extends HTMLTagName>(element: HTMLElement, selector: K): HTMLElementTagNameMap[K] | null;
// prettier-ignore
export function getClosestHTMLElement<E extends Element = Element>(element: HTMLElement, selector: string): E | null;
// prettier-ignore
export function getClosestHTMLElement<K extends HTMLTagName>(element: HTMLElement, selector: string): HTMLElementTagNameMap[K] | null {
  return element.closest(selector);
}
