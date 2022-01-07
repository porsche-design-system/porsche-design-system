import {
  addImportantToEachRule,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  getColor,
  buildResponsiveStyles,
} from '../../../../utils';
import type { BreakpointCustomizable, JssStyle } from '../../../../utils';
import { TextAlign, TextColor, TextSize, TextWeight, Theme } from '../../../../types';
import { font, text } from '@porsche-design-system/utilities';
import { getDefaultEllipsisStyles, getDefaultSlottedTypoStyles } from '../../../../styles/typo-styles';

export const textSizeMapper = {
  'x-small': 'xSmall',
  small: 'small',
  medium: 'medium',
  large: 'large',
  'x-large': 'xLarge',
};

const getSizeStyles = (size: TextSize): JssStyle => {
  if (size === 'inherit') {
    return { fontSize: 'inherit', lineHeight: 'inherit', fontFamily: font.family };
  }
  const { lineHeight, fontSize } = text[textSizeMapper[size]];
  return { lineHeight, fontSize };
};

export const getComponentCss = (
  align: TextAlign,
  ellipsis: boolean,
  theme: Theme,
  weight: TextWeight,
  color: TextColor,
  size: BreakpointCustomizable<TextSize>
): string => {
  return getCss({
    ':host': {
      display: 'block',
    },
    ...addImportantToEachRule({
      '::slotted(p), ::slotted(address), ::slotted(blockquote), ::slotted(figcaption), ::slotted(cite), ::slotted(time), ::slotted(legend)':
        getDefaultSlottedTypoStyles(),
    }),
    root: {
      WebkitTextSizeAdjust: 'none', // stop iOS safari from adjusting font size when screen rotation is changing
      padding: 0,
      margin: 0,
      textAlign: align,
      fontFamily: font.family,
      fontWeight: font.weight[weight],
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      hyphens: 'auto',
      listStyleType: 'none',
      display: 'inherit',
      color: getColor(color, theme),
      whiteSpace: 'inherit',
      transition: 'font-size 1ms linear',
      ...(ellipsis && getDefaultEllipsisStyles()),
      ...buildResponsiveStyles(size, getSizeStyles),
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
