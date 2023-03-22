import { getHTMLElement } from './dom';
import type { HTMLElementOrShadowRoot } from './dom';

export const getNamedSlot = (el: HTMLElementOrShadowRoot, slotName: string): HTMLElement =>
  getHTMLElement(el, `[slot="${slotName}"]`);
