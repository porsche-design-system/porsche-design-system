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
  spacingFluidLarge,
  spacingFluidSmall,
  spacingStaticSmall,
  themeDarkBackgroundShading,
  themeLightBackgroundShading,
} from '@porsche-design-system/utilities-v2';
import { JssStyle } from 'jss';
import { FLYOUT_Z_INDEX } from '../../../constants';

export const getComponentCss = (isOpen: boolean, theme: Theme): string => {
  const { backgroundColor, backgroundSurfaceColor } = getThemedColors(theme);
  const { backgroundColor: backgroundColorDark, backgroundSurfaceColor: backgroundSurfaceColorDark } =
    getThemedColors('dark');

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          zIndex: FLYOUT_Z_INDEX,
          ...getBackdropJssStyles(isOpen, 'long', theme),
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      dialog: {
        position: 'fixed',
        ...getInsetJssStyle(),
        display: 'grid',
        gridTemplateColumns: 'repeat(2, auto) minmax(0, 1fr)',
        gridTemplateRows: '100vh',
        width: '100vw', // to enable backdrop click for browsers not supporting ::backdrop
        height: '100vh',
        maxWidth: '100vw',
        maxHeight: '100vh',
        margin: 0,
        padding: 0,
        border: 0,
        background: 'none',
        ...(isOpen
          ? {
              // TODO: somehow opacity transition is not visible
              opacity: 1,
              transform: 'translate3d(0, 0, 0)',
              transition: `${getTransition('opacity', 'long', 'in')}, ${getTransition('transform', 'long', 'in')}`,
            }
          : {
              opacity: 0,
              transform: 'translate3d(-100%, 0, 0)',
              transition: `${getTransition('opacity', 'short', 'out', 'long')}, ${getTransition(
                'transform',
                'long',
                'out'
              )}`,
            }),
        '&::backdrop': {
          // to improve browser backwards compatibility we visually style the backdrop on the :host,
          // although it's not on the #top-layer like it would be for modern browsers supporting ::backdrop
          display: 'none',
        },
      },
      '::slotted([slot="level-1"])': addImportantToEachRule({
        margin: 0,
        padding: spacingFluidLarge,
        overflow: 'auto',
        backgroundColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          backgroundColor: backgroundColorDark,
        }),
      }),
      '::slotted([slot="level-2"])': addImportantToEachRule({
        margin: 0,
        padding: spacingFluidLarge,
        overflow: 'auto',
        backgroundColor: backgroundSurfaceColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          backgroundColor: backgroundSurfaceColorDark,
        }),
      }),
    },
    nav: {
      gridArea: '1/1',
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 30vw)',
    },
    dismiss: {
      gridArea: '1/2',
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
    ...(isVisible
      ? {
          visibility: 'visible',
          ...frostedGlassStyle,
          // TODO: background shading is missing in getThemedColors(theme).backgroundShading
          background: isThemeDark(theme) ? themeDarkBackgroundShading : themeLightBackgroundShading,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            background: themeDarkBackgroundShading,
          }),
          transition: `${getTransition('background', duration, 'base')}, ${getTransition(
            'backdrop-filter',
            duration,
            'base'
          )}, ${getTransition('-webkit-backdrop-filter', duration, 'base')}`,
        }
      : {
          visibility: 'hidden', // element shall not be tabbable after fade out transition has finished
          WebkitBackdropFilter: 'blur(0px)',
          backdropFilter: 'blur(0px)',
          background: 'transparent',
          transition: `${getTransition('background', duration, 'base')}, ${getTransition(
            'backdrop-filter',
            duration,
            'base'
          )}, ${getTransition(
            '-webkit-backdrop-filter',
            duration,
            'base'
          )}, visibility 0s linear var(${cssVariableTransitionDuration}, ${motionDurationLong})`,
        }),
  };
};
