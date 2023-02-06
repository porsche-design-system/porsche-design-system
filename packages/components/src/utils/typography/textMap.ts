import type { TextSize } from '../../types';
import {
  fontSizeTextLarge,
  fontSizeTextMedium,
  fontSizeTextSmall,
  fontSizeTextXLarge,
  fontSizeTextXSmall,
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

export const textSizeMap: { [key in Exclude<TextSize, 'inherit'>]: any } = {
  'x-small': fontSizeTextXSmall,
  small: fontSizeTextSmall,
  medium: fontSizeTextMedium,
  large: fontSizeTextLarge,
  'x-large': fontSizeTextXLarge,
};
