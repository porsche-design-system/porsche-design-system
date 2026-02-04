import { radiusSm } from '../border';
import { colorSurface } from '../color';
import { durationLg, easeInOut } from '../motion';

/**
 * Applies skeleton loading styles with a background animation.
 * Uses the CSS `light-dark()` color function for automatic theme adaptation.
 */
export const getSkeletonStyle = () => {
  const highlightColorLight = '#f7f7f7';
  const highlightColorDark = '#1a1b1e';
  const highlightColor = `light-dark(${highlightColorLight}, ${highlightColorDark})`;

  return {
    display: 'block',
    background: `${colorSurface} linear-gradient(to right, transparent 0%, ${highlightColor} 25%, transparent 50%) 0 0 / 200% 100%`,
    borderRadius: radiusSm,
    animation: `skeletonAnimation ${durationLg} ${easeInOut} infinite`,
    '@keyframes skeletonAnimation': {
      from: { backgroundPositionX: '100%' },
      to: { backgroundPositionX: '-100%' },
    },
  } as const;
};
