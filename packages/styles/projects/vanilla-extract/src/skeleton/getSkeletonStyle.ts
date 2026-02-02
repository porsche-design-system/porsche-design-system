import { radiusSm } from '../border';
import { colorSurfaceDark, colorSurfaceLight, type Theme } from '../color';
import { durationLg, easeInOut } from '../motion';

type Options = {
  theme?: Theme;
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

  // TODO: Extract into tokens
  const highlightColorLight = '#f7f7f7';
  const highlightColorDark = '#1a1b1e';

  const isThemeDark = theme === 'dark';
  const backgroundColor = isThemeDark ? colorSurfaceDark : colorSurfaceLight;
  const highlightColor = isThemeDark ? highlightColorDark : highlightColorLight;

  return {
    display: 'block',
    background: `${backgroundColor} linear-gradient(to right, transparent 0%, ${highlightColor} 25%, transparent 50%) 0 0 / 200% 100%`,
    ...(theme === 'auto' && {
      '@media': {
        '(prefers-color-scheme: dark)': {
          background: `${colorSurfaceDark} linear-gradient(to right, transparent 0%, ${highlightColorDark} 25%, transparent 50%) 0 0 / 200% 100%`,
        },
      },
    }),
    borderRadius: radiusSm,
    animation: `${animationName} ${durationLg} ${easeInOut} infinite`,
  } as const;
};
