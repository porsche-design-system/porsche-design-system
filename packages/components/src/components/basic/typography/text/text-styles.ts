import type { JssStyle, Styles } from 'jss';
import type { BreakpointCustomizable } from '../../../../utils';
import type { TextAlign, TextColor, TextSize, TextWeight, Theme } from '../../../../types';
import { buildSlottedStyles, getCss, buildResponsiveStyles, paramCaseToCamelCase, mergeDeep } from '../../../../utils';
import { addImportantToEachRule, getBaseSlottedStyles, getFocusStyles, getHoverStyles } from '../../../../styles';
import { fontFamily, fontWeight, text } from '@porsche-design-system/utilities-v2';
import { getEllipsisStyles, getSlottedTypographyStyles } from '../../../../styles/typography-styles';
import { getThemedTextColor } from '../../../../styles/text-icon-styles';
import { getNativeLinkButtonResetStyles } from '../../../../styles/link-button-pure-styles';

const getSizeStyles = (size: TextSize): Pick<JssStyle, 'lineHeight' | 'fontSize'> => {
  return size === 'inherit'
    ? { lineHeight: size, fontSize: size }
    : (({ lineHeight, fontSize }) => ({ lineHeight, fontSize }))(text[paramCaseToCamelCase(size)]);
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
      ...(ellipsis && getEllipsisStyles()),
      ...buildResponsiveStyles(size, getSizeStyles),
    },
  });
};

const getSlottedButtonStyles = (): Styles => {
  return {
    '& button': {
      ...getNativeLinkButtonResetStyles(false),
      background: 'transparent',
      color: 'inherit',
      textDecoration: 'underline',
      font: 'inherit',
      ...getHoverStyles(),
      ...getFocusStyles({ offset: 1 }),
    },
  };
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, mergeDeep(getBaseSlottedStyles(), getSlottedButtonStyles())));
};
