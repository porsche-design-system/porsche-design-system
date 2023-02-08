import type { TextAlign } from '../text/text-align';
import type { BreakpointCustomizable } from '../../utils/breakpoint-customizable';
import { hasSpecificSlottedTag } from '../../utils';

export const DISPLAY_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export type DisplayTag = typeof DISPLAY_TAGS[number];

export const DISPLAY_SIZES = ['medium', 'large', 'inherit'] as const;
export type DisplaySize = typeof DISPLAY_SIZES[number];

export const DISPLAY_COLORS = ['primary', 'inherit'] as const;
export type DisplayColor = typeof DISPLAY_COLORS[number];

export type DisplayAlign = TextAlign;

export const isValidDisplaySize = (size: BreakpointCustomizable<DisplaySize>): boolean => {
  return DISPLAY_SIZES.includes(size as DisplaySize);
};

export const displaySizeToTagMap: { [key in DisplaySize]: string } = {
  medium: 'h2',
  large: 'h1',
  inherit: 'h1',
};

export const getHeadingTagType = (
  host: HTMLElement,
  size: BreakpointCustomizable<DisplaySize>,
  tag: DisplayTag
): string => {
  if (hasSpecificSlottedTag(host, DISPLAY_TAGS.join())) {
    return 'div';
  } else if (tag) {
    return tag;
  } else if (!isValidDisplaySize(size)) {
    return 'h1';
  } else {
    return displaySizeToTagMap[size as DisplaySize];
  }
};
