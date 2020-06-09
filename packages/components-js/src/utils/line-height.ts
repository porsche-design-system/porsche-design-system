import { convertLineHeight } from '@porsche-design-system/utilities';

export const calcLineHeightForElement = (tag: HTMLElement): number => convertLineHeight(window.getComputedStyle(tag).fontSize);
