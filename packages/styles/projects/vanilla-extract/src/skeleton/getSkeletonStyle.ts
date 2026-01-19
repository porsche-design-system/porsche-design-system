import { borderRadiusSmall } from '../border';
import { motionDurationLong, motionEasingBase } from '../motion';
import { type Theme, themeDarkBackgroundSurface, themeLightBackgroundSurface } from '../theme';

type Options = {
  theme?: Exclude<Theme, 'auto'>;
};

export const skeletonKeyframes = {
  from: { backgroundPositionX: '100%' },
  to: { backgroundPositionX: '-100%' },
};

/**
 * Generates skeleton loading styles with a background animation.
 *
 * @param {string} animationName - The name of the animation, which must be the generated name from `vanilla-extract`.
 * This should be the return value of the `keyframes` function.
 * @param {Options} [opts] - Optional configuration.
 * @param {Exclude<Theme, 'auto'>} [opts.theme='light'] - The theme to use, either 'light' or 'dark'.
 */
export const getSkeletonStyle = (animationName: string, opts?: Options) => {
  const { theme = 'light' } = opts || {};

  const isThemeDark = theme === 'dark';
  const backgroundColor = isThemeDark ? themeDarkBackgroundSurface : themeLightBackgroundSurface;
  const highlightColor = isThemeDark ? '#1a1b1e' : '#f7f7f7';

  return {
    display: 'block',
    background: `${backgroundColor} linear-gradient(to right, transparent 0%, ${highlightColor} 25%, transparent 50%) 0 0 / 200% 100%`,
    borderRadius: borderRadiusSmall,
    animation: `${animationName} ${motionDurationLong} ${motionEasingBase} infinite`,
  } as const;
};
