import {
  addImportantToEachRule,
  buildResponsiveStyles,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  getThemedColors,
  mergeDeep,
} from '../../../../utils';
import type { JssStyle } from '../../../../utils';
import { HeadlineVariant, TextAlign, TextColor, TextSize, Theme, VariantType } from '../../../../types';
import { title, headline, text } from '@porsche-design-system/utilities';
import { getDefaultEllipsisStyles, getDefaultSlottedTypoStyles } from '../../../../styles/typo-styles';
import { textSizeMapper } from '../text/text-styles';

const getVariantStyle = (variant: HeadlineVariant): JssStyle => {
  if (variant === 'inherit') {
    return { fontSize: 'inherit' };
  }
  if (variant === 'large-title') {
    return title.large;
  }
  if (textSizeMapper[variant as TextSize]) {
    return text[textSizeMapper[variant as TextSize]];
  }
  return headline[(variant as VariantType).slice(-1)];
};

export const getComponentCss = (
  variant: HeadlineVariant,
  ellipsis: boolean,
  theme: Theme,
  align: TextAlign,
  color: Extract<TextColor, 'default' | 'inherit'>
): string => {
  const { baseColor } = getThemedColors(theme);

  return getCss({
    ':host': {
      display: 'block',
    },
    ...addImportantToEachRule({
      '::slotted(h1), ::slotted(h2), ::slotted(h3), ::slotted(h4), ::slotted(h5), ::slotted(h6)':
        getDefaultSlottedTypoStyles(),
    }),
    root: {
      padding: 0,
      margin: 0,
      webkitTextSizeAdjust: 'none', // stop iOS safari from adjusting font size when screen rotation is changing
      textAlign: align,
      color: baseColor,
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      hyphens: 'auto',
      whiteSpace: 'inherit',
      ...buildResponsiveStyles(variant, getVariantStyle),
      ...(color !== 'default' && { color: 'inherit' }),
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
