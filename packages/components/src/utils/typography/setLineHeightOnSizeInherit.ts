import type { TextSize } from '../../types';
import type { BreakpointCustomizable } from '../breakpoint-customizable';
import { transitionListener } from '../transition-listener';
import { calcLineHeightForElement } from '../line-height';
import { isSizeInherit } from './isSizeInherit';

export const setLineHeightOnSizeInherit = (size: BreakpointCustomizable<TextSize>, elementTag: HTMLElement): void => {
  if (isSizeInherit(size)) {
    transitionListener(elementTag, 'font-size', () => {
      elementTag.style.lineHeight = `${calcLineHeightForElement(elementTag)}`;
    });
  }
};
