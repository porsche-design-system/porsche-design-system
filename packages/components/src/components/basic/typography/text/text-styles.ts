import {
  addImportantToEachRule,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  getThemedColor,
  buildResponsiveStyles,
} from '../../../../utils';
import type { BreakpointCustomizable, JssStyle } from '../../../../utils';
import { TextAlign, TextColor, TextSize, TextWeight, Theme } from '../../../../types';
import { font, text } from '@porsche-design-system/utilities';
import { getDefaultEllipsisStyles, getDefaultSlottedTypoStyles } from '../../../../styles/typo-styles';

export const textSizeMapper: { [key in Exclude<TextSize, 'inherit'>]: string } = {
  'x-small': 'xSmall',
  small: 'small',
  medium: 'medium',
  large: 'large',
  'x-large': 'xLarge',
};

const getSizeStyles = (size: TextSize): JssStyle => {
  if (size === 'inherit') {
    return { fontSize: 'inherit', lineHeight: 'inherit' };
  } else {
    const { lineHeight, fontSize } = text[textSizeMapper[size]];
    return { lineHeight, fontSize };
  }
};

export const getComponentCss = (
  size: BreakpointCustomizable<TextSize>,
  weight: TextWeight,
  align: TextAlign,
  color: TextColor,
  ellipsis: boolean,
  theme: Theme
): string => {
  return getCss({
    ':host': {
      display: 'block',
    },
    ...addImportantToEachRule({
      '::slotted(p),::slotted(address),::slotted(blockquote),::slotted(figcaption),::slotted(cite),::slotted(time),::slotted(legend)':
        getDefaultSlottedTypoStyles(),
    }),
    root: {
      display: 'inherit',
      padding: 0,
      margin: 0,
      textAlign: align,
      fontFamily: font.family,
      fontWeight: font.weight[weight],
      color: getThemedColor(color, theme),
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      hyphens: 'auto',
      listStyleType: 'none',
      whiteSpace: 'inherit',
      transition: 'font-size 1ms linear',
      WebkitTextSizeAdjust: 'none', // stop iOS safari from adjusting font size when screen rotation is changing
      ...(ellipsis && getDefaultEllipsisStyles()),
      ...buildResponsiveStyles(size, getSizeStyles),
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
