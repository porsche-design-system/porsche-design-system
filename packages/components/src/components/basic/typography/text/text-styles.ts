import type { JssStyle } from 'jss';
import type { BreakpointCustomizable } from '../../../../utils';
import type { TextAlign, TextColor, TextSize, TextWeight, Theme } from '../../../../types';
import { buildSlottedStyles, getCss, buildResponsiveStyles, paramCaseToCamelCase } from '../../../../utils';
import { addImportantToEachRule, getBaseSlottedStyles } from '../../../../styles';
import { fontWeight, text, textSmall } from '@porsche-design-system/utilities-v2';
import { getEllipsisJssStyle, getSlottedTypographyJssStyle } from '../../../../styles/typography-styles';
import { getThemedTextColor } from '../../../../styles/text-icon-styles';

export const getComponentCss = (
  size: BreakpointCustomizable<TextSize>,
  weight: TextWeight,
  align: TextAlign,
  color: TextColor,
  ellipsis: boolean,
  theme: Theme
): string => {
  // function is local to reuse `weight` parameter
  // TODO: font short hand isn't really the best choice but we don't have any better alternative atm
  const getSizeJssStyle = (textSize: TextSize): JssStyle => {
    return textSize === 'inherit'
      ? { lineHeight: textSize, fontSize: textSize, fontWeight: fontWeight[weight] }
      : { font: text[paramCaseToCamelCase(textSize)].font.replace('400', fontWeight[weight]) };
  };

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
      },
      '::slotted': {
        '&(p),&(address),&(blockquote),&(figcaption),&(cite),&(time),&(legend)': addImportantToEachRule(
          getSlottedTypographyJssStyle()
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
      ...(ellipsis && getEllipsisJssStyle()),
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
