import { getCss, isThemeDark, mergeDeep } from '../../../utils';
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
  dropShadowHighStyle,
  headingMediumStyle,
  motionDurationLong,
  spacingFluidLarge,
  spacingFluidSmall,
  type Theme,
} from '@porsche-design-system/utilities-v2';
import {
  cssVariableVisibility,
  cssVariableVisibilityTransitionDuration,
  frostedGlassHeaderHeight,
  getContentJssStyles,
  mediaQueryEnhancedView,
  scrollerWidthEnhancedView,
} from '../flyout-navigation/flyout-navigation-styles';

const frostedGlassBackgroundColorLight = 'rgba(238, 239, 242, 0.79)';
const frostedGlassBackgroundColorDark = 'rgba(33, 34, 37, 0.79)';

export const getComponentCss = (isSecondaryScrollerVisible: boolean, theme: Theme): string => {
  const { primaryColor, backgroundSurfaceColor } = getThemedColors(theme);
  const { primaryColor: primaryColorDark, backgroundSurfaceColor: backgroundSurfaceColorDark } =
    getThemedColors('dark');

  const frostedGlassBackgroundColor = isThemeDark(theme)
    ? frostedGlassBackgroundColorDark
    : frostedGlassBackgroundColorLight;

  const fadeInOutTransition = isSecondaryScrollerVisible
    ? {
        opacity: 1,
        transition: `${getTransition('opacity', 'veryLong', 'in', 'short')}`,
        [mediaQueryEnhancedView]: {
          transition: `${getTransition('opacity', 'long', 'in')}`,
        },
      }
    : {
        opacity: 0,
        transition: `${getTransition('opacity', 'short', 'out')}`,
      };

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
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
      ...dropShadowHighStyle,
      // it's important to define background-color for each scroller to have correct scrollbar coloring
      backgroundColor: backgroundSurfaceColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        backgroundColor: backgroundSurfaceColorDark,
      }),
      [mediaQueryEnhancedView]: {
        boxShadow: 'none',
        insetInlineStart: `calc(${scrollerWidthEnhancedView} - 1px)`, // -1px prevents possible visible background under certain circumstances between primary and secondary scroller
        width: scrollerWidthEnhancedView,
        transform: 'initial',
        transition: `visibility 0s linear var(${cssVariableTransitionDuration},var(${cssVariableVisibilityTransitionDuration},0s))`,
      },
    },
    // header needs to be placed within scroller to ensure scrollbars are fully visible
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 1,
      height: frostedGlassHeaderHeight,
      padding: `0 ${spacingFluidLarge}`,
      display: 'grid',
      gridTemplateColumns: '4rem minmax(0, 1fr) 4rem',
      alignItems: 'center',
      gap: spacingFluidSmall,
      WebkitBackdropFilter: 'blur(8px)',
      backdropFilter: 'blur(8px)', // with current frostedGlassStyle of blur(32px) scrolling becomes visually distracting
      backgroundColor: frostedGlassBackgroundColor,
      ...fadeInOutTransition,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        backgroundColor: frostedGlassBackgroundColorDark,
      }),
      [mediaQueryEnhancedView]: {
        display: 'none',
      },
    },
    back: {
      justifySelf: 'flex-start',
      padding: spacingFluidSmall,
      marginInlineStart: `calc(${spacingFluidSmall} * -1)`,
    },
    heading: {
      ...headingMediumStyle,
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      color: primaryColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: primaryColorDark,
      }),
    },
    content: mergeDeep(getContentJssStyles(), fadeInOutTransition),
  });
};
