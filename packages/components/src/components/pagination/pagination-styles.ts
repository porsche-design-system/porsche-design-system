import type { BreakpointCustomizable, Theme } from '../../types';
import type { NumberOfPageLinks } from './pagination-utils';
import { buildResponsiveStyles, getCss } from '../../utils';
import { addImportantToRule, getInsetJssStyle, getThemedColors, getTransition, pxToRemWithUnit } from '../../styles';
import {
  borderRadiusSmall,
  borderWidthBase,
  frostedGlassStyle,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import { hoverMediaQuery } from '../../styles/hover-media-query';

export const getComponentCss = (
  maxNumberOfPageLinks: BreakpointCustomizable<NumberOfPageLinks>,
  theme: Theme,
  allyLabelPrev: string,
  allyLabelNext: string
): string => {
  const { primaryColor, disabledColor, hoverColor, focusColor } = getThemedColors(theme);

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
        gap: '8px',
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
          color: primaryColor,
          ...getInsetJssStyle(-2),
          border: `${borderWidthBase} solid ${focusColor}`,
          borderRadius: borderRadiusSmall,
        },
        '&:focus:not(:focus-visible)::before': {
          borderColor: 'transparent',
        },
        '&[aria-disabled]': {
          cursor: 'default',
          pointerEvents: 'none',
          color: disabledColor,
        },
        [`&[aria-label="${allyLabelPrev}"]`]: {
          marginRight: '8px',
        },
        [`&[aria-label="${allyLabelNext}"]`]: {
          marginLeft: '8px',
        },
        '&[aria-current]': {
          cursor: 'default',
          pointerEvents: 'none',
          textDecoration: 'none',
          color: primaryColor,
          border: `${borderWidthBase} solid ${primaryColor}`,
        },
      },
    },
    ellipsis: {
      cursor: 'default',
      pointerEvents: 'none',
      textDecoration: 'none',
      '&::after': {
        content: '"…"',
      },
    },
  });
};
