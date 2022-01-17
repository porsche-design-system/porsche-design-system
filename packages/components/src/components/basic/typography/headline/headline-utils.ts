import type { TextSize } from '../text/text-utils';
import type { BreakpointCustomizable } from '../../../../types';
import { getHTMLElement } from '../../../../utils';

export const HEADLINE_VARIANTS = [
  'large-title',
  'headline-1',
  'headline-2',
  'headline-3',
  'headline-4',
  'headline-5',
] as const;

export type VariantType = typeof HEADLINE_VARIANTS[number];

type HeadlineVariantCustom = Exclude<BreakpointCustomizable<TextSize>, TextSize>;

export type HeadlineVariant = VariantType | HeadlineVariantCustom | Extract<TextSize, 'inherit'>;

export type HeadlineTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export const isVariantType = (variant: HeadlineVariant): boolean => {
  return HEADLINE_VARIANTS.includes(variant as VariantType);
};

export const hasSlottedHeadlineTag = (host: HTMLElement): boolean => {
  const el = getHTMLElement(host, ':first-child');
  return el?.matches('h1, h2, h3, h4, h5, h6');
};

const variantToTagMap: { [key in VariantType]: string } = {
  'large-title': 'h1',
  'headline-1': 'h1',
  'headline-2': 'h2',
  'headline-3': 'h3',
  'headline-4': 'h4',
  'headline-5': 'h5',
};

export const getHeadlineTagName = (host: HTMLElement, variant?: HeadlineVariant, tag?: HeadlineTag): string => {
  if (hasSlottedHeadlineTag(host)) {
    return 'div';
  } else if (tag) {
    return tag;
  } else if (!isVariantType(variant)) {
    return 'h1';
  } else {
    return variantToTagMap[variant as VariantType];
  }
};
