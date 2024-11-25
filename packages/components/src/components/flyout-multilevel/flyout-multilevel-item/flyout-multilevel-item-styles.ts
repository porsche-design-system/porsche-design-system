import {
  type Theme,
  borderRadiusSmall,
  dropShadowHighStyle,
  headingMediumStyle,
  headingSmallStyle,
  motionDurationLong,
  motionDurationShort,
  motionEasingBase,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingFluidXSmall,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  addImportantToRule,
  colorSchemeStyles,
  cssVariableTransitionDuration,
  getFocusJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { getCss, isThemeDark, mergeDeep } from '../../../utils';
import {
  cssVariableVisibility,
  cssVariableVisibilityTransitionDuration,
  frostedGlassHeaderHeight,
  getContentJssStyle,
  mediaQueryEnhancedView,
  scrollerWidthEnhancedView,
} from '../flyout-multilevel/flyout-multilevel-styles';

const frostedGlassBackgroundColorLight = 'rgba(238, 239, 242, 0.79)';
const frostedGlassBackgroundColorDark = 'rgba(33, 34, 37, 0.79)';

export const getComponentCss = (
  isPrimary: boolean,
  isSecondary: boolean,
  isCascade: boolean,
  identifier: string,
  theme: Theme
): string => {
  const { primaryColor, backgroundSurfaceColor, hoverColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    backgroundSurfaceColor: backgroundSurfaceColorDark,
    hoverColor: hoverColorDark,
  } = getThemedColors('dark');

  const frostedGlassBackgroundColor = isThemeDark(theme)
    ? frostedGlassBackgroundColorDark
    : frostedGlassBackgroundColorLight;

  // const fadeInOutTransition = isSecondaryScrollerVisible
  //   ? {
  //       opacity: 1,
  //       transition: `${getTransition('opacity', 'veryLong', 'in', 'short')}`,
  //       [mediaQueryEnhancedView]: {
  //         transition: `${getTransition('opacity', 'veryLong', 'in')}`,
  //       },
  //     }
  //   : {
  //       opacity: 0,
  //       transition: `${getTransition('opacity', 'short', 'out')}`,
  //     };

  return getCss({
    '@global': {
      ':host': {
        ...((isPrimary || isCascade) && {
          display: 'grid',
          gridTemplateColumns: 'subgrid',
          gridArea: '1/1/1/-1',
        }),
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      slot: {
        ...(isPrimary && {
          '--_p-flyout-multilevel-button': 'block',
        }),
        ...getContentJssStyle(),
      },
      '::slotted(*:not([primary]))': {
        ...(isCascade && {
          display: 'none',
        }),
      },
      ...(!isPrimary &&
        !isCascade &&
        !isSecondary && {
          '::slotted(*)': {
            display: 'none',
          },
        }),
      ...preventFoucOfNestedElementsStyles,
      '::slotted(:is(h1, h2, h3, h4, h5, h6))': addImportantToEachRule({
        ...headingSmallStyle,
        margin: 0,
        color: primaryColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: primaryColorDark,
        }),
      }),
      '::slotted(:is(h1, h2, h3, h4, h5, h6):not(:first-child))': addImportantToEachRule({
        margin: `calc(${spacingFluidMedium} - ${spacingFluidXSmall}) 0 0`, // spacingFluidXSmall to compensate default gap
      }),
      '::slotted': addImportantToEachRule({
        '&(p)': {
          ...textSmallStyle,
          margin: 0,
          color: primaryColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: primaryColorDark,
          }),
        },
        // '&(a)': {
        //   ...{
        //     ...textSmallStyle,
        //     alignSelf: 'flex-start',
        //     display: 'block',
        //     textDecoration: 'none',
        //     cursor: 'pointer',
        //     color: primaryColor,
        //     borderRadius: borderRadiusSmall,
        //     marginLeft: `-${spacingStaticXSmall}`,
        //     marginRight: `-${spacingStaticXSmall}`,
        //     padding: `2px ${spacingStaticXSmall}`,
        //     transition: `background var(${cssVariableTransitionDuration}, ${motionDurationShort}) ${motionEasingBase}`,
        //     ...prefersColorSchemeDarkMediaQuery(theme, {
        //       color: primaryColorDark,
        //     }),
        //   },
        // },
        // '&(a[aria-current])': {
        //   background: hoverColor,
        //   ...prefersColorSchemeDarkMediaQuery(theme, {
        //     background: hoverColorDark,
        //   }),
        // },
        // ...hoverMediaQuery({
        //   // TODO: how can we easily re-use getHoverStyle() with ::slotted(a) selector?
        //   '&(a:hover)': {
        //     background: hoverColor,
        //     ...prefersColorSchemeDarkMediaQuery(theme, {
        //       background: hoverColorDark,
        //     }),
        //   },
        // }),
        // ...getFocusJssStyle(theme, { slotted: 'a', offset: '-2px' }),
      }),
    },
    button: {
      ...(isPrimary || isCascade
        ? {
            display: 'none',
          }
        : {
            display: 'var(--_p-flyout-multilevel-button, none)',
          }),
      width: 'auto',
      padding: spacingFluidSmall,
      margin: `0 calc(${spacingFluidSmall} * -1)`,
    },
    scroller: {
      ...(isPrimary || isCascade
        ? {
            position: 'relative',
            gridArea: '1/1',
            insetInlineStart: '0 !important',
          }
        : {
            position: 'fixed',
            inset: 0,
            // display: 'var(--_p-flyout-multilevel-button, none)',
          }),

      // "cssVariableTransitionDuration" ensures closing animation of secondary scroller is given when whole flyout-multilevel gets closed
      // "cssVariableVisibility" ensures secondary scroller is not tabbable when whole flyout-multilevel is closed
      ...(!isPrimary && {
        ...(isSecondary
          ? {
              zIndex: 2,
              transform: 'translate3d(0, 0, 0)',
              // TODO: Should be visibility: inherit to allow overwriting but currently not possible since it would inherit from the scroller of the p-flyout-multilevel itself, which is hidden on mobile
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
      }),
      ...(isCascade && {
        visibility: 'visible',
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
        ...(!isSecondary && {
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
      // ...fadeInOutTransition,
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
  });
};
