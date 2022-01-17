import type { BreakpointCustomizable, GetStylesFunction, JssStyle, BreakpointKey } from '../../../utils';
import {
  addImportantToEachRule,
  BREAKPOINTS,
  buildResponsiveStyles,
  contentWrapperVars,
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

export const getComponentCss = (open: boolean, fullscreen: BreakpointCustomizable<boolean>): string => {
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
    '@global': {
      header: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginRight: pxToRemWithUnit(64),
        padding: `0 0 ${pxToRemWithUnit(16)}`,
        [mediaQuery('m')]: {
          padding: `0 0 ${pxToRemWithUnit(24)}`,
        },
        [mediaQuery('xxl')]: {
          padding: `0 0 ${pxToRemWithUnit(32)}`,
        },
      },
    },
    '::slotted(div.stretch-to-full-modal-width)': {
      margin: `0 ${pxToRemWithUnit(-32)} 0`,
      [mediaQuery('m')]: {
        margin: `0 ${pxToRemWithUnit(-40)} 0`,
      },
      [mediaQuery('xxl')]: {
        margin: `0 ${pxToRemWithUnit(-64)} 0`,
      },
    },
    '::slotted(div.stretch-to-full-modal-width:first-child)': {
      marginTop: pxToRemWithUnit(-32),
      [mediaQuery('m')]: {
        marginTop: pxToRemWithUnit(-40),
      },
      [mediaQuery('xxl')]: {
        marginTop: pxToRemWithUnit(-64),
      },
    },
    close: {
      padding: pxToRemWithUnit(6),
      border: `${pxToRemWithUnit(6)} solid ${color.background.default}`,
      backgroundColor: color.background.default,
      position: 'absolute',
      right: pxToRemWithUnit(24),
      top: pxToRemWithUnit(24),
      [mediaQuery('m')]: {
        right: pxToRemWithUnit(40),
        top: pxToRemWithUnit(40),
      },
    },
  });
};
