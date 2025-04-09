import { throwException } from '../log';
import { getTagName } from '../tag-name';

export const throwIfElementHasNoSlotAttribute = (el: HTMLElement, slot: string): void => {
  if (!el.matches(`[slot="${slot}"]`)) {
    throwException(`${getTagName(el)} needs slot="${slot}" to be set as attribute.`);
  }
};
