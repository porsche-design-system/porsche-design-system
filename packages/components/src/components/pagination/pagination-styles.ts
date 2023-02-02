import type { BreakpointCustomizable, Theme } from '../../types';
import type { NumberOfPageLinks } from './pagination-utils';
import { buildResponsiveStyles, getCss } from '../../utils';
import {
  addImportantToEachRule,
  getInsetJssStyle,
  getThemedColors,
  getTransition,
  pxToRemWithUnit,
} from '../../styles';
import {
  borderRadiusSmall,
  borderRadiusMedium,
  borderWidthBase,
  frostedGlassStyle,
  textSmallStyle,
  spacingStaticSmall,
} from '@porsche-design-system/utilities-v2';
import { hoverMediaQuery } from '../../styles/hover-media-query';
import { hostHiddenStyles } from '../../styles/host-hidden-styles';

export const getComponentCss = (
  maxNumberOfPageLinks: BreakpointCustomizable<NumberOfPageLinks>,
  theme: Theme
): string => {
  const { primaryColor, disabledColor, hoverColor, focusColor } = getThemedColors(theme);

  return getCss({
    '@global': {
      ':host': {
        ...addImportantToEachRule({
          ...hostHiddenStyles,
          outline: 0,
        }),
        display: 'block',
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
        gap: spacingStaticSmall,
        margin: 0,
        padding: 0,
      },
      li: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        '&:first-child': {
          marginRight: spacingStaticSmall,
        },
        '&:last-child': {
          marginLeft: spacingStaticSmall,
        },
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
        outline: 0,
        borderRadius: borderRadiusSmall,
        ...hoverMediaQuery({
          '&:hover': {
            ...frostedGlassStyle,
            backgroundColor: hoverColor,
          },
        }),
        '&:focus::before': {
          content: '""',
          position: 'absolute',
          ...getInsetJssStyle(-4),
          border: `${borderWidthBase} solid ${focusColor}`,
          borderRadius: borderRadiusMedium,
        },
        '&[aria-current]:focus::before': {
          ...getInsetJssStyle('auto'),
          width: pxToRemWithUnit(44),
          height: pxToRemWithUnit(44),
        },
        '&:focus:not(:focus-visible)::before': {
          borderColor: 'transparent',
        },
        '&[aria-disabled]': {
          cursor: 'default',
          pointerEvents: 'none',
          color: disabledColor,
        },
        '&[aria-current]': {
          cursor: 'default',
          pointerEvents: 'none',
          color: primaryColor,
          border: `${borderWidthBase} solid ${primaryColor}`,
        },
      },
    },
    ellipsis: {
      cursor: 'default',
      pointerEvents: 'none',
      '&::after': {
        content: '"…"',
      },
      '&:focus::before': {
        borderColor: 'transparent',
      },
    },
  });
};
