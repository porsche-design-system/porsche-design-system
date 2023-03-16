import { getHTMLElement } from './dom';
import type { HTMLElementOrShadowRoot } from './dom';

export const getNamedSlot = (el: HTMLElementOrShadowRoot, slotName: string): HTMLSlotElement =>
  getHTMLElement(el, `[slot="${slotName}"]`);
