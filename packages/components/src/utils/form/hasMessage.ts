import type { HTMLElementOrShadowRoot } from '../dom';
import { hasNamedSlot } from '../dom';
import type { FormState } from './form-state';

export const hasMessage = (element: HTMLElementOrShadowRoot, message: string, state: FormState): boolean => {
  return (message || hasNamedSlot(element, 'message')) && ['success', 'error'].includes(state);
};
