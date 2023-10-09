import { borderRadiusSmall } from '../border';
import { type Theme, themeLightBackgroundSurface, themeDarkBackgroundSurface } from '../theme';

type Options = {
  theme?: Exclude<Theme, 'auto'>;
};

export const getSkeletonStyle = (opts?: Options) => {
  const { theme = 'light' } = opts || {};

  const isThemeDark = theme === 'dark';
  const backgroundColor = isThemeDark ? themeDarkBackgroundSurface : themeLightBackgroundSurface;
  const highlightColor = isThemeDark ? '#1a1b1e' : '#f7f7f7';

  return {
    display: 'block',
    background: `${backgroundColor} linear-gradient(to right, transparent 0%, ${highlightColor} 25%, transparent 50%) 0 0 / 200% 100%`,
    borderRadius: borderRadiusSmall,
    animation: 'skeletonAnimation .6s cubic-bezier(0.25,0.1,0.25,1) infinite', // TODO: use motion variables
    '@keyframes skeletonAnimation': {
      from: { backgroundPositionX: '100%' },
      to: { backgroundPositionX: '-100%' },
    },
  } as const;
};
