import { type JssStyle } from 'jss';
import { getCss, isThemeDark, type Theme } from '../../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  cssVariableTransitionDuration,
  getInsetJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  type MotionDurationKey,
  prefersColorSchemeDarkMediaQuery,
} from '../../../styles';
import {
  frostedGlassStyle,
  motionDurationLong,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingStaticSmall,
  themeDarkBackgroundShading,
  themeLightBackgroundShading,
} from '@porsche-design-system/utilities-v2';
import { FLYOUT_Z_INDEX } from '../../../constants';

export const drawerWidth = '25vw';

export const getComponentCss = (isMainDrawerOpen: boolean, isSecondaryDrawerOpen: boolean, theme: Theme): string => {
  const { backgroundColor } = getThemedColors(theme);
  const { backgroundColor: backgroundColorDark } = getThemedColors('dark');

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...getBackdropJssStyles(isMainDrawerOpen, 'long', theme),
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      dialog: {
        position: 'fixed',
        ...getInsetJssStyle(),
        display: 'grid',
        gridTemplateColumns: `repeat(${isSecondaryDrawerOpen ? 2 : 1}, ${drawerWidth}) auto`,
        gridTemplateRows: '100vh',
        width: 'fit-content', // ua-style reset and to ensure transition duration works correctly
        height: '100vh', // ua-style reset
        maxWidth: '100vw', // ua-style reset
        maxHeight: '100vh', // ua-style reset
        margin: 0, // ua-style reset
        padding: 0, // ua-style reset
        border: 0, // ua-style reset
        background: 'none', // ua-style reset
        overflow: 'hidden', // ua-style reset, dialog shall never become scrollable, it's handled by custom scroll areas
        // transform: 'translate3d(0, 0, 0)', // to give new stacking context for secondary drawer
        ...(isMainDrawerOpen
          ? {
              transform: 'translate3d(0, 0, 0)',
              transition: `${getTransition('transform', 'long', 'in')}`,
              /* insetInlineStart: 0,
              transition: `${getTransition('inset-inline-start', 'long', 'in')}`,*/
            }
          : {
              // TODO: translade3d() is not RTL ready
              transform: 'translate3d(-100%, 0, 0)',
              transition: `${getTransition('transform', 'long', 'out')}`,
              /* insetInlineStart: '-100%', // TODO: -100% doesn't represent the width of the content!
              transition: `${getTransition('inset-inline-start', 'long', 'out')}`,*/
            }),
        '&::backdrop': {
          // to improve browser backwards compatibility we visually style the backdrop on the :host,
          // although it's not on the #top-layer like it would be for modern browsers supporting ::backdrop
          opacity: 0, // to support backdrop click for modern browsers supporting ::backdrop
        },
      },
    },
    // TODO: reliable drop shadow would only be possible with another DIV
    drawer: {
      gridArea: '1/1',
      padding: spacingFluidMedium,
      overflow: 'auto',
      backgroundColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        backgroundColor: backgroundColorDark,
      }),
    },
    dismiss: {
      gridArea: '1/-1',
      alignSelf: 'flex-start',
      margin: spacingFluidSmall,
      padding: spacingStaticSmall,
    },
  });
};

/**
 * Generates JSS styles for a frosted glass background.
 * @param {boolean} isVisible - Determines if the frosted glass effect is visible.
 * @param {string} duration - The duration of the transition animation.
 * @param {Theme} theme - The theme to be used
 * @returns {JssStyle} - The JSS styles for the frosted glass backdrop.
 */
const getBackdropJssStyles = (isVisible: boolean, duration: MotionDurationKey, theme: Theme): JssStyle => {
  return {
    position: 'fixed',
    ...getInsetJssStyle(),
    zIndex: FLYOUT_Z_INDEX,
    ...(isVisible
      ? {
          visibility: 'visible',
          ...frostedGlassStyle,
          // TODO: background shading is missing in getThemedColors(theme).backgroundShading
          background: isThemeDark(theme) ? themeDarkBackgroundShading : themeLightBackgroundShading,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            background: themeDarkBackgroundShading,
          }),
        }
      : {
          visibility: 'hidden', // element shall not be tabbable after fade out transition has finished
          WebkitBackdropFilter: 'blur(0px)',
          backdropFilter: 'blur(0px)',
          background: 'none',
        }),
    transition: `${getTransition('background', duration, 'base')}, ${getTransition(
      'backdrop-filter',
      duration,
      'base'
    )}, ${getTransition(
      '-webkit-backdrop-filter',
      duration,
      'base'
    )}, visibility 0s linear var(${cssVariableTransitionDuration}, ${isVisible ? '0s' : motionDurationLong})`,
  };
};
