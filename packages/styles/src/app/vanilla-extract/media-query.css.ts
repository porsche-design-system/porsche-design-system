import {
  getMediaQueryMax,
  getMediaQueryMin,
  getMediaQueryMinMax,
  proseTextSmStyle,
  spacingStaticMd,
} from '@porsche-design-system/vanilla-extract';
import { style } from '@vanilla-extract/css';
import { vars } from './theme.css.ts';

export const VanillaExtractWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  padding: spacingStaticMd,
});

const getTypographyStyle = {
  ...proseTextSmStyle,
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
    [getMediaQueryMin('sm')]: {
      selectors: {
        '&::after': {
          content: '" sm"',
        },
      },
    },
    [getMediaQueryMin('md')]: {
      selectors: {
        '&::after': {
          content: '" md"',
        },
      },
    },
    [getMediaQueryMin('lg')]: {
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
    [getMediaQueryMin('2xl')]: {
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
    [getMediaQueryMax('2xl')]: {
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
    [getMediaQueryMax('lg')]: {
      selectors: {
        '&::after': {
          content: '" lg"',
        },
      },
    },
    [getMediaQueryMax('md')]: {
      selectors: {
        '&::after': {
          content: '" md"',
        },
      },
    },
    [getMediaQueryMax('sm')]: {
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
    [getMediaQueryMinMax('xs', 'sm')]: {
      selectors: {
        '&::after': {
          content: '" xs - sm"',
        },
      },
    },
    [getMediaQueryMinMax('sm', 'md')]: {
      selectors: {
        '&::after': {
          content: '" sm - md"',
        },
      },
    },
    [getMediaQueryMinMax('md', 'lg')]: {
      selectors: {
        '&::after': {
          content: '" md - lg"',
        },
      },
    },
    [getMediaQueryMinMax('lg', 'xl')]: {
      selectors: {
        '&::after': {
          content: '" lg - xl"',
        },
      },
    },
    [getMediaQueryMinMax('xl', '2xl')]: {
      selectors: {
        '&::after': {
          content: '" xl - 2xl"',
        },
      },
    },
  },
});
