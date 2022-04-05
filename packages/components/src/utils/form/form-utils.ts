import type { HTMLElementOrShadowRoot } from '../dom';
import { hasNamedSlot, isParentOfKind } from '../dom';
import type { FormState } from '../../types';

export type HTMLElementWithRequiredProp = HTMLElement & { required: boolean };

export const isRequired = (el: HTMLElementWithRequiredProp): boolean => !!el.required;

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
