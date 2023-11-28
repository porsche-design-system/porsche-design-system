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

export const getComponentCss = (isOpen: boolean, theme: Theme): string => {
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
        opacity: isOpen ? '1' : '0',
        transition: getTransition('opacity', 'long'),
      }),
    },
    button: {
      padding: `${spacingFluidSmall} ${spacingFluidMedium}`,
    },
    drawer: {
      position: 'fixed',
      top: 0,
      left: '25vw',
      bottom: 0,
      width: '25vw',
      padding: spacingFluidMedium,
      boxSizing: 'border-box',
      overflow: 'auto',
      visibility: isOpen ? 'visible' : 'hidden',
      display: 'block',
      backgroundColor: backgroundSurfaceColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        backgroundColor: backgroundSurfaceColorDark,
      }),
    },
  });
};
