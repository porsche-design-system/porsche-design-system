import type { BreakpointCustomizable } from '../../types';
import { hasSpecificDirectChildTag } from '../../utils';

export const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export type HeadingTag = (typeof HEADING_TAGS)[number];

export const HEADING_COLORS = ['primary', 'contrast-high', 'contrast-medium', 'inherit'] as const;
export type HeadingColor = (typeof HEADING_COLORS)[number];

/** @deprecated */
export const HEADING_WEIGHTS_DEPRECATED = ['regular', 'semi-bold'] as const;
export const HEADING_WEIGHTS = ['normal', 'semibold', 'bold', ...HEADING_WEIGHTS_DEPRECATED] as const;
export type HeadingWeight = (typeof HEADING_WEIGHTS)[number];

export const HEADING_ALIGNS = ['start', 'center', 'end', 'inherit'] as const;
export type HeadingAlign = (typeof HEADING_ALIGNS)[number];

/** @deprecated */
export const HEADING_SIZES_DEPRECATED = ['small', 'medium', 'large', 'x-large', 'xx-large'] as const;
export const HEADING_SIZES = [
  '2xs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  'inherit',
  ...HEADING_SIZES_DEPRECATED,
] as const;
export type HeadingSize = (typeof HEADING_SIZES)[number];

const headingSizeToTagMap: Record<HeadingSize, string> = {
  small: 'h6', // deprecated
  medium: 'h5', // deprecated
  large: 'h4', // deprecated
  'x-large': 'h3', // deprecated
  'xx-large': 'h2', // deprecated
  '2xs': 'h6',
  xs: 'h6',
  sm: 'h6',
  md: 'h5',
  lg: 'h4',
  xl: 'h3',
  '2xl': 'h2',
  '3xl': 'h2',
  '4xl': 'h2',
  '5xl': 'h2',
  inherit: 'h2',
};

export const getHeadingTagType = (
  host: HTMLElement,
  size: BreakpointCustomizable<HeadingSize>,
  tag: HeadingTag
): string => {
  if (hasSpecificDirectChildTag(host, HEADING_TAGS.join())) {
    return 'div';
  }
  if (tag) {
    return tag;
  }
  return headingSizeToTagMap[size as HeadingSize] || 'h2';
};
