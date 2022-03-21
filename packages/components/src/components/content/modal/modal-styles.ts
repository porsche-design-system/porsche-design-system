import type { JssStyle } from 'jss';
import type { BreakpointCustomizable, GetJssStyleFunction, BreakpointKey } from '../../../utils';
import { mediaQueryMin } from '@porsche-design-system/utilities-v2';
import { BREAKPOINTS, buildResponsiveStyles, getCss, mergeDeep, parseJSON, buildSlottedStyles } from '../../../utils';
import {
  addImportantToEachRule,
  contentWrapperVars,
  getBaseSlottedStyles,
  getFocusJssStyle,
  getInsetJssStyle,
  getThemedColors,
  pxToRemWithUnit,
} from '../../../styles';
import { MODAL_Z_INDEX } from '../../../constants';
import { getFocusVisibleFallback } from '../../../styles/focus-visible-fallback';

const mediaQueryM = mediaQueryMin('m');
const mediaQueryXl = mediaQueryMin('xl');
const mediaQueryXxl = mediaQueryMin('xxl');
const { backgroundColor: lightThemeBackgroundColor } = getThemedColors('light');
const { backgroundColor: darkThemeBackgroundColor } = getThemedColors('dark');

const transitionTimingFunction = 'cubic-bezier(.16,1,.3,1)';
export const stretchToFullModalWidthClassName = 'stretch-to-full-modal-width';

export const getFullscreenJssStyles: GetJssStyleFunction = (fullscreen: boolean): JssStyle => {
  return fullscreen
    ? {
        minWidth: '100%',
        maxWidth: 'none',
        minHeight: '100%',
        margin: 0,
      }
    : {
        minWidth: pxToRemWithUnit(272),
        maxWidth: contentWrapperVars.maxWidth,
        minHeight: 'auto',
        margin: `7vh ${contentWrapperVars.margin}`,
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

const getSlottedJssStyle = (marginValue: number, hasHeader: boolean): JssStyle => {
  const marginRem = pxToRemWithUnit(-marginValue);
  return {
    [`&(.${stretchToFullModalWidthClassName})`]: {
      width: `calc(100% + ${pxToRemWithUnit(marginValue * 2)})`,
      margin: `0 ${marginRem}`,
    },
    ...(!hasHeader && {
      [`&(.${stretchToFullModalWidthClassName}:first-child)`]: {
        marginTop: marginRem,
      },
    }),
    [`&(.${stretchToFullModalWidthClassName}:last-child)`]: {
      marginBottom: marginRem,
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
          transition: `opacity .2s ${transitionTimingFunction},visibility 0s linear .2s`,
          opacity: 0,
          visibility: 'hidden',
          ...(open && {
            transition: `opacity .6s ${transitionTimingFunction}`,
            opacity: 1,
            visibility: 'inherit',
          }),
          // workaround via pseudo element to fix stacking (black) background in safari
          '&::before': {
            content: '""',
            position: 'fixed',
            ...getInsetJssStyle(),
            background: `${darkThemeBackgroundColor}e6`, // e6 = 0.9 alpha
          },
        }),
        overflowY: 'auto', // overrideable
      },
      '::slotted': addImportantToEachRule({
        ...getSlottedJssStyle(32, hasHeader),
        [mediaQueryM]: getSlottedJssStyle(40, hasHeader),
        [mediaQueryXxl]: getSlottedJssStyle(64, hasHeader),
      }),
    },
    root: mergeDeep(
      {
        position: 'relative',
        boxSizing: 'border-box',
        transition: `transform .6s ${transitionTimingFunction}`,
        transform: open ? 'scale3d(1,1,1)' : 'scale3d(.9,.9,1)',
        padding: pxToRemWithUnit(32),
        backgroundColor: lightThemeBackgroundColor,
        ...getFocusVisibleFallback(getFocusJssStyle({ color: lightThemeBackgroundColor })),
        [mediaQueryM]: {
          padding: pxToRemWithUnit(40),
        },
        [mediaQueryXl]: {
          margin: isFullscreenForXlAndXxl ? 0 : `10vh ${contentWrapperVars.marginXl}`,
        },
        [mediaQueryXxl]: {
          padding: pxToRemWithUnit(64),
          margin: isFullscreenForXlAndXxl ? 0 : `10vh ${contentWrapperVars.marginXxl}`,
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
      top: 0,
      right: 0,
      padding: pxToRemWithUnit(8),
      border: `${pxToRemWithUnit(6)} solid ${lightThemeBackgroundColor}`,
      background: lightThemeBackgroundColor,
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
