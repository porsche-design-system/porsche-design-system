import { type JssStyle } from 'jss';
import { getCss, isThemeDark, type Theme } from '../../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  cssVariableTransitionDuration,
  getBackdropJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
} from '../../../styles';
import {
  getMediaQueryMin,
  motionDurationLong,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingFluidXSmall,
  spacingStaticSmall,
} from '@porsche-design-system/utilities-v2';
import { FLYOUT_Z_INDEX } from '../../../constants';
import { getFlyoutDialogResetStyles } from '../../../styles/dialog-reset-styles';

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
          ...getBackdropJssStyle(isPrimaryScrollerVisible, FLYOUT_Z_INDEX, theme),
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      dialog: {
        ...getFlyoutDialogResetStyles(),
        inset: '0',
        display: 'grid',
        overflow: 'hidden',
        width: 'auto',
        maxWidth: '100vw',
        background: 'none',
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
        '&:dir(rtl)': {
          ...(!isPrimaryScrollerVisible && {
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
      gridArea: '1/1',
      overflow: 'auto',
      // cssVariableVisibility ensures secondary scroller is not tabbable when whole flyout-navigation is closed
      // on mobile we need to decide if secondary scroller needs to be visible or not, on desktop it's not necessary but also doesn't harm
      visibility: `var(${cssVariableVisibility},${isSecondaryScrollerVisible ? 'hidden' : 'inherit'})`,
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
    padding: `${spacingFluidSmall} ${spacingFluidLarge} ${spacingFluidLarge}`,
    [mediaQueryEnhancedView]: {
      padding: `${spacingFluidMedium} ${spacingFluidLarge} ${spacingFluidLarge}`,
    },
  };
};
