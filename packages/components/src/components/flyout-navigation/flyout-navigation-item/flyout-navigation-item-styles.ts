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
  drawerWidth,
  getContentJssStyles,
} from '../flyout-navigation/flyout-navigation-styles';

export const getComponentCss = (isSecondaryDrawerOpen: boolean, theme: Theme): string => {
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
        opacity: isSecondaryDrawerOpen ? 1 : 0,
        transition: getTransition('opacity', 'long'),
      }),
    },
    button: {
      width: 'auto',
      padding: spacingFluidSmall,
      margin: `0 calc(${spacingFluidSmall} * -1)`,
    },
    drawer: {
      position: 'fixed',
      ...getInsetJssStyle(),
      // cssVariableTransitionDuration ensures closing animation of secondary drawer is given when whole flyout-navigation gets closed
      transition: `${getTransition(
        'transform',
        'long',
        isSecondaryDrawerOpen ? 'in' : 'out'
      )}, visibility 0s linear var(${cssVariableTransitionDuration}, var(${cssVariableVisibilityTransitionDuration}, ${
        isSecondaryDrawerOpen ? '0s' : motionDurationLong
      }))`,
      transform: isSecondaryDrawerOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
      // cssVariableVisibility ensures secondary drawer is not tabbable when whole flyout-navigation is closed
      // on mobile we need to decide if secondary drawer needs to be visible or not, on desktop it wouldn't be necessary but also doesn't harm
      visibility: `var(${cssVariableVisibility},${isSecondaryDrawerOpen ? 'visible' : 'hidden'})`,
      zIndex: isSecondaryDrawerOpen ? 2 : 1,
      width: '100vw',
      boxSizing: 'border-box',
      overflow: 'auto',
      backgroundColor: backgroundSurfaceColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        backgroundColor: backgroundSurfaceColorDark,
      }),
      [getMediaQueryMin('l')]: {
        insetInlineStart: `calc(${drawerWidth} - 1px)`, // -1px prevents possible visible background under certain circumstances between main and secondary drawer
        width: drawerWidth,
        transform: 'initial',
        transition: `visibility 0s linear var(${cssVariableTransitionDuration}, var(${cssVariableVisibilityTransitionDuration}, 0s))`,
      },
    },
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
