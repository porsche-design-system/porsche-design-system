import type { HTMLElementOrShadowRoot } from '../dom';
import { hasNamedSlot } from '../dom';

export const hasDescription = (element: HTMLElementOrShadowRoot, description: string): boolean => {
  return !!description || hasNamedSlot(element, 'description');
};
