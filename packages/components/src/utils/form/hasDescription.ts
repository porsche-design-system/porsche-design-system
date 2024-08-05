import { type HTMLElementOrShadowRoot, hasNamedSlot } from '../dom';

export const hasDescription = (element: HTMLElementOrShadowRoot, description: string): boolean => {
  return !!description || hasNamedSlot(element, 'description');
};
