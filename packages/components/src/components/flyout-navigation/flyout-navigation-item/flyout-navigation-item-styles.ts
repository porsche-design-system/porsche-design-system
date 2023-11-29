import { getCss, isThemeDark } from '../../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  cssVariableTransitionDuration,
  getInsetJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
} from '../../../styles';
import {
  getMediaQueryMin,
  headingMediumStyle,
  motionDurationLong,
  spacingFluidLarge,
  spacingFluidSmall,
  type Theme,
} from '@porsche-design-system/utilities-v2';
import {
  cssVariableVisibility,
  cssVariableVisibilityTransitionDuration,
  scrollerWidth,
  getContentJssStyles,
} from '../flyout-navigation/flyout-navigation-styles';

export const getComponentCss = (isSecondaryScrollerVisible: boolean, theme: Theme): string => {
  const { primaryColor, backgroundSurfaceColor } = getThemedColors(theme);
  const { primaryColor: primaryColorDark, backgroundSurfaceColor: backgroundSurfaceColorDark } =
    getThemedColors('dark');

  const frostedGlassBackgroundColor = isThemeDark(theme) ? 'rgba(33, 34, 37, 0.79)' : 'rgba(238, 239, 242, 0.79)';
  const frostedGlassBackgroundColorDark = 'rgba(33, 34, 37, 0.79)';

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      '::slotted(*)': addImportantToEachRule({
        opacity: isSecondaryScrollerVisible ? 1 : 0,
        transition: getTransition('opacity', 'long'),
      }),
    },
    button: {
      width: 'auto',
      padding: spacingFluidSmall,
      margin: `0 calc(${spacingFluidSmall} * -1)`,
    },
    scroller: {
      position: 'fixed',
      ...getInsetJssStyle(),
      // "cssVariableTransitionDuration" ensures closing animation of secondary scroller is given when whole flyout-navigation gets closed
      // "cssVariableVisibility" ensures secondary scroller is not tabbable when whole flyout-navigation is closed
      ...(isSecondaryScrollerVisible
        ? {
            zIndex: 2,
            transform: 'translate3d(0, 0, 0)',
            visibility: `var(${cssVariableVisibility},visible)`,
            transition: `${getTransition(
              'transform',
              'long',
              'in'
            )}, visibility 0s linear var(${cssVariableTransitionDuration},var(${cssVariableVisibilityTransitionDuration},0s))`,
          }
        : {
            zIndex: 1,
            transform: 'translate3d(100%, 0, 0)',
            visibility: `var(${cssVariableVisibility},hidden)`,
            transition: `${getTransition(
              'transform',
              'long',
              'out'
            )}, visibility 0s linear var(${cssVariableTransitionDuration},var(${cssVariableVisibilityTransitionDuration},${motionDurationLong}))`,
          }),
      width: '100vw',
      boxSizing: 'border-box',
      overflow: 'auto',
      backgroundColor: backgroundSurfaceColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        backgroundColor: backgroundSurfaceColorDark,
      }),
      [getMediaQueryMin('l')]: {
        insetInlineStart: `calc(${scrollerWidth} - 1px)`, // -1px prevents possible visible background under certain circumstances between primary and secondary scroller
        width: scrollerWidth,
        transform: 'initial',
        transition: `visibility 0s linear var(${cssVariableTransitionDuration},var(${cssVariableVisibilityTransitionDuration},0s))`,
      },
    },
    // header needs to be placed within scroller to ensure scrollbars are fully visible
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 1,
      padding: `${spacingFluidSmall} ${spacingFluidLarge}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: spacingFluidSmall,
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
    back: {
      padding: spacingFluidSmall,
      marginInlineStart: `calc(${spacingFluidSmall} * -1)`,
    },
    heading: {
      ...headingMediumStyle,
      textAlign: 'center',
      margin: 0,
      padding: 0,
      color: primaryColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: primaryColorDark,
      }),
    },
    dismiss: {
      padding: spacingFluidSmall,
      marginInlineEnd: `calc(${spacingFluidSmall} * -1)`,
    },
    content: getContentJssStyles(),
  });
};
