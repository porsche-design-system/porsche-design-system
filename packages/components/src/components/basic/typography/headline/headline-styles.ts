import type { JssStyle } from 'jss';
import type { HeadlineVariant, Hyphens, TextAlign, TextColor, Theme, VariantType } from '../../../../types';
import { buildSlottedStyles, getCss, mergeDeep } from '../../../../utils';
import { addImportantToEachRule, getBaseSlottedStyles, getThemedColors } from '../../../../styles';
import { headline, titleLarge } from '@porsche-design-system/utilities-v2';
import { getEllipsisJssStyle, getSlottedTypographyJssStyle } from '../../../../styles/typography-styles';
import { isVariantType } from './headline-utils';

const getVariantStyle = (variant: HeadlineVariant): JssStyle => {
  return variant === 'large-title' ? titleLarge : headline[(variant as VariantType).slice(-1)];
};

export const getComponentCss = (
  variant: HeadlineVariant,
  align: TextAlign,
  color: Extract<TextColor, 'default' | 'inherit'>,
  ellipsis: boolean,
  theme: Theme,
  hyphens?: Hyphens
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
      ...(isVariantType(variant) ? getVariantStyle(variant) : variant === 'inherit' && { fontSize: 'inherit' }),
      ...(hyphens && { hyphens: hyphens }),
      ...(ellipsis && getEllipsisJssStyle()),
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, mergeDeep(getBaseSlottedStyles(), { '& a': { textDecoration: 'none' } })));
};
