import {
  borderRadiusLarge,
  motionDurationLong,
  motionDurationModerate,
  motionDurationShort,
  motionDurationVeryLong,
  motionEasingBase,
  motionEasingIn,
  motionEasingOut,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingStaticMedium,
  textSmallStyle,
} from '@porsche-design-system/vanilla-extract';
import { style } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const vanillaExtractMotionWrapper = style({
  display: 'grid',
  gap: spacingFluidMedium,
  padding: spacingStaticMedium,
  color: vars.primary,
  ...textSmallStyle,
});

const baseItemStyle = {
  borderRadius: borderRadiusLarge,
  background: vars.surface,
  padding: spacingFluidSmall,
  transitionProperty: 'transform',
  willChange: 'transform',
  cursor: 'pointer',
};

export const vanillaExtractMotionShort = style([
  baseItemStyle,
  {
    transitionDuration: motionDurationShort,
    transitionTimingFunction: motionEasingBase,
    selectors: {
      '&:hover': { transform: 'scale(1.2)' },
    },
  },
]);

export const vanillaExtractMotionModerate = style([
  baseItemStyle,
  {
    transitionDuration: motionDurationModerate,
    transitionTimingFunction: motionEasingBase,
    selectors: {
      '&:hover': { transform: 'scale(1.2)' },
    },
  },
]);

export const vanillaExtractMotionLong = style([
  baseItemStyle,
  {
    transitionDuration: motionDurationLong,
    transitionTimingFunction: motionEasingBase,
    selectors: {
      '&:hover': { transform: 'scale(1.2)' },
    },
  },
]);

export const vanillaExtractMotionVeryLong = style([
  baseItemStyle,
  {
    transitionDuration: motionDurationVeryLong,
    transitionTimingFunction: motionEasingBase,
    selectors: {
      '&:hover': { transform: 'scale(1.2)' },
    },
  },
]);

export const vanillaExtractMotionEaseInOut = style([
  baseItemStyle,
  {
    transitionDuration: motionDurationVeryLong,
    transitionTimingFunction: motionEasingBase,
    selectors: {
      '&:hover': { transform: 'scale(1.2)' },
    },
  },
]);

export const vanillaExtractMotionEaseIn = style([
  baseItemStyle,
  {
    transitionDuration: motionDurationVeryLong,
    transitionTimingFunction: motionEasingIn,
    selectors: {
      '&:hover': { transform: 'scale(1.2)' },
    },
  },
]);

export const vanillaExtractMotionEaseOut = style([
  baseItemStyle,
  {
    transitionDuration: motionDurationVeryLong,
    transitionTimingFunction: motionEasingOut,
    selectors: {
      '&:hover': { transform: 'scale(1.2)' },
    },
  },
]);
