import { fontBehavior, fontFamily, fontSize, fontStyle, fontVariant, fontWeight } from '../font/font';
import { mediaQueryMin, mediaQueryMinMax } from '../media-query';

const { large, xLarge } = fontSize;

export const headline1 = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.semibold} 1.75rem/1.4285714286 ${fontFamily}`,
  ...fontBehavior,
  [mediaQueryMinMax('s', 'm')]: large,
  [mediaQueryMinMax('m', 'l')]: {
    fontSize: '2.75rem',
    lineHeight: 1.1818181818,
  },
  [mediaQueryMinMax('l', 'xl')]: xLarge,
  [mediaQueryMin('xl')]: {
    fontSize: '3.75rem',
    lineHeight: 1.2,
  },
};
