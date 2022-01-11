import {
  addImportantToEachRule,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  getThemedColor,
  buildResponsiveStyles,
  paramCaseToCamelCase,
} from '../../../../utils';
import type { BreakpointCustomizable, JssStyle } from '../../../../utils';
import type { TextAlign, TextColor, TextSize, TextWeight, Theme } from '../../../../types';
import { fontFamily, fontWeight, text } from '@porsche-design-system/utilities';
import { getDefaultEllipsisStyles, getDefaultSlottedTypoStyles } from '../../../../styles/typo-styles';

const getSizeStyles = (size: TextSize): JssStyle => {
  if (size === 'inherit') {
    return { lineHeight: 'inherit', fontSize: 'inherit' };
  } else {
    const { lineHeight, fontSize } = text[paramCaseToCamelCase(size)];
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
    '::slotted': {
      '&(p),&(address),&(blockquote),&(figcaption),&(cite),&(time),&(legend)': addImportantToEachRule(
        getDefaultSlottedTypoStyles()
      ),
    },
    root: {
      display: 'inherit',
      padding: 0,
      margin: 0,
      textAlign: align,
      fontFamily,
      fontWeight: fontWeight[weight],
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
