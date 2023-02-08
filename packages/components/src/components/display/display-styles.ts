import type { DisplayAlign, DisplayColor, DisplaySize } from './display-utils';
import { DISPLAY_TAGS } from './display-utils';
import type { BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import { displayLargeStyle, fontSizeDisplayLarge, fontSizeDisplayMedium } from '@porsche-design-system/utilities-v2';
import { getTypographyRootJssStyle, getTypographySlottedJssStyle } from '../../styles/typography-styles';

const sizeMap: { [key in Exclude<DisplaySize, 'inherit'>]: string } = {
  medium: fontSizeDisplayMedium,
  large: fontSizeDisplayLarge,
};

export const getComponentCss = (
  size: BreakpointCustomizable<DisplaySize>,
  align: DisplayAlign,
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
        [DISPLAY_TAGS.map((i) => `&(${i})`).join()]: addImportantToEachRule(getTypographySlottedJssStyle()),
      },
    },
    'root': {
      ...getTypographyRootJssStyle(displayLargeStyle, align, color, ellipsis, theme),
      ...buildResponsiveStyles(size, (sizeValue: DisplaySize) => (addImportantToEachRule({
        fontSize: sizeValue === 'inherit' ? sizeValue : sizeMap[sizeValue],
      }))),
    }
  });
};
