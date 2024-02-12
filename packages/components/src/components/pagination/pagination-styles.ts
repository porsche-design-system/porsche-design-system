import type { JssStyle } from 'jss';
import type { Theme } from '../../types';
import { getCss } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getFocusJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import {
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  frostedGlassStyle,
  getMediaQueryMax,
  getMediaQueryMin,
  spacingStaticSmall,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';

const mediaQueryMinS = getMediaQueryMin('s');
const mediaQueryMaxS = getMediaQueryMax('s');

// button size needs to be fluid between 320px and 360px viewport width, so that the pagination fits into 320px viewport
// and text scale 200% works (almost) on mobile viewports too
const buttonSize = `clamp(36px, calc(${fontLineHeight} + 10vw - 20px), 40px)`;

const disabledCursorStyle: JssStyle = {
  cursor: 'default',
  pointerEvents: 'none', // prevents :hover (has no effect when forced), maybe we can remove it since CSS selectors already cover desired behavior
};

const hiddenStyle: JssStyle = { display: 'none' };

export const getComponentCss = (activePage: number, pageTotal: number, showLastPage: boolean, theme: Theme): string => {
  const { primaryColor, disabledColor, hoverColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    disabledColor: disabledColorDark,
    hoverColor: hoverColorDark,
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
        ...(pageTotal > 5 && {
          // max 5 items including ellipsis at the same time on mobile
          [mediaQueryMaxS]: {
            [activePage < 4
              ? // we are at the start, so let's hide start ellipsis and 2 items before end ellipsis
                '&.ellip-start,&:nth-child(6),&:nth-child(7),&:not(.ellip):nth-child(8)'
              : pageTotal - activePage < 3
                ? // we are at the end, so let's hide end ellipsis and 2 items after start ellipsis
                  '&.ellip-end, &.ellip-start + &:not(.current), &.ellip-start + &:not(.current) + &:not(.current)'
                : // we are at in the middle, so let's hide elements after start and before end ellipsis
                  '&.ellip-start + &:not(.current), &.current-1, &.current\\+1, &.current\\+1 + &:not(.ellip)']:
              hiddenStyle,
            // without last page we need to adjust end page handling
            ...(!showLastPage &&
              (pageTotal - activePage < 2
                ? { [`&.current-2${pageTotal - activePage === 1 ? ',&.current-1' : ''}`]: hiddenStyle }
                : activePage > 2 && {
                    '&.current\\+1,&.current\\+2': hiddenStyle,
                    '&.ellip-end': { display: 'initial' },
                  })),
          },
        }),
        [mediaQueryMinS]: {
          // prev
          '&:first-child': { marginInlineEnd: spacingStaticSmall },
          // next
          '&:last-child': { marginInlineStart: spacingStaticSmall },
          ...(pageTotal < 8
            ? { '&.ellip': hiddenStyle }
            : // max 7 items including ellipsis at the same time on tablet
              {
                // we are at the start, so let's hide start ellipsis
                ...(activePage <= 4 && { '&.ellip-start': hiddenStyle }),
                // we are at the end, so let's hide end ellipsis
                ...(pageTotal - activePage < 4 && { '&.ellip-end:nth-last-child(3)': hiddenStyle }),
                // we are at the end without last page, so let's hide end ellipsis
                ...(pageTotal - activePage < 3 && { '&.ellip-end:nth-last-child(2)': hiddenStyle }),
              }),
        },
      },
      span: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`, // for smooth transition between states
        position: 'relative',
        width: buttonSize,
        height: buttonSize,
        boxSizing: 'border-box',
        ...textSmallStyle,
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        color: primaryColor,
        borderRadius: borderRadiusSmall,
        borderColor: 'transparent', // default value is needed for smooth transition
        outline: 0, // TODO: only relevant for VRT testing with forced states - prevents :focus style
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
        '&[aria-current]': {
          ...disabledCursorStyle,
          color: primaryColor,
          border: `${borderWidthBase} solid ${primaryColor}`,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: primaryColorDark,
            borderColor: primaryColorDark,
          }),
        },
        '&[aria-disabled]': {
          ...disabledCursorStyle,
          color: disabledColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: disabledColorDark,
          }),
        },
        // TODO :not(.ellipsis) is only needed for VRT states tests to work properly
        '&:not(.ellipsis)': getFocusJssStyle(theme),
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
