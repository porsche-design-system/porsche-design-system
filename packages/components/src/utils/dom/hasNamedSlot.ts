import { getHTMLElement } from './dom-base-selectors';
import type { HTMLElementOrShadowRoot } from './dom-base-selectors';

export const hasNamedSlot = (el: HTMLElementOrShadowRoot, slotName: string): boolean =>
  !!getHTMLElement(el, `[slot="${slotName}"]`);
