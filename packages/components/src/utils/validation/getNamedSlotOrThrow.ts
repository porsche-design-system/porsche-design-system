import { getTagName } from '../tag-name';
import { getNamedSlot } from '../getNamedSlot';

export const getNamedSlotOrThrow = (el: HTMLElement, slotName: string): HTMLSlotElement => {
  const slot = getNamedSlot(el, slotName);

  if (!slot) {
    throw new Error(`Named slot '${slotName}' is missing on element ${getTagName(el)}`);
  }

  return slot;
};
