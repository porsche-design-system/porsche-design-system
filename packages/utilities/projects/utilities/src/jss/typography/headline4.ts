import { fontBehavior, fontFamily, fontSize, fontStyle, fontVariant, fontWeight } from '../font/font';
import { mediaQueryMin, mediaQueryMinMax } from '../media-query';

const { small, medium } = fontSize;

export const headline4 = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.semibold} ${small.fontSize}/${small.lineHeight} ${fontFamily}`,
  ...fontBehavior,
  [mediaQueryMinMax('s', 'm')]: {
    fontSize: '1.125rem',
    lineHeight: 1.5555555556,
  },
  [mediaQueryMinMax('m', 'l')]: {
    fontSize: '1.25rem',
    lineHeight: 1.4,
  },
  [mediaQueryMinMax('l', 'xl')]: {
    fontSize: '1.375rem',
    lineHeight: 1.4545454545,
  },
  [mediaQueryMin('xl')]: medium,
};
