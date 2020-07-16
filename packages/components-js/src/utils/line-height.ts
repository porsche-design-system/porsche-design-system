import { calculateLineHeight } from '@porsche-design-system/utilities';

export const calcLineHeightForElement = (tag: HTMLElement): number => {
  const { fontSize } = window.getComputedStyle(tag);
  // fontSize is "" when element does no longer exist and would throw an exception in calculateLineHeight
  return fontSize && calculateLineHeight(fontSize);
};
