import { getNamedSlot } from '../getNamedSlot';
import { throwException } from '../log';
import { getTagNameWithoutPrefix } from '../tag-name';

export const getNamedSlotOrThrow = (el: HTMLElement, slotName: string): HTMLElement => {
  const slot = getNamedSlot(el, slotName);
  if (!slot) {
    throwException(`named slot='${slotName}' is missing for component ${getTagNameWithoutPrefix(el)}.`);
  }
  return slot;
};
