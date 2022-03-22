import { fontBehavior, fontFamily, fontSize, fontStyle, fontVariant, fontWeight } from '../font/font';

export const textXLarge = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.regular} ${fontSize.xLarge.fontSize}/${fontSize.xLarge.lineHeight} ${fontFamily}`,
  ...fontBehavior,
};
