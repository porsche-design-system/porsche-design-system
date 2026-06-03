import { getMediaQueryMax, getMediaQueryMin } from '@porsche-design-system/emotion';
import type { JssStyle } from 'jss';
import {
  addImportantToEachRule,
  forcedColorsMediaQuery,
  getDisabledBaseStyles,
  getFocusBaseStyles,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  blurFrosted,
  colorFrosted,
  colorFrostedStrong,
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  radiusFull,
  ref,
  spacingStaticSm,
  spacingStaticXs,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import { getCss } from '../../utils';

const mediaQueryMinS = getMediaQueryMin('s');
const mediaQueryMaxS = getMediaQueryMax('s');

const disabledCursorStyle: JssStyle = {
  cursor: 'default',
  pointerEvents: 'none', // prevents :hover (has no effect when forced), maybe we can remove it since CSS selectors already cover desired behavior
};

const hiddenStyle: JssStyle = { display: 'none' };

export const getComponentCss = (activePage: number, pageTotal: number, showLastPage: boolean): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      nav: {
        display: 'flex',
        justifyContent: 'center',
        userSelect: 'none',
      },
      ul: {
        display: 'flex',
        gap: ref(spacingStaticXs),
        margin: 0,
        padding: 0,
        [mediaQueryMinS]: {
          gap: ref(spacingStaticSm),
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
        transition: `${getTransition('background-color')}, ${getTransition('color')}`, // for smooth transition between states
        position: 'relative',
        padding: '0 6px',
        minWidth: '2.25rem',
        height: '2.25rem',
        boxSizing: 'border-box',
        font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        color: ref(colorPrimary),
        borderRadius: ref(radiusFull),
        borderColor: 'transparent', // default value is needed for smooth transition
        outline: 0, // TODO: only relevant for VRT testing with forced states - prevents :focus style
        ...hoverMediaQuery({
          '&:not([aria-disabled]):not(.ellipsis):hover': {
            WebkitBackdropFilter: ref(blurFrosted),
            backdropFilter: ref(blurFrosted),
            background: ref(colorFrosted),
            ...forcedColorsMediaQuery({
              outline: '2px solid CanvasText',
              outlineOffset: '-2px',
            }),
          },
        }),
        '&[aria-current]': {
          ...disabledCursorStyle,
          backgroundColor: ref(colorFrostedStrong),
          ...forcedColorsMediaQuery({
            border: '2px solid CanvasText',
          }),
        },
        '&[aria-disabled]': {
          ...disabledCursorStyle,
          ...getDisabledBaseStyles(),
        },
        // TODO :not(.ellipsis) is only needed for VRT states tests to work properly
        '&:not(.ellipsis):focus-visible': getFocusBaseStyles(),
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
