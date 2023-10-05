import { borderRadiusMedium, borderRadiusSmall } from '../border';
import { themeLightBackgroundSurface } from '../theme';

type BorderRadius = 'small' | 'medium';
type Options = {
  borderRadius?: BorderRadius | string;
};

export const getSkeletonStyle = (opts?: Options) => {
  const { borderRadius = 'small' } = opts || {};
  const borderRadiusValue =
    borderRadius === 'small'
      ? borderRadiusSmall
      : borderRadius === 'medium'
      ? borderRadiusMedium
      : borderRadius || borderRadiusSmall;

  return {
    display: 'block',
    background: `${themeLightBackgroundSurface} linear-gradient(to right, transparent 0%, #f7f7f7 20%, transparent 50%) 0 0 / 200% 100%`,
    borderRadius: borderRadiusValue,
    animation:
      'skeletonAnimation var(--transition-duration-long, .6s) var(--easing-base, cubic-bezier(0.25,0.1,0.25,1)) infinite', // TODO: use motion variables
    '@keyframes skeletonAnimation': {
      from: { backgroundPosition: '100% 0' },
      to: { backgroundPosition: '-100% 0' },
    },
  } as const;
};
