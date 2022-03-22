import { fontBehavior, fontFamily, fontSize, fontStyle, fontVariant, fontWeight } from '../font/font';

export const textLarge = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.regular} ${fontSize.large.fontSize}/${fontSize.large.lineHeight} ${fontFamily}`,
  ...fontBehavior,
};
