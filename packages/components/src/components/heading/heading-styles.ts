import {
  fontSizeHeadingLarge,
  fontSizeHeadingMedium,
  fontSizeHeadingSmall,
  fontSizeHeadingXLarge,
  fontSizeHeadingXXLarge,
  fontWeightRegular,
  fontWeightSemiBold,
  headingXXLargeStyle,
} from '@porsche-design-system/emotion';
import { addImportantToEachRule, colorSchemeStyles, hostHiddenStyles } from '../../styles';
import { getTypographyRootJssStyle, getTypographySlottedJssStyle } from '../../styles/typography-styles';
import type { BreakpointCustomizable, HeadingSize } from '../../types';
import { buildResponsiveStyles, getCss, HEADING_TAGS } from '../../utils';
import type { HeadingAlign, HeadingColor } from './heading-utils';

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
      [`::slotted(:is(${HEADING_TAGS.join()}))`]: addImportantToEachRule(getTypographySlottedJssStyle()),
    },
    root: getTypographyRootJssStyle(
      headingXXLargeStyle,
      buildResponsiveStyles(size, (sizeValue: HeadingSize) => ({
        fontSize: sizeValue === 'inherit' ? sizeValue : sizeMap[sizeValue],
        fontWeight: sizeValue === 'small' ? fontWeightSemiBold : fontWeightRegular,
      })),
      align,
      color,
      ellipsis
    ),
  });
};
