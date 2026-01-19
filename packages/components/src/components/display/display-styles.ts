import {
  displayLargeStyle,
  fontSizeDisplayLarge,
  fontSizeDisplayMedium,
  fontSizeDisplaySmall,
} from '@porsche-design-system/emotion';
import { addImportantToEachRule, colorSchemeStyles, hostHiddenStyles } from '../../styles';
import { getTypographyRootJssStyle, getTypographySlottedJssStyle } from '../../styles/typography-styles';
import type { BreakpointCustomizable } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import { DISPLAY_TAGS, type DisplayAlign, type DisplayColor, type DisplaySize } from './display-utils';

const sizeMap: { [key in Exclude<DisplaySize, 'inherit'>]: string } = {
  small: fontSizeDisplaySmall,
  medium: fontSizeDisplayMedium,
  large: fontSizeDisplayLarge,
};

export const getComponentCss = (
  size: BreakpointCustomizable<DisplaySize>,
  align: DisplayAlign,
  color: DisplayColor,
  ellipsis: boolean
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
      ellipsis
    ),
  });
};
