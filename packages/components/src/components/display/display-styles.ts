import type { DisplaySize, DisplayColor } from './display-utils';
import type { BreakpointCustomizable, TextAlign, Theme } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import { displayLargeStyle, fontSizeDisplayLarge, fontSizeDisplayMedium } from '@porsche-design-system/utilities-v2';
import { getEllipsisJssStyle, getSlottedTypographyJssStyle } from '../../styles/typography-styles';
import { getThemedTextColor } from '../../styles/text-icon-styles';
import { DISPLAY_TAGS } from './display-utils';

const sizeMap: { [key in Exclude<DisplaySize, 'inherit'>]: string } = {
  medium: fontSizeDisplayMedium,
  large: fontSizeDisplayLarge,
};

export const getComponentCss = (
  size: BreakpointCustomizable<DisplaySize>,
  align: TextAlign,
  color: DisplayColor,
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
        [DISPLAY_TAGS.map((i) => `&(${i})`).join()]: addImportantToEachRule(getSlottedTypographyJssStyle()),
      },
    },
    root: {
      display: 'inherit',
      margin: 0,
      padding: 0,
      textAlign: align,
      ...displayLargeStyle,
      letterSpacing: 'normal',
      color: getThemedTextColor(theme, color),
      listStyleType: 'none',
      whiteSpace: 'inherit',
      ...(ellipsis && getEllipsisJssStyle()),
      ...buildResponsiveStyles(size, (sizeValue: DisplaySize) => ({
        fontSize: sizeValue === 'inherit' ? sizeValue : sizeMap[sizeValue],
      })),
    },
  });
};
