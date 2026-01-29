import {
  getMediaQueryMax,
  getMediaQueryMin,
  getMediaQueryMinMax,
  spacingStaticMedium,
  textSmallStyle,
} from '@porsche-design-system/vanilla-extract';
import { style } from '@vanilla-extract/css';
import { vars } from './theme.css.ts';

export const VanillaExtractWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  padding: spacingStaticMedium,
});

const getTypographyStyle = {
  ...textSmallStyle,
  color: vars.primary,
  margin: 0,
};

export const VanillaExtractMediaQueryMin = style({
  ...getTypographyStyle,
  '@media': {
    [getMediaQueryMin('xs')]: {
      selectors: {
        '&::after': {
          content: '" xs"',
        },
      },
    },
    [getMediaQueryMin('s')]: {
      selectors: {
        '&::after': {
          content: '" sm"',
        },
      },
    },
    [getMediaQueryMin('m')]: {
      selectors: {
        '&::after': {
          content: '" md"',
        },
      },
    },
    [getMediaQueryMin('l')]: {
      selectors: {
        '&::after': {
          content: '" lg"',
        },
      },
    },
    [getMediaQueryMin('xl')]: {
      selectors: {
        '&::after': {
          content: '" xl"',
        },
      },
    },
    [getMediaQueryMin('xxl')]: {
      selectors: {
        '&::after': {
          content: '" 2xl"',
        },
      },
    },
  },
});

export const VanillaExtractMediaQueryMax = style({
  ...getTypographyStyle,
  '@media': {
    [getMediaQueryMax('xxl')]: {
      selectors: {
        '&::after': {
          content: '" 2xl"',
        },
      },
    },
    [getMediaQueryMax('xl')]: {
      selectors: {
        '&::after': {
          content: '" xl"',
        },
      },
    },
    [getMediaQueryMax('l')]: {
      selectors: {
        '&::after': {
          content: '" lg"',
        },
      },
    },
    [getMediaQueryMax('m')]: {
      selectors: {
        '&::after': {
          content: '" md"',
        },
      },
    },
    [getMediaQueryMax('s')]: {
      selectors: {
        '&::after': {
          content: '" sm"',
        },
      },
    },
    [getMediaQueryMax('xs')]: {
      selectors: {
        '&::after': {
          content: '" xs"',
        },
      },
    },
  },
});

export const VanillaExtractMediaQueryMinMax = style({
  ...getTypographyStyle,
  '@media': {
    [getMediaQueryMinMax('xs', 's')]: {
      selectors: {
        '&::after': {
          content: '" xs - sm"',
        },
      },
    },
    [getMediaQueryMinMax('s', 'm')]: {
      selectors: {
        '&::after': {
          content: '" sm - md"',
        },
      },
    },
    [getMediaQueryMinMax('m', 'l')]: {
      selectors: {
        '&::after': {
          content: '" md - lg"',
        },
      },
    },
    [getMediaQueryMinMax('l', 'xl')]: {
      selectors: {
        '&::after': {
          content: '" lg - xl"',
        },
      },
    },
    [getMediaQueryMinMax('xl', 'xxl')]: {
      selectors: {
        '&::after': {
          content: '" xl - 2xl"',
        },
      },
    },
  },
});
