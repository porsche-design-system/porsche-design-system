/* eslint-disable prefer-arrow/prefer-arrow-functions */

type Host = HTMLElement | ShadowRoot;

// prettier-ignore
export function getHTMLElement<K extends keyof HTMLElementTagNameMap>(host: Host, selector: K): HTMLElementTagNameMap[K] | null;
export function getHTMLElement<E extends Element = Element>(host: Host, selector: string): E | null;
// prettier-ignore
export function getHTMLElement<K extends keyof HTMLElementTagNameMap>(host: Host, selector: K): HTMLElementTagNameMap[K] | null {
  return host.querySelector(selector);
}

// prettier-ignore
export function getHTMLElements<K extends keyof HTMLElementTagNameMap>(host: Host, selector: K): HTMLElementTagNameMap[K][];
export function getHTMLElements<E extends Element = Element>(host: Host, selector: string): E[];
// prettier-ignore
export function getHTMLElements<K extends keyof HTMLElementTagNameMap>(host: Host, selector: K): HTMLElementTagNameMap[K][] {
  return Array.from(host.querySelectorAll(selector));
}

// prettier-ignore
export function getShadowRootHTMLElement<K extends keyof HTMLElementTagNameMap>(host: HTMLElement, selector: K): HTMLElementTagNameMap[K] | null;
export function getShadowRootHTMLElement<E extends Element = Element>(host: Host, selector: string): E | null;
// prettier-ignore
export function getShadowRootHTMLElement<K extends keyof HTMLElementTagNameMap>(host: HTMLElement, selector: string): HTMLElementTagNameMap[K] | null {
  return getHTMLElement(host.shadowRoot, selector);
}

// prettier-ignore
export function getClosestHTMLElement<K extends keyof HTMLElementTagNameMap>(host: HTMLElement, selector: K): HTMLElementTagNameMap[K] | null;
export function getClosestHTMLElement<E extends Element = Element>(host: HTMLElement, selector: string): E | null;
// prettier-ignore
export function getClosestHTMLElement<K extends keyof HTMLElementTagNameMap>(host: HTMLElement, selector: string): HTMLElementTagNameMap[K] | null {
  return host.closest(selector);
}

export const getAttribute = (el: HTMLElement | Element, attributeName: string): string | null => {
  return el.getAttribute(attributeName);
};

export const setAttribute = (el: HTMLElement, attributeName: string, attributeValue: string): void => {
  el.setAttribute(attributeName, attributeValue);
};

export const removeAttribute = (el: HTMLElement, attributeName: string): void => {
  el.removeAttribute(attributeName);
};

export const isRequired = (el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): boolean =>
  getAttribute(el, 'required') !== null;

export const hasNamedSlot = (el: Host, slotName: string): boolean => !!getHTMLElement(el, `[slot="${slotName}"]`);

// prettier-ignore
export function getHTMLElementAndThrowIfUndefined<K extends keyof HTMLElementTagNameMap>(host: Host, selector: K): HTMLElementTagNameMap[K] | null;
export function getHTMLElementAndThrowIfUndefined<E extends Element = Element>(host: Host, selector: string): E | null;
// prettier-ignore
export function getHTMLElementAndThrowIfUndefined<K extends keyof HTMLElementTagNameMap>(host: Host, selector: K): HTMLElementTagNameMap[K] | null {
  const el = getHTMLElement(host, selector);
  if (!el) {
    throw new Error(`Child HTMLElement ${selector} is missing.`);
  }
  return el;
}

export const getTagName = (el: HTMLElement): string => el.tagName.toLowerCase();

// TODO: add addEventListener and removeEventListener
