import { radiusSm } from '../border';
import { colorFrosted, colorFrostedStrong } from '../color';
import { durationXl, easeInOut } from '../motion';

/**
 * Keyframes for the skeleton loading animation.
 * Animates the background position from right to left to create a shimmer effect.
 */
export const skeletonKeyframes = {
  from: { backgroundPositionX: '100%' },
  to: { backgroundPositionX: '-100%' },
};

/**
 * Applies skeleton loading styles with a background animation.
 * Uses the CSS `light-dark()` color function for automatic theme adaptation.
 *
 * @param animationName - The name of the animation, which must be the generated name from `vanilla-extract`.
 * This should be the return value of the `keyframes` function.
 */
export const getSkeletonStyle = (animationName: string) => {
  return {
    display: 'block',
    borderRadius: radiusSm,
    background: `transparent linear-gradient(to right, ${colorFrosted} 0%, ${colorFrostedStrong} 50%, ${colorFrosted} 100%) 0 0 / 200% 100%`,
    animation: `${animationName} ${durationXl} ${easeInOut} infinite`,
  } as const;
};
