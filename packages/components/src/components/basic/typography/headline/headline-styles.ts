import type { JssStyle } from 'jss';
import type { HeadlineVariant, TextAlign, TextColor, TextSize, Theme, VariantType } from '../../../../types';
import { buildResponsiveStyles, buildSlottedStyles, getCss, mergeDeep, textMap } from '../../../../utils';
import { addImportantToEachRule, getBaseSlottedStyles, getThemedColors } from '../../../../styles';
import {
  headingLarge,
  headingXLarge,
  headingMedium,
  headingSmall,
  headingXSmall,
  headingXXLarge,
  fontWeight,
  textSmall,
} from '@porsche-design-system/utilities-v2';
import { getEllipsisJssStyle, getSlottedTypographyJssStyle } from '../../../../styles/typography-styles';
import { isVariantType } from './headline-utils';

const headingMap: { [key in VariantType]: JssStyle } = {
  'large-title': headingXXLarge,
  'headline-1': headingXLarge,
  'headline-2': headingLarge,
  'headline-3': headingMedium,
  'headline-4': headingSmall,
  'headline-5': headingXSmall,
};

const getVariantJssStyle = (variant: HeadlineVariant): JssStyle => {
  return headingMap[variant as VariantType];
};

const getSizeJssStyle = (textSize: TextSize): JssStyle => {
  const { semiBold: fontWeightSemiBold } = fontWeight;
  return textSize === 'inherit'
    ? {
        lineHeight: textSize,
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
  color: Extract<TextColor, 'default' | 'inherit'>,
  ellipsis: boolean,
  theme: Theme
): string => {
  return getCss({
    '@global': {
      ':host': {
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
      color: color !== 'default' ? 'inherit' : getThemedColors(theme).baseColor,
      whiteSpace: 'inherit',
      ...(isVariantType(variant)
        ? getVariantJssStyle(variant)
        : {
            ...textSmall,
            ...buildResponsiveStyles(variant, getSizeJssStyle),
            transition: 'font-size 1ms linear',
            overflowWrap: null,
            hyphens: null,
          }),
      ...(ellipsis && getEllipsisJssStyle()),
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, mergeDeep(getBaseSlottedStyles(), { '& a': { textDecoration: 'none' } })));
};
