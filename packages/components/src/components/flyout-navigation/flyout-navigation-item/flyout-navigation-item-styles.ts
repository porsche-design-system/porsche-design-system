import { getCss, isThemeDark, mergeDeep } from '../../../utils';
import {
  addImportantToEachRule,
  addImportantToRule,
  colorSchemeStyles,
  cssVariableTransitionDuration,
  getInsetJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
} from '../../../styles';
import {
  borderRadiusSmall,
  borderWidthBase,
  dropShadowHighStyle,
  headingMediumStyle,
  headingSmallStyle,
  motionDurationLong,
  motionDurationShort,
  motionEasingBase,
  spacingFluidLarge,
  spacingFluidSmall,
  spacingStaticXSmall,
  textSmallStyle,
  type Theme,
} from '@porsche-design-system/utilities-v2';
import {
  cssVariableVisibility,
  cssVariableVisibilityTransitionDuration,
  frostedGlassHeaderHeight,
  getContentJssStyle,
  mediaQueryEnhancedView,
  scrollerWidthEnhancedView,
} from '../flyout-navigation/flyout-navigation-styles';

const frostedGlassBackgroundColorLight = 'rgba(238, 239, 242, 0.79)';
const frostedGlassBackgroundColorDark = 'rgba(33, 34, 37, 0.79)';

export const getComponentCss = (isSecondaryScrollerVisible: boolean, theme: Theme): string => {
  const { primaryColor, backgroundSurfaceColor, focusColor, hoverColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    backgroundSurfaceColor: backgroundSurfaceColorDark,
    focusColor: focusColorDark,
    hoverColor: hoverColorDark,
  } = getThemedColors('dark');

  const frostedGlassBackgroundColor = isThemeDark(theme)
    ? frostedGlassBackgroundColorDark
    : frostedGlassBackgroundColorLight;

  const fadeInOutTransition = isSecondaryScrollerVisible
    ? {
        opacity: 1,
        transition: `${getTransition('opacity', 'veryLong', 'in', 'short')}`,
        [mediaQueryEnhancedView]: {
          transition: `${getTransition('opacity', 'veryLong', 'in')}`,
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
      '::slotted(:is(h1, h2, h3, h4, h5, h6))': addImportantToEachRule({
        ...headingSmallStyle,
        margin: 0,
        color: primaryColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: primaryColorDark,
        }),
      }),
      '::slotted(:is(h1, h2, h3, h4, h5, h6):not(:first-child))': addImportantToEachRule({
        margin: `${spacingFluidSmall} 0 0`,
      }),
      '::slotted(p)': addImportantToEachRule({
        ...textSmallStyle,
        margin: 0,
        color: primaryColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: primaryColorDark,
        }),
      }),
      // TODO: how can we easily re-use getHoverStyle() and getFocusStyle() with ::slotted(a) selector?
      '::slotted(a)': {
        ...addImportantToEachRule({
          ...textSmallStyle,
          display: 'block',
          textDecoration: 'none',
          cursor: 'pointer',
          color: primaryColor,
          borderRadius: borderRadiusSmall,
          marginLeft: `-${spacingStaticXSmall}`,
          marginRight: `-${spacingStaticXSmall}`,
          padding: `2px ${spacingStaticXSmall}`,
          transition: `background var(${cssVariableTransitionDuration}, ${motionDurationShort}) ${motionEasingBase}`,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: primaryColorDark,
          }),
        }),
      },
      ...hoverMediaQuery({
        '::slotted(a:hover)': addImportantToEachRule({
          background: hoverColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            background: hoverColorDark,
          }),
        }),
      }),
      '::slotted(a[aria-current])': addImportantToEachRule({
        background: hoverColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          background: hoverColorDark,
        }),
      }),
      '::slotted(a:focus)': addImportantToEachRule({
        outline: `${borderWidthBase} solid ${focusColor}`,
        outlineOffset: '-2px',
        ...prefersColorSchemeDarkMediaQuery(theme, {
          outlineColor: focusColorDark,
        }),
      }),
      '::slotted(a:focus:not(:focus-visible))': addImportantToEachRule({
        outlineColor: 'transparent',
      }),
    },
    button: {
      width: '100%',
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
        transform: addImportantToRule('initial'), // to overrule :dir(rtl) selector
        transition: `visibility 0s linear var(${cssVariableTransitionDuration},var(${cssVariableVisibilityTransitionDuration},0s))`,
      },
      '&:dir(rtl)': {
        ...(!isSecondaryScrollerVisible && {
          transform: 'translate3d(-100%, 0, 0)', // use correct transitions in rtl mode for mobile view
        }),
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
    content: mergeDeep(getContentJssStyle(), fadeInOutTransition),
  });
};
