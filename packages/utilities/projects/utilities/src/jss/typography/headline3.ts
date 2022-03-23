import { fontBehavior, fontFamily, fontStyle, fontVariant, fontWeight } from '../font/font';
import { mediaQueryMin, mediaQueryMinMax } from '../media-query';

export const headline3 = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.semibold} 1.25rem/1.4 ${fontFamily}`,
  ...fontBehavior,
  [mediaQueryMinMax('s', 'm')]: {
    fontSize: '1.5rem',
    lineHeight: 1.5,
  },
  [mediaQueryMinMax('m', 'l')]: {
    fontSize: '1.75rem',
    lineHeight: 1.4285714286,
  },
  [mediaQueryMinMax('l', 'xl')]: {
    fontSize: '2rem',
    lineHeight: 1.375,
  },
  [mediaQueryMin('xl')]: {
    fontSize: '2.25rem',
    lineHeight: 1.3333333333,
  },
};
