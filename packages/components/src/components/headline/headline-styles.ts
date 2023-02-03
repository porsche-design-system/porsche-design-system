import type { TextAlign, TextColor, Theme } from '../../types';
import type { HeadlineVariantDeprecated } from '../headline/headline-utils';
import { getSharedHeadingHeadlineStyles } from '../heading/heading-styles';

export const getComponentCss = (
  variant: HeadlineVariantDeprecated,
  align: TextAlign,
  color: Extract<TextColor, 'primary' | 'default' | 'inherit'>,
  ellipsis: boolean,
  theme: Theme
): string => {
  return getSharedHeadingHeadlineStyles(variant, align, color, ellipsis, theme);
};
