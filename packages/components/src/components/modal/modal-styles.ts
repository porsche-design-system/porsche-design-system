import type { JssStyle } from 'jss';
import type { GetJssStyleFunction } from '../../utils';
import type { Breakpoint } from '@porsche-design-system/utilities-v2';
import { buildResponsiveStyles, getCss, isHighContrastMode, mergeDeep, parseJSON } from '../../utils';
import type { BreakpointCustomizable } from '../../types';
import {
  borderRadiusMedium,
  borderWidthBase,
  breakpoints,
  frostedGlassStyle,
  getMediaQueryMin,
  gridExtendedOffsetBase,
  headingLargeStyle,
  themeDarkBackgroundShading,
} from '@porsche-design-system/utilities-v2';
import {
  addImportantToEachRule,
  getInsetJssStyle,
  getThemedColors,
  hostHiddenStyles,
  hoverMediaQuery,
  pxToRemWithUnit,
} from '../../styles';
import { MODAL_Z_INDEX } from '../../constants';

const mediaQueryXl = getMediaQueryMin('xl');
const { backgroundColor, primaryColor: lightThemePrimaryColor } = getThemedColors('light');
const { primaryColor: darkThemePrimaryColor } = getThemedColors('dark');

const transitionTimingFunction = 'cubic-bezier(.16,1,.3,1)';
export const stretchToFullModalWidthClassName = 'stretch-to-full-modal-width';

export const getFullscreenJssStyles: GetJssStyleFunction = (fullscreen: boolean): JssStyle => {
  return fullscreen
    ? {
        minWidth: '100%',
        maxWidth: 'none',
        minHeight: '100%',
        margin: 0,
        borderRadius: 0,
      }
    : {
        minWidth: '276px', // on viewport 320px: calc(${gridColumnWidthBase} * 6 + ${gridGap} * 5)
        maxWidth: '1535.5px', // on viewport 1920px: `calc(${gridColumnWidthXXL} * 14 + ${gridGap} * 13)`
        minHeight: 'auto',
        margin: `clamp(16px, 7vh, 192px) ${gridExtendedOffsetBase}`,
        borderRadius: borderRadiusMedium,
      };
};

export const isFullscreenForXl = (fullscreen: BreakpointCustomizable<boolean>): boolean => {
  const fullscreenParsed = parseJSON(fullscreen);

  if (typeof fullscreenParsed === 'boolean') {
    return fullscreenParsed;
  } else {
    const entries = Object.entries(fullscreenParsed) as [Breakpoint, boolean][];
    const [lastTrueBreakpoint] = entries.filter(([, val]) => val).pop() || [];
    const [lastFalseBreakpoint] = entries.filter(([, val]) => !val).pop() || [];

    return breakpoints.indexOf(lastTrueBreakpoint) > breakpoints.indexOf(lastFalseBreakpoint);
  }
};

const getSlottedJssStyle = (marginValue: number, hasHeader: boolean, hasDismissButton: boolean): JssStyle => {
  const marginPx = `${-marginValue}px`;
  return {
    [`&(.${stretchToFullModalWidthClassName})`]: {
      width: `calc(100% + ${marginValue * 2}px)`,
      margin: `0 ${marginPx}`,
    },
    ...(!hasHeader && {
      [`&(.${stretchToFullModalWidthClassName}:first-child)`]: {
        marginTop: hasDismissButton ? pxToRemWithUnit(-marginValue) : marginPx,
      },
    }),
    [`&(.${stretchToFullModalWidthClassName}:last-child)`]: {
      marginBottom: marginPx,
    },
  };
};

export const getComponentCss = (
  isOpen: boolean,
  isFullscreen: BreakpointCustomizable<boolean>,
  hasDismissButton: boolean,
  hasHeader: boolean
): string => {
  const isFullscreenForXlAndXxl = isFullscreenForXl(isFullscreen);
  const duration = isOpen ? '.6s' : '.2s';

  return getCss({
    '@global': {
      ':host': {
        ...addImportantToEachRule({
          position: 'fixed',
          ...getInsetJssStyle(),
          zIndex: MODAL_Z_INDEX,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          ...(isOpen
            ? {
                visibility: 'inherit',
              }
            : {
                visibility: 'hidden',
                transition: 'visibility 0s linear .2s',
              }),
          ...hostHiddenStyles,
          // workaround via pseudo element to fix stacking (black) background in safari
          '&::before': {
            content: '""',
            position: 'fixed',
            ...getInsetJssStyle(),
            background: themeDarkBackgroundShading,
            pointerEvents: 'none', // enable scrolling in safari by dragging the scrollbar track
            ...(isOpen
              ? {
                  opacity: 1,
                  ...frostedGlassStyle,
                }
              : {
                  opacity: 0,
                  backdropFilter: 'blur(0px)',
                  WebkitBackdropFilter: 'blur(0px)',
                }),
            transition: `opacity ${duration} ${transitionTimingFunction}, backdrop-filter ${duration} ${transitionTimingFunction},--webkit-backdrop-filter ${duration} ${transitionTimingFunction}`,
          },
        }),
        overflowY: 'auto', // overrideable
      },
      '::slotted': addImportantToEachRule({
        ...mergeDeep(
          getSlottedJssStyle(32, hasHeader, hasDismissButton),
          buildResponsiveStyles(isFullscreen, (fullscreenValue: boolean) => ({
            [`&(.${stretchToFullModalWidthClassName}`]: {
              '&:first-child)': {
                borderRadius: fullscreenValue ? 0 : '8px 8px 0 0',
              },
              '&:last-child)': {
                borderRadius: fullscreenValue ? 0 : '0 0 8px 8px',
              },
            },
          }))
        ),
      }),
      h2: {
        ...headingLargeStyle,
        margin: 0,
        color: lightThemePrimaryColor,
      },
    },
    root: mergeDeep(
      {
        position: 'relative',
        boxSizing: 'border-box',
        transform: isOpen ? 'scale3d(1,1,1)' : 'scale3d(.9,.9,1)',
        opacity: isOpen ? 1 : 0,
        transition: `opacity ${duration} ${transitionTimingFunction},transform ${duration} ${transitionTimingFunction}`,
        padding: hasDismissButton ? `${pxToRemWithUnit(32)} 32px 32px 32px` : '32px', // rem value needed to prevent overlapping of close button and contents in scaling mode
        background: backgroundColor,
        outline: isHighContrastMode ? '1px solid transparent' : 0,
        '&:focus::before': {
          content: '""',
          position: 'fixed',
          border: `${borderWidthBase} solid`,
          pointerEvents: 'none', // fix text selection in focus state
          ...buildResponsiveStyles(isFullscreen, (fullscreenValue: boolean) => ({
            borderRadius: fullscreenValue ? 0 : '12px',
            borderColor: fullscreenValue ? lightThemePrimaryColor : darkThemePrimaryColor,
            ...getInsetJssStyle(fullscreenValue ? 0 : -4),
          })),
        },
        '&:not(:focus-visible)::before': {
          border: 0,
        },
        [mediaQueryXl]: {
          margin: isFullscreenForXlAndXxl ? 0 : `min(192px, 10vh) ${gridExtendedOffsetBase}`,
        },
      },
      buildResponsiveStyles(isFullscreen, getFullscreenJssStyles) as any
    ),
    ...(hasHeader && {
      header: {
        padding: '0 0 8px',
      },
    }),
    ...(hasDismissButton && {
      dismiss: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        border: `2px solid ${backgroundColor}`, // needed to enlarge button slightly without affecting the hover area (are equal now).
        borderRadius: '4px',
        background: backgroundColor,
        ...hoverMediaQuery({
          '&:hover': {
            background: 'transparent',
            borderColor: 'transparent',
          },
        }),
      },
    }),
  });
};
