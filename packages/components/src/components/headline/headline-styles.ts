import type { JssStyle } from 'jss';
import type { HeadlineVariant, TextAlign, TextColor, TextSize, Theme, VariantType } from '../../types';
import { buildResponsiveStyles, buildSlottedStyles, getCss, mergeDeep, textMap } from '../../utils';
import { addImportantToEachRule, getBaseSlottedStyles, getThemedColors } from '../../styles';
import {
  headingFluidLarge,
  headingFluidXLarge,
  headingFluidMedium,
  headingFluidSmall,
  headingFluidXXLarge,
  fontWeight,
  textFluidSmall,
  displayFluidLarge,
} from '@porsche-design-system/utilities-v2';
import { getEllipsisJssStyle, getSlottedTypographyJssStyle } from '../../styles/typography-styles';
import { isVariantType } from './headline-utils';

const headingMap: Record<VariantType, JssStyle> = {
  'large-title': displayFluidLarge,
  'headline-1': headingFluidXXLarge,
  'headline-2': headingFluidXLarge,
  'headline-3': headingFluidLarge,
  'headline-4': headingFluidMedium,
  'headline-5': headingFluidSmall,
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
            ...textFluidSmall,
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
