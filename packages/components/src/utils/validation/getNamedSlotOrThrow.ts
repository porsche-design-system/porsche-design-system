import { getTagNameWithoutPrefix } from '../tag-name';
import { getNamedSlot } from '../getNamedSlot';
import { throwException } from '../log';

export const getNamedSlotOrThrow = (el: HTMLElement, slotName: string): HTMLElement | void => {
  return (
    getNamedSlot(el, slotName) ||
    throwException(`named slot '${slotName}' is missing for component ${getTagNameWithoutPrefix(el)}.`)
  );
};
