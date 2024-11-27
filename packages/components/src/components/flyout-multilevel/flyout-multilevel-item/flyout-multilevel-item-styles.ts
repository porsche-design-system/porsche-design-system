import { type Theme, dropShadowHighStyle, spacingFluidSmall, spacingFluidXSmall } from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  addImportantToRule,
  colorSchemeStyles,
  getThemedColors,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { getCss } from '../../../utils';
import { mediaQueryEnhancedView, scrollerWidthEnhancedView } from '../flyout-multilevel/flyout-multilevel-styles';

export const getComponentCss = (isPrimary: boolean, isSecondary: boolean, isCascade: boolean, theme: Theme): string => {
  const { backgroundColor, backgroundSurfaceColor } = getThemedColors(theme);
  const { backgroundColor: backgroundColorDark, backgroundSurfaceColor: backgroundSurfaceColorDark } =
    getThemedColors('dark');

  const inheritGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridArea: '1/1/1/-1',
  };

  return getCss({
    '@global': {
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
      // it's important to define background-color for each scroller to have correct scrollbar coloring
      backgroundColor: isPrimary || isCascade ? backgroundColor : backgroundSurfaceColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        backgroundColor: isPrimary || isCascade ? backgroundColorDark : backgroundSurfaceColorDark,
      }),
      [mediaQueryEnhancedView]: {
        boxShadow: 'none',
        insetInlineStart: `calc(${scrollerWidthEnhancedView} - 1px)`, // -1px prevents possible visible background under certain circumstances between primary and secondary scroller
        width: scrollerWidthEnhancedView,
        transform: addImportantToRule('initial'), // to overrule :dir(rtl) selector
      },
      '&:dir(rtl)': {
        ...(!isSecondary && {
          transform: 'translate3d(-100%, 0, 0)', // use correct transitions in rtl mode for mobile view
        }),
      },
    },
    back: {
      justifySelf: 'flex-start',
      padding: spacingFluidSmall,
      marginInlineStart: `calc(${spacingFluidSmall} * -1)`,
    },
  });
};
