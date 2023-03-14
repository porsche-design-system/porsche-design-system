import type { JssStyle } from 'jss';
import type { GetJssStyleFunction } from '../../utils';
import { BREAKPOINTS, buildResponsiveStyles, getCss, mergeDeep, parseJSON } from '../../utils';
import type { BreakpointCustomizable, BreakpointKey } from '../../types';
import {
  borderRadiusMedium,
  borderWidthBase,
  frostedGlassStyle,
  getMediaQueryMin,
  gridSafeZoneBase,
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
        minWidth: pxToRemWithUnit(275.2), // 320px - 320px * 7% * 2
        maxWidth: pxToRemWithUnit(1536), // 1920px - 1920px * 10% * 2
        minHeight: 'auto',
        margin: `clamp(16px, 7vh, 192px) ${gridSafeZoneBase}`,
        borderRadius: borderRadiusMedium,
      };
};

export const isFullscreenForXl = (fullscreen: BreakpointCustomizable<boolean>): boolean => {
  const fullscreenParsed = parseJSON(fullscreen);

  if (typeof fullscreenParsed === 'boolean') {
    return fullscreenParsed;
  } else {
    const entries = Object.entries(fullscreenParsed) as [BreakpointKey, boolean][];
    const [lastTrueBreakpoint] = entries.filter(([, val]) => val).pop() || [];
    const [lastFalseBreakpoint] = entries.filter(([, val]) => !val).pop() || [];

    return BREAKPOINTS.indexOf(lastTrueBreakpoint) > BREAKPOINTS.indexOf(lastFalseBreakpoint);
  }
};

const getSlottedJssStyle = (marginValue: number, hasHeader: boolean, hasDismissButton: boolean): JssStyle => {
  const marginPx = `${-marginValue}px`;
  const marginRem = pxToRemWithUnit(-marginValue);
  return {
    [`&(.${stretchToFullModalWidthClassName})`]: {
      width: `calc(100% + ${marginValue * 2}px)`,
      margin: `0 ${marginPx}`,
    },
    ...(!hasHeader && {
      [`&(.${stretchToFullModalWidthClassName}:first-child)`]: {
        marginTop: hasDismissButton ? marginRem : marginPx,
      },
    }),
    [`&(.${stretchToFullModalWidthClassName}:last-child)`]: {
      marginBottom: marginPx,
    },
  };
};

export const getComponentCss = (
  open: boolean,
  fullscreen: BreakpointCustomizable<boolean>,
  hasDismissButton: boolean,
  hasHeader: boolean
): string => {
  const isFullscreenForXlAndXxl = isFullscreenForXl(fullscreen);

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
          ...(open
            ? {
                opacity: 1,
                visibility: 'inherit',
              }
            : {
                opacity: 0,
                visibility: 'hidden',
              }),
          ...hostHiddenStyles,
          // workaround via pseudo element to fix stacking (black) background in safari
          '&::before': {
            content: '""',
            position: 'fixed',
            ...getInsetJssStyle(),
            background: themeDarkBackgroundShading,
            ...frostedGlassStyle,
            pointerEvents: 'none', // enable scrolling in safari by dragging the scrollbar track
          },
        }),
        overflowY: 'auto', // overrideable
      },
      '::slotted': addImportantToEachRule({
        ...mergeDeep(
          getSlottedJssStyle(32, hasHeader, hasDismissButton),
          buildResponsiveStyles(fullscreen, (fullscreenValue: boolean) => ({
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
        transition: `transform .6s ${transitionTimingFunction}`,
        transform: open ? 'scale3d(1,1,1)' : 'scale3d(.9,.9,1)',
        padding: hasDismissButton ? `${pxToRemWithUnit(32)} 32px 32px 32px` : '32px', // rem value needed to prevent overlapping of close button and contents in scaling mode
        background: backgroundColor,
        outline: 0,
        '&:focus::before': {
          content: '""',
          position: 'fixed',
          border: `${borderWidthBase} solid`,
          pointerEvents: 'none', // fix text selection in focus state
          ...buildResponsiveStyles(fullscreen, (fullscreenValue: boolean) => ({
            borderRadius: fullscreenValue ? 0 : '12px',
            borderColor: fullscreenValue ? lightThemePrimaryColor : darkThemePrimaryColor,
            ...getInsetJssStyle(fullscreenValue ? 0 : -4),
          })),
        },
        '&:not(:focus-visible)::before': {
          border: 0,
        },
        [mediaQueryXl]: {
          margin: isFullscreenForXlAndXxl ? 0 : `min(192px, 10vh) ${gridSafeZoneBase}`,
        },
      },
      buildResponsiveStyles(fullscreen, getFullscreenJssStyles) as any
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
