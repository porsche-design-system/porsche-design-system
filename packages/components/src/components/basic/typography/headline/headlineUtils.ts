import { VariantType } from './headline';

export const HEADLINE_VARIANTS = [
  'large-title',
  'headline-1',
  'headline-2',
  'headline-3',
  'headline-4',
  'headline-5',
] as const;

export type HeadlineVariant = typeof HEADLINE_VARIANTS[number];

export type HeadlineTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export const getTagName = (host: HTMLElement, variant?: VariantType, tag?: HeadlineTags): string => {
  const variantToTagMap: { [key in HeadlineVariant]: string } = {
    'large-title': 'h1',
    'headline-1': 'h1',
    'headline-2': 'h2',
    'headline-3': 'h3',
    'headline-4': 'h4',
    'headline-5': 'h5',
  };

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

export const hasSlottedHeadlineTag = (host: HTMLElement): boolean => {
  const el = host.querySelector(':first-child');
  return el?.matches('h1, h2, h3, h4, h5, h6');
};

export const isHeadlineVariant = (variant: VariantType): boolean => {
  return HEADLINE_VARIANTS.includes(variant as HeadlineVariant);
};
