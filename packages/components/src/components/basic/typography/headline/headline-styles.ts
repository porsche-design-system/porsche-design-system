import type { JssStyle } from '../../../../utils';
import type { HeadlineVariant, TextAlign, TextColor, Theme, VariantType } from '../../../../types';
import { buildSlottedStyles, getCss, mergeDeep } from '../../../../utils';
import { addImportantToEachRule, getBaseSlottedStyles } from '../../../../styles/styles';
// eslint-disable-next-line no-restricted-imports
import { titleLarge, headline } from '@porsche-design-system/utilities';
import { getEllipsisStyles, getSlottedTypographyStyles } from '../../../../styles/typography-styles';
import { isVariantType } from './headline-utils';
import { getThemedColors } from '../../../../styles/colors';

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
      '&(h1),&(h2),&(h3),&(h4),&(h5),&(h6)': addImportantToEachRule(getSlottedTypographyStyles()),
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
      ...(ellipsis && getEllipsisStyles()),
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, mergeDeep(getBaseSlottedStyles(), { '& a': { textDecoration: 'none' } })));
};
