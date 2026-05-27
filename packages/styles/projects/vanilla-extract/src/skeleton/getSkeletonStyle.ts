import { radiusSm } from '../border';
import { colorFrosted, colorFrostedStrong } from '../color';
import { durationXl, easeInOut } from '../motion';

/**
 * Applies a skeleton placeholder style to indicate loading state.
 * @signature getSkeletonStyle(animationName: string)
 */
export const getSkeletonStyle = (animationName: string) => {
  return {
    display: 'block',
    borderRadius: radiusSm,
    background: `transparent linear-gradient(to right, ${colorFrosted} 0%, ${colorFrostedStrong} 50%, ${colorFrosted} 100%) 0 0 / 200% 100%`,
    animation: `${animationName} ${durationXl} ${easeInOut} infinite`,
  } as const;
};
