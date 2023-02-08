import type { HeadingSize, HeadingAlign, HeadingColor } from './heading-utils';
import type { BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss, HEADING_TAGS } from '../../utils';
import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import {
  fontSizeHeadingLarge,
  fontSizeHeadingMedium,
  fontSizeHeadingSmall,
  fontSizeHeadingXLarge,
  fontSizeHeadingXXLarge,
  fontSizeHeadingXXXLarge,
  headingXXLargeStyle,
} from '@porsche-design-system/utilities-v2';
import { getEllipsisJssStyle, getSlottedTypographyJssStyle } from '../../styles/typography-styles';
import { getThemedTextColor } from '../../styles/text-icon-styles';

export const sizeMap: { [key in Exclude<HeadingSize, 'inherit'>]: string } = {
  'xxx-large': fontSizeHeadingXXXLarge,
  'xx-large': fontSizeHeadingXXLarge,
  'x-large': fontSizeHeadingXLarge,
  large: fontSizeHeadingLarge,
  medium: fontSizeHeadingMedium,
  small: fontSizeHeadingSmall,
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
        ...addImportantToEachRule(hostHiddenStyles),
      },
      '::slotted': {
        [HEADING_TAGS.map((i) => `&(${i})`).join()]: addImportantToEachRule(getSlottedTypographyJssStyle()),
      },
    },
    root: {
      display: 'inherit',
      margin: 0,
      padding: 0,
      textAlign: align,
      ...headingXXLargeStyle,
      letterSpacing: 'normal',
      color: getThemedTextColor(theme, color),
      listStyleType: 'none',
      whiteSpace: 'inherit',
      ...(ellipsis && getEllipsisJssStyle()),
      ...buildResponsiveStyles(size, (sizeValue: HeadingSize) => ({
        fontSize: sizeValue === 'inherit' ? sizeValue : sizeMap[sizeValue],
      })),
    },
  });
};
