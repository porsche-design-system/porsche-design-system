import type { BreakpointCustomizable, HeadingSize, HeadingTag, TypographyAlign } from '../../types';
import { HEADING_TAGS, hasSpecificDirectChildTag } from '../../utils';

export const HEADING_COLORS = ['primary', 'inherit'] as const;
export type HeadingColor = (typeof HEADING_COLORS)[number];

export type HeadingAlign = TypographyAlign;

const headingSizeToTagMap: Record<HeadingSize, string> = {
  small: 'h6',
  medium: 'h5',
  large: 'h4',
  'x-large': 'h3',
  'xx-large': 'h2',
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
