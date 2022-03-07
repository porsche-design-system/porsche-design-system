import type { BreakpointCustomizable, Theme } from '../../../types';
import type { NumberOfPageLinks } from './pagination-utils';
import { buildResponsiveStyle, getCss } from '../../../utils';
import { addImportantToRule, getFocusStyle, getThemedColors, getTransition, pxToRemWithUnit } from '../../../styles';
import { textSmall } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (
  maxNumberOfPageLinks: BreakpointCustomizable<NumberOfPageLinks>,
  theme: Theme
): string => {
  const { baseColor, brandColor, disabledColor, hoverColor, activeColor, focusColor } = getThemedColors(theme);

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
        ...buildResponsiveStyle(maxNumberOfPageLinks, (n: NumberOfPageLinks) => ({
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
        ...textSmall,
        cursor: 'pointer',
        color: baseColor,
        ...getFocusStyle({ color: focusColor, offset: 1 }),
        '&:hover': {
          color: hoverColor,
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
        '&[aria-current]': {
          cursor: 'default',
          '&:hover': {
            color: baseColor,
          },
          '&::after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            bottom: 0,
            left: pxToRemWithUnit(6),
            right: pxToRemWithUnit(6),
            height: pxToRemWithUnit(4),
            background: brandColor,
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
