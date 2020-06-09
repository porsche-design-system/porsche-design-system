import { convertLineHeight } from '@porsche-design-system/utilities/src/js/helper';

export const calcLineHeightForElement = (tag: HTMLElement): number => {
  return convertLineHeight(window.getComputedStyle(tag).fontSize);
};
