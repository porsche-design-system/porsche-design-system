import {
  addImportantToEachRule,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  getThemedColors,
  mergeDeep,
} from '../../../../utils';
import type { JssStyle } from '../../../../utils';
import { HeadlineVariant, TextAlign, TextColor, Theme, VariantType } from '../../../../types';
import { title, headline } from '@porsche-design-system/utilities';
import { getDefaultEllipsisStyles, getDefaultSlottedTypoStyles } from '../../../../styles/typo-styles';
import { isVariantType } from './headline-utils';

const getVariantStyle = (variant: HeadlineVariant): JssStyle => {
  return variant === 'large-title' ? title.large : headline[(variant as VariantType).slice(-1)];
};

export const getComponentCss = (
  variant: HeadlineVariant,
  align: TextAlign,
  color: Extract<TextColor, 'default' | 'inherit'>,
  ellipsis: boolean,
  theme: Theme
): string => {
  const { baseColor } = getThemedColors(theme);

  return getCss({
    ':host': {
      display: 'block',
    },
    ...addImportantToEachRule({
      '::slotted(h1),::slotted(h2),::slotted(h3),::slotted(h4),::slotted(h5),::slotted(h6)':
        getDefaultSlottedTypoStyles(),
    }),
    root: {
      padding: 0,
      margin: 0,
      WebkitTextSizeAdjust: 'none', // stop iOS safari from adjusting font size when screen rotation is changing
      textAlign: align,
      color: color !== 'default' ? 'inherit' : baseColor,
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      hyphens: 'auto',
      whiteSpace: 'inherit',
      ...(isVariantType(variant) ? getVariantStyle(variant) : variant === 'inherit' && { fontSize: 'inherit' }),
      ...(ellipsis && getDefaultEllipsisStyles()),
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    mergeDeep(
      buildSlottedStyles(host, getBaseSlottedStyles()),
      buildSlottedStyles(host, { '& a': { textDecoration: 'none' } })
    )
  );
};
