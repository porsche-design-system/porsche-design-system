import {
  durationLg,
  durationMd,
  durationSm,
  durationXl,
  easeIn,
  easeInOut,
  easeOut,
  proseTextSmStyle,
  radiusLg,
  spacingFluidMd,
  spacingFluidSm,
  spacingStaticMd,
} from '@porsche-design-system/vanilla-extract';
import { style } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const vanillaExtractMotionWrapper = style({
  display: 'grid',
  gap: spacingFluidMd,
  padding: spacingStaticMd,
  color: vars.primary,
  ...proseTextSmStyle,
});

const baseItemStyle = {
  borderRadius: radiusLg,
  background: vars.surface,
  padding: spacingFluidSm,
  transitionProperty: 'transform',
  willChange: 'transform',
  cursor: 'pointer',
};

export const vanillaExtractMotionShort = style([
  baseItemStyle,
  {
    transitionDuration: durationSm,
    transitionTimingFunction: easeInOut,
    selectors: {
      '&:hover': { transform: 'scale(1.2)' },
    },
  },
]);

export const vanillaExtractMotionModerate = style([
  baseItemStyle,
  {
    transitionDuration: durationMd,
    transitionTimingFunction: easeInOut,
    selectors: {
      '&:hover': { transform: 'scale(1.2)' },
    },
  },
]);

export const vanillaExtractMotionLong = style([
  baseItemStyle,
  {
    transitionDuration: durationLg,
    transitionTimingFunction: easeInOut,
    selectors: {
      '&:hover': { transform: 'scale(1.2)' },
    },
  },
]);

export const vanillaExtractMotionVeryLong = style([
  baseItemStyle,
  {
    transitionDuration: durationXl,
    transitionTimingFunction: easeInOut,
    selectors: {
      '&:hover': { transform: 'scale(1.2)' },
    },
  },
]);

export const vanillaExtractMotionEaseInOut = style([
  baseItemStyle,
  {
    transitionDuration: durationXl,
    transitionTimingFunction: easeOut,
    selectors: {
      '&:hover': { transform: 'scale(1.2)' },
    },
  },
]);

export const vanillaExtractMotionEaseIn = style([
  baseItemStyle,
  {
    transitionDuration: durationXl,
    transitionTimingFunction: easeIn,
    selectors: {
      '&:hover': { transform: 'scale(1.2)' },
    },
  },
]);

export const vanillaExtractMotionEaseOut = style([
  baseItemStyle,
  {
    transitionDuration: durationXl,
    transitionTimingFunction: easeOut,
    selectors: {
      '&:hover': { transform: 'scale(1.2)' },
    },
  },
]);
