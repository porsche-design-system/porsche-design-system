import { keyframes, style } from '@vanilla-extract/css';
import { getSkeletonStyle, skeletonKeyframes } from '../../../src/vanilla-extract';

export const animation = keyframes(skeletonKeyframes);
export const vanillaExtractGetSkeletonStyle = style(getSkeletonStyle(animation));
