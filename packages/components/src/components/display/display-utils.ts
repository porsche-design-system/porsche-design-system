import type { TextAlign } from '../text/text-align';
import type { BreakpointCustomizable } from '../../utils/breakpoint-customizable';
import { getHTMLElement } from '../../utils';

export const DISPLAY_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export type DisplayTag = typeof DISPLAY_TAGS[number];

export const DISPLAY_SIZES = ['medium', 'large', 'inherit'] as const;
export type DisplaySize = typeof DISPLAY_SIZES[number];

export const DISPLAY_COLORS = ['primary', 'inherit'] as const;
export type DisplayColor = typeof DISPLAY_COLORS[number];

export type DisplayAlign = TextAlign;

export const hasSlottedDisplayTag = (host: HTMLElement): boolean => {
  // TODO: needs to be direct and only child
  const el = getHTMLElement(host, ':first-child');
  return el?.matches(DISPLAY_TAGS.join());
};

export const isValidDisplaySize = (size: BreakpointCustomizable<DisplaySize>): boolean => {
  return DISPLAY_SIZES.includes(size as DisplaySize);
};

export const displaySizeToTagMap: { [key in DisplaySize]: string } = {
  medium: 'h2',
  large: 'h1',
  inherit: 'h1',
};

// TODO: maybe we can abstract this function to be reused for text, heading and display
export const getHeadingTagType = (
  host: HTMLElement,
  size: BreakpointCustomizable<DisplaySize>,
  tag: DisplayTag
): string => {
  if (hasSlottedDisplayTag(host)) {
    return 'div';
  } else if (tag) {
    return tag;
  } else if (!isValidDisplaySize(size)) {
    return 'h1';
  } else {
    return displaySizeToTagMap[size as DisplaySize];
  }
};
