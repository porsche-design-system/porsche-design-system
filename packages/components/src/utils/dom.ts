/* eslint-disable prefer-arrow/prefer-arrow-functions */
import type { FormState } from '../types';

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

export const isLabelVisible = (host: Host, label: string): boolean => {
  return !!label || hasNamedSlot(host, 'label');
};

export const isMessageVisible = (host: Host, message: string, state: FormState): boolean => {
  return !!(message || hasNamedSlot(host, 'message')) && ['success', 'error'].includes(state);
};

export const isDescriptionVisible = (host: Host, description: string): boolean => {
  return !!description || hasNamedSlot(host, 'description');
};

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

export const addEventListener = (
  el: HTMLElement,
  type: string,
  listener: () => void,
  options?: boolean | AddEventListenerOptions
): void => el.addEventListener(type, listener, options);

export const removeEventListener = (
  el: HTMLElement,
  type: string,
  listener: () => void,
  options?: boolean | EventListenerOptions
): void => el.removeEventListener(type, listener, options);
