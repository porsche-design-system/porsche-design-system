import type { TextSize } from '../types';
import {
  fontSizeTextXSmall,
  fontSizeTextSmall,
  fontSizeTextMedium,
  fontSizeTextLarge,
  fontSizeTextXLarge,
  fontSizeTextXXSmall,
} from '@porsche-design-system/styles';

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
