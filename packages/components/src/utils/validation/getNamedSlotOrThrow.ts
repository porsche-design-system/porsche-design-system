import { getHTMLElement } from '../dom';
import { getTagName } from '../tag-name';

export const getNamedSlotOrThrow = (el: HTMLElement, slotName: string): HTMLElement => {
  const slot = getHTMLElement(el, `[slot="${slotName}"]`);

  if (!slot) {
    throw new Error(`Named slot '${slotName}' is missing on element ${getTagName(el)}`);
  }

  return slot as HTMLElement;
};
