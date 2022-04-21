import type { BreakpointCustomizable } from '../../../../utils';
import { calcLineHeightForElement, transitionListener } from '../../../../utils';
import { textLarge, textMedium, textSmall, textXLarge, textXSmall } from '@porsche-design-system/utilities-v2';

export const TEXT_SIZES = ['x-small', 'small', 'medium', 'large', 'x-large', 'inherit'] as const;

export type TextSize = typeof TEXT_SIZES[number];

export const isSizeInherit = (size: BreakpointCustomizable<TextSize>): boolean => {
  return JSON.stringify(size).includes('inherit');
};

export const setLineHeightOnSizeInherit = (size: BreakpointCustomizable<TextSize>, elementTag: HTMLElement): void => {
  if (isSizeInherit(size)) {
    transitionListener(elementTag, 'font-size', () => {
      elementTag.style.lineHeight = `${calcLineHeightForElement(elementTag)}`;
    });
  }
};

export const textMap: { [key in Exclude<TextSize, 'inherit'>]: any } = {
  'x-small': textXSmall,
  small: textSmall,
  medium: textMedium,
  large: textLarge,
  'x-large': textXLarge,
};
