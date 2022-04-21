import { getHTMLElement } from './getHTMLElement';
import type { HTMLElementOrShadowRoot } from './dom-types';

export const hasNamedSlot = (el: HTMLElementOrShadowRoot, slotName: string): boolean =>
  !!getHTMLElement(el, `[slot="${slotName}"]`);
