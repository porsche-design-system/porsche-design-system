import type { BreakpointCustomizable, Theme } from '../../types';
import { type DisplayAlign, type DisplayColor, type DisplaySize, DISPLAY_TAGS } from './display-utils';
import { buildResponsiveStyles, getCss } from '../../utils';
import { addImportantToEachRule, colorSchemeStyles, hostHiddenStyles } from '../../styles';
import {
  displayLargeStyle,
  fontSizeDisplayLarge,
  fontSizeDisplayMedium,
  fontSizeDisplaySmall,
} from '@porsche-design-system/styles';
import { getTypographyRootJssStyle, getTypographySlottedJssStyle } from '../../styles/typography-styles';

const sizeMap: { [key in Exclude<DisplaySize, 'inherit'>]: string } = {
  small: fontSizeDisplaySmall,
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
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      [`::slotted(:is(${DISPLAY_TAGS.join()}))`]: addImportantToEachRule(getTypographySlottedJssStyle()),
    },
    root: getTypographyRootJssStyle(
      displayLargeStyle,
      buildResponsiveStyles(size, (sizeValue: DisplaySize) => ({
        fontSize: sizeValue === 'inherit' ? sizeValue : sizeMap[sizeValue],
      })),
      align,
      color,
      ellipsis,
      theme
    ),
  });
};
