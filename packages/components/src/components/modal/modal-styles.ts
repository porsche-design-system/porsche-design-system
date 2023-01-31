import type { JssStyle } from 'jss';
import type { GetJssStyleFunction } from '../../utils';
import { BREAKPOINTS, buildResponsiveStyles, buildSlottedStyles, getCss, mergeDeep, parseJSON } from '../../utils';
import type { BreakpointCustomizable, BreakpointKey } from '../../types';
import {
  gridSafeZone,
  headingMediumStyle,
  getMediaQueryMin,
  borderRadiusMedium,
  frostedGlassStyle,
  borderWidthBase,
} from '@porsche-design-system/utilities-v2';
import {
  addImportantToEachRule,
  getBaseSlottedStyles,
  getInsetJssStyle,
  getThemedColors,
  pxToRemWithUnit,
} from '../../styles';
import { MODAL_Z_INDEX } from '../../constants';
import { themeDarkBackgroundShading } from '@porsche-design-system/utilities-v2/src/js/theme/themeDarkBackgroundShading';

const mediaQueryM = getMediaQueryMin('m');
const mediaQueryXl = getMediaQueryMin('xl');
const mediaQueryXxl = getMediaQueryMin('xxl');
const { backgroundColor: lightThemeBackgroundColor, primaryColor: lightBorderColorFullscreen } =
  getThemedColors('light');
const { primaryColor: darkBorderColorFullscreen } = getThemedColors('dark');

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
        margin: `max(1rem, 7vh) ${gridSafeZone}`,
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

const getSlottedJssStyle = (
  marginValue: number,
  hasHeader: boolean,
  fullscreen: BreakpointCustomizable<boolean>
): JssStyle => {
  const marginRem = pxToRemWithUnit(-marginValue);
  return {
    [`&(.${stretchToFullModalWidthClassName})`]: {
      width: `calc(100% + ${pxToRemWithUnit(marginValue * 2)})`,
      margin: `0 ${marginRem}`,
    },
    ...(!hasHeader && {
      [`&(.${stretchToFullModalWidthClassName}:first-child)`]: {
        marginTop: marginRem,
        ...buildResponsiveStyles(fullscreen, (fullscreenValue: boolean) => ({
          borderRadius: fullscreenValue ? 0 : '8px 8px 0 0',
        })),
      },
    }),
    [`&(.${stretchToFullModalWidthClassName}:last-child)`]: {
      marginBottom: marginRem,
      ...buildResponsiveStyles(fullscreen, (fullscreenValue: boolean) => ({
        borderRadius: fullscreenValue ? 0 : ' 0 0 8px 8px',
      })),
    },
  };
};

export const getComponentCss = (
  open: boolean,
  fullscreen: BreakpointCustomizable<boolean>,
  disableCloseButton: boolean,
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
          // workaround via pseudo element to fix stacking (black) background in safari
          '&::before': {
            content: '""',
            position: 'fixed',
            ...getInsetJssStyle(),
            background: themeDarkBackgroundShading,
            ...frostedGlassStyle,
          },
        }),
        overflowY: 'auto', // overrideable
      },
      '::slotted': addImportantToEachRule({
        ...getSlottedJssStyle(32, hasHeader, fullscreen),
        [mediaQueryM]: getSlottedJssStyle(40, hasHeader, fullscreen),
        [mediaQueryXxl]: getSlottedJssStyle(64, hasHeader, fullscreen),
      }),
      h1: {
        ...headingMediumStyle,
        margin: 0,
        color: getThemedColors('light').primaryColor,
      },
    },
    root: mergeDeep(
      {
        position: 'relative',
        boxSizing: 'border-box',
        transition: `transform .6s ${transitionTimingFunction}`,
        transform: open ? 'scale3d(1,1,1)' : 'scale3d(.9,.9,1)',
        padding: pxToRemWithUnit(32),
        backgroundColor: lightThemeBackgroundColor,
        '&:focus': {
          outline: 0,
        },
        '&:focus::before': {
          content: '""',
          position: 'fixed',
          border: `${borderWidthBase} solid`,
          ...buildResponsiveStyles(fullscreen, (fullscreenValue: boolean) => ({
            borderRadius: fullscreenValue ? 0 : '12px',
            borderColor: fullscreenValue ? darkBorderColorFullscreen : lightBorderColorFullscreen,
            ...(fullscreenValue ? getInsetJssStyle(0) : getInsetJssStyle(-4)),
          })),
        },
        '&:not(:focus-visible)::before': {
          border: 0,
        },
        [mediaQueryM]: {
          padding: pxToRemWithUnit(40),
        },
        [mediaQueryXl]: {
          margin: isFullscreenForXlAndXxl ? 0 : `min(12rem, 10vh) ${gridSafeZone}`,
        },
        [mediaQueryXxl]: {
          padding: pxToRemWithUnit(64),
        },
      },
      buildResponsiveStyles(fullscreen, getFullscreenJssStyles) as any
    ),
    ...(hasHeader && {
      header: {
        padding: `0 0 ${pxToRemWithUnit(16)}`,
        ...(!disableCloseButton && { margin: `0 ${pxToRemWithUnit(32)} 0 0` }),
        [mediaQueryM]: {
          padding: `0 0 ${pxToRemWithUnit(24)}`,
        },
        [mediaQueryXxl]: {
          padding: `0 0 ${pxToRemWithUnit(32)}`,
          ...(!disableCloseButton && { margin: 0 }),
        },
      },
    }),
    close: {
      position: 'absolute',
      top: '8px',
      right: '8px',
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
