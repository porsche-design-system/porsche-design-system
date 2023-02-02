import type { JssStyle } from 'jss';
import type { BreakpointCustomizable, Theme } from '../../types';
import type { NumberOfPageLinks } from './pagination-utils';
import { buildResponsiveStyles, getCss } from '../../utils';
import { addImportantToEachRule, getInsetJssStyle, getThemedColors, getTransition } from '../../styles';
import {
  borderRadiusMedium,
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  frostedGlassStyle,
  getMediaQueryMin,
  spacingStaticSmall,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import { hoverMediaQuery } from '../../styles/hover-media-query';
import { hostHiddenStyles } from '../../styles/host-hidden-styles';

const mediaQueryMinS = getMediaQueryMin('s');

const buttonSizeSmaller = `calc(${fontLineHeight} + 12px)`;
const buttonSizeNormal = `calc(${fontLineHeight} + 16px)`;

const disabledCursorStyle: JssStyle = {
  cursor: 'default',
  pointerEvents: 'none', // prevents :hover
};

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
        }),
        display: 'block',
      },
      nav: {
        display: 'flex',
        justifyContent: 'center',
        ...buildResponsiveStyles(maxNumberOfPageLinks, (n: NumberOfPageLinks) => ({
          counterReset: `size ${n}`,
        })),
      },
      ul: {
        display: 'flex',
        gap: spacingStaticXSmall,
        margin: 0,
        padding: 0,
        [mediaQueryMinS]: {
          gap: spacingStaticSmall,
        },
      },
      li: {
        listStyleType: 'none',
        [mediaQueryMinS]: {
          '&:first-child': {
            marginRight: spacingStaticSmall,
          },
          '&:last-child': {
            marginLeft: spacingStaticSmall,
          },
        },
      },
      span: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: ['border-color', 'background-color'].map(getTransition).join(), // for smooth transition between states
        position: 'relative',
        width: buttonSizeSmaller,
        height: buttonSizeSmaller,
        boxSizing: 'border-box',
        ...textSmallStyle,
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        color: primaryColor,
        outline: 0,
        borderRadius: borderRadiusSmall,
        borderColor: 'transparent', // default value is needed for smooth transition
        // TODO: maybe we can get rid of media query when using clamp(36px, some fluid width based on vw, 40px)
        // custom media query is needed ensuring buttons are getting asap the desired size of 40x40px
        ['@media(min-width:360px)']: {
          width: buttonSizeNormal,
          height: buttonSizeNormal,
        },
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
        '&:focus:not(:focus-visible)::before': {
          borderColor: 'transparent',
        },
        '&[aria-current]': {
          disabledCursorStyle,
          color: primaryColor,
          border: `${borderWidthBase} solid ${primaryColor}`,
          borderRadius: borderRadiusSmall,
          '&:focus::before': {
            ...getInsetJssStyle(-6),
          },
        },
        '&[aria-disabled]': {
          ...disabledCursorStyle,
          color: disabledColor,
        },
      },
    },
    ellipsis: {
      ...disabledCursorStyle,
      '&::after': {
        content: '"…"',
      },
    },
  });
};
