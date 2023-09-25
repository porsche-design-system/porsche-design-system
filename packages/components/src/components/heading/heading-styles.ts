import type { BreakpointCustomizable, Theme } from '../../types';
import type { HeadingAlign, HeadingColor, HeadingSize } from './heading-utils';
import { buildResponsiveStyles, getCss, HEADING_TAGS } from '../../utils';
import { addImportantToEachRule, colorSchemeStyles, hostHiddenStyles } from '../../styles';
import {
  fontSizeHeadingLarge,
  fontSizeHeadingMedium,
  fontSizeHeadingSmall,
  fontSizeHeadingXLarge,
  fontSizeHeadingXXLarge,
  headingXXLargeStyle,
} from '@porsche-design-system/utilities-v2';
import { getTypographySlottedJssStyle, getTypographyRootJssStyle } from '../../styles/typography-styles';

export const sizeMap: { [key in Exclude<HeadingSize, 'inherit'>]: string } = {
  small: fontSizeHeadingSmall,
  medium: fontSizeHeadingMedium,
  large: fontSizeHeadingLarge,
  'x-large': fontSizeHeadingXLarge,
  'xx-large': fontSizeHeadingXXLarge,
};

export const getComponentCss = (
  size: BreakpointCustomizable<HeadingSize>,
  align: HeadingAlign,
  color: HeadingColor,
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
        [HEADING_TAGS.map((i) => `&(${i})`).join()]: addImportantToEachRule(getTypographySlottedJssStyle()),
      },
    },
    root: getTypographyRootJssStyle(
      headingXXLargeStyle,
      buildResponsiveStyles(size, (sizeValue: HeadingSize) => ({
        fontSize: sizeValue === 'inherit' ? sizeValue : sizeMap[sizeValue],
      })),
      align,
      color,
      ellipsis,
      theme
    ),
  });
};
