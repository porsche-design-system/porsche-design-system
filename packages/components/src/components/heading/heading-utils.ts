import type { BreakpointCustomizable, TextSize } from '../../types';
import { getHTMLElement } from '../../utils';

export const HEADING_VARIANTS = [
  'large-title',
  'heading-1',
  'heading-2',
  'heading-3',
  'heading-4',
  'heading-5',
] as const;

export type HeadingVariantType = typeof HEADING_VARIANTS[number];

export type HeadingVariantCustom = Exclude<BreakpointCustomizable<TextSize>, TextSize>;

export type HeadingVariant = HeadingVariantType | HeadingVariantCustom | Extract<TextSize, 'inherit'>;

export const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export type HeadingTag = typeof HEADING_TAGS[number];

export const isHeadingVariantType = (variant: HeadingVariant): boolean => {
  return HEADING_VARIANTS.includes(variant as HeadingVariantType);
};

export const hasSlottedHeadingTag = (host: HTMLElement): boolean => {
  // TODO: needs to be direct and only child
  const el = getHTMLElement(host, ':first-child');
  return el?.matches('h1, h2, h3, h4, h5, h6');
};

const headingVariantToTagMap: { [key in HeadingVariantType]: string } = {
  'large-title': 'h1',
  'heading-1': 'h1',
  'heading-2': 'h2',
  'heading-3': 'h3',
  'heading-4': 'h4',
  'heading-5': 'h5',
};

export const getHeadingTagName = (host: HTMLElement, variant?: HeadingVariant, tag?: HeadingTag): string => {
  if (hasSlottedHeadingTag(host)) {
    return 'div';
  } else if (tag) {
    return tag;
  } else if (!isHeadingVariantType(variant)) {
    return 'h1';
  } else {
    return headingVariantToTagMap[variant as HeadingVariantType];
  }
};
