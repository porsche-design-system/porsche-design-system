import type { BreakpointCustomizable, HeadingSize, TextSize } from '../../types';
import { hasSpecificSlottedTag } from '../../utils';

export const HEADLINE_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export type HeadlineTag = typeof HEADLINE_TAGS[number];

export const HEADLINE_VARIANTS_DEPRECATED = [
  'large-title',
  'headline-1',
  'headline-2',
  'headline-3',
  'headline-4',
  'headline-5',
] as const;

export type HeadlineVariantTypeDeprecated = typeof HEADLINE_VARIANTS_DEPRECATED[number];

export type HeadingVariantCustom = Exclude<BreakpointCustomizable<TextSize>, TextSize>;

export type HeadlineVariantDeprecated =
  | HeadlineVariantTypeDeprecated
  | HeadingVariantCustom
  | Extract<TextSize, 'inherit'>;

export const isHeadlineVariantType = (
  variant: BreakpointCustomizable<HeadingSize> | HeadlineVariantDeprecated
): boolean => {
  return HEADLINE_VARIANTS_DEPRECATED.includes(variant as HeadlineVariantTypeDeprecated);
};

const headlineVariantToTagMap: { [key in HeadlineVariantTypeDeprecated]: string } = {
  'large-title': 'h1',
  'headline-1': 'h1',
  'headline-2': 'h2',
  'headline-3': 'h3',
  'headline-4': 'h4',
  'headline-5': 'h5',
};

export const getHeadlineTagName = (
  host: HTMLElement,
  variant?: HeadlineVariantDeprecated,
  tag?: HeadlineTag
): string => {
  if (hasSpecificSlottedTag(host, HEADLINE_TAGS.join())) {
    return 'div';
  } else if (tag) {
    return tag;
  } else if (!isHeadlineVariantType(variant)) {
    return 'h1';
  } else {
    return headlineVariantToTagMap[variant as HeadlineVariantTypeDeprecated];
  }
};
