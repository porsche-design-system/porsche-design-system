import type { TextSize } from '../../types';
import {
  textLargeStyle,
  textMediumStyle,
  textSmallStyle,
  textXLargeStyle,
  textXSmallStyle,
} from '@porsche-design-system/utilities-v2';

export const textMap: { [key in Exclude<TextSize, 'inherit'>]: any } = {
  'x-small': textXSmallStyle,
  small: textSmallStyle,
  medium: textMediumStyle,
  large: textLargeStyle,
  'x-large': textXLargeStyle,
};
