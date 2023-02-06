import type { DisplaySize } from './display-size';
import type { DisplayColor } from './display-color';
import type { BreakpointCustomizable, TextAlign, Theme } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import { addImportantToEachRule } from '../../styles';
import { displayLargeStyle, fontSizeDisplayLarge, fontSizeDisplayMedium } from '@porsche-design-system/utilities-v2';
import { getEllipsisJssStyle, getSlottedTypographyJssStyle } from '../../styles/typography-styles';
import { getThemedTextColor } from '../../styles/text-icon-styles';
import { hostHiddenStyles } from '../../styles/host-hidden-styles';
import { DISPLAY_TAGS } from './display-tag';

const sizeMap: { [key in Exclude<DisplaySize, 'inherit'>]: any } = {
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
        ...hostHiddenStyles,
        display: 'block',
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
