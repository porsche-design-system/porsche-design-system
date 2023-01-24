import type { BreakpointCustomizable, Theme } from '../../types';
import type { NumberOfPageLinks } from './pagination-utils';
import { buildResponsiveStyles, getCss, isThemeDark } from '../../utils';
import { addImportantToRule, getInsetJssStyle, getThemedColors, getTransition, pxToRemWithUnit } from '../../styles';
import { borderRadiusSmall, borderWidthBase, textSmallStyle } from '@porsche-design-system/utilities-v2';
import { hoverMediaQuery } from '../../styles/hover-media-query';

export const getComponentCss = (
  maxNumberOfPageLinks: BreakpointCustomizable<NumberOfPageLinks>,
  theme: Theme
): string => {
  const { contrastMediumColor, primaryColor, disabledColor, hoverColor, activeColor, focusColor } =
    getThemedColors(theme);

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        outline: addImportantToRule(0),
      },
      nav: {
        display: 'flex',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
        ...buildResponsiveStyles(maxNumberOfPageLinks, (n: NumberOfPageLinks) => ({
          counterReset: `size ${n}`,
        })),
      },
      ul: {
        display: 'flex',
        margin: 0,
        padding: 0,
      },
      li: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
      },
      span: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: getTransition('color'),
        position: 'relative',
        width: pxToRemWithUnit(40),
        height: pxToRemWithUnit(40),
        boxSizing: 'border-box',
        textDecoration: 'underline',
        ...textSmallStyle,
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        color: primaryColor,
        outline: 0,
        ...hoverMediaQuery({
          '&:hover': {
            color: hoverColor,
          },
        }),
        '&:focus::before': {
          content: '""',
          position: 'absolute',
          ...getInsetJssStyle(-2),
          border: `${borderWidthBase} solid ${focusColor}`,
          borderRadius: borderRadiusSmall,
        },
        '&:focus:not(:focus-visible)::before': {
          borderColor: 'transparent',
        },
        '&:active': {
          outline: 'none',
          color: activeColor,
        },
        '&[aria-disabled]': {
          cursor: 'default',
          pointerEvents: 'none',
          color: disabledColor,
        },
        '&[aria-label="Previous page"], &[aria-label="Next page"]': {
          border: `${borderWidthBase} solid ${isThemeDark(theme) ? contrastMediumColor : contrastMediumColor}`,
          borderRadius: borderRadiusSmall,
        },
        '&[aria-label="ellipsis"]': {
          textDecoration: 'none',
        },
        '&[aria-current]': {
          cursor: 'default',
          textDecoration: 'none',
          border: `${borderWidthBase} solid ${isThemeDark(theme) ? contrastMediumColor : primaryColor}`,
          borderRadius: borderRadiusSmall,
          ...hoverMediaQuery({
            '&:hover': {
              color: primaryColor,
            },
          }),
        },
      },
    },
    ellipsis: {
      cursor: 'default',
      pointerEvents: 'none',
      '&::after': {
        content: '"…"',
      },
    },
  });
};
