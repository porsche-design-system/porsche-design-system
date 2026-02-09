import { radiusSm } from '../border';
import { colorSurface } from '../color';
import { durationLg, easeInOut } from '../motion';

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
  const highlightColorLight = '#f7f7f7';
  const highlightColorDark = '#1a1b1e';
  const highlightColor = `light-dark(${highlightColorLight}, ${highlightColorDark})`;

  return {
    display: 'block',
    background: `${colorSurface} linear-gradient(to right, transparent 0%, ${highlightColor} 25%, transparent 50%) 0 0 / 200% 100%`,
    borderRadius: radiusSm,
    animation: `${animationName} ${durationLg} ${easeInOut} infinite`,
  } as const;
};
