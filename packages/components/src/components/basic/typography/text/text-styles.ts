import type { JssStyle } from 'jss';
import type { BreakpointCustomizable } from '../../../../utils';
import type { TextAlign, TextColor, TextSize, TextWeight, Theme } from '../../../../types';
import { buildSlottedStyles, getCss, buildResponsiveStyles, paramCaseToCamelCase } from '../../../../utils';
import { addImportantToEachRule, getBaseSlottedStyles } from '../../../../styles';
import { fontFamily, fontWeight, text } from '@porsche-design-system/utilities-v2';
import { getEllipsisStyles, getSlottedTypographyStyles } from '../../../../styles/typography-styles';
import { getThemedTextColor } from '../../../../styles/text-icon-styles';

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

export const getSlottedCss = (host: HTMLElement): string => {
  const baseSlottedStyles = getBaseSlottedStyles();

  return getCss(
    buildSlottedStyles(host, {
      '& button': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        outline: 'transparent none',
        appearance: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        border: 'none',
        background: 'transparent',
        font: 'inherit',
      },
      ...baseSlottedStyles,
      '& a': {},
      '& a,button': baseSlottedStyles['& a'],
      '&[theme="dark"] a:hover': {},
      '&[theme="dark"]': {
        '& a:hover, button:hover': baseSlottedStyles['&[theme="dark"] a:hover'],
      },
    })
  );
};
