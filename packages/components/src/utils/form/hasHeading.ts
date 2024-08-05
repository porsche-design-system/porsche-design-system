import { type HTMLElementOrShadowRoot, hasNamedSlot } from '../dom';

export const hasHeading = (element: HTMLElementOrShadowRoot, heading: string): boolean => {
  return !!heading || hasNamedSlot(element, 'heading');
};
