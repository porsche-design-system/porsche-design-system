import type { TextAlign } from '../text/text-align';
import type { BreakpointCustomizable } from '../../utils/breakpoint-customizable';
import { getHTMLElement } from '../../utils';

export const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export type HeadingTag = typeof HEADING_TAGS[number];

export const HEADING_SIZES = ['small', 'medium', 'large', 'x-large', 'xx-large', 'xxx-large', 'inherit'] as const;
export type HeadingSize = typeof HEADING_SIZES[number];

export const HEADING_COLORS = ['primary', 'inherit'] as const;
export type HeadingColor = typeof HEADING_COLORS[number];

export type HeadingAlign = TextAlign;

export const hasSlottedHeadingTag = (host: HTMLElement): boolean => {
  // TODO: needs to be direct and only child
  const el = getHTMLElement(host, ':first-child');
  return el?.matches(HEADING_TAGS.join());
};

export const isValidHeadingSize = (size: BreakpointCustomizable<HeadingSize>): boolean => {
  return HEADING_SIZES.includes(size as HeadingSize);
};

export const headingSizeToTagMap: { [key in HeadingSize]: string } = {
  small: 'h6',
  medium: 'h5',
  large: 'h4',
  'x-large': 'h3',
  'xx-large': 'h2',
  'xxx-large': 'h1',
  inherit: 'h1',
};

export const getHeadingTagType = (
  host: HTMLElement,
  size: HeadingSize | BreakpointCustomizable<HeadingSize>,
  tag: HeadingTag
): string => {
  if (hasSlottedHeadingTag(host)) {
    return 'div';
  } else if (tag) {
    return tag;
  } else if (!isValidHeadingSize(size)) {
    return 'h1';
  } else {
    return headingSizeToTagMap[size as HeadingSize];
  }
};
