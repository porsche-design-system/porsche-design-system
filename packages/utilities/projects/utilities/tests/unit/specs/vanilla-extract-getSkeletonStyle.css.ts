import { keyframes, style } from '@vanilla-extract/css';
import { getSkeletonStyle, skeletonAnimation } from '../../../src/vanilla-extract';

export const animation = keyframes(skeletonAnimation);
export const vanillaExtractGetSkeletonStyle = style(getSkeletonStyle(animation));
