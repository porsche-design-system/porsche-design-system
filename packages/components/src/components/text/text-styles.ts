import type { JssStyle } from 'jss';
import type { BreakpointCustomizable, TextAlign, TextColor, TextSize, TextWeight, Theme } from '../../types';
import { buildResponsiveStyles, getCss, textMap } from '../../utils';
import { addImportantToEachRule } from '../../styles';
import { textSmallStyle } from '@porsche-design-system/utilities-v2';
import { getEllipsisJssStyle, getSlottedTypographyJssStyle } from '../../styles/typography-styles';
import { getThemedTextColor } from '../../styles/text-icon-styles';
import { getFontWeight } from '../../styles/font-weight-styles';

export const getComponentCss = (
  size: BreakpointCustomizable<TextSize>,
  weight: TextWeight,
  align: TextAlign,
  color: TextColor,
  ellipsis: boolean,
  theme: Theme
): string => {
  // function is local to reuse `weight` parameter
  // TODO: font shorthand isn't really the best choice but we don't have any better alternative atm
  const getSizeJssStyle = (textSize: TextSize): JssStyle => {
    const fontWeightValue = getFontWeight(weight);
    return textSize === 'inherit'
      ? {
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
      ...textSmallStyle,
      color: getThemedTextColor(theme, color),
      listStyleType: 'none',
      whiteSpace: 'inherit',
      ...(ellipsis && getEllipsisJssStyle()),
      ...buildResponsiveStyles(size, getSizeJssStyle),
    },
  });
};
