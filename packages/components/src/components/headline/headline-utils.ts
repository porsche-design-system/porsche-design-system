import type { BreakpointCustomizable, TextSize, TypographyAlign, TypographyAlignDeprecated } from '../../types';
import { hasSpecificTag } from '../../utils';

export const HEADLINE_VARIANTS = [
  'large-title',
  'headline-1',
  'headline-2',
  'headline-3',
  'headline-4',
  'headline-5',
] as const;

export type HeadlineVariantType = (typeof HEADLINE_VARIANTS)[number];

type HeadlineVariantCustom = Exclude<BreakpointCustomizable<TextSize>, TextSize>;

export type HeadlineVariant = HeadlineVariantType | HeadlineVariantCustom | Extract<TextSize, 'inherit'>; // eslint-disable-line @typescript-eslint/no-redundant-type-constituents

export const HEADLINE_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export type HeadlineTag = (typeof HEADLINE_TAGS)[number];

export const HEADLINE_COLORS = ['primary', 'default', 'inherit'] as const;
export type HeadlineColor = (typeof HEADLINE_COLORS)[number];

/** @deprecated */
export type HeadlineAlignDeprecated = TypographyAlignDeprecated;
export type HeadlineAlign = TypographyAlign;

export const isValidVariantType = (variant: HeadlineVariant): boolean => {
  return HEADLINE_VARIANTS.includes(variant as HeadlineVariantType);
};

const variantToTagMap: Record<HeadlineVariantType, string> = {
  'large-title': 'h1',
  'headline-1': 'h1',
  'headline-2': 'h2',
  'headline-3': 'h3',
  'headline-4': 'h4',
  'headline-5': 'h5',
};

export const getHeadlineTagType = (host: HTMLElement, variant: HeadlineVariant, tag: HeadlineTag): string => {
  if (hasSpecificTag(host, HEADLINE_TAGS.join())) {
    return 'div';
  } else if (tag) {
    return tag;
  } else {
    return variantToTagMap[variant as HeadlineVariantType] || 'h1';
  }
};
