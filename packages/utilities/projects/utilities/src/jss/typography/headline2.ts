import { fontBehavior, fontFamily, fontSize, fontStyle, fontVariant, fontWeight } from '../font/font';
import { mediaQueryMin, mediaQueryMinMax } from '../media-query';

const { medium, large } = fontSize;

export const headline2 = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.semibold} ${medium.fontSize}/${medium.lineHeight} ${fontFamily}`,
  ...fontBehavior,
  [mediaQueryMinMax('s', 'm')]: {
    fontSize: '1.875rem',
    lineHeight: 1.3333333333,
  },
  [mediaQueryMinMax('m', 'l')]: large,
  [mediaQueryMinMax('l', 'xl')]: {
    fontSize: '2.625rem',
    lineHeight: 1.2380952381,
  },
  [mediaQueryMin('xl')]: {
    fontSize: '3rem',
    lineHeight: 1.25,
  },
};
