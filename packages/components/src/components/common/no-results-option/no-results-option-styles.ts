import type { Styles } from 'jss';
import { getHiddenTextJssStyle, getThemedColors, prefersColorSchemeDarkMediaQuery } from '../../../styles';
import { getOptionJssStyle } from '../../../styles/select';
import type { Theme } from '../../../utils';

export const getFunctionalComponentNoResultsOptionStyles = (
  componentName: 'select-wrapper' | 'select-option' | 'multi-select-option',
  cssVarScaling: string | 1, // "1" is needed for components not yet supporting compact mode
  theme: Theme
): Styles => {
  const { contrast50Color } = getThemedColors(theme);
  const { contrast50Color: contrast50ColorDark } = getThemedColors('dark');

  return {
    'no-results': {
      ...getOptionJssStyle(componentName, cssVarScaling, theme),
      '&[role=option]': {
        cursor: 'not-allowed',
      },
      color: contrast50Color,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: contrast50ColorDark,
      }),
    },
    'sr-only': getHiddenTextJssStyle(),
  };
};
