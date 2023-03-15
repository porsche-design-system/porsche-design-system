import { getTagName } from '../tag-name';
import { getNamedSlot } from '../getNamedSlot';

// Refactor to getNamedSlot
export const getNamedSlotOrThrow = (el: HTMLElement, slotName: string): HTMLElement => {
  const slot = getNamedSlot(el, slotName);

  if (!slot) {
    throw new Error(`Named slot '${slotName}' is missing on element ${getTagName(el)}`);
  }

  return slot as HTMLElement;
};
