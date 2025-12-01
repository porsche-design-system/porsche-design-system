import type { Styles } from 'jss';
import { colors, getHiddenTextJssStyle } from '../../../styles';
import { getOptionJssStyle } from '../../../styles/select';

const { contrastMediumColor } = colors;

export const getFunctionalComponentNoResultsOptionStyles = (
  componentName: 'select-option' | 'multi-select-option',
  cssVarScaling: string | 1 // "1" is needed for components not yet supporting compact mode
): Styles => {
  return {
    'no-results': {
      ...getOptionJssStyle(componentName, cssVarScaling),
      '&[role=option]': {
        cursor: 'not-allowed',
      },
      color: contrastMediumColor,
    },
    'sr-only': getHiddenTextJssStyle(),
  };
};
