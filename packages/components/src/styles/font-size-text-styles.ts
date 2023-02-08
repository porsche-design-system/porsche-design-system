import type { TextSize } from '../types';
import {
  fontSizeTextXSmall,
  fontSizeTextSmall,
  fontSizeTextMedium,
  fontSizeTextLarge,
  fontSizeTextXLarge,
} from '@porsche-design-system/utilities-v2';

const fontSizeTextMap: { [textSize in TextSize]: string } = {
  'x-small': fontSizeTextXSmall,
  small: fontSizeTextSmall,
  medium: fontSizeTextMedium,
  large: fontSizeTextLarge,
  'x-large': fontSizeTextXLarge,
  inherit: 'inherit',
};

export const getFontSizeText = (size: TextSize): string => {
  return fontSizeTextMap[size];
};
