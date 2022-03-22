import { fontBehavior, fontFamily, fontSize, fontStyle, fontVariant, fontWeight } from '../font/font';
import { mediaQueryMin, mediaQueryMinMax } from '../media-query';

const { medium, large } = fontSize;

export const headline3 = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.semibold} 1.25rem/1.4 ${fontFamily}`,
  ...fontBehavior,
  [mediaQueryMinMax('s', 'm')]: medium,
  [mediaQueryMinMax('m', 'l')]: {
    fontSize: '1.75rem',
    lineHeight: 1.4285714286,
  },
  [mediaQueryMinMax('l', 'xl')]: {
    fontSize: '2rem',
    lineHeight: 1.375,
  },
  [mediaQueryMin('xl')]: large,
};
