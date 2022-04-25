import type { TextSize } from '../../types';
import type { JssStyle } from 'jss';
import { textLarge, textMedium, textSmall, textXLarge, textXSmall } from '@porsche-design-system/utilities-v2';

export const textMap: { [key in Exclude<TextSize, 'inherit'>]: JssStyle } = {
  'x-small': textXSmall,
  small: textSmall,
  medium: textMedium,
  large: textLarge,
  'x-large': textXLarge,
};
