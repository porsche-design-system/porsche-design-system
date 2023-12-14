import type {
  BreakpointCustomizable,
  TextColor,
  TextColorDeprecated,
  TextSize,
  TextWeight,
  TextWeightDeprecated,
  Theme,
} from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import { addImportantToEachRule, colorSchemeStyles, hostHiddenStyles } from '../../styles';
import {
  fontSizeTextLarge,
  fontSizeTextMedium,
  fontSizeTextSmall,
  fontSizeTextXLarge,
  fontSizeTextXSmall,
  fontSizeTextXXSmall,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import { getTypographyRootJssStyle, getTypographySlottedJssStyle } from '../../styles/typography-styles';
import { getFontWeight } from '../../styles/font-weight-styles';
import { TEXT_TAGS, type TextAlign } from './text-utils';

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
  weight: Exclude<TextWeight, TextWeightDeprecated>,
  align: TextAlign,
  color: Exclude<TextColor, TextColorDeprecated>,
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
      '::slotted': {
        [TEXT_TAGS.map((i) => `&(${i})`).join()]: addImportantToEachRule(getTypographySlottedJssStyle()),
      },
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
