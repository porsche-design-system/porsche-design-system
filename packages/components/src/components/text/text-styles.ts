import type { BreakpointCustomizable, TextAlign, TextColor, TextSize, TextWeight, Theme } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import {
  fontSizeTextLarge,
  fontSizeTextMedium,
  fontSizeTextSmall,
  fontSizeTextXLarge,
  fontSizeTextXSmall,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import { getTypographyRootJssStyle, getTypographySlottedJssStyle } from '../../styles/typography-styles';
import { getFontWeight } from '../../styles/font-weight-styles';
import { TEXT_TAGS } from './text-utils';

const sizeMap: { [key in Exclude<TextSize, 'inherit'>]: string } = {
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
        ...addImportantToEachRule(hostHiddenStyles),
      },
      '::slotted': {
        [TEXT_TAGS.map((i) => `&(${i})`).join()]: addImportantToEachRule(getTypographySlottedJssStyle()),
      },
    },
    'root': {
      ...getTypographyRootJssStyle(textSmallStyle, align, color, ellipsis, theme),
      ...buildResponsiveStyles(size, (sizeValue: TextSize) => (addImportantToEachRule({
        fontSize: sizeValue === 'inherit' ? sizeValue : sizeMap[sizeValue],
        fontWeight: getFontWeight(weight),
      }))),
    }
  });
};
