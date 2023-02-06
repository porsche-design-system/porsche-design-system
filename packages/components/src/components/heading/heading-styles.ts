import type { JssStyle } from 'jss';
import type { TextAlign, TextColor, Theme, HeadingSize } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import { addImportantToEachRule, getThemedColors } from '../../styles';
import { fontWeight, textSmallStyle } from '@porsche-design-system/utilities-v2';
import { getEllipsisJssStyle, getSlottedTypographyJssStyle } from '../../styles/typography-styles';
import type { HeadlineVariantDeprecated } from '../headline/headline-utils';
import { hostHiddenStyles } from '../../styles/host-hidden-styles';
import { isHeadlineVariantType } from '../headline/headline-utils';
import { BreakpointCustomizable } from '../../types';
import { headingMap } from '../../utils/typography/headingMap';

// needed for deprecated p-headline
export const getVariantJssStyle = (
  variant: BreakpointCustomizable<HeadingSize> | HeadlineVariantDeprecated
): JssStyle => {
  return headingMap[variant as HeadingSize];
};

export const getSizeJssStyle = (headingSize: HeadingSize): JssStyle => {
  const { semiBold: fontWeightSemiBold } = fontWeight;
  return headingSize === 'inherit'
    ? {
        fontSize: headingSize,
        fontWeight: fontWeightSemiBold,
      }
    : {
        font: headingMap[headingSize].font.replace('400', fontWeightSemiBold),
      };
};

export const getComponentCss = (
  size: BreakpointCustomizable<HeadingSize> | HeadlineVariantDeprecated,
  align: TextAlign,
  color: Extract<TextColor, 'primary' | 'default' | 'inherit'>,
  ellipsis: boolean,
  theme: Theme
): string => {
  return getCss({
    '@global': {
      ':host': {
        ...addImportantToEachRule(hostHiddenStyles),
        display: 'block',
      },
      '::slotted': {
        '&(h1),&(h2),&(h3),&(h4),&(h5),&(h6)': addImportantToEachRule(getSlottedTypographyJssStyle()),
      },
    },
    root: {
      padding: 0,
      margin: 0,
      textAlign: align,
      color: color === 'inherit' ? 'inherit' : getThemedColors(theme).primaryColor,
      whiteSpace: 'inherit',
      ...(isHeadlineVariantType(size)
        ? getVariantJssStyle(size)
        : {
            ...textSmallStyle,
            ...buildResponsiveStyles(size, getSizeJssStyle),
            overflowWrap: null,
            hyphens: null,
          }),
      ...(ellipsis && getEllipsisJssStyle()),
    },
  });
};
