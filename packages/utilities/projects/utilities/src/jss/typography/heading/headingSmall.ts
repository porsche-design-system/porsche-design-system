import { fontBehavior, fontFamily, fontStyle, fontVariant, fontWeight } from '../../font';
import { mediaQueryMin, mediaQueryMinMax } from '../../mediaQuery';

export const headingSmall = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.semibold} 1rem/1.5 ${fontFamily}`,
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
  [mediaQueryMin('xl')]: {
    fontSize: '1.5rem',
    lineHeight: 1.5,
  },
};
