import { getHTMLElement } from './dom/getHTMLElement';
import type { HTMLElementOrShadowRoot } from './dom/dom-types';

export const getNamedSlot = (el: HTMLElementOrShadowRoot, slotName: string): HTMLElement =>
  getHTMLElement(el, `:scope>[slot="${slotName}"]`);
