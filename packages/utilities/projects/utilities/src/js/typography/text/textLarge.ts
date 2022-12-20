import { fontFamily, fontHyphenation, fontLineHeight, fontSize, fontStyle, fontVariant, fontWeight } from '../../font';

export const textLarge = {
  font: `${fontStyle.normal} ${fontVariant} ${fontWeight.regular} ${fontSize.fluid.textLarge}/${fontLineHeight} ${fontFamily}`,
  ...fontHyphenation,
};
