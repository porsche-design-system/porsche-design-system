import {
  borderRadiusSmall,
  motionDurationModerate,
  motionEasingBase,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingFluidXSmall,
  textMediumStyle,
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
import { mediaQueryEnhancedView, scrollerWidthEnhancedView } from '../flyout-multilevel/flyout-multilevel-styles';

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

const animationFadeIn = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
};

export const getComponentCss = (isPrimary: boolean, isSecondary: boolean, isCascade: boolean, theme: Theme): string => {
  const { primaryColor, contrastMediumColor } = getThemedColors(theme);
  const { primaryColor: primaryColorDark, contrastMediumColor: contrastMediumColorDark } = getThemedColors('dark');

  return getCss({
    '@global': {
      '@keyframes slide-up-primary': animationSlideUpPrimary,
      '@keyframes slide-up-secondary': animationSlideUpSecondary,
      '@keyframes fade-in': animationFadeIn,
      ':host': {
        display: isPrimary || isSecondary ? 'grid' : 'contents',
        gap: spacingFluidMedium,
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      slot: {
        ...((isPrimary || isSecondary) && {
          display: 'flex',
          flexDirection: 'column',
          gap: spacingFluidXSmall,
          animation: `slide-up-${isPrimary ? 'primary' : 'secondary'} ${motionDurationModerate} ${motionEasingBase}`,
        }),
        ...(isSecondary && {
          position: 'fixed', // Fixed to break out of scroll area
          inset: 0,
          overflow: 'hidden auto',
          width: '100vw',
          boxSizing: 'border-box',
          padding: `${spacingFluidMedium} ${spacingFluidLarge} ${spacingFluidLarge}`,
          [mediaQueryEnhancedView]: {
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
      // If cascade we need to hide all children which are not primary or another cascade (e.g. all siblings of the primary or cascade item)
      ...(isCascade && {
        '::slotted(*:not([primary],[cascade]))': {
          display: 'none',
        },
      }),
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
            transition: `${getTransition('color')}, ${getTransition('background')}`,
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
            color: contrastMediumColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              color: contrastMediumColorDark,
            }),
          },
        }),
        ...getFocusJssStyle(theme, { slotted: 'a', offset: '-2px' }),
      },
      ...preventFoucOfNestedElementsStyles,
    },
    button: {
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
      ...(!isPrimary && {
        display: 'none',
      }),
      ...(isPrimary && {
        width: 'fit-content',
        marginInlineStart: '-4px', // improve visual alignment and compensate white space of arrow-left icon
        animation: `fade-in ${motionDurationModerate} ${motionEasingBase}`,
      }),
    },
  });
};
