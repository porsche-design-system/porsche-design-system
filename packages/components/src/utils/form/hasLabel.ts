import type { HTMLElementOrShadowRoot } from '../dom';
import { hasNamedSlot } from '../dom';

export const hasLabel = (element: HTMLElementOrShadowRoot, label: string): boolean => {
  return !!label || hasNamedSlot(element, 'label');
};
