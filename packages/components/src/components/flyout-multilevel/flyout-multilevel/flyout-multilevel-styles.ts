import {
  getMediaQueryMin,
  motionDurationLong,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingFluidXSmall,
  spacingStaticSmall,
} from '@porsche-design-system/styles';
import type { JssStyle } from 'jss';
import { FLYOUT_Z_INDEX } from '../../../constants';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  cssVariableTransitionDuration,
  getBackdropJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { getFlyoutDialogResetJssStyle } from '../../../styles/flyout-dialog-reset-styles';
import { type Theme, getCss, isThemeDark } from '../../../utils';

export const cssVariableVisibility = '--p-internal-flyout-multilevel-visibility';
export const cssVariableVisibilityTransitionDuration = '--p-internal-flyout-multilevel-visibility-transition-duration';

export const frostedGlassHeaderHeight = '4rem';
const frostedGlassBackgroundColorLight = 'rgba(255, 255, 255, 0.79)';
const frostedGlassBackgroundColorDark = 'rgba(14, 14, 18, 0.79)';

export const scrollerWidthEnhancedView = 'clamp(338px, 10.52vw + 258px, 460px)';
export const mediaQueryEnhancedView = getMediaQueryMin('s');

export const getComponentCss = (
  isDialogOpen: boolean,
  isPrimary: boolean,
  isSecondaryScrollerVisible: boolean,
  activeIdentifier: string,
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
          ...(!isDialogOpen && {
            [cssVariableVisibility]: 'hidden',
            // [cssVariableVisibilityTransitionDuration]: motionDurationLong,
          }),
          ...getBackdropJssStyle(isDialogOpen, FLYOUT_Z_INDEX, theme),
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },

      slot: {
        ...(isPrimary && {
          '--_p-flyout-multilevel-button': 'block',
        }),
        overflow: 'hidden auto',
        // cssVariableVisibility ensures secondary scroller is not tabbable when whole flyout-multilevel is closed
        // on mobile we need to decide if secondary scroller needs to be visible or not, on desktop it's not necessary but also doesn't harm
        visibility: `var(${cssVariableVisibility},${isSecondaryScrollerVisible ? 'hidden' : 'inherit'})`,
        // transition: `${getTransition(
        //   'left',
        //   'long',
        //   isSecondaryScrollerVisible ? 'in' : 'out'
        // )}, visibility 0s linear var(${cssVariableTransitionDuration}, ${
        //   !isDialogOpen || isSecondaryScrollerVisible ? motionDurationLong : '0s'
        // })`,
        // it's important to define background-color for each scroller to have correct scrollbar coloring
        backgroundColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          backgroundColor: backgroundColorDark,
        }),
        // padding: `${spacingFluidSmall} ${spacingFluidLarge} ${spacingFluidLarge}`,

        ...(isPrimary
          ? {
              display: 'grid',
              gap: spacingFluidXSmall,
              gridArea: '1/1',
            }
          : {
              display: 'grid',
              gridTemplateColumns: 'subgrid',
              gridArea: '1/1/1/3',
            }),

        [mediaQueryEnhancedView]: {
          visibility: 'inherit',
          // transition: 'initial',
          // padding: `${spacingFluidMedium} ${spacingFluidLarge} ${spacingFluidLarge}`,
        },
      },
      ...preventFoucOfNestedElementsStyles,
      dialog: {
        ...getFlyoutDialogResetJssStyle(),
        inset: '0',
        display: 'grid',
        overflow: 'hidden',
        width: 'auto',
        maxWidth: '100vw',
        background: 'none',
        // ...(isDialogOpen
        //   ? {
        //       transform: 'translate3d(0, 0, 0)',
        //       transition: `${getTransition('transform', 'long', 'in')}`,
        //     }
        //   : {
        //       transform: 'translate3d(-100%, 0, 0)',
        //       transition: `${getTransition('transform', 'long', 'out')}`,
        //     }),
        [mediaQueryEnhancedView]: {
          gridTemplateColumns: `repeat(${isSecondaryScrollerVisible ? 2 : 1}, ${scrollerWidthEnhancedView}) auto`,
          gridTemplateRows: '100vh',
          insetInlineEnd: 'auto', // to have correct dialog dimensions for ideal transitions
        },
        '&:dir(rtl)': {
          ...(!isDialogOpen && {
            transform: 'translate3d(100%, 0, 0)', // use correct transitions in rtl mode
          }),
        },
        '&::backdrop': {
          // to improve browser backwards compatibility we visually style the backdrop on the :host,
          // although it's not on the #top-layer like it would be for modern browsers supporting ::backdrop
          opacity: 0, // to support backdrop click for modern browsers supporting ::backdrop
        },
      },
    },
    scroller: {
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
        '--p-internal-icon-filter': 'invert(1)',
        margin: spacingFluidSmall,
        padding: spacingStaticSmall,
      },
    },
  });
};

export const getContentJssStyle = (): JssStyle => {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: spacingFluidXSmall,
    // padding: `${spacingFluidSmall} ${spacingFluidLarge} ${spacingFluidLarge}`,
    // [mediaQueryEnhancedView]: {
    //   padding: `${spacingFluidMedium} ${spacingFluidLarge} ${spacingFluidLarge}`,
    // },
  };
};
