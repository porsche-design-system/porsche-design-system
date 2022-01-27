import type { BreakpointCustomizable, GetStylesFunction, JssStyle, BreakpointKey } from '../../../utils';
import {
  addImportantToEachRule,
  BREAKPOINTS,
  buildResponsiveStyles,
  buildSlottedStyles,
  contentWrapperVars,
  getBaseSlottedStyles,
  getCss,
  getInset,
  mediaQuery,
  mergeDeep,
  parseJSON,
  pxToRemWithUnit,
} from '../../../utils';
import { color } from '@porsche-design-system/utilities';
import { MODAL_Z_INDEX } from '../../../constants';

const transitionTimingFunction = 'cubic-bezier(.16,1,.3,1)';
const { maxWidth, margin, marginXl, marginXxl } = contentWrapperVars;
export const stretchToFullModalWidthClassName = 'stretch-to-full-modal-width';

export const getFullscreenStyles: GetStylesFunction = (fullscreen: boolean): JssStyle => {
  return fullscreen
    ? {
        minWidth: '100%',
        maxWidth: 'none',
        minHeight: '100%',
        margin: 0,
      }
    : {
        minWidth: pxToRemWithUnit(272),
        maxWidth,
        minHeight: 'auto',
        margin: `7vh ${margin}`,
      };
};

export const isFullscreenForXl = (fullscreen: BreakpointCustomizable<boolean>): boolean => {
  const fullscreenParsed = parseJSON(fullscreen);

  if (typeof fullscreenParsed === 'boolean') {
    return fullscreenParsed;
  } else {
    const entries = Object.entries(fullscreenParsed);
    const lastTrueBreakpoint = entries
      .filter(([, val]) => val)
      .map(([key]) => key)
      .pop() as BreakpointKey;
    const lastFalseBreakpoint = entries
      .filter(([, val]) => !val)
      .map(([key]) => key)
      .pop() as BreakpointKey;

    return BREAKPOINTS.indexOf(lastTrueBreakpoint) > BREAKPOINTS.indexOf(lastFalseBreakpoint);
  }
};

const getMargin = (marginValue: number): string => `0 ${pxToRemWithUnit(marginValue)} 0`;

export const getComponentCss = (
  open: boolean,
  fullscreen: BreakpointCustomizable<boolean>,
  disableCloseButton: boolean,
  hasHeader: boolean
): string => {
  const isFullscreenForXlAndXxl = isFullscreenForXl(fullscreen);

  return getCss({
    ':host': {
      ...addImportantToEachRule({
        position: 'fixed',
        ...getInset(),
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
      }),
      overflowY: 'auto', // overrideable
      // workaround via pseudo element to fix stacking (black) background in safari
      '&::before': addImportantToEachRule({
        content: '""',
        position: 'fixed',
        ...getInset(),
        background: `${color.darkTheme.background.default}e6`, // e6 = 0.9 alpha
      }),
    },
    root: mergeDeep(buildResponsiveStyles(fullscreen, getFullscreenStyles), {
      position: 'relative',
      boxSizing: 'border-box',
      transition: `transform .6s ${transitionTimingFunction}`,
      transform: open ? 'scale3d(1,1,1)' : 'scale3d(.9,.9,1)',
      padding: pxToRemWithUnit(32),
      backgroundColor: color.background.default,
      [mediaQuery('m')]: {
        padding: pxToRemWithUnit(40),
      },
      [mediaQuery('xl')]: {
        margin: isFullscreenForXlAndXxl ? 0 : `10vh ${marginXl}`,
      },
      [mediaQuery('xxl')]: {
        padding: pxToRemWithUnit(64),
        margin: isFullscreenForXlAndXxl ? 0 : `10vh ${marginXxl}`,
      },
    }),
    ...(hasHeader && {
      header: {
        ...(!disableCloseButton && {
          margin: `0 ${pxToRemWithUnit(32)} 0 0`,
        }),
        padding: `0 0 ${pxToRemWithUnit(16)}`,
        [mediaQuery('m')]: {
          padding: `0 0 ${pxToRemWithUnit(24)}`,
        },
        [mediaQuery('xxl')]: {
          padding: `0 0 ${pxToRemWithUnit(32)}`,
          ...(!disableCloseButton && { margin: 0 }),
        },
      },
    }),

    '::slotted': addImportantToEachRule({
      [`&(.${stretchToFullModalWidthClassName})`]: {
        width: `calc(100% + ${pxToRemWithUnit(64)})`,
        margin: getMargin(-32),
      },
      ...(!hasHeader && {
        [`&(.${stretchToFullModalWidthClassName}:first-child)`]: {
          marginTop: pxToRemWithUnit(-32),
        },
      }),
      [`&(.${stretchToFullModalWidthClassName}:last-child)`]: {
        marginBottom: pxToRemWithUnit(-32),
      },
      [mediaQuery('m')]: {
        [`&(.${stretchToFullModalWidthClassName})`]: {
          width: `calc(100% + ${pxToRemWithUnit(80)})`,
          margin: getMargin(-40),
        },
        ...(!hasHeader && {
          [`&(.${stretchToFullModalWidthClassName}:first-child)`]: {
            marginTop: pxToRemWithUnit(-40),
          },
        }),
        [`&(.${stretchToFullModalWidthClassName}:last-child)`]: {
          marginBottom: pxToRemWithUnit(-40),
        },
      },
      [mediaQuery('xxl')]: {
        [`&(.${stretchToFullModalWidthClassName})`]: {
          width: `calc(100% + ${pxToRemWithUnit(128)})`,
          margin: getMargin(-64),
        },
        ...(!hasHeader && {
          [`&(.${stretchToFullModalWidthClassName}:first-child)`]: {
            marginTop: pxToRemWithUnit(-64),
          },
        }),
        [`&(.${stretchToFullModalWidthClassName}:last-child)`]: {
          marginBottom: pxToRemWithUnit(-64),
        },
      },
    }),

    close: {
      position: 'absolute',
      top: 0,
      right: 0,
      padding: pxToRemWithUnit(8),
      border: `${pxToRemWithUnit(6)} solid ${color.background.default}`,
      backgroundColor: color.background.default,
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
