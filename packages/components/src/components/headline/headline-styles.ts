import type { JssStyle } from 'jss';
import type { HeadlineVariant, TextAlign, TextColor, TextSize, Theme, VariantType } from '../../types';
import { buildResponsiveStyles, buildSlottedStyles, getCss, mergeDeep, textMap } from '../../utils';
import { addImportantToEachRule, getBaseSlottedStyles, getThemedColors, hostHiddenStyles } from '../../styles';
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
import { isVariantType } from './headline-utils';

const headingMap: Record<VariantType, JssStyle> = {
  'large-title': displayLargeStyle,
  'headline-1': headingXXLargeStyle,
  'headline-2': headingXLargeStyle,
  'headline-3': headingLargeStyle,
  'headline-4': headingMediumStyle,
  'headline-5': headingSmallStyle,
};

const getVariantJssStyle = (variant: HeadlineVariant): JssStyle => {
  return headingMap[variant as VariantType];
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
  variant: HeadlineVariant,
  align: TextAlign,
  color: Extract<TextColor, 'primary' | 'default' | 'inherit'>,
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
        '&(h1),&(h2),&(h3),&(h4),&(h5),&(h6)': addImportantToEachRule(getSlottedTypographyJssStyle()),
      },
    },
    root: {
      padding: 0,
      margin: 0,
      textAlign: align,
      color: color === 'inherit' ? 'inherit' : getThemedColors(theme).primaryColor,
      whiteSpace: 'inherit',
      ...(isVariantType(variant)
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

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    buildSlottedStyles(
      host,
      mergeDeep(getBaseSlottedStyles({ withDarkTheme: true }), { '& a': { textDecoration: 'none' } })
    )
  );
};
