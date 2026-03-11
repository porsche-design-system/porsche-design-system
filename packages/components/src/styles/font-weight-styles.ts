import { fontWeightBold, fontWeightNormal, fontWeightSemibold } from '@porsche-design-system/tokens';
import type { TypographyTextWeight } from '../types';

const fontWeightMap: Record<TypographyTextWeight, number> = {
  regular: fontWeightNormal,
  'semi-bold': fontWeightSemibold,
  bold: fontWeightBold,
};

export const getFontWeight = (weight: TypographyTextWeight): number => {
  return fontWeightMap[weight];
};
