import { convertLineHeight } from '@porsche-design-system/utilities';

export const calcLineHeightForElement = (tag: HTMLElement): number => {
  const { fontSize } = window.getComputedStyle(tag);
  // fontSize is "" when element does no longer exist and would throw an exception in convertLineHeight
  return fontSize && convertLineHeight(fontSize);
};
