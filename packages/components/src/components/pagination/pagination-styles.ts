import type { JssStyle } from 'jss';
import type { BreakpointCustomizable, Theme } from '../../types';
import type { PaginationMaxNumberOfPageLinks } from './pagination-utils';
import { buildResponsiveStyles, getCss } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getInsetJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
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

const mediaQueryMinS = getMediaQueryMin('s');

// button size needs to be fluid between 320px and 360px viewport width, so that the pagination fits into 320px viewport
// and text scale 200% works (almost) on mobile viewports too
const buttonSize = `clamp(36px, calc(${fontLineHeight} + 10vw - 20px), 40px)`;

const disabledCursorStyle: JssStyle = {
  cursor: 'default',
  pointerEvents: 'none', // prevents :hover (has no effect when forced), maybe we can remove it since CSS selectors already cover desired behavior
};

export const getComponentCss = (
  maxNumberOfPageLinks: BreakpointCustomizable<PaginationMaxNumberOfPageLinks>,
  theme: Theme
): string => {
  const { primaryColor, disabledColor, hoverColor, focusColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    disabledColor: disabledColorDark,
    hoverColor: hoverColorDark,
    focusColor: focusColorDark,
  } = getThemedColors('dark');

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      nav: {
        display: 'flex',
        justifyContent: 'center',
        userSelect: 'none',
        ...buildResponsiveStyles(maxNumberOfPageLinks, (n: PaginationMaxNumberOfPageLinks) => ({
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
        transition: `${getTransition('background-color', 'short', 'base')}, ${getTransition(
          'border-color',
          'short',
          'base'
        )}, ${getTransition('color', 'short', 'base')}`, // for smooth transition between states
        position: 'relative',
        width: buttonSize,
        height: buttonSize,
        boxSizing: 'border-box',
        ...textSmallStyle,
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        color: primaryColor,
        outline: 0,
        borderRadius: borderRadiusSmall,
        borderColor: 'transparent', // default value is needed for smooth transition
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: primaryColorDark,
        }),
        ...hoverMediaQuery({
          '&:not([aria-disabled]):not(.ellipsis):hover': {
            ...frostedGlassStyle,
            background: hoverColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              background: hoverColorDark,
            }),
          },
        }),
        '&:not(.ellipsis):focus:focus-visible::before': {
          content: '""',
          position: 'absolute',
          ...getInsetJssStyle(-4),
          border: `${borderWidthBase} solid ${focusColor}`,
          borderRadius: borderRadiusMedium,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            borderColor: focusColorDark,
          }),
        },
        '&[aria-current]': {
          ...disabledCursorStyle,
          color: primaryColor,
          border: `${borderWidthBase} solid ${primaryColor}`,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: primaryColorDark,
            borderColor: primaryColorDark,
          }),
          '&:not(.ellipsis):focus::before': getInsetJssStyle(-6),
        },
        '&[aria-disabled]': {
          ...disabledCursorStyle,
          color: disabledColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: disabledColorDark,
          }),
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
