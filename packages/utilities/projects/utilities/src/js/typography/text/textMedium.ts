import { fontFamily, fontHyphenation, fontLineHeight, fontSize, fontStyle, fontVariant, fontWeight } from '../../font';

export const textMedium = {
  font: `${fontStyle.normal} ${fontVariant} ${fontWeight.regular} ${fontSize.fluid.textMedium}/${fontLineHeight} ${fontFamily}`,
  ...fontHyphenation,
};
