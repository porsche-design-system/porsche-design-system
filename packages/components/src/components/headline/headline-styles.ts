import type { HeadingVariant, TextAlign, TextColor, Theme } from '../../types';
import { getHeadingHeadlineStyles } from '../heading/heading-styles';

export const getComponentCss = (
  variant: HeadingVariant,
  align: TextAlign,
  color: Extract<TextColor, 'primary' | 'default' | 'inherit'>,
  ellipsis: boolean,
  theme: Theme
): string => {
  return getHeadingHeadlineStyles(variant, align, color, ellipsis, theme);
};
