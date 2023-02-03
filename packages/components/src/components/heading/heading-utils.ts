import { getHTMLElement } from '../../utils';
import { BreakpointCustomizable } from '../../utils/breakpoint-customizable';
import { HeadlineVariantTypeDeprecated } from '../headline/headline-utils';

export const HEADING_SIZES = ['large-title', 'xx-large', 'x-large', 'large', 'medium', 'small', 'inherit'] as const;
export type HeadingSize = typeof HEADING_SIZES[number];

export const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export type HeadingTag = typeof HEADING_TAGS[number];

export const isHeadingSizeType = (
  variant: HeadingSize | BreakpointCustomizable<HeadingSize> | HeadlineVariantTypeDeprecated
): boolean => {
  return HEADING_SIZES.includes(variant as HeadingSize);
};

export const hasSlottedHeadingTag = (host: HTMLElement): boolean => {
  // TODO: needs to be direct and only child
  const el = getHTMLElement(host, ':first-child');
  return el?.matches('h1, h2, h3, h4, h5, h6');
};

export const headingSizeToTagMap: { [key in HeadingSize]: string } = {
  'large-title': 'h1',
  'xx-large': 'h1',
  'x-large': 'h2',
  large: 'h3',
  medium: 'h4',
  small: 'h5',
  inherit: 'h1',
};

export const getHeadingTagName = (
  host: HTMLElement,
  size?: HeadingSize | BreakpointCustomizable<HeadingSize>,
  tag?: HeadingTag
): string => {
  if (hasSlottedHeadingTag(host)) {
    return 'div';
  } else if (tag) {
    return tag;
  } else if (!isHeadingSizeType(size)) {
    return 'h1';
  } else {
    return headingSizeToTagMap[size as HeadingSize];
  }
};
