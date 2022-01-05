import {
  addImportantToEachRule,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  getThemedColors,
  mergeDeep,
  JssStyle,
  Styles,
} from '../../../../utils';
import { HeadlineVariant, TextAlign, TextColor, Theme, VariantType } from '../../../../types';
import { title, headline } from '@porsche-design-system/utilities';
import { getDefaultEllipsisStyles, getDefaultSlottedTypoStyles } from '../../../../styles/typo-styles';

const getVariantStyle = (variant: HeadlineVariant): JssStyle => {
  if (variant === 'inherit') {
    return { fontSize: 'inherit' };
  }
  if (variant === 'large-title') {
    return title.large;
  }
  const headlineVariant = variant as VariantType;
  return headline[headlineVariant.slice(-1)];
};

export const getComponentCss = (
  variant: HeadlineVariant,
  ellipsis: boolean,
  theme: Theme,
  align: TextAlign,
  color: Extract<TextColor, 'default' | 'inherit'>
): string => {
  const { baseColor } = getThemedColors(theme);

  return getCss(
    mergeDeep<Styles>({
      ':host': {
        display: 'block',
      },
      ...addImportantToEachRule({
        '::slotted(h1), ::slotted(h2), ::slotted(h3), ::slotted(h4), ::slotted(h5), ::slotted(h6)':
          getDefaultSlottedTypoStyles,
      }),
      root: {
        padding: 0,
        margin: 0,
        webkitTextSizeAdjust: 'none', // stop iOS safari from adjusting font size when screen rotation is changing
        align,
        color: baseColor,
        overflowWrap: 'break-word',
        wordWrap: 'break-word',
        hyphens: 'auto',
        whiteSpace: 'inherit',
        ...getVariantStyle(variant),
        ...(color !== 'default' && { color: 'inherit' }),
        ...(ellipsis && getDefaultEllipsisStyles),
      },
    })
  );
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    mergeDeep(
      buildSlottedStyles(host, getBaseSlottedStyles()),
      buildSlottedStyles(host, { '& a': { textDecoration: 'none' } })
    )
  );
};
