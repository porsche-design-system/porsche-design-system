import type { JssStyle } from 'jss';
import type { BreakpointCustomizable } from '../../../../utils';
import type { TextAlign, TextColor, TextSize, TextWeight, Theme } from '../../../../types';
import { buildSlottedStyles, getCss, buildResponsiveStyles, paramCaseToCamelCase } from '../../../../utils';
import { addImportantToEachRule, getBaseSlottedStyles } from '../../../../styles';
import { textSmall, fontWeight, text } from '@porsche-design-system/utilities-v2';
import { getEllipsisStyles, getSlottedTypographyStyles } from '../../../../styles/typography-styles';
import { getThemedTextColor } from '../../../../styles/text-icon-styles';

export const getComponentCss = (
  size: BreakpointCustomizable<TextSize>,
  weight: TextWeight,
  align: TextAlign,
  color: TextColor,
  ellipsis: boolean,
  theme: Theme
): string => {
  const getSizeJssStyle = (size: TextSize): JssStyle => {
    return {
      ...(size === 'inherit' ? { lineHeight: size, fontSize: size } : text[paramCaseToCamelCase(size)]),
      fontWeight: fontWeight[weight],
    };
  };

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
      },
      '::slotted': {
        '&(p),&(address),&(blockquote),&(figcaption),&(cite),&(time),&(legend)': addImportantToEachRule(
          getSlottedTypographyStyles()
        ),
      },
    },
    root: {
      display: 'inherit',
      padding: 0,
      margin: 0,
      textAlign: align,
      ...textSmall,
      color: getThemedTextColor(theme, color),
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      hyphens: 'auto',
      listStyleType: 'none',
      whiteSpace: 'inherit',
      transition: 'font-size 1ms linear',
      WebkitTextSizeAdjust: 'none', // stop iOS safari from adjusting font size when screen rotation is changing
      ...(ellipsis && getEllipsisStyles()),
      ...buildResponsiveStyles(size, getSizeJssStyle),
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    buildSlottedStyles(host, {
      '& button': {
        margin: 0,
        padding: 0,
        background: 0,
        border: 0,
        cursor: 'pointer',
        font: 'inherit',
      },
      // adjust keys of baseSlottedStyles to be applied on both, `a` and `button` tag
      ...Object.fromEntries(
        Object.entries(getBaseSlottedStyles()).map(([key, value]) => [
          key.includes(' a') ? `${key},${key.replace(' a', ' button')}` : key,
          value,
        ])
      ),
    })
  );
};
