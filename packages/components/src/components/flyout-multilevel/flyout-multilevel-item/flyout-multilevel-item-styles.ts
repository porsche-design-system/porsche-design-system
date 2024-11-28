import {
  dropShadowHighStyle,
  motionDurationModerate,
  motionEasingBase,
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

const inheritGridStyles = {
  display: 'grid',
  gridTemplateColumns: 'subgrid',
  gridArea: '1/1/1/-1',
};

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
        ...((isPrimary || isCascade) && inheritGridStyles),
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      // TODO: Only either of is possible
      slot: {
        ...((isPrimary || isSecondary) && {
          display: 'flex',
          flexDirection: 'column',
          gap: spacingFluidXSmall,
        }),
        ...(isCascade && inheritGridStyles),
        ...(isPrimary && {
          animation: `slide-up-primary ${motionDurationModerate} ${motionEasingBase}`,
        }),
        ...(isSecondary && {
          animation: `slide-up-secondary ${motionDurationModerate} ${motionEasingBase}`,
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
      width: 'auto',
      padding: spacingFluidSmall,
      margin: `0 calc(${spacingFluidSmall} * -1)`,
    },
    scroller: {
      display: 'none',
      ...(isPrimary && {
        display: 'block',
        position: 'relative', // Set relative for secondary fixed position
        gridArea: '1/1',
        insetInlineStart: '0 !important',
      }),
      ...(isSecondary && {
        display: 'block',
        position: 'fixed', // Fixed to break out of scroll area
        inset: 0,
      }),
      // Inherit grid to next item
      ...(isCascade && inheritGridStyles),
      width: '100vw',
      boxSizing: 'border-box',
      overflow: 'hidden auto',
      ...dropShadowHighStyle,
      [mediaQueryEnhancedView]: {
        boxShadow: 'none',
        insetInlineStart: `calc(${scrollerWidthEnhancedView} - 1px)`, // -1px prevents possible visible background under certain circumstances between primary and secondary scroller
        width: scrollerWidthEnhancedView,
      },
    },
    back: {
      justifySelf: 'flex-start',
      padding: spacingFluidSmall,
      marginInlineStart: `calc(${spacingFluidSmall} * -1)`,
    },
  });
};
