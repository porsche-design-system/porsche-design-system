import { fontBehavior, fontFamily, fontSize, fontStyle, fontVariant, fontWeight } from '../font/font';

export const textSmall = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.regular} ${fontSize.small.fontSize}/${fontSize.small.lineHeight} ${fontFamily}`,
  ...fontBehavior,
};
