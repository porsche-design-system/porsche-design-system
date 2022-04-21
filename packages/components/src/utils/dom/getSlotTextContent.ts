import type { HTMLElementOrShadowRoot } from './dom-types';
import { getHTMLElement } from './getHTMLElement';

export const getSlotTextContent = (el: HTMLElementOrShadowRoot, slotName: string): string =>
  getHTMLElement(el, `[slot="${slotName}"]`)?.textContent;
