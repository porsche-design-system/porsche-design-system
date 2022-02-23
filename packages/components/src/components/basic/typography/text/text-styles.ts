import type { JssStyle } from 'jss';
import type { BreakpointCustomizable } from '../../../../utils';
import { buildResponsiveStyle, buildSlottedStyles, getCss, paramCaseToCamelCase } from '../../../../utils';
import type { TextAlign, TextColor, TextSize, TextWeight, Theme } from '../../../../types';
import { addImportantToEachRule, getBaseSlottedStyles } from '../../../../styles';
import { fontFamily, fontWeight, text } from '@porsche-design-system/utilities-v2';

import { getThemedTextColor } from '../../../../styles/text-icon-styles';
import { getEllipsisStyle, getSlottedTypographyStyle } from '../../../../styles/typography-styles';

const getSizeStyle = (size: TextSize): Pick<JssStyle, 'lineHeight' | 'fontSize'> => {
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
        getSlottedTypographyStyle()
      ),
    },
    root: {
      display: 'inherit',
      padding: 0,
      margin: 0,
      textAlign: align,
      fontFamily,
      fontWeight: fontWeight[weight],
      color: getThemedTextColor(theme, color),
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      hyphens: 'auto',
      listStyleType: 'none',
      whiteSpace: 'inherit',
      transition: 'font-size 1ms linear',
      WebkitTextSizeAdjust: 'none', // stop iOS safari from adjusting font size when screen rotation is changing
      ...(ellipsis && getEllipsisStyle()),
      ...buildResponsiveStyle(size, getSizeStyle),
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
