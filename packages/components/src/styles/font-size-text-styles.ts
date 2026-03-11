import type { TextSize } from '../types';
import { typescale2Xs, typescaleLg, typescaleMd, typescaleSm, typescaleXl, typescaleXs } from './css-variables';

const fontSizeTextMap: { [textSize in TextSize]: string } = {
  'xx-small': typescale2Xs,
  'x-small': typescaleXs,
  small: typescaleSm,
  medium: typescaleMd,
  large: typescaleLg,
  'x-large': typescaleXl,
  inherit: 'inherit',
};

export const getFontSizeText = (size: TextSize): string => {
  return fontSizeTextMap[size];
};
