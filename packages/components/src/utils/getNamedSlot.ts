import { getHTMLElement, type HTMLElementOrShadowRoot } from './dom';

export const getNamedSlot = (el: HTMLElementOrShadowRoot, slotName: string): HTMLElement =>
  getHTMLElement(el, `:scope>[slot="${slotName}"]`);
