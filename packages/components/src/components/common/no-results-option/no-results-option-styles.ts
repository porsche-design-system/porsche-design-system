import type { Styles } from 'jss';
import { getHiddenTextJssStyle, getThemedColors, prefersColorSchemeDarkMediaQuery } from '../../../styles';
import { getOptionJssStyle } from '../../../styles/select';
import type { Theme } from '../../../utils';

export const getFunctionalComponentNoResultsOptionStyles = (
  componentName: 'select-wrapper' | 'select-option' | 'multi-select-option',
  cssVarScaling: string | 1, // "1" is needed for components not yet supporting compact mode
  theme: Theme
): Styles => {
  const { contrastMediumColor } = getThemedColors(theme);
  const { contrastMediumColor: contrastMediumColorDark } = getThemedColors('dark');

  return {
    'no-results': {
      ...getOptionJssStyle(componentName, cssVarScaling, theme),
      '&[role=option]': {
        cursor: 'not-allowed',
      },
      color: contrastMediumColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: contrastMediumColorDark,
      }),
    },
    'sr-only': getHiddenTextJssStyle(),
  };
};
