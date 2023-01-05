import type { TextSize } from '../../types';
import { textLarge, textMedium, textSmall, textXLarge, textXSmall } from '@porsche-design-system/utilities-v2';

export const textMap: { [key in Exclude<TextSize, 'inherit'>]: any } = {
  'x-small': textXSmall,
  small: textSmall,
  medium: textMedium,
  large: textLarge,
  'x-large': textXLarge,
};
