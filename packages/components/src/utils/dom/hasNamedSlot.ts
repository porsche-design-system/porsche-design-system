import type { HTMLElementOrShadowRoot } from './dom-types';
import { getNamedSlot } from '../getNamedSlot';

export const hasNamedSlot = (el: HTMLElementOrShadowRoot, slotName: string): boolean => !!getNamedSlot(el, slotName);
