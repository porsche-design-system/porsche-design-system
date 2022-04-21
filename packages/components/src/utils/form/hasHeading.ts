import type { HTMLElementOrShadowRoot } from '../dom';
import { hasNamedSlot } from '../dom';

export const hasHeading = (element: HTMLElementOrShadowRoot, heading: string): boolean => {
  return !!heading || hasNamedSlot(element, 'heading');
};
