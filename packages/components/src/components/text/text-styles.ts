import {
  fontSizeTextLarge,
  fontSizeTextMedium,
  fontSizeTextSmall,
  fontSizeTextXLarge,
  fontSizeTextXSmall,
  fontSizeTextXXSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';
import { addImportantToEachRule, colorSchemeStyles, hostHiddenStyles } from '../../styles';
import { getFontWeight } from '../../styles/font-weight-styles';
import { getTypographyRootJssStyle, getTypographySlottedJssStyle } from '../../styles/typography-styles';
import type { BreakpointCustomizable, TextSize, Theme } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import { TEXT_TAGS, type TextAlign, type TextColor, type TextWeight } from './text-utils';

const sizeMap: Record<Exclude<TextSize, 'inherit'>, string> = {
  'xx-small': fontSizeTextXXSmall,
  'x-small': fontSizeTextXSmall,
  small: fontSizeTextSmall,
  medium: fontSizeTextMedium,
  large: fontSizeTextLarge,
  'x-large': fontSizeTextXLarge,
};

export const getComponentCss = (
  size: BreakpointCustomizable<TextSize>,
  weight: TextWeight,
  align: TextAlign,
  color: TextColor,
  ellipsis: boolean,
  theme: Theme
): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      [`::slotted(:is(${TEXT_TAGS.join()}))`]: addImportantToEachRule(getTypographySlottedJssStyle()),
    },
    root: getTypographyRootJssStyle(
      textSmallStyle,
      buildResponsiveStyles(size, (sizeValue: TextSize) => ({
        fontSize: sizeValue === 'inherit' ? sizeValue : sizeMap[sizeValue],
        fontWeight: getFontWeight(weight),
      })),
      align,
      color,
      ellipsis,
      theme
    ),
  });
};
