import { hasSpecificTag } from '../../utils';
import type {
  TypographyAlign,
  TypographyAlignDeprecated,
  TypographyTextColor,
  TypographyTextColorDeprecated,
  TypographyTextWeight,
  TypographyTextWeightDeprecated,
} from '../../types';

export const TEXT_TAGS = ['p', 'span', 'div', 'address', 'blockquote', 'figcaption', 'cite', 'time', 'legend'] as const;
export type TextTag = (typeof TEXT_TAGS)[number];

export const getTextTagType = (host: HTMLElement, tag: TextTag): string => {
  if (hasSpecificTag(host, TEXT_TAGS.join())) {
    return 'div';
  } else {
    return tag;
  }
};

/** @deprecated */
export type TextAlignDeprecated = TypographyAlignDeprecated;
export type TextAlign = TypographyAlign;

/** @deprecated */
export type TextColorDeprecated = TypographyTextColorDeprecated;
export type TextColor = TypographyTextColor;

/** @deprecated */
export type TextWeightDeprecated = TypographyTextWeightDeprecated;
export type TextWeight = TypographyTextWeight;
