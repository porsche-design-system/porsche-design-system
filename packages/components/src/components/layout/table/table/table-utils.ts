import { getTagName, hasNamedSlot } from '../../../../utils';

export const warnIfCaptionIsUndefined = (host: HTMLElement, caption: string): void => {
  if (!caption && !hasNamedSlot(host, 'caption')) {
    console.warn(
      `Property "caption" of ${getTagName(
        host
      )} needs to be provided to fulfill accessibility requirements, either as prop or named slot.`
    );
  }
};
