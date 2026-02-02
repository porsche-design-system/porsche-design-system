import { radiusSm } from '../border';
import { type Theme, themeDarkBackgroundSurface, themeLightBackgroundSurface } from '../color';
import { durationLg, easeInOut } from '../motion';

type Options = {
  theme?: Theme;
};

export const getSkeletonStyle = (opts?: Options) => {
  const { theme = 'light' } = opts || {};

  // TODO: Extract into tokens
  const highlightColorLight = '#f7f7f7';
  const highlightColorDark = '#1a1b1e';

  const isThemeDark = theme === 'dark';
  const backgroundColor = isThemeDark ? themeDarkBackgroundSurface : themeLightBackgroundSurface;
  const highlightColor = isThemeDark ? highlightColorDark : highlightColorLight;

  return {
    display: 'block',
    background: `${backgroundColor} linear-gradient(to right, transparent 0%, ${highlightColor} 25%, transparent 50%) 0 0 / 200% 100%`,
    ...(theme === 'auto' && {
      '@media (prefers-color-scheme: dark)': {
        background: `${themeDarkBackgroundSurface} linear-gradient(to right, transparent 0%, ${highlightColorDark} 25%, transparent 50%) 0 0 / 200% 100%`,
      },
    }),
    borderRadius: radiusSm,
    animation: `skeletonAnimation ${durationLg} ${easeInOut} infinite`,
    '@keyframes skeletonAnimation': {
      from: { backgroundPositionX: '100%' },
      to: { backgroundPositionX: '-100%' },
    },
  } as const;
};
