import type { BreakpointCustomizable, TextAlign } from '../../types';
import { hasSpecificSlottedTag } from '../../utils';

export const DISPLAY_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export type DisplayTag = (typeof DISPLAY_TAGS)[number];

export const DISPLAY_SIZES = ['small', 'medium', 'large', 'inherit'] as const;
export type DisplaySize = (typeof DISPLAY_SIZES)[number];

export const DISPLAY_COLORS = ['primary', 'inherit'] as const;
export type DisplayColor = (typeof DISPLAY_COLORS)[number];

export type DisplayAlign = TextAlign;

export const displaySizeToTagMap: { [key in DisplaySize]: string } = {
  small: 'h3',
  medium: 'h2',
  large: 'h1',
  inherit: 'h1',
};

export const getDisplayTagType = (
  host: HTMLElement,
  size: BreakpointCustomizable<DisplaySize>,
  tag: DisplayTag
): string => {
  if (hasSpecificSlottedTag(host, DISPLAY_TAGS.join())) {
    return 'div';
  } else if (tag) {
    return tag;
  } else {
    return displaySizeToTagMap[size as DisplaySize] || 'h1';
  }
};
