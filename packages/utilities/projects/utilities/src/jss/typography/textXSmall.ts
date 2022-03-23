import { fontBehavior, fontFamily, fontStyle, fontVariant, fontWeight } from '../font/font';

export const textXSmall = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.regular} 0.75rem/1.6666666667 ${fontFamily}`,
  ...fontBehavior,
};
