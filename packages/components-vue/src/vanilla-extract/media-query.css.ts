import {
  breakpointBase,
  breakpointL,
  breakpointM,
  breakpointS,
  breakpointXL,
  breakpointXS,
  breakpointXXL,
  getMediaQueryMax,
  getMediaQueryMin,
  getMediaQueryMinMax,
  gridGap,
  headingMediumStyle,
  spacingFluidMedium,
  textSmallStyle,
  themeLightPrimary,
} from '@porsche-design-system/components-vue/vanilla-extract';
import { style } from '@vanilla-extract/css';

export const Wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: gridGap,
  padding: spacingFluidMedium,
});

const getTypographyStyle = {
  ...textSmallStyle,
  color: themeLightPrimary,
  margin: 0,
};

export const Heading = style({
  ...headingMediumStyle,
  color: themeLightPrimary,
  margin: 0,
});

export const MediaQueryMin = style({
  ...getTypographyStyle,
  '@media': {
    [getMediaQueryMin('base')]: {
      selectors: {
        '&::after': {
          content: '" Base"',
        },
      },
    },
    [getMediaQueryMin('xs')]: {
      selectors: {
        '&::after': {
          content: '" XS"',
        },
      },
    },
    [getMediaQueryMin('s')]: {
      selectors: {
        '&::after': {
          content: '" S"',
        },
      },
    },
    [getMediaQueryMin('m')]: {
      selectors: {
        '&::after': {
          content: '" M"',
        },
      },
    },
    [getMediaQueryMin('l')]: {
      selectors: {
        '&::after': {
          content: '" L"',
        },
      },
    },
    [getMediaQueryMin('xl')]: {
      selectors: {
        '&::after': {
          content: '" XL"',
        },
      },
    },
    [getMediaQueryMin('xxl')]: {
      selectors: {
        '&::after': {
          content: '" XXL"',
        },
      },
    },
  },
});

export const MediaQueryMax = style({
  ...getTypographyStyle,
  '@media': {
    [getMediaQueryMax('xxl')]: {
      selectors: {
        '&::after': {
          content: '" XXL"',
        },
      },
    },
    [getMediaQueryMax('xl')]: {
      selectors: {
        '&::after': {
          content: '" XL"',
        },
      },
    },
    [getMediaQueryMax('l')]: {
      selectors: {
        '&::after': {
          content: '" L"',
        },
      },
    },
    [getMediaQueryMax('m')]: {
      selectors: {
        '&::after': {
          content: '" M"',
        },
      },
    },
    [getMediaQueryMax('s')]: {
      selectors: {
        '&::after': {
          content: '" S"',
        },
      },
    },
    [getMediaQueryMax('xs')]: {
      selectors: {
        '&::after': {
          content: '" XS"',
        },
      },
    },
  },
});

export const MediaQueryMinMax = style({
  ...getTypographyStyle,
  '@media': {
    [getMediaQueryMinMax('base', 'xs')]: {
      selectors: {
        '&::after': {
          content: '" Base - XS"',
        },
      },
    },
    [getMediaQueryMinMax('xs', 's')]: {
      selectors: {
        '&::after': {
          content: '" XS - S"',
        },
      },
    },
    [getMediaQueryMinMax('s', 'm')]: {
      selectors: {
        '&::after': {
          content: '" S - M"',
        },
      },
    },
    [getMediaQueryMinMax('m', 'l')]: {
      selectors: {
        '&::after': {
          content: '" M - L"',
        },
      },
    },
    [getMediaQueryMinMax('l', 'xl')]: {
      selectors: {
        '&::after': {
          content: '" L - XL"',
        },
      },
    },
    [getMediaQueryMinMax('xl', 'xxl')]: {
      selectors: {
        '&::after': {
          content: '" XL - XXL"',
        },
      },
    },
  },
});

export const BreakpointBase = style({
  ...getTypographyStyle,
  selectors: {
    '&::after': {
      content: `" ${breakpointBase}px"`,
    },
  },
});

export const BreakpointXS = style({
  ...getTypographyStyle,
  selectors: {
    '&::after': {
      content: `" ${breakpointXS}px"`,
    },
  },
});

export const BreakpointS = style({
  ...getTypographyStyle,
  selectors: {
    '&::after': {
      content: `" ${breakpointS}px"`,
    },
  },
});

export const BreakpointM = style({
  ...getTypographyStyle,
  selectors: {
    '&::after': {
      content: `" ${breakpointM}px"`,
    },
  },
});

export const BreakpointL = style({
  ...getTypographyStyle,
  selectors: {
    '&::after': {
      content: `" ${breakpointL}px"`,
    },
  },
});

export const BreakpointXL = style({
  ...getTypographyStyle,
  selectors: {
    '&::after': {
      content: `" ${breakpointXL}px"`,
    },
  },
});

export const BreakpointXXL = style({
  ...getTypographyStyle,
  selectors: {
    '&::after': {
      content: `" ${breakpointXXL}px"`,
    },
  },
});
