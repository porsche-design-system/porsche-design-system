import type { JssStyle } from 'jss';
import type { BreakpointCustomizable, Theme } from '../../../../utils';
import type { TextAlign, TextColor, TextSize, TextWeight } from '../../../../types';
import { buildSlottedStyles, getCss, buildResponsiveStyles, textMap } from '../../../../utils';
import { addImportantToEachRule, getBaseSlottedStyles } from '../../../../styles';
import { textSmall } from '@porsche-design-system/utilities-v2';
import { getEllipsisJssStyle, getSlottedTypographyJssStyle } from '../../../../styles/typography-styles';
import { getThemedTextColor } from '../../../../styles/text-icon-styles';
import { getFontWeight } from '../../../../styles/font-weight-styles';

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
    const fontWeightValue = getFontWeight(weight);
    return textSize === 'inherit'
      ? {
          lineHeight: textSize,
          fontSize: textSize,
          fontWeight: fontWeightValue,
        }
      : { font: textMap[textSize].font.replace('400', fontWeightValue) };
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
      listStyleType: 'none',
      whiteSpace: 'inherit',
      transition: 'font-size 1ms linear',
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
      ...Object.entries(getBaseSlottedStyles({ withDarkTheme: true })).reduce((result, [key, value]) => {
        result[key.includes(' a') ? `${key},${key.replace(' a', ' button')}` : key] = value;
        return result;
      }, {} as JssStyle),
    })
  );
};
