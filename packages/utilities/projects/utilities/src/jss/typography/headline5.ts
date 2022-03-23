import { fontBehavior, fontFamily, fontStyle, fontVariant, fontWeight } from '../font/font';

export const headline5 = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.semibold} 1rem/1.5 ${fontFamily}`,
  ...fontBehavior,
};
