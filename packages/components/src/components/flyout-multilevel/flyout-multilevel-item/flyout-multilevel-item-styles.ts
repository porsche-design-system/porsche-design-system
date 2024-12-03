import {
  borderRadiusSmall,
  headingSmallStyle,
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
import {
  mediaQueryDesktop,
  mediaQueryMobile,
  scrollerWidthDesktop,
} from '../flyout-multilevel/flyout-multilevel-styles';

const animationSlideUpMobile = {
  from: {
    transform: `translate3d(0,${spacingFluidMedium},0)`,
  },
  to: {
    transform: 'translate3d(0,0,0)',
  },
};

const animationSlideUpDesktop = {
  from: {
    marginBlockStart: spacingFluidMedium,
  },
  to: {
    marginBlockStart: '0px',
  },
};

export const getComponentCss = (isPrimary: boolean, isSecondary: boolean, isCascade: boolean, theme: Theme): string => {
  const { primaryColor, backgroundColor } = getThemedColors(theme);
  const { primaryColor: primaryColorDark, backgroundColor: backgroundColorDark } = getThemedColors('dark');
  return getCss({
    '@global': {
      '@keyframes slide-up-desktop-primary': animationSlideUpDesktop,
      '@keyframes slide-up-desktop-secondary': animationSlideUpDesktop,
      '@keyframes slide-up-mobile': animationSlideUpMobile,
      ':host': {
        display: 'contents',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      slot: {
        display: 'none',
        [mediaQueryMobile]: {
          ...(isSecondary && {
            zIndex: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: spacingFluidXSmall,
            gridArea: '4/2/auto/-2',
            height: 'fit-content', // ensures padding bottom is added instead of subtracted because of grid context
            paddingBlockEnd: spacingFluidLarge,
            animation: `slide-up-mobile ${motionDurationModerate} ${motionEasingBase}`,
          }),
          ...((isPrimary || isCascade) && {
            display: 'contents',
          }),
        },
        [mediaQueryDesktop]: {
          ...((isPrimary || isSecondary) && {
            display: 'flex',
            flexDirection: 'column',
            gap: spacingFluidXSmall,
            height: 'fit-content', // ensures padding bottom is added instead of subtracted because of grid context
            animation: `slide-up-desktop-${isPrimary ? 'primary' : 'secondary'} ${motionDurationModerate} ${motionEasingBase}`,
          }),
          ...(isSecondary && {
            gridArea: '2/2/auto/-2',
            paddingBlockEnd: spacingFluidLarge,
          }),
          ...(isCascade && {
            display: 'contents',
          }),
        },
      },
      h2: {
        display: 'none',
        [mediaQueryMobile]: {
          ...(isSecondary && {
            display: 'block',
            ...headingSmallStyle,
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
      [mediaQueryMobile]: {
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
    // drawer subgrid in combination with scroller grid ensures no content squeezing during slide up animation, potentially caused by scrollbar
    drawer: {
      [mediaQueryMobile]: {
        display: 'none',
        ...((isPrimary || isSecondary || isCascade) && {
          display: 'contents',
        }),
      },
      [mediaQueryDesktop]: {
        display: 'none',
        ...(isSecondary && {
          position: 'absolute', // enables to break out of scroll area
          inset: 0,
          insetInlineStart: scrollerWidthDesktop,
          display: 'grid',
          gridTemplate: `${spacingFluidMedium} minmax(0, 1fr) / ${spacingFluidLarge} minmax(0, 1fr) ${spacingFluidLarge}`,
        }),
        ...((isPrimary || isCascade) && {
          display: 'contents',
        }),
      },
    },
    scroller: {
      [mediaQueryMobile]: {
        display: 'none',
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
            gridArea: '1/1/4/-1',
            background: `linear-gradient(180deg,${backgroundColor} 0%,${backgroundColor} 65%,transparent 100%)`,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              background: `linear-gradient(180deg,${backgroundColorDark} 0%,${backgroundColorDark} 65%,transparent 100%)`,
            }),
          },
        }),
        ...((isPrimary || isCascade) && {
          display: 'contents',
        }),
      },
      [mediaQueryDesktop]: {
        display: 'none',
        ...(isSecondary && {
          gridArea: '1/1/-1/-1',
          display: 'grid',
          gridTemplateRows: 'subgrid',
          gridTemplateColumns: 'subgrid',
          overflow: 'hidden auto',
        }),
        ...((isPrimary || isCascade) && {
          display: 'contents',
        }),
      },
    },
    button: {
      [mediaQueryMobile]: {
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
      [mediaQueryMobile]: {
        ...(!isPrimary && {
          display: 'none',
        }),
        ...(isPrimary && {
          gridArea: '2/2',
          placeSelf: 'center flex-start',
          zIndex: 2,
        }),
      },
      [mediaQueryDesktop]: {
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
