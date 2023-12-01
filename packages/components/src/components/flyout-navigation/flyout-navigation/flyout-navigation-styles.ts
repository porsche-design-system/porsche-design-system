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

export const frostedGlassHeaderHeight = '4rem';
const frostedGlassBackgroundColorLight = 'rgba(255, 255, 255, 0.79)';
const frostedGlassBackgroundColorDark = 'rgba(14, 14, 18, 0.79)';

export const scrollerWidthEnhancedView = 'clamp(338px, 10.52vw + 258px, 460px)';
export const mediaQueryEnhancedView = getMediaQueryMin('s');

export const getComponentCss = (
  isPrimaryScrollerVisible: boolean,
  isSecondaryScrollerVisible: boolean,
  theme: Theme
): string => {
  const { backgroundColor } = getThemedColors(theme);
  const { backgroundColor: backgroundColorDark } = getThemedColors('dark');

  const frostedGlassBackgroundColor = isThemeDark(theme)
    ? frostedGlassBackgroundColorDark
    : frostedGlassBackgroundColorLight;

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...(!isPrimaryScrollerVisible && {
            [cssVariableVisibility]: 'hidden',
            [cssVariableVisibilityTransitionDuration]: motionDurationLong,
          }),
          ...getBackdropJssStyle(isPrimaryScrollerVisible, 'long', theme),
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      dialog: {
        position: 'fixed',
        ...getInsetJssStyle(),
        display: 'grid', // ua-style reset
        width: 'auto', // ua-style reset and to ensure transition duration works correctly
        height: '100vh', // ua-style reset
        maxWidth: '100vw', // ua-style reset
        maxHeight: '100vh', // ua-style reset
        margin: 0, // ua-style reset
        padding: 0, // ua-style reset
        border: 0, // ua-style reset
        visibility: 'inherit', // ua-style reset
        background: 'none', // ua-style reset
        overflow: 'hidden', // ua-style reset, dialog shall never become scrollable, it's handled by custom scroll areas
        ...(isPrimaryScrollerVisible
          ? {
              transform: 'translate3d(0, 0, 0)',
              transition: `${getTransition('transform', 'long', 'in')}`,
            }
          : {
              transform: 'translate3d(-100%, 0, 0)',
              transition: `${getTransition('transform', 'long', 'out')}`,
            }),
        [mediaQueryEnhancedView]: {
          gridTemplateColumns: `repeat(${isSecondaryScrollerVisible ? 2 : 1}, ${scrollerWidthEnhancedView}) auto`,
          gridTemplateRows: '100vh',
          insetInlineEnd: 'auto', // to have correct dialog dimensions for ideal transitions
        },
        '&:focus-visible': {
          outline: 'none', // ua-style reset
        },
        '&::backdrop': {
          // to improve browser backwards compatibility we visually style the backdrop on the :host,
          // although it's not on the #top-layer like it would be for modern browsers supporting ::backdrop
          opacity: 0, // to support backdrop click for modern browsers supporting ::backdrop
        },
      },
    },
    scroller: {
      gridArea: '1/1',
      overflow: 'auto',
      // cssVariableVisibility ensures secondary scroller is not tabbable when whole flyout-navigation is closed
      // on mobile we need to decide if secondary scroller needs to be visible or not, on desktop it's not necessary but also doesn't harm
      visibility: `var(${cssVariableVisibility},${isSecondaryScrollerVisible ? 'hidden' : 'visible'})`,
      transition: `${getTransition(
        'left',
        'long',
        isSecondaryScrollerVisible ? 'in' : 'out'
      )}, visibility 0s linear var(${cssVariableTransitionDuration}, ${
        !isPrimaryScrollerVisible || isSecondaryScrollerVisible ? motionDurationLong : '0s'
      })`,
      // it's important to define background-color for each scroller to have correct scrollbar coloring
      backgroundColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        backgroundColor: backgroundColorDark,
      }),
      [mediaQueryEnhancedView]: {
        visibility: 'inherit',
        transition: 'initial',
      },
      // simulates frosted glass header, to be visually in sync with header of secondary scroller
      '&::before': {
        content: '""',
        display: 'block',
        position: 'sticky',
        top: 0,
        zIndex: 1,
        height: frostedGlassHeaderHeight,
        backgroundColor: frostedGlassBackgroundColor,
        WebkitBackdropFilter: 'blur(8px)',
        backdropFilter: 'blur(8px)', // with current frostedGlassStyle of blur(32px) scrolling becomes visually distracting
        ...prefersColorSchemeDarkMediaQuery(theme, {
          backgroundColor: frostedGlassBackgroundColorDark,
        }),
        [mediaQueryEnhancedView]: {
          display: 'none',
        },
      },
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacingFluidXSmall,
      padding: `${spacingFluidSmall} ${spacingFluidLarge} ${spacingFluidLarge}`,
      [mediaQueryEnhancedView]: {
        padding: `${spacingFluidMedium} ${spacingFluidLarge} ${spacingFluidLarge}`,
      },
    },
    // header is needed to keep position of dismiss button in sync with header of secondary scroller
    header: {
      position: 'relative',
      zIndex: 3, // ensures dismiss button is visible on secondary drawer in mobile view
      gridArea: '1/1',
      alignSelf: 'flex-start',
      justifySelf: 'flex-end',
      marginInlineEnd: `calc(${spacingFluidLarge} - ${spacingFluidSmall})`,
      height: frostedGlassHeaderHeight,
      display: 'flex',
      alignItems: 'center',
      [mediaQueryEnhancedView]: {
        marginInlineEnd: 0,
        gridArea: '1/-1',
        placeSelf: 'flex-start',
      },
    },
    dismiss: {
      padding: spacingFluidSmall,
      [mediaQueryEnhancedView]: {
        margin: spacingFluidSmall,
        padding: spacingStaticSmall,
      },
    },
  });
};

// TODO: getBackdropJssStyle can be shared with flyout and modal
/**
 * Generates JSS styles for a frosted glass background.
 * @param {boolean} isVisible - Determines if the frosted glass effect is visible.
 * @param {string} duration - The duration of the transition animation.
 * @param {Theme} theme - The theme to be used
 * @returns {JssStyle} - The JSS styles for the frosted glass backdrop.
 */
const getBackdropJssStyle = (isVisible: boolean, duration: MotionDurationKey, theme: Theme): JssStyle => {
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

export const getContentJssStyle = (): JssStyle => {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: spacingFluidXSmall,
    padding: `${spacingFluidSmall} ${spacingFluidLarge} ${spacingFluidLarge}`,
    [mediaQueryEnhancedView]: {
      padding: `${spacingFluidMedium} ${spacingFluidLarge} ${spacingFluidLarge}`,
    },
  };
};
