import { fontFamily, fontWeight } from './font';
import { mediaQueryMin, mediaQueryMinMax } from './media-query';

export const titleLarge = {
  fontFamily,
  fontWeight: fontWeight.semibold,
  fontSize: '2rem',
  lineHeight: 1.375,
  [mediaQueryMinMax('s', 'm')]: {
    fontSize: '2.625rem',
    lineHeight: 1.2380952381
  },
  [mediaQueryMinMax('m', 'l')]: {
    fontSize: '3.25rem',
    lineHeight: 1.2307692308
  },
  [mediaQueryMinMax('l', 'xl')]: {
    fontSize: '3.875rem',
    lineHeight: 1.2258064516
  },
  [mediaQueryMin('xl')]: {
    fontSize: '4.5rem',
    lineHeight: 1.2222222222
  }
};

export const title = {
  large: titleLarge
};

export const headline1 = {
  fontFamily,
  fontWeight: fontWeight.semibold,
  fontSize: '1.75rem',
  lineHeight: 1.4285714286,
  [mediaQueryMinMax('s', 'm')]: {
    fontSize: '2.25rem',
    lineHeight: 1.3333333333
  },
  [mediaQueryMinMax('m', 'l')]: {
    fontSize: '2.75rem',
    lineHeight: 1.1818181818
  },
  [mediaQueryMinMax('l', 'xl')]: {
    fontSize: '3.25rem',
    lineHeight: 1.2307692308
  },
  [mediaQueryMin('xl')]: {
    fontSize: '3.75rem',
    lineHeight: 1.2
  }
};

export const headline2 = {
  fontFamily,
  fontWeight: fontWeight.semibold,
  fontSize: '1.5rem',
  lineHeight: 1.5,
  [mediaQueryMinMax('s', 'm')]: {
    fontSize: '1.875rem',
    lineHeight: 1.3333333333
  },
  [mediaQueryMinMax('m', 'l')]: {
    fontSize: '2.25rem',
    lineHeight: 1.3333333333
  },
  [mediaQueryMinMax('l', 'xl')]: {
    fontSize: '2.625rem',
    lineHeight: 1.2380952381
  },
  [mediaQueryMin('xl')]: {
    fontSize: '3rem',
    lineHeight: 1.25
  }
};

export const headline3 = {
  fontFamily,
  fontWeight: fontWeight.semibold,
  fontSize: '1.25rem',
  lineHeight: 1.4,
  [mediaQueryMinMax('s', 'm')]: {
    fontSize: '1.5rem',
    lineHeight: 1.5
  },
  [mediaQueryMinMax('m', 'l')]: {
    fontSize: '1.75rem',
    lineHeight: 1.4285714286
  },
  [mediaQueryMinMax('l', 'xl')]: {
    fontSize: '2rem',
    lineHeight: 1.375
  },
  [mediaQueryMin('xl')]: {
    fontSize: '2.25rem',
    lineHeight: 1.3333333333
  }
};

export const headline4 = {
  fontFamily,
  fontWeight: fontWeight.semibold,
  fontSize: '1rem',
  lineHeight: 1.5,
  [mediaQueryMinMax('s', 'm')]: {
    fontSize: '1.125rem',
    lineHeight: 1.5555555556
  },
  [mediaQueryMinMax('m', 'l')]: {
    fontSize: '1.25rem',
    lineHeight: 1.4
  },
  [mediaQueryMinMax('l', 'xl')]: {
    fontSize: '1.375rem',
    lineHeight: 1.4545454545
  },
  [mediaQueryMin('xl')]: {
    fontSize: '1.5rem',
    lineHeight: 1.5
  }
};

export const headline5 = {
  fontFamily,
  fontWeight: fontWeight.semibold,
  fontSize: '1rem',
  lineHeight: 1.5
};

export const headline = {
  1: headline1,
  2: headline2,
  3: headline3,
  4: headline4,
  5: headline5
};

export const textXSmall = {
  fontFamily,
  fontWeight: fontWeight.regular,
  fontSize: '0.75rem',
  lineHeight: 1.6666666667
};

export const textSmall = {
  fontFamily,
  fontWeight: fontWeight.regular,
  fontSize: '1rem',
  lineHeight: 1.5
};

export const textMedium = {
  fontFamily,
  fontWeight: fontWeight.regular,
  fontSize: '1.5rem',
  lineHeight: 1.5
};

export const textLarge = {
  fontFamily,
  fontWeight: fontWeight.regular,
  fontSize: '2.25rem',
  lineHeight: 1.3333333333
};

export const textXLarge = {
  fontFamily,
  fontWeight: fontWeight.regular,
  fontSize: '3.25rem',
  lineHeight: 1.2307692308
};

export const text = {
  xSmall: textXSmall,
  small: textSmall,
  medium: textMedium,
  large: textLarge,
  xLarge: textXLarge
};