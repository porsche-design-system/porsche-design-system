import {
  borderRadiusSmall,
  motionDurationModerate,
  motionEasingBase,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingFluidXSmall,
  textMediumStyle,
  textSmallStyle,
} from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getFocusJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { type Theme, getCss } from '../../../utils';
import {
  mediaQueryEnhancedViewMax,
  mediaQueryEnhancedViewMin,
  scrollerWidthEnhancedView,
} from '../flyout-multilevel/flyout-multilevel-styles';

const animationSlideUpPrimary = {
  from: {
    paddingBlockStart: spacingFluidMedium,
  },
  to: {
    paddingBlockStart: '0px',
  },
};

const animationSlideUpSecondary = {
  from: {
    paddingBlockStart: `calc(${spacingFluidMedium} * 2)`,
  },
  to: {
    paddingBlockStart: spacingFluidMedium,
  },
};

const animationSlideUpMobile = {
  from: {
    transform: `translate3d(0,${spacingFluidMedium},0)`,
  },
  to: {
    transform: 'translate3d(0,0,0)',
  },
};

export const getComponentCss = (isPrimary: boolean, isSecondary: boolean, isCascade: boolean, theme: Theme): string => {
  const { primaryColor, backgroundColor } = getThemedColors(theme);
  const { primaryColor: primaryColorDark, backgroundColor: backgroundColorDark } = getThemedColors('dark');
  return getCss({
    '@global': {
      '@keyframes slide-up-primary': animationSlideUpPrimary,
      '@keyframes slide-up-secondary': animationSlideUpSecondary,
      '@keyframes slide-up-mobile': animationSlideUpMobile,
      ':host': {
        display: 'contents',
        // display: isPrimary || isSecondary ? 'grid' : 'contents',
        // [mediaQueryEnhancedViewMax]: {
        //   ...((isPrimary || isSecondary) && {
        //     display: 'contents',
        //   }),
        // },
        // [mediaQueryEnhancedViewMin]: {
        //   gap: spacingFluidMedium,
        // },
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      slot: {
        ...((isPrimary || isSecondary) && {
          [mediaQueryEnhancedViewMin]: {
            display: 'flex',
            flexDirection: 'column',
            gap: spacingFluidXSmall,
            willChange: 'padding-block-start',
            animation: `slide-up-${isPrimary ? 'primary' : 'secondary'} ${motionDurationModerate} ${motionEasingBase}`,
          },
        }),
        ...(isSecondary && {
          [mediaQueryEnhancedViewMax]: {
            zIndex: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: spacingFluidXSmall,
            gridArea: '4/2/auto/-2',
            height: 'fit-content', // ensures padding bottom is added instead of subtracted because of grid context
            paddingBlockEnd: spacingFluidLarge,
            animation: `slide-up-mobile ${motionDurationModerate} ${motionEasingBase}`,
          },
          [mediaQueryEnhancedViewMin]: {
            position: 'fixed', // Fixed to break out of scroll area
            inset: 0,
            overflow: 'hidden auto',
            boxSizing: 'border-box',
            padding: `${spacingFluidMedium} ${spacingFluidLarge} ${spacingFluidLarge}`,
            insetInlineStart: scrollerWidthEnhancedView,
            width: scrollerWidthEnhancedView,
          },
        }),
        ...(isCascade && {
          display: 'contents',
        }),
        ...(!isPrimary &&
          !isSecondary &&
          !isCascade && {
            display: 'none',
          }),
      },
      h5: {
        display: 'none',
        [mediaQueryEnhancedViewMax]: {
          ...(isSecondary && {
            display: 'block',
            ...textSmallStyle,
            margin: 0,
            placeSelf: 'center',
            zIndex: 2,
            gridArea: '2/3',
          }),
        },
      },
      // If cascade we need to hide all children which are not primary or another cascade (e.g. all siblings of the primary or cascade item)
      ...(isCascade && {
        '::slotted(*:not([primary],[cascade]))': {
          display: 'none',
        },
      }),
      [mediaQueryEnhancedViewMax]: {
        ...(isPrimary && {
          '::slotted(*:not([secondary]))': {
            display: 'none',
          },
        }),
      },
      '::slotted': {
        '&(a)': {
          ...{
            all: 'unset',
            alignSelf: 'flex-start',
            font: textMediumStyle.font,
            cursor: 'pointer',
            borderRadius: borderRadiusSmall,
            padding: spacingFluidSmall,
            marginInline: `calc(${spacingFluidSmall} * -1)`,
            color: primaryColor,
            textDecoration: 'underline',
            textDecorationColor: 'transparent',
            transition: `${getTransition('text-decoration-color')}`,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              color: primaryColorDark,
            }),
          },
        },
        '&(a[aria-current])': {
          textDecoration: 'underline',
        },
        ...hoverMediaQuery({
          '&(a:hover)': {
            textDecorationColor: 'inherit',
          },
        }),
        ...getFocusJssStyle(theme, { slotted: 'a', offset: '-2px' }),
      },
      ...preventFoucOfNestedElementsStyles,
    },
    scroller: {
      [mediaQueryEnhancedViewMax]: {
        display: 'contents',
        ...(isSecondary && {
          display: 'grid',
          gridTemplateRows: 'subgrid',
          gridTemplateColumns: 'subgrid',
          gridArea: '1/1/-1/-1',
          overflow: 'hidden auto',
          '&::before': {
            zIndex: 1,
            content: '""',
            position: 'sticky',
            top: 0,
            opacity: 0.9,
            gridArea: '1/1/4/-1',
            background: backgroundColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              background: backgroundColorDark,
            }),
          },
        }),
      },
    },
    button: {
      [mediaQueryEnhancedViewMax]: {
        ...(isSecondary && {
          display: 'none',
        }),
      },
      ...((isPrimary || isCascade) && {
        display: 'none',
      }),
      ...(!isPrimary &&
        !isCascade && {
          padding: spacingFluidSmall,
          margin: `0 calc(${spacingFluidSmall} * -1)`,
        }),
    },
    back: {
      [mediaQueryEnhancedViewMax]: {
        ...(!isSecondary && {
          display: 'none',
        }),
        ...(isSecondary && {
          gridArea: '2/2',
          placeSelf: 'center flex-start',
          zIndex: 2,
        }),
      },
      [mediaQueryEnhancedViewMin]: {
        ...(!isPrimary && {
          display: 'none',
        }),
        ...(isPrimary && {
          width: 'fit-content',
          marginInlineStart: '-4px', // improve visual alignment and compensate white space of arrow-left icon
        }),
      },
    },
  });
};
