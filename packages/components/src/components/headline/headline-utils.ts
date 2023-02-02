import type { TextSize } from '../../types';
import type { HeadingVariantCustom, HeadingTag } from '../heading/heading-utils';
import { hasSlottedHeadingTag } from '../heading/heading-utils';

export const HEADLINE_VARIANTS_DEPRECATED = [
  'large-title',
  'headline-1',
  'headline-2',
  'headline-3',
  'headline-4',
  'headline-5',
] as const;

export type HeadlineVariantTypeDeprecated = typeof HEADLINE_VARIANTS_DEPRECATED[number];

export type HeadlineVariantDeprecated =
  | HeadlineVariantTypeDeprecated
  | HeadingVariantCustom
  | Extract<TextSize, 'inherit'>;

export const isHeadlineVariantType = (variant: HeadlineVariantDeprecated): boolean => {
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
  tag?: HeadingTag
): string => {
  if (hasSlottedHeadingTag(host)) {
    return 'div';
  } else if (tag) {
    return tag;
  } else if (!isHeadlineVariantType(variant)) {
    return 'h1';
  } else {
    return headlineVariantToTagMap[variant as HeadlineVariantTypeDeprecated];
  }
};
