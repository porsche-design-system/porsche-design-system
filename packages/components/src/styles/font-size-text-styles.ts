import {
  fontSizeTextLarge,
  fontSizeTextMedium,
  fontSizeTextSmall,
  fontSizeTextXLarge,
  fontSizeTextXSmall,
  fontSizeTextXXSmall,
} from '@porsche-design-system/emotion';
import type { TextSize } from '../types';

const fontSizeTextMap: { [textSize in TextSize]: string } = {
  'xx-small': fontSizeTextXXSmall,
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
