import type { TypographyAlign, TypographyTextColor, TypographyTextWeight } from '../../types';
import { hasSpecificDirectChildTag } from '../../utils';

export const TEXT_TAGS = ['p', 'span', 'div', 'address', 'blockquote', 'figcaption', 'cite', 'time', 'legend'] as const;
export type TextTag = (typeof TEXT_TAGS)[number];
export type TextAlign = TypographyAlign;
export type TextColor = TypographyTextColor;
export type TextWeight = TypographyTextWeight;

export const getTextTagType = (host: HTMLElement, tag: TextTag): string => {
  if (hasSpecificDirectChildTag(host, TEXT_TAGS.join())) {
    return 'div';
  }

  return tag;
};
