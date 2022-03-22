import { fontBehavior, fontFamily, fontSize, fontStyle, fontVariant, fontWeight } from '../font/font';
import { mediaQueryMin, mediaQueryMinMax } from '../media-query';

export const titleLarge = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.semibold} 2rem/1.375 ${fontFamily}`,
  ...fontBehavior,
  [mediaQueryMinMax('s', 'm')]: {
    fontSize: '2.625rem',
    lineHeight: 1.2380952381,
  },
  [mediaQueryMinMax('m', 'l')]: fontSize.xLarge,
  [mediaQueryMinMax('l', 'xl')]: {
    fontSize: '3.875rem',
    lineHeight: 1.2258064516,
  },
  [mediaQueryMin('xl')]: {
    fontSize: '4.5rem',
    lineHeight: 1.2222222222,
  },
};
