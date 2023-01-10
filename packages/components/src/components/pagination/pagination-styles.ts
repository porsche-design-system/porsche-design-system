import type { BreakpointCustomizable, Theme } from '../../types';
import type { NumberOfPageLinks } from './pagination-utils';
import { buildResponsiveStyles, getCss } from '../../utils';
import { addImportantToRule, getFocusJssStyle, getThemedColors, getTransition, pxToRemWithUnit } from '../../styles';
import { textSmallStyle } from '@porsche-design-system/utilities-v2';
import { hoverMediaQuery } from '../../styles/hover-media-query';

export const getComponentCss = (
  maxNumberOfPageLinks: BreakpointCustomizable<NumberOfPageLinks>,
  theme: Theme
): string => {
  const { primaryColor, disabledColor, hoverColor, activeColor, focusColor } = getThemedColors(theme);

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
        textDecoration: 'none',
        ...textSmallStyle,
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        color: primaryColor,
        ...getFocusJssStyle({ color: focusColor, offset: 1 }),
        ...hoverMediaQuery({
          '&:hover': {
            color: hoverColor,
          },
        }),
        '&:active': {
          outline: 'none',
          color: activeColor,
        },
        '&[aria-disabled]': {
          cursor: 'default',
          pointerEvents: 'none',
          color: disabledColor,
        },
        '&[aria-current]': {
          cursor: 'default',
          ...hoverMediaQuery({
            '&:hover': {
              color: primaryColor,
            },
          }),
          '&::after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            bottom: 0,
            left: pxToRemWithUnit(6),
            right: pxToRemWithUnit(6),
            height: pxToRemWithUnit(4),
            background: primaryColor,
          },
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
