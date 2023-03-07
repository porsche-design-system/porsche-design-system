import { textSmallStyle, spacingFluidMedium } from '@porsche-design-system/utilities-v2';
import { buildSlottedStyles, getCss } from '../../../utils';
import { getBaseSlottedStyles, getThemedColors, addImportantToEachRule, hostHiddenStyles } from '../../../styles';
import type { Theme } from '../../../types';

export const cssVariableTableRowHoverColor = '--p-internal-table-row-hover-color';
export const getComponentCss = (theme: Theme): string => {
  const { primaryColor } = getThemedColors(theme);

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'block',
        ...hostHiddenStyles,
      }),
      '::slotted(*)': {
        [cssVariableTableRowHoverColor]: getThemedColors(theme).backgroundSurfaceColor,
      },
    },
    caption: {
      marginBottom: spacingFluidMedium,
    },
    table: {
      position: 'relative',
      width: '100%',
      display: 'table',
      ...textSmallStyle,
      textAlign: 'left',
      color: primaryColor,
      whiteSpace: 'nowrap',
      borderCollapse: 'collapse', // needed for row hover state
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    buildSlottedStyles(host, {
      ...getBaseSlottedStyles({ withDarkTheme: true }),
      '& img': {
        verticalAlign: 'middle',
      },
    })
  );
};
