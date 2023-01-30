import type { BreakpointCustomizable, TextSize } from '../../types';
import { getHTMLElement } from '../../utils';

export const HEADING_VARIANTS = [
  'large-title',
  'heading-1',
  'heading-2',
  'heading-3',
  'heading-4',
  'heading-5',
  'headline-1', // deprecated
  'headline-2', // deprecated
  'headline-3', // deprecated
  'headline-4', // deprecated
  'headline-5', // deprecated
] as const;

export type VariantType = typeof HEADING_VARIANTS[number];

type HeadingVariantCustom = Exclude<BreakpointCustomizable<TextSize>, TextSize>;

export type HeadingVariant = VariantType | HeadingVariantCustom | Extract<TextSize, 'inherit'>;

export const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export type HeadingTag = typeof HEADING_TAGS[number];

export const isVariantType = (variant: HeadingVariant): boolean => {
  return HEADING_VARIANTS.includes(variant as VariantType);
};

export const hasSlottedHeadingTag = (host: HTMLElement): boolean => {
  // TODO: needs to be direct and only child
  const el = getHTMLElement(host, ':first-child');
  return el?.matches('h1, h2, h3, h4, h5, h6');
};

const variantToTagMap: { [key in VariantType]: string } = {
  'large-title': 'h1',
  'heading-1': 'h1',
  'heading-2': 'h2',
  'heading-3': 'h3',
  'heading-4': 'h4',
  'heading-5': 'h5',
  'headline-1': 'h1',
  'headline-2': 'h2',
  'headline-3': 'h3',
  'headline-4': 'h4',
  'headline-5': 'h5',
};

export const getHeadingTagName = (host: HTMLElement, variant?: HeadingVariant, tag?: HeadingTag): string => {
  if (hasSlottedHeadingTag(host)) {
    return 'div';
  } else if (tag) {
    return tag;
  } else if (!isVariantType(variant)) {
    return 'h1';
  } else {
    return variantToTagMap[variant as VariantType];
  }
};
