/* eslint-disable prefer-arrow/prefer-arrow-functions */
import type { FormState } from '../types';
import type { TagNameCamelCase } from '@porsche-design-system/shared';
import { getPrefixedTagNames } from './get-prefixed-tag-name';

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

export const setAttribute = (el: HTMLElement, attributeName: string, attributeValue = ''): void => {
  el.setAttribute(attributeName, attributeValue);
};

export const removeAttribute = (el: HTMLElement, attributeName: string): void => {
  el.removeAttribute(attributeName);
};

export const hasAttribute = (el: HTMLElement, attributeName: string): boolean => {
  return el.hasAttribute(attributeName);
};

export type HTMLElementWithRequiredProp = HTMLElement & { required: boolean };

export const isRequired = (el: HTMLElementWithRequiredProp): boolean => !!el.required;

export const hasNamedSlot = (el: Host, slotName: string): boolean => !!getHTMLElement(el, `[slot="${slotName}"]`);

export const isCaptionVisible = (host: Host, caption: string): boolean => {
  return !!caption || hasNamedSlot(host, 'caption');
};

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

export const isParentOfKind = (host: HTMLElement, tagName: string): boolean => {
  return getTagName(host.parentElement) === getPrefixedTagNames(host)[tagName];
};

export const throwIfParentIsNotOfKind = (host: HTMLElement, tagName: TagNameCamelCase): void => {
  if (!isParentOfKind(host, tagName)) {
    const allowedTagName = getPrefixedTagNames(host)[tagName];
    const actualTagName = getTagName(host.parentElement);
    throw new Error(
      `Parent HTMLElement of ${getTagName(host)} should be of kind ${allowedTagName} but got ${actualTagName}.`
    );
  }
};

export const throwIfParentIsNotOneOfKind = (host: HTMLElement, tagNames: TagNameCamelCase[]): void => {
  if (!tagNames.some((tagName) => isParentOfKind(host, tagName))) {
    const prefixedTagNames = getPrefixedTagNames(host);
    const allowedTagNames = tagNames.map((tagName) => prefixedTagNames[tagName]).join(', ');
    const actualTagName = getTagName(host.parentElement);

    throw new Error(
      `Parent HTMLElement of ${getTagName(host)} should be one of kind ${allowedTagNames} but got ${actualTagName}.`
    );
  }
};

export const throwIfElementHasAttribute = (el: HTMLElement, name: string): void => {
  if (hasAttribute(el, name)) {
    throw new Error(`Attribute '${name}' with the value '${getAttribute(el, name)}' needs be set via property.`);
  }
};

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

export const isDisabledOrLoading = (disabled: boolean, loading: boolean): boolean => {
  return disabled || loading;
};

export const isParentFieldsetWrapperRequired = (host: HTMLElement): boolean => {
  return isRequired(host.parentElement as HTMLElementWithRequiredProp) && isParentOfKind(host, 'pFieldsetWrapper');
};

export const isRequiredAndParentNotRequired = (host: HTMLElement, child: HTMLElementWithRequiredProp): boolean => {
  return isRequired(child) && !isParentFieldsetWrapperRequired(host);
};

export const getRole = (state: FormState): string => {
  return state === 'error' ? 'alert' : null;
};
