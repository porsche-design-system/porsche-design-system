import { fontBehavior, fontFamily, fontStyle, fontVariant, fontWeight } from '../font/font';
import { mediaQueryMin, mediaQueryMinMax } from '../media-query';

export const headline2 = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.semibold} 1.5rem/1.5 ${fontFamily}`,
  ...fontBehavior,
  [mediaQueryMinMax('s', 'm')]: {
    fontSize: '1.875rem',
    lineHeight: 1.3333333333,
  },
  [mediaQueryMinMax('m', 'l')]: {
    fontSize: '2.25rem',
    lineHeight: 1.3333333333,
  },
  [mediaQueryMinMax('l', 'xl')]: {
    fontSize: '2.625rem',
    lineHeight: 1.2380952381,
  },
  [mediaQueryMin('xl')]: {
    fontSize: '3rem',
    lineHeight: 1.25,
  },
};
