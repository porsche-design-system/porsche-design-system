import {
  borderRadiusLarge,
  gridGap,
  headingMediumStyle,
  motionDurationLong,
  motionDurationModerate,
  motionDurationShort,
  motionEasingBase,
  motionEasingIn,
  motionEasingOut,
  spacingFluidMedium,
  themeLightBackgroundSurface,
  themeLightPrimary,
} from '@porsche-design-system/components-vue/vanilla-extract';
import { style, styleVariants } from '@vanilla-extract/css';

export const Wrapper = style({
  display: 'flex',
  gap: gridGap,
  padding: spacingFluidMedium,
  flexWrap: 'wrap',
  justifyContent: 'center',
});

export const Heading = style({
  ...headingMediumStyle,
  color: themeLightPrimary,
  textAlign: 'center',
  width: '100%',
});

export const TileBase = style({
  width: '200px',
  height: '100px',
  lineHeight: '100px',
  textAlign: 'center',
  color: themeLightPrimary,
  background: themeLightBackgroundSurface,
  borderRadius: borderRadiusLarge,
  cursor: 'pointer',
});

export const MotionMoving = styleVariants({
  active: {
    transform: 'translateX(200px)',
    transition: `transform ${motionDurationShort} ${motionEasingBase}`,
  },
  inactive: {
    transform: 'translateX(-200px)',
    transition: `transform ${motionDurationShort} ${motionEasingBase}`,
  },
});

export const MotionEnterExit = styleVariants({
  active: {
    transform: 'translateY(40%)',
    opacity: '0',
    transition: `opacity ${motionDurationShort} ${motionEasingOut}, transform ${motionDurationShort} ${motionEasingOut}`,
  },
  inactive: {
    transform: 'translateY(0px)',
    opacity: '1',
    transition: `opacity ${motionDurationModerate} ${motionEasingIn}, transform ${motionDurationModerate} ${motionEasingIn}`,
  },
});

export const MotionShowHide = styleVariants({
  active: {
    opacity: '0',
    transition: `opacity ${motionDurationLong} ${motionEasingBase}`,
  },
  inactive: {
    opacity: '1',
    transition: `opacity ${motionDurationLong} ${motionEasingBase}`,
  },
});

export const MotionExpand = styleVariants({
  active: {
    height: '200px',
    transition: `height ${motionDurationModerate} ${motionEasingBase}`,
  },
  inactive: {
    height: 'auto',
    transition: `height ${motionDurationShort} ${motionEasingIn}`,
  },
});
