import { fontWeightBold, fontWeightRegular, fontWeightSemiBold } from '@porsche-design-system/emotion';
import type { TypographyTextWeight } from '../types';

const fontWeightMap: Record<TypographyTextWeight, number> = {
  regular: fontWeightRegular,
  'semi-bold': fontWeightSemiBold,
  bold: fontWeightBold,
};

export const getFontWeight = (weight: TypographyTextWeight): number => {
  return fontWeightMap[weight];
};
