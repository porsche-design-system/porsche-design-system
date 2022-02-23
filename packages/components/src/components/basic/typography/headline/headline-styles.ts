import type { JssStyle } from 'jss';
import type { HeadlineVariant, TextAlign, TextColor, Theme, VariantType } from '../../../../types';
import { buildSlottedStyles, getCss, mergeDeep } from '../../../../utils';
import { addImportantToEachRule, getBaseSlottedStyles, getThemedColors } from '../../../../styles';
import { titleLarge, headline } from '@porsche-design-system/utilities-v2';
import { getEllipsisStyle, getSlottedTypographyStyle } from '../../../../styles/typography-styles';
import { isVariantType } from './headline-utils';

const getVariantStyle = (variant: HeadlineVariant): JssStyle => {
  return variant === 'large-title' ? titleLarge : headline[(variant as VariantType).slice(-1)];
};

export const getComponentCss = (
  variant: HeadlineVariant,
  align: TextAlign,
  color: Extract<TextColor, 'default' | 'inherit'>,
  ellipsis: boolean,
  theme: Theme
): string => {
  return getCss({
    ':host': {
      display: 'block',
    },
    '::slotted': {
      '&(h1),&(h2),&(h3),&(h4),&(h5),&(h6)': addImportantToEachRule(getSlottedTypographyStyle()),
    },
    root: {
      padding: 0,
      margin: 0,
      WebkitTextSizeAdjust: 'none', // stop iOS safari from adjusting font size when screen rotation is changing
      textAlign: align,
      color: color !== 'default' ? 'inherit' : getThemedColors(theme).baseColor,
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      hyphens: 'auto',
      whiteSpace: 'inherit',
      ...(isVariantType(variant) ? getVariantStyle(variant) : variant === 'inherit' && { fontSize: 'inherit' }),
      ...(ellipsis && getEllipsisStyle()),
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, mergeDeep(getBaseSlottedStyles(), { '& a': { textDecoration: 'none' } })));
};
