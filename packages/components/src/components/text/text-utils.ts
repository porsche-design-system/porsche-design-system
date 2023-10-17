import { hasSpecificSlottedTag } from '../../utils';
import { type TypographyAlign, type TypographyAlignDeprecated } from '../../types';

export const TEXT_TAGS = ['p', 'span', 'div', 'address', 'blockquote', 'figcaption', 'cite', 'time', 'legend'] as const;
export type TextTag = (typeof TEXT_TAGS)[number];

export const getTextTagType = (host: HTMLElement, tag: TextTag): string => {
  if (hasSpecificSlottedTag(host, TEXT_TAGS.join())) {
    return 'div';
  } else {
    return tag;
  }
};

/** @deprecated */
export type TextAlignDeprecated = TypographyAlignDeprecated;
export type TextAlign = TypographyAlign;
