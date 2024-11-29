import {
  motionDurationModerate,
  motionEasingBase,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingFluidXSmall,
} from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { getCss } from '../../../utils';
import { mediaQueryEnhancedView, scrollerWidthEnhancedView } from '../flyout-multilevel/flyout-multilevel-styles';

const animationFadeIn = {
  from: {
    marginBlockStart: spacingFluidMedium,
  },
  to: {
    marginBlockStart: '0px',
  },
};

export const getComponentCss = (isPrimary: boolean, isSecondary: boolean, isCascade: boolean): string => {
  return getCss({
    '@global': {
      '@keyframes slide-up-primary': animationFadeIn,
      '@keyframes slide-up-secondary': animationFadeIn,
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
        ...(isPrimary && {
          position: 'relative', // relative anchor for slotted fixed secondary layer
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
      ...preventFoucOfNestedElementsStyles,
    },
    button: {
      ...((isPrimary || isCascade) && {
        display: 'none',
      }),
      padding: spacingFluidSmall,
      margin: `0 calc(${spacingFluidSmall} * -1)`,
    },
    back: {
      width: 'fit-content',
      marginInlineStart: '-4px', // improve visual alignment and compensate white space of arrow-left icon
      ...(!isPrimary && {
        display: 'none',
      }),
    },
  });
};
