import type { BreakpointCustomizable, GetStylesFunction, JssStyle } from '../../../utils';
import {
  addImportantToEachRule,
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
import {
  contentWrapperMargin,
  contentWrapperMarginXl,
  contentWrapperMarginXxl,
  contentWrapperMaxWidth,
} from '../../layout/content-wrapper/content-wrapper-styles';

const transitionTimingFunction = 'cubic-bezier(.16,1,.3,1)';

const modalMinWidth = pxToRemWithUnit(272);
const modalMaxWidth = contentWrapperMaxWidth;
const modalMargin = `7vh ${contentWrapperMargin}`;
const modalMarginXl = `10vh ${contentWrapperMarginXl}`;
const modalMarginXxl = `10vh ${contentWrapperMarginXxl}`;
const modalHeaderPadding = `0 0 ${pxToRemWithUnit(16)}`;
const modalHeaderPaddingM = `0 0 ${pxToRemWithUnit(24)}`;
const modalHeaderPaddingXxl = `0 0 ${pxToRemWithUnit(32)}`;

export const getFullscreenStyles: GetStylesFunction = (fullscreen: boolean): JssStyle => {
  return fullscreen
    ? {
        minWidth: '100%',
        maxWidth: 'none',
        minHeight: '100%',
        margin: 0,
      }
    : {
        minWidth: modalMinWidth,
        maxWidth: modalMaxWidth,
        minHeight: 'auto',
        margin: modalMargin,
      };
};

export const getComponentCss = (open: boolean, fullscreen: BreakpointCustomizable<boolean>): string => {
  return getCss(
    mergeDeep({
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
      root: {
        position: 'relative',
        transition: `transform .6s ${transitionTimingFunction}`,
        transform: open ? 'scale3d(1,1,1)' : 'scale3d(.9,.9,1)',
        padding: pxToRemWithUnit(32),
        backgroundColor: color.background.default,
        [mediaQuery('xxl')]: {
          padding: pxToRemWithUnit(64),
          margin: modalMarginXxl,
          border: '5px solid pink',
        },
        [mediaQuery('xl')]: {
          margin: modalMarginXl,
          border: '5px solid blue',
        },
        [mediaQuery('l')]: {
          border: '5px solid yellow',
        },
        [mediaQuery('m')]: {
          padding: pxToRemWithUnit(40), // TODO: check how to apply padding
          border: '5px solid purple',
        },
        [mediaQuery('s')]: {
          border: '5px solid orange',
        },
        [mediaQuery('xs')]: {
          border: '5px solid mint',
        },
        ...buildResponsiveStyles(fullscreen, getFullscreenStyles),
      },
      header: {
        display: 'flex',
        padding: modalHeaderPadding,
        [mediaQuery('xxl')]: {
          padding: modalHeaderPaddingXxl,
        },
        [mediaQuery('m')]: {
          padding: modalHeaderPaddingM,
        },
      },
      close: {
        marginLeft: 'auto',
        padding: `0 0 0 ${pxToRemWithUnit(16)}`,
      },
    })
  );
};
