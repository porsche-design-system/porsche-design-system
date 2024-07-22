import type { TypographyTextWeight, TypographyTextWeightDeprecated } from '../types';
import { fontWeightRegular, fontWeightSemiBold, fontWeightBold } from '@porsche-design-system/styles';

const fontWeightMap: Record<Exclude<TypographyTextWeight, TypographyTextWeightDeprecated>, number> = {
  regular: fontWeightRegular,
  'semi-bold': fontWeightSemiBold,
  bold: fontWeightBold,
};

export const getFontWeight = (weight: Exclude<TypographyTextWeight, TypographyTextWeightDeprecated>): number => {
  return fontWeightMap[weight];
};
