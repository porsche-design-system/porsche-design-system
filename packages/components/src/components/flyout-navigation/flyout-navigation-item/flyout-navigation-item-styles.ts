import { getCss } from '../../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
} from '../../../styles';
import { spacingFluidMedium, spacingFluidSmall, type Theme } from '@porsche-design-system/utilities-v2';
import { drawerWidth } from '../flyout-navigation/flyout-navigation-styles';

export const getComponentCss = (isSecondaryDrawerOpen: boolean, theme: Theme): string => {
  const { backgroundSurfaceColor } = getThemedColors(theme);
  const { backgroundSurfaceColor: backgroundSurfaceColorDark } = getThemedColors('dark');

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      '::slotted(*)': addImportantToEachRule({
        opacity: isSecondaryDrawerOpen ? '1' : '0',
        transition: getTransition('opacity', 'long'),
      }),
    },
    button: {
      padding: spacingFluidSmall,
    },
    drawer: {
      position: 'fixed',
      insetBlock: 0,
      insetInlineStart: `calc(${drawerWidth} - 1px)`, // -1px prevents possible visible background under certain circumstances between main and secondary drawer
      width: drawerWidth,
      padding: spacingFluidMedium,
      boxSizing: 'border-box',
      overflow: 'auto',
      visibility: isSecondaryDrawerOpen ? 'inherit' : 'hidden',
      backgroundColor: backgroundSurfaceColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        backgroundColor: backgroundSurfaceColorDark,
      }),
    },
  });
};
