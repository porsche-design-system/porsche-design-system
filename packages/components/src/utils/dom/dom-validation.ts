/* eslint-disable prefer-arrow/prefer-arrow-functions */
import type { HTMLElementOrShadowRoot, HTMLTagName } from './dom-base-selectors';
import { getHTMLElement } from './dom-base-selectors';
import type { FormState } from '../../types';
import type { TagNameCamelCase } from '@porsche-design-system/shared';
import { getPrefixedTagNames, getTagName } from '../tag-name';
import { getAttribute, hasAttribute } from './dom-attributes';

export type HTMLElementWithRequiredProp = HTMLElement & { required: boolean };

export const isRequired = (el: HTMLElementWithRequiredProp): boolean => !!el.required;

export const hasNamedSlot = (el: HTMLElementOrShadowRoot, slotName: string): boolean =>
  !!getHTMLElement(el, `[slot="${slotName}"]`);

export const hasLabel = (element: HTMLElementOrShadowRoot, label: string): boolean => {
  return !!label || hasNamedSlot(element, 'label');
};

export const hasMessage = (element: HTMLElementOrShadowRoot, message: string, state: FormState): boolean => {
  return !!(message || hasNamedSlot(element, 'message')) && ['success', 'error'].includes(state);
};

export const hasDescription = (element: HTMLElementOrShadowRoot, description: string): boolean => {
  return !!description || hasNamedSlot(element, 'description');
};

export const hasHeading = (element: HTMLElementOrShadowRoot, heading: string): boolean => {
  return !!heading || hasNamedSlot(element, 'heading');
};

// prettier-ignore
export function getHTMLElementAndThrowIfUndefined<K extends HTMLTagName>(element: HTMLElementOrShadowRoot, selector: K): HTMLElementTagNameMap[K] | null;
// prettier-ignore
export function getHTMLElementAndThrowIfUndefined<E extends Element = Element>(element: HTMLElementOrShadowRoot, selector: string): E | null;
export function getHTMLElementAndThrowIfUndefined(element: HTMLElementOrShadowRoot, selector: string): any {
  const el = getHTMLElement(element, selector);
  if (!el) {
    throw new Error(`Child HTMLElement ${selector} is missing.`);
  }
  return el;
}

export const throwIfRootNodeIsNotOfKind = (element: HTMLElement, tagName: TagNameCamelCase): void => {
  const shadowHost = (element.getRootNode() as ShadowRoot)?.host as HTMLElement;
  const actualTagName = shadowHost && getTagName(shadowHost);
  const allowedTagName = getPrefixedTagNames(element)[tagName];

  if (actualTagName !== allowedTagName) {
    throw new Error(`${getTagName(element)} can't be used like this`);
  }
};

export const isParentOfKind = (element: HTMLElement, tagName: TagNameCamelCase): boolean => {
  return element.parentElement && getTagName(element.parentElement) === getPrefixedTagNames(element)[tagName];
};

export const throwIfParentIsNotOfKind = (element: HTMLElement, tagName: TagNameCamelCase): void => {
  if (element.parentElement && !isParentOfKind(element, tagName)) {
    const allowedTagName = getPrefixedTagNames(element)[tagName];
    const actualTagName = getTagName(element.parentElement);
    throw new Error(
      `Parent HTMLElement of ${getTagName(element)} should be of kind ${allowedTagName} but got ${actualTagName}`
    );
  }
};

export const throwIfParentIsNotOneOfKind = (element: HTMLElement, tagNames: TagNameCamelCase[]): void => {
  if (!tagNames.some((tagName) => isParentOfKind(element, tagName))) {
    const prefixedTagNames = getPrefixedTagNames(element);
    const allowedTagNames = tagNames.map((tagName) => prefixedTagNames[tagName]).join(', ');
    const actualTagName = getTagName(element.parentElement);

    throw new Error(
      `Parent HTMLElement of ${getTagName(element)} should be one of kind ${allowedTagNames} but got ${actualTagName}`
    );
  }
};

export const isDisabledOrLoading = (disabled: boolean, loading: boolean): boolean => {
  return disabled || loading;
};

export const isParentFieldsetWrapperRequired = (element: HTMLElement): boolean => {
  return (
    element.parentElement &&
    isRequired(element.parentElement as HTMLElementWithRequiredProp) &&
    isParentOfKind(element, 'pFieldsetWrapper')
  );
};

export const isRequiredAndParentNotRequired = (element: HTMLElement, child: HTMLElementWithRequiredProp): boolean => {
  return isRequired(child) && !isParentFieldsetWrapperRequired(element);
};

export const throwIfElementHasAttribute = (el: HTMLElement, name: string): void => {
  if (hasAttribute(el, name)) {
    throw new Error(`Attribute '${name}' with the value '${getAttribute(el, name)}' needs to be set as property`);
  }
};
