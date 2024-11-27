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
        ...(isPrimary || isCascade
          ? {
              display: 'grid',
              gridTemplateColumns: 'subgrid',
              gridArea: '1/1/1/-1',
            }
          : {
              display: 'flex',
              flexDirection: 'column',
              gap: spacingFluidXSmall,
            }),
        ...(isPrimary && {
          '--_p-flyout-multilevel-button': 'block',
        }),
      },
      '::slotted(*:not([primary],[cascade]))': {
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
          }),
      ...(isCascade && {
        display: 'grid',
        gridTemplateColumns: 'subgrid',
        gridArea: '1/1/1/-1',
      }),
      ...(!isPrimary && {
        ...(isSecondary
          ? {
              display: 'grid',
            }
          : {
              display: 'none',
            }),
      }),
      ...(isCascade && {
        display: 'grid',
      }),
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
