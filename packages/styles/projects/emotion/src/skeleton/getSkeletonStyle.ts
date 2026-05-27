import { radiusSm } from '../border';
import { colorFrosted, colorFrostedStrong } from '../color';
import { durationXl, easeInOut } from '../motion';

/**
 * Applies a skeleton placeholder style to indicate loading state.
 */
export const getSkeletonStyle = () => {
  return {
    '@keyframes skeleton': {
      from: { backgroundPositionX: '100%' },
      to: { backgroundPositionX: '-100%' },
    },
    display: 'block',
    borderRadius: radiusSm,
    background: `transparent linear-gradient(to right, ${colorFrosted} 0%, ${colorFrostedStrong} 50%, ${colorFrosted} 100%) 0 0 / 200% 100%`,
    animation: `skeleton ${durationXl} ${easeInOut} infinite`,
  } as const;
};
