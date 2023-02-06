import type { BreakpointCustomizable, TextAlign, TextColor, TextSize, TextWeight, Theme } from '../../types';
import { buildResponsiveStyles, getCss, textSizeMap } from '../../utils';
import { addImportantToEachRule } from '../../styles';
import { textSmallStyle } from '@porsche-design-system/utilities-v2';
import { getEllipsisJssStyle, getSlottedTypographyJssStyle } from '../../styles/typography-styles';
import { getThemedTextColor } from '../../styles/text-icon-styles';
import { getFontWeight } from '../../styles/font-weight-styles';
import { hostHiddenStyles } from '../../styles/host-hidden-styles';

export const getComponentCss = (
  size: BreakpointCustomizable<TextSize>,
  weight: TextWeight,
  align: TextAlign,
  color: TextColor,
  ellipsis: boolean,
  theme: Theme
): string => {
  return getCss({
    '@global': {
      ':host': {
        ...hostHiddenStyles,
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
      margin: 0,
      padding: 0,
      textAlign: align,
      ...textSmallStyle,
      letterSpacing: 'normal',
      color: getThemedTextColor(theme, color),
      listStyleType: 'none',
      whiteSpace: 'inherit',
      ...(ellipsis && getEllipsisJssStyle()),
      ...buildResponsiveStyles(size, (sizeValue: TextSize) => ({
        fontSize: sizeValue === 'inherit' ? sizeValue : textSizeMap[sizeValue],
        fontWeight: getFontWeight(weight),
      })),
    },
  });
};
