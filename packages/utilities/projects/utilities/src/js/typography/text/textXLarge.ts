import { fontFamily, fontHyphenation, fontLineHeight, fontSize, fontStyle, fontVariant, fontWeight } from '../../font';

export const textXLarge = {
  font: `${fontStyle.normal} ${fontVariant} ${fontWeight.regular} ${fontSize.fluid.textXLarge}/${fontLineHeight} ${fontFamily}`,
  ...fontHyphenation,
};
