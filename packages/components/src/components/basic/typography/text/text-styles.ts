import {
  addImportantToEachRule,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  buildResponsiveStyles,
  paramCaseToCamelCase,
} from '../../../../utils';
import type { BreakpointCustomizable, JssStyle } from '../../../../utils';
import type { TextAlign, TextColor, TextSize, TextWeight, Theme } from '../../../../types';
import { fontFamily, fontWeight, text } from '@porsche-design-system/utilities';
import { getEllipsisStyles, getSlottedTypographyStyles } from '../../../../styles/typography-styles';
import { getThemedTextColors } from '../../../../styles/colors';

const getSizeStyles = (size: TextSize): Pick<JssStyle, 'lineHeight' | 'fontSize'> => {
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
        getSlottedTypographyStyles()
      ),
    },
    root: {
      display: 'inherit',
      padding: 0,
      margin: 0,
      textAlign: align,
      fontFamily,
      fontWeight: fontWeight[weight],
      color: getThemedTextColors(theme, color),
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      hyphens: 'auto',
      listStyleType: 'none',
      whiteSpace: 'inherit',
      transition: 'font-size 1ms linear',
      WebkitTextSizeAdjust: 'none', // stop iOS safari from adjusting font size when screen rotation is changing
      ...(ellipsis && getEllipsisStyles()),
      ...buildResponsiveStyles(size, getSizeStyles),
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
