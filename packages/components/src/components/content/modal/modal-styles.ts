import type { BreakpointCustomizable, GetStylesFunction, JssStyle } from '../../../utils';
import {
  addImportantToEachRule,
  buildGlobalStyles,
  buildHostStyles,
  buildResponsiveStyles,
  getCss,
  getInset,
  mediaQuery,
  mergeDeep,
  pxToRemWithUnit,
} from '../../../utils';
import { color } from '@porsche-design-system/utilities';
import { MODAL_Z_INDEX } from '../../../constants';
import { contentWrapperMaxWidth } from '../../layout/content-wrapper/content-wrapper-styles';

const transitionTimingFunction = 'cubic-bezier(.16,1,.3,1)';

const modalMinWidth = pxToRemWithUnit(272);
const modalMaxWidth = contentWrapperMaxWidth;
const modalHeaderPadding = `0 0 ${pxToRemWithUnit(16)}`;
const modalHeaderPaddingM = `0 0 ${pxToRemWithUnit(24)}`;
const modalHeaderPaddingXxl = `0 0 ${pxToRemWithUnit(32)}`;

export const getFullscreenStyles: GetStylesFunction = (fullscreen: boolean): JssStyle => {
  return fullscreen
    ? {
        minWidth: '100%',
        maxWidth: 'none',
        minHeight: '100%',
      }
    : {
        minWidth: modalMinWidth,
        maxWidth: modalMaxWidth,
        minHeight: 'auto',
      };
};

export const getComponentCss = (open: boolean, fullscreen: BreakpointCustomizable<boolean>): string => {
  return getCss({
    ...buildHostStyles({
      ...addImportantToEachRule({
        position: 'fixed',
        ...getInset(),
        zIndex: MODAL_Z_INDEX,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        transition: `opacity .2s ${transitionTimingFunction}, visibility 0s linear .2s`,
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
    }),
    root: mergeDeep(
      {
        position: 'relative',
        boxSizing: 'border-box',
        transition: `transform .6s ${transitionTimingFunction}`,
        transform: open ? 'scale3d(1,1,1)' : 'scale3d(.9,.9,1)',
        padding: pxToRemWithUnit(32),
        backgroundColor: color.background.default,
        [mediaQuery('m')]: {
          padding: pxToRemWithUnit(40),
        },
        [mediaQuery('xxl')]: {
          padding: pxToRemWithUnit(64),
        },
      },
      buildResponsiveStyles(fullscreen, getFullscreenStyles)
    ),
    ...buildGlobalStyles({
      header: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: modalHeaderPadding,
        [mediaQuery('xxl')]: {
          padding: modalHeaderPaddingXxl,
        },
        [mediaQuery('m')]: {
          padding: modalHeaderPaddingM,
        },
      },
    }),
    close: {
      marginLeft: pxToRemWithUnit(16),
      padding: pxToRemWithUnit(8),
      transform: `translate(${pxToRemWithUnit(8)}, ${pxToRemWithUnit(-8)})`,
    },
  });
};
