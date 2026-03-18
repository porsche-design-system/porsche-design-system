import { hasSpecificDirectChildTag } from '../../utils';

export const TEXT_TAGS = ['p', 'span', 'div', 'address', 'blockquote', 'figcaption', 'cite', 'time', 'legend'] as const;
export type TextTag = (typeof TEXT_TAGS)[number];

export const TEXT_COLORS = [
  'primary',
  'contrast-high',
  'contrast-medium',
  'success',
  'warning',
  'error',
  'info',
  'inherit',
] as const;
export type TextColor = (typeof TEXT_COLORS)[number];

/** @deprecated */
export const TEXT_WEIGHTS_DEPRECATED = ['regular', 'semi-bold'] as const;
export const TEXT_WEIGHTS = ['normal', 'semibold', 'bold', ...TEXT_WEIGHTS_DEPRECATED] as const;
export type TextWeight = (typeof TEXT_WEIGHTS)[number];

export const TEXT_ALIGNS = ['start', 'center', 'end', 'inherit'] as const;
export type TextAlign = (typeof TEXT_ALIGNS)[number];

/** @deprecated */
export const TEXT_SIZES_DEPRECATED = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large'] as const;
export const TEXT_SIZES = [
  '2xs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  'inherit',
  ...TEXT_SIZES_DEPRECATED,
] as const;
export type TextSize = (typeof TEXT_SIZES)[number];

export const getTextTagType = (host: HTMLElement, tag: TextTag): string => {
  if (hasSpecificDirectChildTag(host, TEXT_TAGS.join())) {
    return 'div';
  }

  return tag;
};
