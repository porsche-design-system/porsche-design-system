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
  getMediaQueryMax,
  getMediaQueryMin,
  motionDurationLong,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingFluidXSmall,
  spacingStaticSmall,
  themeDarkBackgroundShading,
  themeLightBackgroundShading,
} from '@porsche-design-system/utilities-v2';
import { FLYOUT_Z_INDEX } from '../../../constants';

export const cssVariableVisibility = '--p-internal-flyout-navigation-visibility';
export const cssVariableVisibilityTransitionDuration = '--p-internal-flyout-navigation-visibility-transition-duration';

export const drawerWidth = '30vw';

export const getComponentCss = (isMainDrawerOpen: boolean, isSecondaryDrawerOpen: boolean, theme: Theme): string => {
  const { backgroundColor } = getThemedColors(theme);
  const { backgroundColor: backgroundColorDark } = getThemedColors('dark');

  const frostedGlassBackgroundColor = isThemeDark(theme) ? 'rgba(14, 14, 18, 0.79)' : 'rgba(255, 255, 255, 0.79)';
  const frostedGlassBackgroundColorDark = 'rgba(14, 14, 18, 0.79)';

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...(!isMainDrawerOpen && {
            [cssVariableVisibility]: 'hidden',
            [cssVariableVisibilityTransitionDuration]: motionDurationLong,
          }),
          ...getBackdropJssStyles(isMainDrawerOpen, 'long', theme),
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      dialog: {
        position: 'fixed',
        ...getInsetJssStyle(),
        display: 'block', // ua-style reset
        width: '100vw', // ua-style reset and to ensure transition duration works correctly
        height: '100vh', // ua-style reset
        maxWidth: '100vw', // ua-style reset
        maxHeight: '100vh', // ua-style reset
        margin: 0, // ua-style reset
        padding: 0, // ua-style reset
        border: 0, // ua-style reset
        visibility: 'inherit', // ua-style reset
        background: 'none', // ua-style reset
        overflow: 'hidden', // ua-style reset, dialog shall never become scrollable, it's handled by custom scroll areas
        [getMediaQueryMin('xl')]: {
          gridTemplateColumns: `repeat(${isSecondaryDrawerOpen ? 2 : 1}, ${drawerWidth}) auto`,
        },
        '&::backdrop': {
          // to improve browser backwards compatibility we visually style the backdrop on the :host,
          // although it's not on the #top-layer like it would be for modern browsers supporting ::backdrop
          opacity: 0, // to support backdrop click for modern browsers supporting ::backdrop
        },
      },
    },
    wrapper: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr)',
      gridTemplateRows: '100vh',
      overflow: 'hidden',
      ...(isMainDrawerOpen
        ? {
            transform: 'translate3d(0, 0, 0)',
            transition: `${getTransition('transform', 'long', 'in')}`,
          }
        : {
            transform: 'translate3d(-100%, 0, 0)',
            transition: `${getTransition('transform', 'long', 'out')}`,
          }),
      [getMediaQueryMin('l')]: {
        gridTemplateColumns: `repeat(${isSecondaryDrawerOpen ? 2 : 1}, ${drawerWidth}) auto`,
      },
    },
    drawer: {
      gridArea: '1/1',
      overflow: 'auto',
      // cssVariableVisibility ensures secondary drawer is not tabbable when whole flyout-navigation is closed
      // on mobile we need to decide if secondary drawer needs to be visible or not, on desktop it's not necessary but also doesn't harm
      [getMediaQueryMax('l')]: {
        visibility: `var(${cssVariableVisibility},${isSecondaryDrawerOpen ? 'hidden' : 'visible'})`,
        transition: `visibility 0s linear var(${cssVariableTransitionDuration}, ${
          !isMainDrawerOpen || isSecondaryDrawerOpen ? motionDurationLong : '0s'
        })`,
      },
      backgroundColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        backgroundColor: backgroundColorDark,
      }),
    },
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 1,
      padding: `${spacingFluidSmall} ${spacingFluidLarge}`,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: frostedGlassBackgroundColor,
      WebkitBackdropFilter: 'blur(8px)',
      backdropFilter: 'blur(8px)', // with current frostedGlassStyle of blur(32px) scrolling becomes visually distracting
      ...prefersColorSchemeDarkMediaQuery(theme, {
        backgroundColor: frostedGlassBackgroundColorDark,
      }),
      [getMediaQueryMin('l')]: {
        display: 'none',
      },
    },
    content: getContentJssStyles(),
    dismiss: {
      gridArea: '1/1',
      alignSelf: 'flex-start',
      justifySelf: 'flex-end',
      padding: spacingFluidSmall,
      marginInlineEnd: `calc(${spacingFluidSmall} * -1)`,
      [getMediaQueryMin('l')]: {
        gridArea: '1/-1',
        margin: spacingFluidSmall,
        padding: spacingStaticSmall,
      },
    },
  });
};

// TODO: getBackdropJssStyles can be shared with flyout and modal
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
          pointerEvents: 'auto',
          ...frostedGlassStyle,
          // TODO: background shading is missing in getThemedColors(theme).backgroundShading
          background: isThemeDark(theme) ? themeDarkBackgroundShading : themeLightBackgroundShading,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            background: themeDarkBackgroundShading,
          }),
        }
      : {
          visibility: 'hidden', // element shall not be tabbable after fade out transition has finished
          pointerEvents: 'none',
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

export const getContentJssStyles = (): JssStyle => {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: spacingFluidXSmall,
    padding: `${spacingFluidSmall} ${spacingFluidLarge} ${spacingFluidLarge}`,
    [getMediaQueryMin('l')]: {
      padding: `${spacingFluidMedium} ${spacingFluidLarge} ${spacingFluidLarge}`,
    },
  };
};
