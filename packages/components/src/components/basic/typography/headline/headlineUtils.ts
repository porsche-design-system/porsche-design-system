import { BreakpointCustomizable } from '../../../../utils';
import { TextSize } from '../text/textUtils';

export const HEADLINE_VARIANTS = [
  'large-title',
  'headline-1',
  'headline-2',
  'headline-3',
  'headline-4',
  'headline-5',
] as const;

type HeadlineVariant = typeof HEADLINE_VARIANTS[number];

type HeadlineVariantCustom = Exclude<BreakpointCustomizable<TextSize>, TextSize>;

export type VariantType = HeadlineVariant | HeadlineVariantCustom;

export type HeadlineTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export const isHeadlineVariant = (variant: VariantType): boolean => {
  return HEADLINE_VARIANTS.includes(variant as HeadlineVariant);
};

export const hasSlottedHeadlineTag = (host: HTMLElement): boolean => {
  const el = host.querySelector(':first-child');
  return el?.matches('h1, h2, h3, h4, h5, h6');
};

const variantToTagMap: { [key in HeadlineVariant]: string } = {
  'large-title': 'h1',
  'headline-1': 'h1',
  'headline-2': 'h2',
  'headline-3': 'h3',
  'headline-4': 'h4',
  'headline-5': 'h5',
};

export const getTagName = (host: HTMLElement, variant?: VariantType, tag?: HeadlineTag): string => {
  if (hasSlottedHeadlineTag(host)) {
    return 'div';
  } else if (tag) {
    return tag;
  } else if (!isHeadlineVariant(variant)) {
    return 'h1';
  } else {
    return variantToTagMap[variant as HeadlineVariant];
  }
};
