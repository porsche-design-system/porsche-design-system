import type { JssStyle } from 'jss';
import type { HeadingVariant, TextAlign, TextColor, TextSize, Theme, HeadingVariantType } from '../../types';
import { buildResponsiveStyles, getCss, textMap } from '../../utils';
import { addImportantToEachRule, getThemedColors } from '../../styles';
import {
  headingLargeStyle,
  headingXLargeStyle,
  headingMediumStyle,
  headingSmallStyle,
  headingXXLargeStyle,
  fontWeight,
  textSmallStyle,
  displayLargeStyle,
} from '@porsche-design-system/utilities-v2';
import { getEllipsisJssStyle, getSlottedTypographyJssStyle } from '../../styles/typography-styles';
import { isHeadingVariantType } from './heading-utils';
import type { HeadlineVariantDeprecated } from '../headline/headline-utils';
import { hostHiddenStyles } from '../../styles/host-hidden-styles';
import { isHeadlineVariantType, HeadlineVariantTypeDeprecated } from '../headline/headline-utils';

const headingMap: Record<HeadingVariantType | HeadlineVariantTypeDeprecated, JssStyle> = {
  'large-title': displayLargeStyle,
  'heading-1': headingXXLargeStyle,
  'heading-2': headingXLargeStyle,
  'heading-3': headingLargeStyle,
  'heading-4': headingMediumStyle,
  'heading-5': headingSmallStyle,
  'headline-1': headingXXLargeStyle, // deprecated
  'headline-2': headingXLargeStyle, // deprecated
  'headline-3': headingLargeStyle, // deprecated
  'headline-4': headingMediumStyle, // deprecated
  'headline-5': headingSmallStyle, // deprecated
};

const getVariantJssStyle = (variant: HeadingVariant | HeadlineVariantDeprecated): JssStyle => {
  return headingMap[variant as HeadingVariantType];
};

const getSizeJssStyle = (textSize: TextSize): JssStyle => {
  const { semiBold: fontWeightSemiBold } = fontWeight;
  return textSize === 'inherit'
    ? {
        fontSize: textSize,
        fontWeight: fontWeightSemiBold,
      }
    : {
        font: textMap[textSize].font.replace('400', fontWeightSemiBold),
      };
};

export const getComponentCss = (
  variant: HeadingVariant | HeadlineVariantDeprecated,
  align: TextAlign,
  color: Extract<TextColor, 'primary' | 'default' | 'inherit'>,
  ellipsis: boolean,
  theme: Theme
): string => {
  return getCss({
    '@global': {
      ':host': {
        ...addImportantToEachRule({ ...hostHiddenStyles }),
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
      ...(isHeadingVariantType(variant) || isHeadlineVariantType(variant)
        ? getVariantJssStyle(variant)
        : {
            ...textSmallStyle,
            ...buildResponsiveStyles(variant, getSizeJssStyle),
            overflowWrap: null,
            hyphens: null,
          }),
      ...(ellipsis && getEllipsisJssStyle()),
    },
  });
};
