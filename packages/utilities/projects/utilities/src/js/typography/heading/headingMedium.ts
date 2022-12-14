import { fontBehavior, fontFamily, fontLineHeight, fontStyle, fontVariant, fontWeight } from '../../font';
import { mediaQueryMin, mediaQueryMinMax } from '../../mediaQuery';

export const headingMedium = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.semiBold} 1.25rem/${fontLineHeight} ${fontFamily}`,
  ...fontBehavior,
  [mediaQueryMinMax('s', 'm')]: {
    fontSize: '1.5rem',
  },
  [mediaQueryMinMax('m', 'l')]: {
    fontSize: '1.75rem',
  },
  [mediaQueryMinMax('l', 'xl')]: {
    fontSize: '2rem',
  },
  [mediaQueryMin('xl')]: {
    fontSize: '2.25rem',
  },
};
